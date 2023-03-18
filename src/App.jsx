import { TOKEN_KEY, API_URL } from "./constants";

// refine
import {
  ErrorComponent,
  ReadyPage,
  CssBaseline,
  createTheme,
  ThemeProvider,
  GlobalStyles,
  RefineSnackbarProvider,
  notificationProvider,
} from "@pankod/refine-mui";
// refine utils
import { Refine, Authenticated } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import { DataProvider } from "@pankod/refine-strapi-v4";
import { authProvider } from "authProvider";

// utils
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "utils/axios";

// custom pages and components
import CustomLayout from "./components/CustomLayout";
import LoginPage from "./components/user/LoginPage";
import PasswordForgot from "components/user/PasswordForgot";
import PasswordReset from "components/user/PasswordReset";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";

// resources

// Icons

export const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#8d99ae",
    },
    secondary: {
      main: "#2b2d42",
    },
    info: {
      main: "#edf2f4",
    },
  },
};

const theme = createTheme(themeOptions);
const queryClient = new QueryClient();
window.queryClient = queryClient;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <Refine
            routerProvider={{
              ...routerProvider,
              routes: [
                {
                  element: <PasswordForgot />,
                  path: "/forgot-password",
                  layout: false,
                },
                {
                  element: <PasswordReset />,
                  path: "/reset-password",
                  layout: false,
                },
                {
                  element: (
                    <Authenticated>
                      <Settings />
                    </Authenticated>
                  ),
                  path: "/settings",
                  layout: true,
                },
              ],
            }}
            resources={
              [
                // {
                //   name: "",
                //   icon: <Icon />,
                //   options: { label: "Label" },
                //   list: List,
                //   create: Create,
                //   edit: Edit,
                // },
              ]
            }
            authProvider={authProvider}
            dataProvider={DataProvider(API_URL + "/api", axios)}
            notificationProvider={notificationProvider}
            Title={({ collapsed }) => (
              <div
                style={{
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {collapsed && (
                  <img src="/logo.png" alt="Logo" style={{ width: "50px" }} />
                )}
                {!collapsed && (
                  <img src="/logo.png" alt="Logo" style={{ width: "100px" }} />
                )}
              </div>
            )}
            Layout={CustomLayout}
            DashboardPage={Dashboard}
            ReadyPage={ReadyPage}
            LoginPage={LoginPage}
            catchAll={<ErrorComponent />}
          />
        </QueryClientProvider>
      </RefineSnackbarProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
