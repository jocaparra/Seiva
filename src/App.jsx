import { useCallback, useMemo, useState } from "react";
import { content } from "./content.js";
import { ModalContext } from "./components/shared.jsx";
import { Nav } from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Logos from "./components/Logos.jsx";
import Value from "./components/Value.jsx";
// import Team from "./components/Team.jsx"; // seção "Especialistas de verdade" guardada para uso futuro
import Demo from "./components/Demo.jsx";
import Journey from "./components/Journey.jsx";
import Security from "./components/Security.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FinalBanner from "./components/FinalBanner.jsx";
import Footer from "./components/Footer.jsx";
import Modal from "./components/Modal.jsx";

export default function App() {
  const [open, setOpen] = useState(false);
  const openFn = useCallback(() => setOpen(true), []);
  const closeFn = useCallback(() => setOpen(false), []);
  const ctx = useMemo(() => ({ open: openFn }), [openFn]);
  return (
    <ModalContext.Provider value={ctx}>
      <a href="#solucao" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Ir para o conteúdo</a>
      <Nav content={content} />
      <main>
        <Hero content={content} />
        <Logos content={content} />
        <Value content={content} />
        {/* <Team content={content} /> */}
        <Demo content={content} />
        <Journey content={content} />
        <Security content={content} />
        <Testimonials content={content} />
        <FinalBanner content={content} />
      </main>
      <Footer content={content} />
      {open && <Modal content={content} onClose={closeFn} />}
    </ModalContext.Provider>
  );
}
