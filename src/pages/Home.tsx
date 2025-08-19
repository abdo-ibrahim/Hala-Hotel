import HeroBanner from "../components/Home/HeroBanner";
import SearchUnitsBar from "../components/Home/SearchUnitsBar";
import HotelGallery from "../components/Home/HotelGallery";
import PromoSection from "../components/Home/PromoSection";
import DigitalExperience from "../components/Home/DigitalExperience";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Search Units Bar */}
      <SearchUnitsBar />

      {/* Hotel Gallery */}
      <HotelGallery />

      {/* Promotional Section */}
      <PromoSection />

      {/* Digital Experience */}
      <DigitalExperience />

      {/* Footer */}
    </div>
  );
};

export default Home;
