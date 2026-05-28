import { useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Top10 from './pages/Top10';
import AllBugs from './pages/AllBugs';
import Submit from './pages/Submit';
import Mission from './pages/Mission';
import BugDetail from './pages/BugDetail';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="App min-h-screen bg-black">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/top-10" element={<Top10 />} />
            <Route path="/all-bugs" element={<AllBugs />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/bug/:slug" element={<BugDetail />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
