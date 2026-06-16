import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./lib/themeContext";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Directory from "./pages/Directory";
import Firm from "./pages/Firm";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Research from "./pages/Research";

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/firm/:slug" element={<Firm />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/research/:slug" element={<Research />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
