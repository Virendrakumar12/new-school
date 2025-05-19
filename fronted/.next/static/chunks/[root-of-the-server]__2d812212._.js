(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/Utils/axiosInstance.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true
});
// Automatically attach token
axiosInstance.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error)=>Promise.reject(error));
const __TURBOPACK__default__export__ = axiosInstance;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Actions/SubjectActions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// subjectThunks.js
__turbopack_context__.s({
    "createSubject": (()=>createSubject),
    "deleteSubject": (()=>deleteSubject),
    "getAllSubjects": (()=>getAllSubjects),
    "getSubjectById": (()=>getSubjectById),
    "updateSubject": (()=>updateSubject)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)");
;
;
const createSubject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('subject/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/subject/addSubject', formData); // adjust endpoint if needed
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create subject');
    }
});
const getAllSubjects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('subject/getAll', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/subject/getAllSubject');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch subjects');
    }
});
const getSubjectById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('subject/getById', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/subject/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch subject');
    }
});
const updateSubject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('subject/update', async ({ id, updatedData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/subject/updateSubject/${id}`, updatedData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update subject');
    }
});
const deleteSubject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('subject/delete', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/subject/${id}`);
        return {
            id,
            message: res.data.message
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete subject');
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Actions/TeacherActions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createTeacher": (()=>createTeacher),
    "deleteTeacher": (()=>deleteTeacher),
    "getAllTeachers": (()=>getAllTeachers),
    "getTeacherById": (()=>getTeacherById),
    "loginTeacher": (()=>loginTeacher),
    "updateTeacher": (()=>updateTeacher)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)");
;
;
const createTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/teacher/addTeacher', formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const loginTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/login', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/teacher/loginTeacher', formData);
        // ✅ Store token and teacher info in localStorage (if in browser)
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('token', res.data.token);
        }
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getAllTeachers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/getAll', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/teacher/getAllTeacher');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch teachers');
    }
});
const getTeacherById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/getById', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/teacher/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Teacher not found');
    }
});
const updateTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/update', async ({ id, formData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/teacher/updateTeacher/${id}`, formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
});
const deleteTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/delete', async (id, { rejectWithValue, dispatch })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/teacher/${id}`);
        dispatch(getAllTeachers()); // Refresh list after delete
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Actions/SectionActions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "assignClassTeacher": (()=>assignClassTeacher),
    "assignSubjectToSection": (()=>assignSubjectToSection),
    "createSection": (()=>createSection),
    "deleteSection": (()=>deleteSection),
    "getSections": (()=>getSections),
    "getSectionsByClassId": (()=>getSectionsByClassId),
    "removeSubjectFromClass": (()=>removeSubjectFromClass),
    "updateSection": (()=>updateSection),
    "updateSubjectTeacherInClass": (()=>updateSubjectTeacherInClass)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)");
