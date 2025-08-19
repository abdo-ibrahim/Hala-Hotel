import { useTranslation } from "react-i18next";

const HomeContent = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-3">Events</h2>
          <p>Discover our upcoming events and book your tickets today.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-3">Services</h2>
          <p>From planning to execution, we offer comprehensive event services.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-3">News</h2>
          <p>Stay updated with our latest news and announcements.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
