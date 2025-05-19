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
"[project]/components/Dashboard.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Dashboard({ children }) {
    _s();
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeMenu, setActiveMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [schoolStats, setSchoolStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        studentCount: 0,
        teacherCount: 0,
        classCount: 0,
        parentCount: 0
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    /* useEffect(() => {
    const fetchSchoolStats = async () => {
      try {
        const response = await fetch('/api/admin/school-stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch school statistics');
        }

        const data = await response.json();
        setSchoolStats(data);
      } catch (err) {
        setError('Failed to load school statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
    */ const menuItems = [
        {
            title: 'CLASS',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            submenu: [
                {
                    name: "ADD CLASS",
                    path: "/Dashboard/Class/AddClass"
                },
                {
                    name: "VIEW cLASS",
                    path: "/Dashboard/Class/ViewClass"
                },
                {
                    name: "VIEW ",
                    path: "/Dashboard/Student/ViewStudent"
                }
            ]
        },
        {
            title: 'Student Management',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            submenu: [
                {
                    name: "dashboard",
                    path: "/Dashboard"
                },
                {
                    name: "ADD STUDETN",
                    path: "/Dashboard/Student/AddStudent"
                },
                {
                    name: "STUDENT LIST",
                    path: "/Dashboard/Student/StudentList"
                },
                {
                    name: "VIEW STUDENT",
                    path: "/Dashboard/Student/ViewStudent"
                }
            ]
        },
        {
            title: 'TEACHER Management',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            submenu: [
                {
                    name: "TEACHER LIST",
                    path: "/Dashboard/Teacher/TeacherList"
                }
            ]
        },
        {
            title: 'SUBJECT Management',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            submenu: [
                {
                    name: "subject manage",
                    path: "/Dashboard/Subject/SubjectList"
                }
            ]
        },
        {
            title: 'Academic Tools',
            icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
            submenu: [
                'Course Schedule',
                'Assignments',
                'Resources',
                'Library'
            ]
        },
        {
            title: 'Administrative',
            icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
            submenu: [
                'Settings',
                'Reports',
                'User Management',
                'Logs'
            ]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-gradient-to-br from-blue-50 to-blue-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed md:static z-50 w-72 bg-white shadow-xl h-full transform transition-transform duration-150 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b bg-blue-600 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-white",
                                children: "School Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.js",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSidebarOpen(false),
                                className: "text-white hover:text-blue-200 focus:outline-none md:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-6 w-6",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.js",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.js",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.js",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Dashboard.js",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mt-4",
                        children: menuItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveMenu(activeMenu === index ? null : index),
                                        className: "w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-5 h-5 mr-3",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: item.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Dashboard.js",
                                                            lineNumber: 130,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.js",
                                                        lineNumber: 129,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Dashboard.js",
                                                        lineNumber: 132,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Dashboard.js",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: `w-4 h-4 transform transition-transform duration-200 ${activeMenu === index ? 'rotate-180' : ''}`,
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 9l-7 7-7-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Dashboard.js",
                                                    lineNumber: 140,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Dashboard.js",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Dashboard.js",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    activeMenu === index && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50 py-2",
                                        children: item.submenu.map((subItem, subIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>router.push(subItem.path),
                                                className: "block px-12 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-100",
                                                children: subItem.name
                                            }, subIndex, false, {
                                                fileName: "[project]/components/Dashboard.js",
                                                lineNumber: 146,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.js",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/components/Dashboard.js",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Dashboard.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Dashboard.js",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 overflow-auto ${!isSidebarOpen ? 'md:ml-0' : 'md:ml-22'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-white shadow-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-6 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsSidebarOpen(!isSidebarOpen),
                                    className: "text-gray-500 hover:text-blue-600 focus:outline-none md:hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-6 w-6",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M4 6h16M4 12h16M4 18h16"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Dashboard.js",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Dashboard.js",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.js",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xl font-semibold text-gray-800",
                                    children: "Welcome Back, Admin"
                                }, void 0, false, {
                                    fileName: "[project]/components/Dashboard.js",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Dashboard.js",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Dashboard.js",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto mt-16 md:mt-0 p-4 z-10 relative",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/Dashboard.js",
                        lineNumber: 178,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Dashboard.js",
                lineNumber: 163,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Dashboard.js",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "Q12oYLFk/PUixNkiMhTFLZ9z85c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Dashboard;
const __TURBOPACK__default__export__ = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/layouts/DashboardLayout.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DashboardLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Dashboard$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Dashboard.js [client] (ecmascript)");
;
;
function DashboardLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Dashboard$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/layouts/DashboardLayout.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
_c = DashboardLayout;
var _c;
__turbopack_context__.k.register(_c, "DashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
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
    baseURL: 'http://localhost:8081/api'
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
"[project]/redux/Actions/School/SchoolActions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "loginSchool": (()=>loginSchool)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
;
;
const loginSchool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('school', async (formData, { rejectWithValue })=>{
    try {
        console.log(formData); // ✅ correct
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post("/school/login", formData);
        console.log(res);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('token', res.data.token);
        //  localStorage.setItem('schoolInfo', JSON.stringify(res.data.school));
        }
        return res.data; // returned as action.payload automatically
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Slices/schoolSlice.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "logoutSchool": (()=>logoutSchool)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/School/SchoolActions.js [client] (ecmascript)");
;
;
const schoolSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'school',
    initialState: {
        schoolInfo: null,
        loading: false,
        logined: false,
        error: null
    },
    reducers: {
        logoutSchool: (state)=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('token');
                localStorage.removeItem('schoolInfo');
            }
            state.schoolInfo = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["loginSchool"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["loginSchool"].fulfilled, (state, action)=>{
            state.loading = false;
            state.logined = true;
            state.schoolInfo = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["loginSchool"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { logoutSchool } = schoolSlice.actions;
const __TURBOPACK__default__export__ = schoolSlice.reducer;
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
        console.log("this is response", res);
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
"[project]/redux/Slices/classSlice.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "setClass": (()=>setClass)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/ClassActions.js [client] (ecmascript)");
;
;
const classSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'class',
    initialState: {
        loading: false,
        success: false,
        selectedClass: null,
        error: null,
        createdClass: null,
        classes: []
    },
    reducers: {
        setClass: (state, action)=>{
            state.selectedClass = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder// Create Class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createClass"].pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createClass"].fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.createdClass = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createClass"].rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })// Fetch all classes
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchClasses"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchClasses"].fulfilled, (state, action)=>{
            state.loading = false;
            state.classes = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchClasses"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Fetch single class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchClassById"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchClassById"].fulfilled, (state, action)=>{
            state.loading = false;
            state.selectedClass = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fetchClassById"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateClass"].fulfilled, (state, action)=>{
            const index = state.classes.findIndex((c)=>c._id === action.payload._id);
            if (index !== -1) {
                state.classes[index] = action.payload;
            }
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateClass"].rejected, (state, action)=>{
            state.error = action.payload;
        })// Delete class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteClass"].fulfilled, (state, action)=>{
            state.classes = state.classes.filter((c)=>c._id !== action.payload);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteClass"].rejected, (state, action)=>{
            state.error = action.payload;
        });
    }
});
const { setClass } = classSlice.actions;
const __TURBOPACK__default__export__ = classSlice.reducer;
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
"[project]/utils/axiosInstance.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: 'http://localhost:8081/api'
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/axiosInstance.js [client] (ecmascript)");
;
;
const createTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/teacher/addTeacher', formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
;
;
const loginTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/login', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/teacher/login', formData);
        // ✅ Store token and teacher info in localStorage (if in browser)
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('teacherToken', res.data.token);
            localStorage.setItem('teacherInfo', JSON.stringify(res.data.teacher));
        }
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getAllTeachers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/getAll', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/teacher/getAllTeacher');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch teachers');
    }
});
const getTeacherById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/getById', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/teacher/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Teacher not found');
    }
});
const updateTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/update', async ({ id, formData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/teacher/updateTeacher/${id}`, formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
});
const deleteTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/delete', async (id, { rejectWithValue, dispatch })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/teacher/${id}`);
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
"[project]/redux/Slices/TeacherSlice.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearStatus": (()=>clearStatus),
    "clearTeacher": (()=>clearTeacher),
    "default": (()=>__TURBOPACK__default__export__),
    "setTeacher": (()=>setTeacher)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/TeacherActions.js [client] (ecmascript)");
