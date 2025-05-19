module.exports = {

"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}}),
"[externals]/react [external] (react, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}}),
"[externals]/react-dom [external] (react-dom, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/components/Dashboard.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
function Dashboard({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [activeMenu, setActiveMenu] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [schoolStats, setSchoolStats] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        studentCount: 0,
        teacherCount: 0,
        classCount: 0,
        parentCount: 0
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-gradient-to-br from-blue-50 to-blue-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `fixed md:static z-50 w-72 bg-white shadow-xl h-full transform transition-transform duration-150 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b bg-blue-600 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-white",
                                children: "School Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/components/Dashboard.js",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSidebarOpen(false),
                                className: "text-white hover:text-blue-200 focus:outline-none md:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                    className: "h-6 w-6",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                        className: "mt-4",
                        children: menuItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveMenu(activeMenu === index ? null : index),
                                        className: "w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                        className: "w-5 h-5 mr-3",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                className: `w-4 h-4 transform transition-transform duration-200 ${activeMenu === index ? 'rotate-180' : ''}`,
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
                                    activeMenu === index && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50 py-2",
                                        children: item.submenu.map((subItem, subIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `flex-1 overflow-auto ${!isSidebarOpen ? 'md:ml-0' : 'md:ml-22'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: "bg-white shadow-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-6 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsSidebarOpen(!isSidebarOpen),
                                    className: "text-gray-500 hover:text-blue-600 focus:outline-none md:hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                        className: "h-6 w-6",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
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
const __TURBOPACK__default__export__ = Dashboard;
}}),
"[project]/layouts/DashboardLayout.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DashboardLayout)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Dashboard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Dashboard.js [ssr] (ecmascript)");
;
;
function DashboardLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Dashboard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/layouts/DashboardLayout.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
}}),
"[externals]/react-redux [external] (react-redux, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("react-redux");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@reduxjs/toolkit");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/redux-persist [external] (redux-persist, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("redux-persist", () => require("redux-persist"));

module.exports = mod;
}}),
"[externals]/redux [external] (redux, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("redux");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/axios [external] (axios, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("axios");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Utils/axiosInstance.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
const axiosInstance = __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].create({
    baseURL: 'http://localhost:8081/api'
});
// Automatically attach token
axiosInstance.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return config;
}, (error)=>Promise.reject(error));
const __TURBOPACK__default__export__ = axiosInstance;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Actions/School/SchoolActions.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "loginSchool": (()=>loginSchool)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const loginSchool = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('school', async (formData, { rejectWithValue })=>{
    try {
        console.log(formData); // ✅ correct
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post("/school/login", formData);
        console.log(res);
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        //  localStorage.setItem('schoolInfo', JSON.stringify(res.data.school));
        }
        return res.data; // returned as action.payload automatically
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Slices/schoolSlice.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "logoutSchool": (()=>logoutSchool)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/School/SchoolActions.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const schoolSlice = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createSlice"])({
    name: 'school',
    initialState: {
        schoolInfo: null,
        loading: false,
        logined: false,
        error: null
    },
    reducers: {
        logoutSchool: (state)=>{
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            state.schoolInfo = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["loginSchool"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["loginSchool"].fulfilled, (state, action)=>{
            state.loading = false;
            state.logined = true;
            state.schoolInfo = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$School$2f$SchoolActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["loginSchool"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { logoutSchool } = schoolSlice.actions;
const __TURBOPACK__default__export__ = schoolSlice.reducer;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Actions/ClassActions.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "createClass": (()=>createClass),
    "deleteClass": (()=>deleteClass),
    "fetchClassById": (()=>fetchClassById),
    "fetchClasses": (()=>fetchClasses),
    "updateClass": (()=>updateClass)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [ssr] (ecmascript)"); // your axios setup
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const createClass = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('class/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/class/addClass', formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const fetchClasses = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('class/fetchAll', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/class/getAllClass'); // adjust endpoint if needed
        console.log("this is response", res);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const fetchClassById = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('class/fetchById', async (classId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/class/${classId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const updateClass = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('class/update', async ({ classId, formData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/class/${classId}`, formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const deleteClass = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('class/delete', async (classId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/class/${classId}`);
        return classId; // return ID to remove from local state
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Slices/classSlice.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "setClass": (()=>setClass)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/ClassActions.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const classSlice = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createSlice"])({
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
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createClass"].pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createClass"].fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.createdClass = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createClass"].rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })// Fetch all classes
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchClasses"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchClasses"].fulfilled, (state, action)=>{
            state.loading = false;
            state.classes = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchClasses"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Fetch single class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchClassById"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchClassById"].fulfilled, (state, action)=>{
            state.loading = false;
            state.selectedClass = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchClassById"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateClass"].fulfilled, (state, action)=>{
            const index = state.classes.findIndex((c)=>c._id === action.payload._id);
            if (index !== -1) {
                state.classes[index] = action.payload;
            }
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateClass"].rejected, (state, action)=>{
            state.error = action.payload;
        })// Delete class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteClass"].fulfilled, (state, action)=>{
            state.classes = state.classes.filter((c)=>c._id !== action.payload);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ClassActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteClass"].rejected, (state, action)=>{
            state.error = action.payload;
        });
    }
});
const { setClass } = classSlice.actions;
const __TURBOPACK__default__export__ = classSlice.reducer;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Actions/SectionActions.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
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
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const createSection = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('section/create', async ({ sectionName, classId }, { rejectWithValue })=>{
    try {
        console.log(sectionName, classId);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/section/addSection', {
            sectionName,
            classId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const updateSection = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('section/update', async ({ id, classTeacher, subjects }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/section/updateSection/${id}`, {
            classTeacher,
            subjects
        });
        console.log("i am action of section controller", res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update section');
    }
});
const deleteSection = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('section/delete', async (sectionId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/section/${sectionId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete section');
    }
});
const assignClassTeacher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('section/assignTeacher', async ({ sectionId, classTeacher }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/section/assignTeacher/${sectionId}`, {
            classTeacher
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to assign teacher');
    }
});
const getSectionsByClassId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('section/getByClassId', async (classId, { rejectWithValue })=>{
    try {
        console.log("i am get by classId", classId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/section/getAllSectionById/${classId}`);
        console.log("in action part of get section by classid ", response);
        console.log("res.data", response.data);
        const cleanedData = response.data.filter((item)=>item !== null && typeof item === 'object');
        return cleanedData;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});
const getSections = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('section/getAll', async (classId = null, { rejectWithValue })=>{
    try {
        const query = classId ? `?classId=${classId}` : '';
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/section${query}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch sections');
    }
});
const assignSubjectToSection = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('section/assignSubject', async ({ sectionId, subjectId, teacherId }, { rejectWithValue })=>{
    try {
        console.log(" iam at assign subject", sectionId, subjectId, teacherId);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post(`/section/add/assignSubject/${sectionId}`, {
            subjectId,
            teacherId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to assign subject');
    }
});
const updateSubjectTeacherInClass = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('class/updateSubjectTeacher', async ({ classId, subjectId, newTeacherId }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/class/update-subject-teacher/${classId}`, {
            subjectId,
            newTeacherId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update subject teacher');
    }
});
const removeSubjectFromClass = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('class/removeSubject', async ({ classId, subjectId }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/class/remove-subject/${classId}`, {
            subjectId
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to remove subject');
    }
}); // redux/Actions/SectionActions.js
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Slices/sectionSlice.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "clearSection": (()=>clearSection),
    "clearSectionMessage": (()=>clearSectionMessage),
    "clearSectionsList": (()=>clearSectionsList),
    "default": (()=>__TURBOPACK__default__export__),
    "setSection": (()=>setSection)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/SectionActions.js [ssr] (ecmascript)"); // adjust path if needed
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const sectionSlice = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createSlice"])({
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
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createSection"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createSection"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections.push(action.payload.section);
            state.message = action.payload.message || 'Section created';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update Section
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSection"].pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSection"].fulfilled, (state, action)=>{
            state.loading = false;
            // Update the section inside the sections list
            state.sections = state.sections.map((section)=>section._id === action.payload._id ? action.payload : section);
            // Also update the current selected section if needed
            if (state.section && state.section._id === action.payload._id) {
                state.section = action.payload;
            }
            state.message = "Section updated successfully.";
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to update section.";
        })// Delete Section
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteSection"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteSection"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections = state.sections.filter((section)=>section._id !== action.payload.sectionId);
            state.message = action.payload.message || 'Section deleted';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Assign Class Teacher
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["assignClassTeacher"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["assignClassTeacher"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections = state.sections.map((section)=>section._id === action.payload.section._id ? action.payload.section : section);
            state.message = action.payload.message || 'Class teacher assigned';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["assignClassTeacher"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get Sections by Class ID
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSectionsByClassId"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSectionsByClassId"].fulfilled, (state, action)=>{
            state.loading = false;
            console.log("action  payload ", action.payload);
            state.sections = action.payload.filter((item)=>item !== null);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSectionsByClassId"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get All Sections
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSections"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSections"].fulfilled, (state, action)=>{
            state.loading = false;
            state.sections = action.payload.sections;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSections"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Assign Subject to Class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["assignSubjectToSection"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["assignSubjectToSection"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = action.payload.message || 'Subject assigned';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["assignSubjectToSection"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update Subject Teacher in Class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSubjectTeacherInClass"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSubjectTeacherInClass"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = action.payload.message || 'Subject teacher updated';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSubjectTeacherInClass"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Remove Subject from Class
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["removeSubjectFromClass"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["removeSubjectFromClass"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = action.payload.message || 'Subject removed';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SectionActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["removeSubjectFromClass"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearSectionMessage, setSection, clearSection, clearSectionsList } = sectionSlice.actions;
const __TURBOPACK__default__export__ = sectionSlice.reducer;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/utils/axiosInstance.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
const axiosInstance = __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].create({
    baseURL: 'http://localhost:8081/api'
});
// Automatically attach token
axiosInstance.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return config;
}, (error)=>Promise.reject(error));
const __TURBOPACK__default__export__ = axiosInstance;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Actions/TeacherActions.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "createTeacher": (()=>createTeacher),
    "deleteTeacher": (()=>deleteTeacher),
    "getAllTeachers": (()=>getAllTeachers),
    "getTeacherById": (()=>getTeacherById),
    "loginTeacher": (()=>loginTeacher),
    "updateTeacher": (()=>updateTeacher)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/axiosInstance.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const createTeacher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('teacher/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/teacher/addTeacher', formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
;
;
const loginTeacher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('teacher/login', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/teacher/login', formData);
        // ✅ Store token and teacher info in localStorage (if in browser)
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getAllTeachers = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('teacher/getAll', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/teacher/getAllTeacher');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch teachers');
    }
});
const getTeacherById = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('teacher/getById', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/teacher/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Teacher not found');
    }
});
const updateTeacher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('teacher/update', async ({ id, formData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/teacher/updateTeacher/${id}`, formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
});
const deleteTeacher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('teacher/delete', async (id, { rejectWithValue, dispatch })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/teacher/${id}`);
        dispatch(getAllTeachers()); // Refresh list after delete
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Slices/TeacherSlice.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "clearStatus": (()=>clearStatus),
    "clearTeacher": (()=>clearTeacher),
    "default": (()=>__TURBOPACK__default__export__),
    "setTeacher": (()=>setTeacher)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/TeacherActions.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
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
const teacherSlice = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createSlice"])({
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
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createTeacher"].pending, (state)=>{
            state.isLoading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createTeacher"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.successMessage = 'Teacher created successfully';
            state.teachers.push(action.payload.savedTeacher);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createTeacher"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })// GET ALL TEACHERS
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllTeachers"].pending, (state)=>{
            state.isLoading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllTeachers"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.teachers = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllTeachers"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })// GET TEACHER BY ID
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getTeacherById"].pending, (state)=>{
            state.isLoading = true;
            state.teacher = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getTeacherById"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.teacher = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getTeacherById"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })// UPDATE TEACHER
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateTeacher"].pending, (state)=>{
            state.isLoading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateTeacher"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.successMessage = 'Teacher updated successfully';
            state.teachers = state.teachers.map((t)=>t._id === action.payload._id ? action.payload : t);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateTeacher"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })// DELETE TEACHER
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteTeacher"].pending, (state)=>{
            state.isLoading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteTeacher"].fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.successMessage = 'Teacher deleted successfully';
            state.teachers = state.teachers.filter((t)=>t._id !== action.payload.id);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$TeacherActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteTeacher"].rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });
    }
});
const { clearStatus, clearTeacher, setTeacher } = teacherSlice.actions;
const __TURBOPACK__default__export__ = teacherSlice.reducer;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Actions/SubjectActions.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
// subjectThunks.js
__turbopack_context__.s({
    "createSubject": (()=>createSubject),
    "deleteSubject": (()=>deleteSubject),
    "getAllSubjects": (()=>getAllSubjects),
    "getSubjectById": (()=>getSubjectById),
    "updateSubject": (()=>updateSubject)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const createSubject = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('subject/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/subject/addSubject', formData); // adjust endpoint if needed
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create subject');
    }
});
const getAllSubjects = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('subject/getAll', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/subject/getAllSubject');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch subjects');
    }
});
const getSubjectById = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('subject/getById', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/subject/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch subject');
    }
});
const updateSubject = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('subject/update', async ({ id, updatedData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/subject/updateSubject/${id}`, updatedData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update subject');
    }
});
const deleteSubject = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('subject/delete', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/subject/${id}`);
        return {
            id,
            message: res.data.message
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete subject');
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Slices/SubjectSlice.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
// subjectSlice.js
__turbopack_context__.s({
    "clearSubjectMessages": (()=>clearSubjectMessages),
    "default": (()=>__TURBOPACK__default__export__),
    "setSubject": (()=>setSubject)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/SubjectActions.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const subjectSlice = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createSlice"])({
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
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createSubject"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createSubject"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subjects.push(action.payload);
            state.successMessage = 'Subject created successfully';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createSubject"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// GET ALL
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllSubjects"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllSubjects"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subjects = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllSubjects"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// GET BY ID
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSubjectById"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSubjectById"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subject = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getSubjectById"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// UPDATE
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSubject"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSubject"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subjects = state.subjects.map((subj)=>subj._id === action.payload._id ? action.payload : subj);
            state.successMessage = 'Subject updated successfully';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateSubject"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// DELETE
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteSubject"].pending, (state)=>{
            state.loading = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteSubject"].fulfilled, (state, action)=>{
            state.loading = false;
            state.subjects = state.subjects.filter((s)=>s._id !== action.payload.id);
            state.successMessage = action.payload.message;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$SubjectActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteSubject"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearSubjectMessages, setSubject } = subjectSlice.actions;
const __TURBOPACK__default__export__ = subjectSlice.reducer;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Actions/StudentActions.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "createStudent": (()=>createStudent),
    "deleteStudent": (()=>deleteStudent),
    "getAllStudents": (()=>getAllStudents),
    "getStudentById": (()=>getStudentById),
    "updateStudent": (()=>updateStudent)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [ssr] (ecmascript)"); // Update path based on your project
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const createStudent = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('student/createStudent', async (studentData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/student/addStudent', studentData); // your route: POST /students
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to create student');
    }
});
const getAllStudents = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('student/getAllStudents', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/student/getAllStudent'); // your route: GET /students
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch students');
    }
});
const getStudentById = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('student/getStudentById', async (studentId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/students/${studentId}`); // your route: GET /students/:studentId
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch student');
    }
});
const updateStudent = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('student/updateStudent', async ({ id, updatedData }, { rejectWithValue })=>{
    try {
        console.log("i am at updated student", updatedData);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/student/updatedStudent/${id}`, updatedData); // your route: PUT /students/:studentId
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to update student');
    }
});
const deleteStudent = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('student/deleteStudent', async (studentId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/students/${studentId}`); // your route: DELETE /students/:studentId
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to delete student');
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Slices/StudentSlice.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "clearStudentState": (()=>clearStudentState),
    "default": (()=>__TURBOPACK__default__export__),
    "setStudent": (()=>setStudent)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/StudentActions.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const initialState = {
    students: [],
    studentDetails: null,
    loading: false,
    error: null,
    success: false
};
const studentSlice = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createSlice"])({
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
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createStudent"].pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createStudent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.students.push(action.payload);
            state.success = true;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createStudent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get All Students
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllStudents"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllStudents"].fulfilled, (state, action)=>{
            state.loading = false;
            state.students = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllStudents"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Get Student by ID
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getStudentById"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getStudentById"].fulfilled, (state, action)=>{
            state.loading = false;
            state.studentDetails = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getStudentById"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Update Student
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateStudent"].pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateStudent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.students = state.students.map((student)=>student.registrationNumber === action.payload.registrationNumber ? action.payload : student);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateStudent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })// Delete Student
        .addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteStudent"].pending, (state)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteStudent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.students = state.students.filter((student)=>student.registrationNumber !== action.meta.arg);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$StudentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteStudent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearStudentState, setStudent } = studentSlice.actions;
const __TURBOPACK__default__export__ = studentSlice.reducer;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Actions/ParentActions.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "createParent": (()=>createParent),
    "deleteParent": (()=>deleteParent),
    "getParentByCode": (()=>getParentByCode),
    "getParentById": (()=>getParentById),
    "getParentsBySchool": (()=>getParentsBySchool),
    "updateParent": (()=>updateParent)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Utils/axiosInstance.js [ssr] (ecmascript)"); // adjust path if needed
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const createParent = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('parent/create', async (formData, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/parent/addParent', formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getParentsBySchool = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('parent/getBySchool', async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/parent/school');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getParentById = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('parent/getById', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/parent/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const getParentByCode = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('parent/getByCode', async (code, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/parent/code/${code}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const updateParent = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('parent/update', async ({ id, formData }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/parent/update/${id}`, formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
const deleteParent = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createAsyncThunk"])('parent/delete', async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$Utils$2f$axiosInstance$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/parent/delete/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Slices/ParentSlice.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "clearParentState": (()=>clearParentState),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Actions/ParentActions.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const initialState = {
    parents: [],
    parent: null,
    loading: false,
    error: null,
    message: null
};
const parentSlice = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["createSlice"])({
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
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createParent"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createParent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.parents.push(action.payload);
            state.message = 'Parent created successfully';
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["createParent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Get Parents by School
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentsBySchool"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentsBySchool"].fulfilled, (state, action)=>{
            state.loading = false;
            state.parents = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentsBySchool"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Get Parent by ID
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentById"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentById"].fulfilled, (state, action)=>{
            state.loading = false;
            state.parent = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentById"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Get Parent by Code
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentByCode"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentByCode"].fulfilled, (state, action)=>{
            state.loading = false;
            state.parent = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getParentByCode"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Update Parent
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateParent"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateParent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = 'Parent updated successfully';
            state.parent = action.payload;
        // Optionally update parent in parents array
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["updateParent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        // Delete Parent
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteParent"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteParent"].fulfilled, (state, action)=>{
            state.loading = false;
            state.message = 'Parent deleted successfully';
            state.parents = state.parents.filter((p)=>p._id !== action.payload._id);
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Actions$2f$ParentActions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["deleteParent"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const { clearParentState } = parentSlice.actions;
const __TURBOPACK__default__export__ = parentSlice.reducer;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/redux/Store.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "persistor": (()=>persistor),
    "store": (()=>store)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@reduxjs/toolkit [external] (@reduxjs/toolkit, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/redux-persist [external] (redux-persist, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/lib/storage/index.js [ssr] (ecmascript)"); // defaults to localStorage
var __TURBOPACK__imported__module__$5b$externals$5d2f$redux__$5b$external$5d$__$28$redux$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/redux [external] (redux, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$schoolSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/schoolSlice.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$classSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/classSlice.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/sectionSlice.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$TeacherSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/TeacherSlice.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$SubjectSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/SubjectSlice.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/StudentSlice.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$ParentSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Slices/ParentSlice.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$redux__$5b$external$5d$__$28$redux$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$schoolSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$classSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$TeacherSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$SubjectSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$ParentSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$redux__$5b$external$5d$__$28$redux$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$schoolSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$classSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$TeacherSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$SubjectSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$ParentSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
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
const rootReducer = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$redux__$5b$external$5d$__$28$redux$2c$__esm_import$29$__["combineReducers"])({
    schoolLogin: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$schoolSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
    class: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$classSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
    section: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$sectionSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
    teacher: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$TeacherSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
    subject: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$SubjectSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
    student: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$StudentSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
    parent: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Slices$2f$ParentSlice$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]
});
const persistConfig = {
    key: 'root',
    version: 1,
    storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]
};
const persistedReducer = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__["persistReducer"])(persistConfig, rootReducer);
const store = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$reduxjs$2f$toolkit__$5b$external$5d$__$2840$reduxjs$2f$toolkit$2c$__esm_import$29$__["configureStore"])({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__["FLUSH"],
                    __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__["REHYDRATE"],
                    __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__["PAUSE"],
                    __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__["PERSIST"],
                    __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__["PURGE"],
                    __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__["REGISTER"]
                ]
            }
        })
});
const persistor = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist__$5b$external$5d$__$28$redux$2d$persist$2c$__cjs$29$__["persistStore"])(store); /*const store = configureStore({
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/redux-persist/integration/react [external] (redux-persist/integration/react, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("redux-persist/integration/react", () => require("redux-persist/integration/react"));

module.exports = mod;
}}),
"[externals]/notistack [external] (notistack, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("notistack", () => require("notistack"));

module.exports = mod;
}}),
"[project]/pages/_app.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>App)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$layouts$2f$DashboardLayout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/layouts/DashboardLayout.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$redux__$5b$external$5d$__$28$react$2d$redux$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-redux [external] (react-redux, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Store$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/Store.js [ssr] (ecmascript)"); // FIXED: import persistor
var __TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist$2f$integration$2f$react__$5b$external$5d$__$28$redux$2d$persist$2f$integration$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/redux-persist/integration/react [external] (redux-persist/integration/react, cjs)"); // NEW: import PersistGate
var __TURBOPACK__imported__module__$5b$externals$5d2f$notistack__$5b$external$5d$__$28$notistack$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/notistack [external] (notistack, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$redux__$5b$external$5d$__$28$react$2d$redux$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Store$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$redux__$5b$external$5d$__$28$react$2d$redux$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Store$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
;
;
function App({ Component, pageProps }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Check if the current page needs Dashboard Layout
    const isDashboardRoute = router.pathname.startsWith("/Dashboard"); // small d not D
    const getLayout = Component.getLayout || ((page)=>page);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$redux__$5b$external$5d$__$28$react$2d$redux$2c$__esm_import$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Store$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["store"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$redux$2d$persist$2f$integration$2f$react__$5b$external$5d$__$28$redux$2d$persist$2f$integration$2f$react$2c$__cjs$29$__["PersistGate"], {
            loading: null,
            persistor: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$Store$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["persistor"],
            children: [
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$notistack__$5b$external$5d$__$28$notistack$2c$__cjs$29$__["SnackbarProvider"], {
                    maxSnack: 3,
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    children: isDashboardRoute ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$layouts$2f$DashboardLayout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        children: getLayout(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
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
                    }, this) : getLayout(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__4090e4b9._.js.map