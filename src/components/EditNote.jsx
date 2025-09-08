import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TagInput from "./TagInput";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.myjson.online/v1/records/eec8828e-5973-4f42-b019-135092b826de"
        );
        const json = await res.json();
        const items = Array.isArray(json.data)
          ? json.data
          : json.data?.data || [];
        const found = items.find((it) => String(it.id) === String(id));
        if (found) {
          setNote(found);
          setTitle(found.title || "");
          setContent(found.content || "");
          setTags(Array.isArray(found.tags) ? found.tags : []);
          setFilePreview(found.image || null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

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

  const handleSave = async (ev) => {
    ev.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;

    setSubmitting(true);
    try {
      const payload = {
        id: note?.id || id,
        title: title.trim(),
        content: content.trim(),
        tags: Array.isArray(tags) ? tags.map((t) => String(t).trim()) : [],
        image: filePreview || null,
        updatedAt: new Date().toISOString(),
      };
      // TODO: replace with actual PUT/PATCH API call
      console.log("Update payload for note", id, payload);
      // navigate back to detail view
      navigate(`/notes/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8">Loading note...</div>;
  if (!note) return <div className="p-8">Note not found</div>;

  return (
    <form onSubmit={handleSave} className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
{/* title input edit  */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.title ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
{/* content edit  */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full p-2 border rounded resize-none ${
              errors.content ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>
{/* Tags input  */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <TagInput
            presets={["study", "cook", "travel", "work", "personal", "office"]}
            initialTags={tags}
            onChange={(it) =>
              setTags(Array.from(new Set(it.map((t) => String(t).trim()))))
            }
          />
        </div>
{/* Immage part  */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-2">Attach Image</label>

  {/* Hidden actual file input */}
  <input
    type="file"
    accept="image/*"
    id="fileUpload"
    onChange={handleFileChange}
    className="hidden"
  />


  <label
    htmlFor="fileUpload"
    className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
  >
    Choose File
  </label>

  {/* Image preview if selected */}
  {filePreview && (
    <div className="mt-3">
      <img
        src={filePreview}
        alt="preview"
        className="w-48 h-32 object-cover rounded shadow-sm"
      />
    </div>
  )}
</div>


        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 rounded bg-purple-600 text-white ${
              submitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-purple-700"
            }`}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/notes/${id}`)}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditNote;
