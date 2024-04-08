import React from 'react';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-[90vh] bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="max-w-2xl text-center text-white p-8 flex-grow"> {/* Use flex-grow to fill remaining space */}
        <h1 className="text-4xl font-bold mb-4">Welcome in your Library Managment</h1>
        <p className="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
        <button className="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white py-2 px-4 rounded shadow">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
