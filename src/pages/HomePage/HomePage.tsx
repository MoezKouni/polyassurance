import { Banner } from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import Testimonials from "../../components/Testimonials/Testimonials";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Services />
      <Testimonials />
      <Banner />
      <Footer />
    </div>
  );
}
