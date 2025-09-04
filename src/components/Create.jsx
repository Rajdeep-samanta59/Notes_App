import React from "react";

const Create = () => {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Note Form</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 rounded-lg bg-purple-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Content</label>
          <textarea
            rows="6"
            placeholder="Description"
            className="w-full p-3 rounded-lg bg-purple-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          ></textarea>
        </div>

       

        {/* Submit Button */}
        <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Save Note
        </button>
      </div>
    </div>
  );
};

export default Create;
