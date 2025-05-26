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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:8080/api"),
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
"[project]/redux/Actions/StudentActions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createStudent": (()=>createStudent),
    "deleteMonthlyPaymentsByStudent": (()=>deleteMonthlyPaymentsByStudent),
    "deleteStudent": (()=>deleteStudent),
    "fetchMonthlyFees": (()=>fetchMonthlyFees),
    "generateMonthlyFees": (()=>generateMonthlyFees),
    "getAllStudents": (()=>getAllStudents),
    "getStudentById": (()=>getStudentById),
    "loginStudent": (()=>loginStudent),
    "updateStudent": (()=>updateStudent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)"); // Update path based on your project
;
;
const createStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/createStudent', async (studentData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/student/addStudent', studentData); // your route: POST /students
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to create student');
    }
});
const loginStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/login', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/student/loginStudent', formData);
        // ✅ Store token in localStorage
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('token', res.data.token);
        }
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getAllStudents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/getAllStudents', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/student/getAllStudent'); // your route: GET /students
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch students');
    }
});
const getStudentById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/getStudentById', async (studentId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/students/${studentId}`); // your route: GET /students/:studentId
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch student');
    }
});
const updateStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/updateStudent', async ({ id, updatedData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/student/updatedStudent/${id}`, updatedData); // your route: PUT /students/:studentId
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to update student');
    }
});
const deleteStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/deleteStudent', async (studentId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/student/deleteStudent/${studentId}`); // your route: DELETE /students/:studentId
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to delete student');
    }
});
const generateMonthlyFees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('monthlyFee/generateMonthlyFees', async (data, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/fees/generateFees', data); // API endpoint for generating fees
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to generate monthly fees');
    }
});
const fetchMonthlyFees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('monthlyFee/fetchMonthlyFees', async (studentId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/fees/student/${studentId}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || 'Error fetching fees');
    }
});
const deleteMonthlyPaymentsByStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('monthPayment/deleteMonthlyPaymentsByStudent', async (studentId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/fees/deleteMonthlyFee/${studentId}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to delete monthly payments');
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Actions/ClassActions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createClass": (()=>createClass),
    "deleteClass": (()=>deleteClass),
    "fetchClassById": (()=>fetchClassById),
    "fetchClasses": (()=>fetchClasses),
    "updateClass": (()=>updateClass)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)"); // your axios setup
;
;
const createClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('class/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/class/addClass', formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const fetchClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('class/fetchAll', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/class/getAllClass'); // adjust endpoint if needed
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const fetchClassById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('class/fetchById', async (classId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/class/${classId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const updateClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('class/update', async ({ classId, formData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/class/${classId}`, formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const deleteClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('class/delete', async (classId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/class/${classId}`);
        return classId; // return ID to remove from local state
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
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
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update section');
    }
});
const deleteSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/delete', async (sectionId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/section/deleteSection/${sectionId}`);
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/section/getAllSectionById/${classId}`);
        const cleanedData = response.data.filter((item)=>item !== null && typeof item === 'object');
        return cleanedData;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error.message || 'Something went wrong');
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
"[project]/components/studentTableClass.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/StudentTable.jsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [client] (ecmascript) <export default as Trash2>");
;
;
;
const StudentTable = ({ students, teacherId, onView, onEdit, onDelete })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto shadow rounded-lg bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "min-w-full divide-y divide-gray-200 text-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    className: "bg-gray-100 text-gray-700 text-left",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3",
                                children: "REG.NO"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 11,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3",
                                children: "Name"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 12,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3",
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 13,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3",
                                children: "fatherName"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 14,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3",
                                children: "parentCode"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 15,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3",
                                children: "Class"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 16,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3",
                                children: "currentSection"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3",
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 18,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3 text-center",
                                children: "Actions"
                            }, void 0, false, {
                                fileName: "[project]/components/studentTableClass.js",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/studentTableClass.js",
                        lineNumber: 10,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/studentTableClass.js",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    className: "divide-y divide-gray-200",
                    children: students?.map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "hover:bg-gray-50 transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: student.registrationNumber
                                }, void 0, false, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 25,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 font-medium text-gray-800",
                                    children: [
                                        student.firstName,
                                        " ",
                                        student.lastName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: student.email
                                }, void 0, false, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: student.parent?.fatherName || 'N/A'
                                }, void 0, false, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: student.parentCode
                                }, void 0, false, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: student.currentSection?.classId?.className || 'N/A'
                                }, void 0, false, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3",
                                    children: student.currentSection?.sectionName || 'N/A'
                                }, void 0, false, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 capitalize",
                                    children: student.status
                                }, void 0, false, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 flex justify-center gap-2 text-gray-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onView(student),
                                            className: "hover:text-blue-600 cursor-pointer",
                                            title: "View",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/components/studentTableClass.js",
                                                lineNumber: 42,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/studentTableClass.js",
                                            lineNumber: 41,
                                            columnNumber: 17
                                        }, this),
                                        student.currentSection?.classTeacher?._id === teacherId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onEdit(student),
                                                    className: "hover:text-yellow-500 cursor-pointer",
                                                    title: "Edit",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/studentTableClass.js",
                                                        lineNumber: 49,
                                                        columnNumber: 7
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/studentTableClass.js",
                                                    lineNumber: 48,
                                                    columnNumber: 5
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onDelete(student),
                                                    className: "hover:text-red-500 cursor-pointer",
                                                    title: "Delete",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/studentTableClass.js",
                                                        lineNumber: 52,
                                                        columnNumber: 7
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/studentTableClass.js",
                                                    lineNumber: 51,
                                                    columnNumber: 5
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/studentTableClass.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, student._id, true, {
                            fileName: "[project]/components/studentTableClass.js",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/studentTableClass.js",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/studentTableClass.js",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/studentTableClass.js",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
_c = StudentTable;
const __TURBOPACK__default__export__ = StudentTable;
var _c;
__turbopack_context__.k.register(_c, "StudentTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Slices/StudentSlice.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearStudentState": (()=>clearStudentState),
    "default": (()=>__TURBOPACK__default__export__),
    "setStudent": (()=>setStudent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/StudentActions.js [client] (ecmascript)");
;
;
const initialState = {
    students: [],
    studentDetails: null,
    studentLogin: null,
    loading: false,
    error: null,
    fees: [],
    success: false,
    deletedCount: 0
};
const studentSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'student',
    initialState,
    reducers: {
        clearStudentState: (state)=>{
            state.studentDetails = null;
            state.success = false;
            state.error = null;
        },
        setStudent: (state, action)=>{
            state.studentDetails = action.payload;
        },
        logoutStudent: (state)=>{
            state.studentDetails = null;
            state.loading = false;
            state.error = null;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('token');
            }
        }
    },
    extraReducers: (builder)=>{
        // Create Student
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createStudent"].pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createStudent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.students.push(action.payload);
            state.success = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createStudent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["loginStudent"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["loginStudent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.studentDetails = action.payload.student;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["loginStudent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get All Students
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllStudents"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllStudents"].fulfilled, (state, action)=>{
            state.loading = false;
            state.students = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllStudents"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get Student by ID
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getStudentById"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getStudentById"].fulfilled, (state, action)=>{
            state.loading = false;
            state.studentDetails = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getStudentById"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update Student
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateStudent"].pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateStudent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.students = state.students.map((student)=>student.registrationNumber === action.payload.registrationNumber ? action.payload : student);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateStudent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Delete Student
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteStudent"].pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteStudent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.students = state.students.filter((student)=>student.registrationNumber !== action.meta.arg);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteStudent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateMonthlyFees"].pending, (state)=>{
            state.loading = true;
            state.success = null;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateMonthlyFees"].fulfilled, (state, action)=>{
            state.loading = false;
            state.success = action.payload.message;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateMonthlyFees"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchMonthlyFees"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchMonthlyFees"].fulfilled, (state, action)=>{
            state.loading = false;
            state.fees = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchMonthlyFees"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteMonthlyPaymentsByStudent"].pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.success = '';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteMonthlyPaymentsByStudent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.success = action.payload.message;
            state.deletedCount = action.payload.deletedCount;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteMonthlyPaymentsByStudent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearStudentState, setStudent } = studentSlice.actions;
const __TURBOPACK__default__export__ = studentSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Utils/getTeacherId.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jwt-decode/build/esm/index.js [client] (ecmascript)");
;
const getTeacherId = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jwtDecode"])(token); // ✅ updated function name
            return decoded._id;
        } catch (err) {
            console.error('Invalid token', err);
            return null;
        }
    }
    return null;
};
const __TURBOPACK__default__export__ = getTeacherId;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/TeacherDashboard/AllStudent.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// pages/students/StudentList.jsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/StudentActions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/ClassActions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/SectionActions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$studentTableClass$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/studentTableClass.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/StudentSlice.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$getTeacherId$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/getTeacherId.js [client] (ecmascript)");
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
;
;
;
const StudentList = ()=>{
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { students } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "StudentList.useSelector": (state)=>state.student
    }["StudentList.useSelector"]);
    const { classes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "StudentList.useSelector": (state)=>state.class
    }["StudentList.useSelector"]);
    const { sections } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "StudentList.useSelector": (state)=>state.section
    }["StudentList.useSelector"]);
    const [selectedClassId, setSelectedClassId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedSectionId, setSelectedSectionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [teacherId, setTeacherId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    console.log("teacher id", teacherId);
    const filteredStudents = students.filter((student)=>{
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        const matchesSearch = searchTerm ? fullName.includes(searchTerm.toLowerCase()) : true;
        const matchesClass = selectedClassId ? student.currentSection?.classId?._id === selectedClassId : true;
        const matchesSection = selectedSectionId ? student.currentSection?._id === selectedSectionId : true;
        return matchesSearch && matchesClass && matchesSection;
    });
    const anyFilterApplied = searchTerm || selectedClassId || selectedSectionId;
    const filteredSections = selectedClassId ? sections.filter((sec)=>sec.classId._id === selectedClassId) : [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentList.useEffect": ()=>{
            const fetchTeacherId = {
                "StudentList.useEffect.fetchTeacherId": async ()=>{
                    const id = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$getTeacherId$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])();
                    console.log("Fetched teacher ID:", id);
                    setTeacherId(id);
                }
            }["StudentList.useEffect.fetchTeacherId"];
            fetchTeacherId();
        }
    }["StudentList.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentList.useEffect": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllStudents"])());
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchClasses"])());
        }
    }["StudentList.useEffect"], [
        dispatch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentList.useEffect": ()=>{
            if (selectedClassId) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSectionsByClassId"])(selectedClassId));
            }
        }
    }["StudentList.useEffect"], [
        dispatch,
        selectedClassId
    ]);
    const handleView = (student)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setStudent"])(student));
        router.push("/Dashboard/Student/StudentInfo/StudentDetail");
        console.log('View student:', student);
    // Open modal or navigate to detail page
    };
    const handleEdit = (student)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setStudent"])(student));
        router.push("/Dashboard/Student/UpdateStudent");
        console.log('Edit student:', student);
    // Open edit form
    };
    const handleDelete = (student)=>{
        console.log('Delete student:', student);
    // Confirm and delete
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 max-w-6xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold",
                        children: "All Students"
                    }, void 0, false, {
                        fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                        lineNumber: 91,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedClassId,
                                onChange: (e)=>{
                                    setSelectedClassId(e.target.value);
                                    setSelectedSectionId('');
                                },
                                className: "border p-2 rounded-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select Class"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                                        lineNumber: 101,
                                        columnNumber: 7
                                    }, this),
                                    classes.map((cls)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: cls._id,
                                            children: cls.className
                                        }, cls._id, false, {
                                            fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                                            lineNumber: 103,
                                            columnNumber: 9
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                                lineNumber: 93,
                                columnNumber: 5
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedSectionId,
                                onChange: (e)=>setSelectedSectionId(e.target.value),
                                className: "border p-2 rounded-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select Section"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                                        lineNumber: 112,
                                        columnNumber: 7
                                    }, this),
                                    filteredSections.map((sec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: sec._id,
                                            children: sec.sectionName
                                        }, sec._id, false, {
                                            fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                                            lineNumber: 114,
                                            columnNumber: 9
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                                lineNumber: 107,
                                columnNumber: 5
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search by name...",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value),
                                className: "border p-2 w-64 rounded-md"
                            }, void 0, false, {
                                fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                                lineNumber: 118,
                                columnNumber: 5
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                        lineNumber: 92,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                lineNumber: 90,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$studentTableClass$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                students: anyFilterApplied ? filteredStudents : students,
                teacherId: teacherId,
                onView: handleView,
                onEdit: handleEdit,
                onDelete: handleDelete
            }, void 0, false, {
                fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
                lineNumber: 130,
                columnNumber: 1
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/TeacherDashboard/AllStudent.js",
        lineNumber: 89,
        columnNumber: 5
    }, this);
};
_s(StudentList, "q9S1n0ry8sp3vhi479eyFP6nPDU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = StudentList;
const __TURBOPACK__default__export__ = StudentList;
var _c;
__turbopack_context__.k.register(_c, "StudentList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/TeacherDashboard/AllStudent.js [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/TeacherDashboard/AllStudent";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/TeacherDashboard/AllStudent.js [client] (ecmascript)");
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
"[project]/pages/TeacherDashboard/AllStudent.js (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/TeacherDashboard/AllStudent.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__db2fb85c._.js.map