;
;
const initialState = {
    teachers: [],
    teacher: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: ''
};
const teacherSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'teacher',
    initialState,
    reducers: {
        clearStatus: (state)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = '';
            state.successMessage = '';
        },
        clearTeacher: (state)=>{
            state.teacher = null;
        },
        setTeacher: (state, action)=>{
            state.teacher = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder// CREATE TEACHER
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createTeacher"].pending, (state)=>{
            state.isLoading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createTeacher"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.successMessage = 'Teacher created successfully';
            state.teachers.push(action.payload.savedTeacher);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createTeacher"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })// GET ALL TEACHERS
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllTeachers"].pending, (state)=>{
            state.isLoading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllTeachers"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.teachers = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllTeachers"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })// GET TEACHER BY ID
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getTeacherById"].pending, (state)=>{
            state.isLoading = true;
            state.teacher = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getTeacherById"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.teacher = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getTeacherById"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })// UPDATE TEACHER
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateTeacher"].pending, (state)=>{
            state.isLoading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateTeacher"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.successMessage = 'Teacher updated successfully';
            state.teachers = state.teachers.map((t)=>t._id === action.payload._id ? action.payload : t);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateTeacher"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })// DELETE TEACHER
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteTeacher"].pending, (state)=>{
            state.isLoading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteTeacher"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.successMessage = 'Teacher deleted successfully';
            state.teachers = state.teachers.filter((t)=>t._id !== action.payload.id);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteTeacher"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });
    }
});
const { clearStatus, clearTeacher, setTeacher } = teacherSlice.actions;
const __TURBOPACK__default__export__ = teacherSlice.reducer;
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
"[project]/redux/Slices/SubjectSlice.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// subjectSlice.js
__turbopack_context__.s({
    "clearSubjectMessages": (()=>clearSubjectMessages),
    "default": (()=>__TURBOPACK__default__export__),
    "setSubject": (()=>setSubject)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/SubjectActions.js [client] (ecmascript)");
;
;
const subjectSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'subject',
    initialState: {
        subjects: [],
        subject: null,
        subject: null,
        loading: false,
        error: null,
        successMessage: null
    },
    reducers: {
        clearSubjectMessages: (state)=>{
            state.error = null;
            state.successMessage = null;
        },
        setSubject: (state, action)=>{
            state.subject = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder// CREATE
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createSubject"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createSubject"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subjects.push(action.payload);
            state.successMessage = 'Subject created successfully';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createSubject"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// GET ALL
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllSubjects"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllSubjects"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subjects = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAllSubjects"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// GET BY ID
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSubjectById"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSubjectById"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subject = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSubjectById"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// UPDATE
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSubject"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSubject"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subjects = state.subjects.map((subj)=>subj._id === action.payload._id ? action.payload : subj);
            state.successMessage = 'Subject updated successfully';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSubject"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// DELETE
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteSubject"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteSubject"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subjects = state.subjects.filter((s)=>s._id !== action.payload.id);
            state.successMessage = action.payload.message;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteSubject"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearSubjectMessages, setSubject } = subjectSlice.actions;
const __TURBOPACK__default__export__ = subjectSlice.reducer;
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
    "deleteStudent": (()=>deleteStudent),
    "getAllStudents": (()=>getAllStudents),
    "getStudentById": (()=>getStudentById),
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
        console.log("i am at updated student", updatedData);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/student/updatedStudent/${id}`, updatedData); // your route: PUT /students/:studentId
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to update student');
    }
});
const deleteStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/deleteStudent', async (studentId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/students/${studentId}`); // your route: DELETE /students/:studentId
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to delete student');
    }
});
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
    loading: false,
    error: null,
    success: false
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
        });
    }
});
const { clearStudentState, setStudent } = studentSlice.actions;
const __TURBOPACK__default__export__ = studentSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Actions/ParentActions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createParent": (()=>createParent),
    "deleteParent": (()=>deleteParent),
    "getParentByCode": (()=>getParentByCode),
    "getParentById": (()=>getParentById),
    "getParentsBySchool": (()=>getParentsBySchool),
    "updateParent": (()=>updateParent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)"); // adjust path if needed
