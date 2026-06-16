import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import WhatsAppButton from "./WhatsAppButton";

const Layout = () => (
  <>
    <ScrollProgress />
    <TopBar />
    <Navbar />
    <main>
      <Outlet />
    </main>
    <WhatsAppButton />
    <Footer />
  </>
);

export default Layout;
