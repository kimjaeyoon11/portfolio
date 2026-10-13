import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Certifications />
      <Footer />
    </main>
  );
}