;
;
const createParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/parent/addParent', formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getParentsBySchool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/getBySchool', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/parent/school');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getParentById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/getById', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/parent/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getParentByCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/getByCode', async (code, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/parent/code/${code}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const updateParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/update', async ({ id, formData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/parent/update/${id}`, formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const deleteParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/delete', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/parent/delete/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Slices/ParentSlice.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearParentState": (()=>clearParentState),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/ParentActions.js [client] (ecmascript)");
;
;
const initialState = {
    parents: [],
    parent: null,
    loading: false,
    error: null,
    message: null
};
const parentSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'parent',
    initialState,
    reducers: {
        clearParentState: (state)=>{
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder)=>{
        // Create Parent
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createParent"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createParent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.parents.push(action.payload);
            state.message = 'Parent created successfully';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createParent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Get Parents by School
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentsBySchool"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentsBySchool"].fulfilled, (state, action)=>{
            state.loading = false;
            state.parents = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentsBySchool"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Get Parent by ID
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentById"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentById"].fulfilled, (state, action)=>{
            state.loading = false;
            state.parent = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentById"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Get Parent by Code
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentByCode"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentByCode"].fulfilled, (state, action)=>{
            state.loading = false;
            state.parent = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getParentByCode"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Update Parent
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateParent"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateParent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = 'Parent updated successfully';
            state.parent = action.payload;
        // Optionally update parent in parents array
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateParent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Delete Parent
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteParent"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteParent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = 'Parent deleted successfully';
            state.parents = state.parents.filter((p)=>p._id !== action.payload._id);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["deleteParent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearParentState } = parentSlice.actions;
const __TURBOPACK__default__export__ = parentSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/redux/Store.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "persistor": (()=>persistor),
    "store": (()=>store)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/persistStore.js [client] (ecmascript) <export default as persistStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/persistReducer.js [client] (ecmascript) <export default as persistReducer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/constants.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/lib/storage/index.js [client] (ecmascript)"); // defaults to localStorage
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux/dist/redux.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$schoolSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/schoolSlice.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$classSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/classSlice.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/sectionSlice.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$TeacherSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/TeacherSlice.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$SubjectSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/SubjectSlice.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/StudentSlice.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$ParentSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/ParentSlice.js [client] (ecmascript)");
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
;
const rootReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["combineReducers"])({
    schoolLogin: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$schoolSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
    class: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$classSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
    section: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
    teacher: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$TeacherSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
    subject: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$SubjectSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
    student: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
    parent: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$ParentSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
});
const persistConfig = {
    key: 'root',
    version: 1,
    storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
};
const persistedReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__["persistReducer"])(persistConfig, rootReducer);
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FLUSH"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["REHYDRATE"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PAUSE"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PERSIST"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PURGE"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["REGISTER"]
                ]
            }
        })
});
const persistor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__["persistStore"])(store); /*const store = configureStore({
  reducer: {
    schoolLogin: schoolReducer,
    class:classReducer,
    section:sectionReducer,
    teacher:teacherReducer,
    subject:subjectReducer,
    student:studentReducer,
    parent:parentReducer

  }
});

export default store;*/ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/_app.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>App)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$layouts$2f$DashboardLayout$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/layouts/DashboardLayout.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Store$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Store.js [client] (ecmascript)"); // FIXED: import persistor
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/integration/react.js [client] (ecmascript)"); // NEW: import PersistGate
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$notistack$2f$notistack$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/notistack/notistack.esm.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function App({ Component, pageProps }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Check if the current page needs Dashboard Layout
    const isDashboardRoute = router.pathname.startsWith("/Dashboard"); // small d not D
    const getLayout = Component.getLayout || ((page)=>page);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Store$2e$js__$5b$client$5d$__$28$ecmascript$29$__["store"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PersistGate"], {
            loading: null,
            persistor: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Store$2e$js__$5b$client$5d$__$28$ecmascript$29$__["persistor"],
            children: [
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$notistack$2f$notistack$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SnackbarProvider"], {
                    maxSnack: 3,
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    children: isDashboardRoute ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$layouts$2f$DashboardLayout$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        children: getLayout(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
                            ...pageProps
                        }, void 0, false, {
                            fileName: "[project]/pages/_app.js",
                            lineNumber: 27,
                            columnNumber: 22
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this) : getLayout(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
                        ...pageProps
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 30,
                        columnNumber: 19
                    }, this))
                }, void 0, false, {
                    fileName: "[project]/pages/_app.js",
                    lineNumber: 20,
                    columnNumber: 8
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/_app.js",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/_app.js",
        lineNumber: 18,
        columnNumber: 5
    }, this);
} /*import "@/styles/globals.css";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import TeacherDashboardLayout from "@/layouts/TeacherDashboardLayout";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const pathname = router.pathname.toLowerCase(); // safer lowercase

  let Layout = (page) => page; // default

  if (pathname.startsWith("/dashboard")) {
    Layout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  } else if (pathname.startsWith("/teacher-dashboard")) {
    Layout = (page) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;
  }

  const getLayout = Component.getLayout || Layout;

  return getLayout(<Component {...pageProps} />);
}
---->
*/ 
_s(App, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/_app.js [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/_app";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/_app.js [client] (ecmascript)");
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
"[project]/pages/_app (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/_app.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__675c5883._.js.map