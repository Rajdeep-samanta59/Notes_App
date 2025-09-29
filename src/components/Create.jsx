import React, { useState, useContext } from "react";
import TagInput from "./TagInput";
import AuthContext from "../context/AuthContext";
import { useToast } from "./Toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { accessToken } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const { addToast } = useToast();

  // validations
  const validate = () => {
    const e = {};
    if (!title || String(title).trim().length === 0)
      e.title = "Title is required";
    if (!content || String(content).trim().length < 10)
      e.content = "Content must be at least 10 characters";
    return e;
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result);
    reader.readAsDataURL(f);
  };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;

    setSubmitting(true);
    try {
      const API = import.meta.env.VITE_API_URL || '';
      const token = accessToken || localStorage.getItem('accessToken');

      // build FormData
      const fileInput = document.getElementById('fileUpload');
      const fd = new FormData();
      fd.append('title', title.trim());
      fd.append('content', content.trim());
      fd.append('tags', JSON.stringify(Array.isArray(tags) ? tags : [])); // Arrays/orobjects must be stringified before appending to form   Data
      if (fileInput?.files?.[0]) fd.append('image', fileInput.files[0]);

      const res = await fetch(`${API}/create`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: fd,
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        const message = b.msg || 'Create failed';
        addToast(message, 'error');
        throw new Error(message);
      }

      // reset form on success and navigate home so the list reloads
      setTitle("");
      setContent("");
      setTags([]);
      setFilePreview(null);
      addToast('Note created successfully', 'success');
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={Handlesubmit} className="min-h-screen bg-purple-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Note</h2>
          {/* // TITLE */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={errors.title ? "true" : "false"}
              className={`w-full p-3 rounded-lg bg-purple-50 text-gray-800 border ${
                errors.title ? "border-red-400" : "border-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          {/* /// content */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Content
            </label>
            <textarea
              rows="6"
              placeholder="Write Something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              aria-invalid={errors.content ? "true" : "false"}
              className={`w-full p-3 rounded-lg bg-purple-50 text-gray-800 border ${
                errors.content ? "border-red-400" : "border-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none`}
            ></textarea>
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>

          {/* // tags  */}
          <div className="mb-4">
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
              initialTags={["work"]}
              onChange={(next) =>
                setTags(Array.from(new Set(next.map((t) => String(t).trim()))))
              }
            />
          </div>
          {/* // attach ing image  */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Attach Image
            </label>

   
            <input
              type="file"
              accept="image/*"
              id="fileUpload"
              onChange={handleFileChange}
              className="hidden"
              required = "true"
            />

            {/* Styled Label as Button */}
            <label
              htmlFor="fileUpload"
              className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
            >
              Choose File
            </label>

            {filePreview && (             // Only shows if filePreview has a value
              <div className="mt-3">
                <img
                  src={filePreview}
                  alt="preview"
                  className="w-48 h-32 object-cover rounded shadow-sm"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              submitting
                ? "bg-black cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {submitting ? "Saving..." : "Save & Submit Note"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Create;
