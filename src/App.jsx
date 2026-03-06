import { Routes, Route } from 'react-router-dom';
import Layout       from './components/layout/Layout';
import Home         from './pages/Home';
import Services     from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Pricing      from './pages/Pricing';
import About        from './pages/About';
import Gallery      from './pages/Gallery';
import Blog         from './pages/Blog';
import BlogPost     from './pages/BlogPost';
import Contact      from './pages/Contact';
import NotFound     from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"                element={<Home />} />
        <Route path="/services"        element={<Services />} />
        <Route path="/services/:slug"  element={<ServiceDetail />} />
        <Route path="/pricing"         element={<Pricing />} />
        <Route path="/about"           element={<About />} />
        <Route path="/gallery"         element={<Gallery />} />
        <Route path="/blog"            element={<Blog />} />
        <Route path="/blog/:slug"      element={<BlogPost />} />
        <Route path="/contact"         element={<Contact />} />
        <Route path="*"                element={<NotFound />} />
      </Route>
    </Routes>
  );
}
