import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import PopularMovies from "./pages/PopularMovies";
import NotFound from "./pages/NotFound";


const App = () => (
    <>
      <Sonner position="top-center" />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/popular" element={<PopularMovies />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
);

export default App;
