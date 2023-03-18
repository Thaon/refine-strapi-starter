import { Sider as DefaultSider, Box } from "@pankod/refine-mui";
import CustomMenu from "components/CustomMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomLayout({
  Header,
  Footer,
  OffLayoutArea,
  children,
}) {
  return (
    <Box display="flex" flexDirection="row">
      <CustomMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        {Header && <Header />}
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
      <ToastContainer />
    </Box>
  );
}