;
;
const createSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/create', async ({ sectionName, classId }, { rejectWithValue })=>{
    try {
        console.log(sectionName, classId);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/section/addSection', {
            sectionName,
            classId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const updateSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/update', async ({ id, classTeacher, subjects }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/section/updateSection/${id}`, {
            classTeacher,
            subjects
        });
        console.log("i am action of section controller", res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update section');
    }
});
const deleteSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/delete', async (sectionId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/section/${sectionId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete section');
    }
});
const assignClassTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/assignTeacher', async ({ sectionId, classTeacher }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].patch(`/section/assignTeacher/${sectionId}`, {
            classTeacher
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to assign teacher');
    }
});
const getSectionsByClassId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/getByClassId', async (classId, { rejectWithValue })=>{
    try {
        console.log("i am get by classId", classId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/section/getAllSectionById/${classId}`);
        console.log("in action part of get section by classid ", response);
        console.log("res.data", response.data);
        const cleanedData = response.data.filter((item)=>item !== null && typeof item === 'object');
        return cleanedData;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const getSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/getAll', async (classId = null, { rejectWithValue })=>{
    try {
        const query = classId ? `?classId=${classId}` : '';
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/section${query}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch sections');
    }
});
const assignSubjectToSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/assignSubject', async ({ sectionId, subjectId, teacherId }, { rejectWithValue })=>{
    try {
        console.log(" iam at assign subject", sectionId, subjectId, teacherId);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`/section/add/assignSubject/${sectionId}`, {
            subjectId,
            teacherId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to assign subject');
    }
});
const updateSubjectTeacherInClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('class/updateSubjectTeacher', async ({ classId, subjectId, newTeacherId }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/class/update-subject-teacher/${classId}`, {
            subjectId,
            newTeacherId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update subject teacher');
    }
});
const removeSubjectFromClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('class/removeSubject', async ({ classId, subjectId }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/class/remove-subject/${classId}`, {
            subjectId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to remove subject');
    }
}); // redux/Actions/SectionActions.js
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Slices/sectionSlice.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearSection": (()=>clearSection),
    "clearSectionMessage": (()=>clearSectionMessage),
    "clearSectionsList": (()=>clearSectionsList),
    "default": (()=>__TURBOPACK__default__export__),
    "setSection": (()=>setSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/SectionActions.js [client] (ecmascript)"); // adjust path if needed
;
;
const sectionSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'section',
    initialState: {
        sections: [],
        loading: false,
        error: null,
        message: null,
        section: null
    },
    reducers: {
        clearSectionMessage: (state)=>{
            state.error = null;
            state.message = null;
        },
        setSection: (state, action)=>{
            state.section = action.payload; // selected section
        },
        clearSection: (state)=>{
            state.section = null; // clears selected section
        },
        clearSectionsList: (state)=>{
            state.sections = []; // clears section list
        }
    },
    extraReducers: (builder)=>{
        builder// Create Section
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createSection"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createSection"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections.push(action.payload.section);
            state.message = action.payload.message || 'Section created';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update Section
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSection"].pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSection"].fulfilled, (state, action)=>{
            state.loading = false;
            // Update the section inside the sections list
            state.sections = state.sections.map((section)=>section._id === action.payload._id ? action.payload : section);
            // Also update the current selected section if needed
            if (state.section && state.section._id === action.payload._id) {
                state.section = action.payload;
            }
            state.message = "Section updated successfully.";
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to update section.";
        })// Delete Section
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteSection"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteSection"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections = state.sections.filter((section)=>section._id !== action.payload.sectionId);
            state.message = action.payload.message || 'Section deleted';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Assign Class Teacher
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["assignClassTeacher"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["assignClassTeacher"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections = state.sections.map((section)=>section._id === action.payload.section._id ? action.payload.section : section);
            state.message = action.payload.message || 'Class teacher assigned';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["assignClassTeacher"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get Sections by Class ID
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSectionsByClassId"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSectionsByClassId"].fulfilled, (state, action)=>{
            state.loading = false;
            console.log("action  payload ", action.payload);
            state.sections = action.payload.filter((item)=>item !== null);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSectionsByClassId"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get All Sections
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSections"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSections"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections = action.payload.sections;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSections"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Assign Subject to Class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["assignSubjectToSection"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["assignSubjectToSection"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = action.payload.message || 'Subject assigned';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["assignSubjectToSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update Subject Teacher in Class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSubjectTeacherInClass"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSubjectTeacherInClass"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = action.payload.message || 'Subject teacher updated';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSubjectTeacherInClass"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Remove Subject from Class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["removeSubjectFromClass"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["removeSubjectFromClass"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = action.payload.message || 'Subject removed';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["removeSubjectFromClass"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearSectionMessage, setSection, clearSection, clearSectionsList } = sectionSlice.actions;
const __TURBOPACK__default__export__ = sectionSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/Dashboard/Section/AddSubject.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/SubjectActions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/TeacherActions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/SectionActions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/sectionSlice.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const AddSubjectsToSection = ()=>{
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { subjects } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AddSubjectsToSection.useSelector": (state)=>state.subject
    }["AddSubjectsToSection.useSelector"]);
    const { teachers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AddSubjectsToSection.useSelector": (state)=>state.teacher
    }["AddSubjectsToSection.useSelector"]);
    const { section } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AddSubjectsToSection.useSelector": (state)=>state.section
    }["AddSubjectsToSection.useSelector"]);
    const [subjectTeacherPairs, setSubjectTeacherPairs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            subject: '',
            teacher: ''
        }
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddSubjectsToSection.useEffect": ()=>{
            if (!section || !section._id) {
                const saved = localStorage.getItem("selectedSection");
                if (saved) {
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setSection"])(JSON.parse(saved)));
                }
            }
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllSubjects"])());
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllTeachers"])());
        }
    }["AddSubjectsToSection.useEffect"], [
        dispatch,
        section
    ]);
    const handleChange = (index, field, value)=>{
        const updated = [
            ...subjectTeacherPairs
        ];
        updated[index][field] = value;
        setSubjectTeacherPairs(updated);
    };
    const addPair = ()=>{
        setSubjectTeacherPairs([
            ...subjectTeacherPairs,
            {
                subject: '',
                teacher: ''
            }
        ]);
    };
    const removePair = (index)=>{
        const updated = subjectTeacherPairs.filter((_, i)=>i !== index);
        setSubjectTeacherPairs(updated);
    };
    const handleSubmit = ()=>{
        const validPairs = subjectTeacherPairs.filter((pair)=>pair.subject && pair.teacher);
        if (validPairs.length === 0) return alert('Please add at least one subject-teacher pair.');
        if (!section || !section._id) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Loading section data..."
            }, void 0, false, {
                fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                lineNumber: 55,
                columnNumber: 16
            }, this); // or a skeleton loader
        }
        validPairs.forEach((pair)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["assignSubjectToSection"])({
                sectionId: section._id,
                subjectId: pair.subject,
                teacherId: pair.teacher
            }));
        });
        alert('Subjects assignment initiated!');
        router.push("/Dashboard/Section/SectionList");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto p-6 bg-white rounded shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-6",
                children: "Assign Subjects and Teachers"
            }, void 0, false, {
                fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            subjectTeacherPairs.map((pair, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row gap-4 items-center mb-4 border-b pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "w-full sm:w-1/2 p-2 border rounded",
                            value: pair.subject,
                            onChange: (e)=>handleChange(index, 'subject', e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select Subject"
                                }, void 0, false, {
                                    fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                subjects?.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: s._id,
                                        children: s.subjectName
                                    }, s._id, false, {
                                        fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "w-full sm:w-1/2 p-2 border rounded",
                            value: pair.teacher,
                            onChange: (e)=>handleChange(index, 'teacher', e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select Teacher"
                                }, void 0, false, {
                                    fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                teachers?.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: t._id,
                                        children: [
                                            t.firstName,
                                            " ",
                                            t.lastName
                                        ]
                                    }, t._id, true, {
                                        fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>removePair(index),
                            className: "text-red-500 hover:text-red-700 mt-2 sm:mt-0",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: addPair,
                className: "text-blue-600 hover:text-blue-800 font-medium mb-4",
                children: "+ Add More"
            }, void 0, false, {
                fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleSubmit,
                className: "w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700",
                children: "Submit"
            }, void 0, false, {
                fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/Dashboard/Section/AddSubject.js",
        lineNumber: 72,
        columnNumber: 5
    }, this);
};
_s(AddSubjectsToSection, "t4h9YtDpmbK8x6zQYDbfGzSfA/s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = AddSubjectsToSection;
const __TURBOPACK__default__export__ = AddSubjectsToSection;
var _c;
__turbopack_context__.k.register(_c, "AddSubjectsToSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/Dashboard/Section/AddSubject.js [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/Dashboard/Section/AddSubject";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/Dashboard/Section/AddSubject.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/pages/Dashboard/Section/AddSubject.js (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/Dashboard/Section/AddSubject.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__2d812212._.js.map