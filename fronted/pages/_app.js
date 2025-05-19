import "@/styles/globals.css";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Provider } from "react-redux";
import SocketProvider from "@/context/SocketContext";
import { store, persistor } from "@/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from 'notistack';
import TeacherDashboardLayout from "@/layouts/TeacherDashboardLayout";
import { useCurrentUser } from "@/Utils/getUser";
import StudentDashboardLayout from "@/layouts/StudentDashboardLayout";
import ParentDashboardLayout from "@/layouts/ParentDashboardLayout";
function InnerApp({ Component, pageProps }) {
  const router = useRouter();
  const { userId, userType } = useCurrentUser()||{};  // ✅ now safely inside React context

  const isAdminDashboardRoute = router.pathname.startsWith("/Dashboard");
  const isTeacherDashboardRoute = router.pathname.startsWith("/TeacherDashboard");
   const isStudentDashboardRoute = router.pathname.startsWith("/StudentDashboard");
  const isParentDashboardRoute = router.pathname.startsWith("/ParentDashboard");

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SocketProvider userId={userId} userType={userType}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {isAdminDashboardRoute ? (
          <DashboardLayout>
            {getLayout(<Component {...pageProps} />)}
          </DashboardLayout>
        ) : isTeacherDashboardRoute ? (
          <TeacherDashboardLayout>
            {getLayout(<Component {...pageProps} />)}
          </TeacherDashboardLayout>
        ) : isStudentDashboardRoute ? (
          <StudentDashboardLayout>
            {getLayout(<Component {...pageProps} />)}
          </StudentDashboardLayout>
        ) : isParentDashboardRoute ? (
          <ParentDashboardLayout>
            {getLayout(<Component {...pageProps} />)}
          </ParentDashboardLayout>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </SnackbarProvider>
    </SocketProvider>
  );
}

export default function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InnerApp {...props} />
      </PersistGate>
    </Provider>
  );
}


/*import "@/styles/globals.css";
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


