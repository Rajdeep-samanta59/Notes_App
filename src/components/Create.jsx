import React, { useState } from "react";
import TagInput from "./TagInput";
const Create = () => {
  const [tags, setTags] = useState([]);
  // for  input  of  the form things state defining
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const Handlesubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!");
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Tags:", tags);
  };
  return (
    <form onSubmit={Handlesubmit}>
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Note Form</h2>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              value={title} // connect  title state 
              onChange={(e)=>setTitle(e.target.value)}// and update acc
              className="w-full p-3 rounded-lg bg-purple-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Content
            </label>
            <textarea
              rows="6"
              placeholder="Write Something..."

              value={content} // connect content 
              onChange={(e) => setContent(e.target.value)}// and update acc
              className="w-full p-3 rounded-lg bg-purple-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            ></textarea>
          </div>

          {/* //tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <TagInput
              presets={[
                "study",
                "cook",
                "travel",
                "work",
                "personal",
                "office",
              ]}
              initialTags={["study", "Assignments"]}
              onChange={setTags} // parent sending updater to child
              // ie .. if any changes happen direct ly child  can update parents state anyhoww
            />
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Save & Submit Note..
          </button>
        </div>
      </div>
    </form>
  );
};

export default Create;
