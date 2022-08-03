import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Kniznice from "./pages/Kniznice";
import Kniznica from "./pages/Kniznica";
import Student from "./pages/Studenti";
import Knihy from "./pages/Knihy";
import StudentiKniznice from "./pages/StudentiKniznice";
import NovyStudent from "./pages/NovyStudent";
import KnihyVratenie from "./pages/KnihyVratenie";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kniznice" element={<Kniznice />} />
          <Route path="/studenti" element={<Student />} />
          <Route path="/knihy/:id" element={<Knihy />} />
          <Route path="/knihyVratenie/:id" element={<KnihyVratenie />} />
          <Route path="/kniznica/:id" element={<Kniznica />} />
          <Route path="/studentiKniznice/:id" element={<StudentiKniznice />} />
          <Route path="/studentNovyKniznica/:id" element={<NovyStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
