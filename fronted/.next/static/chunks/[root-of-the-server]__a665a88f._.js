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
"[project]/components/SectionCard.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2d$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRoundPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round-plus.js [client] (ecmascript) <export default as UserRoundPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-plus.js [client] (ecmascript) <export default as BookPlus>");
;
;
const SectionCard = ({ section, onAddTeacher, onAddSubject, onUpdate, onDelete, onView })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white shadow rounded-xl p-4 flex flex-col justify-between gap-4 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold uppercase",
                                children: section.sectionName
                            }, void 0, false, {
                                fileName: "[project]/components/SectionCard.js",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Class Teacher:",
                                        section.classTeacher ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-800 font-medium",
                                                    children: section.classTeacher.firstName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SectionCard.js",
                                                    lineNumber: 22,
                                                    columnNumber: 7
                                                }, this),
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-800 font-medium",
                                                    children: section.classTeacher.lastName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SectionCard.js",
                                                    lineNumber: 23,
                                                    columnNumber: 7
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-800 font-medium",
                                            children: "Not Assigned"
                                        }, void 0, false, {
                                            fileName: "[project]/components/SectionCard.js",
                                            lineNumber: 26,
                                            columnNumber: 5
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SectionCard.js",
                                    lineNumber: 18,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/SectionCard.js",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SectionCard.js",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                        className: "text-blue-600 cursor-pointer hover:scale-110 transition-transform",
                        onClick: ()=>onView(section)
                    }, void 0, false, {
                        fileName: "[project]/components/SectionCard.js",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SectionCard.js",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-4 justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onAddTeacher(section),
                        className: "flex items-center gap-1 text-blue-600 hover:text-blue-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2d$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRoundPlus$3e$__["UserRoundPlus"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/SectionCard.js",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            section.classTeacher ? 'Change Class Teacher' : 'Add Class Teacher'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SectionCard.js",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onAddSubject(section),
                        className: "flex items-center gap-1 text-green-600 hover:text-green-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$plus$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookPlus$3e$__["BookPlus"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/SectionCard.js",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            "Add Subject"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SectionCard.js",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                        className: "text-yellow-600 cursor-pointer hover:scale-110 transition-transform",
                        onClick: ()=>onUpdate(section)
                    }, void 0, false, {
                        fileName: "[project]/components/SectionCard.js",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                        className: "text-red-600 cursor-pointer hover:scale-110 transition-transform",
                        onClick: ()=>onDelete(section._id)
                    }, void 0, false, {
                        fileName: "[project]/components/SectionCard.js",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SectionCard.js",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SectionCard.js",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
_c = SectionCard;
const __TURBOPACK__default__export__ = SectionCard;
var _c;
__turbopack_context__.k.register(_c, "SectionCard");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [client] (ecmascript)");
// redux/Actions/SectionActions.js
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/axiosInstance.js [client] (ecmascript)"); // Replace with your axios config path
;
;
const createSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/create', async ({ sectionName, classId }, { rejectWithValue })=>{
    try {
        console.log(sectionName, classId);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/section/addSection', {
            sectionName,
            classId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
;
;
const updateSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/update', async ({ id, classTeacher, subjects }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/section/${id}`, {
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
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/section/${sectionId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete section');
    }
});
const assignClassTeacher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/assignTeacher', async ({ sectionId, classTeacher }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].patch(`/section/assignTeacher/${sectionId}`, {
            classTeacher
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to assign teacher');
    }
});
const getSectionsByClassId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/getByClassId', async (classId, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/section/getAllSectionById/${classId}`);
        console.log("in action part ", response);
        console.log("res.data", response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const getSections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/getAll', async (classId = null, { rejectWithValue })=>{
    try {
        const query = classId ? `?classId=${classId}` : '';
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/section${query}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch sections');
    }
});
const assignSubjectToSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('section/assignSubject', async ({ sectionId, subjectId, teacherId }, { rejectWithValue })=>{
    try {
        console.log(" iam at assign subject", sectionId, subjectId, teacherId);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`/section/add/assignSubject/${sectionId}`, {
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
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/class/update-subject-teacher/${classId}`, {
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
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/class/remove-subject/${classId}`, {
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
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSection"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections = state.sections.map((section)=>section._id === action.payload.section._id ? action.payload.section : section);
            state.message = action.payload.message || 'Section updated';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
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
            state.sections = action.payload;
            ;
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
"[project]/pages/Dashboard/Section/SectionList.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SectionCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SectionCard.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/SectionActions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/sectionSlice.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const SectionList = ()=>{
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { sections = [], isLoading, isError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "SectionList.useSelector": (state)=>state.section
    }["SectionList.useSelector"]);
    const { selectedClass } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "SectionList.useSelector": (state)=>state.class
    }["SectionList.useSelector"]);
    // const [selectedSection, setSelectedSection] = useState(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SectionList.useEffect": ()=>{
            if (selectedClass && selectedClass._id) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["clearSection"])()); // clear selected section
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["clearSectionsList"])()); // clear previous section list
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSectionsByClassId"])(selectedClass._id)).then({
                    "SectionList.useEffect": (res)=>{
                        const result = res?.payload;
                        if (!result || result.length === 0) {
                            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["clearSectionsList"])()); // no sections returned
                        }
                    }
                }["SectionList.useEffect"]).catch({
                    "SectionList.useEffect": ()=>{
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["clearSectionsList"])()); // fetch error
                    }
                }["SectionList.useEffect"]);
            } else {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["clearSection"])());
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["clearSectionsList"])());
            }
        }
    }["SectionList.useEffect"], [
        dispatch,
        selectedClass
    ]);
    const handleAddTeacher = (section)=>{
        // e.g., open modal to assign teacher
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setSection"])(section));
        router.push("/Dashboard/Section/AddTeacher");
        console.log("Add teacher for:", section.sectionName);
    //router.push("/Dashboard/Section/ClassTeacher")
    };
    const handleView = (section)=>{
        // Navigate or open modal to show full section + subjects
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setSection"])(section));
        router.push("/Dashboard/Section/Info/Detail");
        console.log("View section:", section);
    };
    const handleAddSubject = (section)=>{
        // e.g., open modal to add subject
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setSection"])(section));
        router.push("/Dashboard/Section/AddSubject");
        console.log("Add subject to:", section.sectionName);
    };
    const handleUpdate = (sectionId, subjectId)=>{
        // e.g., open update form
        console.log("Update subject:", subjectId, "from section:", sectionId);
    };
    const handleDelete = (sectionId, subjectId)=>{
        // e.g., confirm & delete subject
        console.log("Delete subject:", subjectId, "from section:", sectionId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 sm:ml-64",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center flex-wrap mb-6 gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold",
                    children: [
                        "Total Sections: ",
                        sections.length
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/Dashboard/Section/SectionList.js",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/Dashboard/Section/SectionList.js",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/pages/Dashboard/Section/SectionList.js",
                lineNumber: 91,
                columnNumber: 21
            }, this),
            isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-500",
                children: isError
            }, void 0, false, {
                fileName: "[project]/pages/Dashboard/Section/SectionList.js",
                lineNumber: 92,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SectionCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        section: section,
                        onAddTeacher: handleAddTeacher,
                        onAddSubject: handleAddSubject,
                        onUpdate: handleUpdate,
                        onDelete: handleDelete,
                        onView: handleView
                    }, section._id, false, {
                        fileName: "[project]/pages/Dashboard/Section/SectionList.js",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/Dashboard/Section/SectionList.js",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/Dashboard/Section/SectionList.js",
        lineNumber: 85,
        columnNumber: 5
    }, this);
};
_s(SectionList, "7Ce3yyiCxSv9LPPogvZ6zqm60CM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = SectionList;
const __TURBOPACK__default__export__ = SectionList;
var _c;
__turbopack_context__.k.register(_c, "SectionList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/Dashboard/Section/SectionList.js [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/Dashboard/Section/SectionList";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/Dashboard/Section/SectionList.js [client] (ecmascript)");
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
"[project]/pages/Dashboard/Section/SectionList.js (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/Dashboard/Section/SectionList.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__a665a88f._.js.map