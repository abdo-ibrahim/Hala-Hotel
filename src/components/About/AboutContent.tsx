const AboutContent = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">We strive to provide the best event planning services with a focus on creating memorable experiences for our clients and their guests.</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-medium text-center">John Doe</h3>
            <p className="text-center text-gray-600">CEO & Founder</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-medium text-center">Jane Smith</h3>
            <p className="text-center text-gray-600">Event Director</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-medium text-center">Michael Brown</h3>
            <p className="text-center text-gray-600">Marketing Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
