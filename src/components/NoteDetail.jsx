import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(
          // "https://api.myjson.online/v1/records/eec8828e-5973-4f42-b019-135092b826de"
          "/data/notes.json"
        );
        const json = await res.json();
        const items = Array.isArray(json.data)
          ? json.data
          : json.data?.data || [];
        const found = items.find((it) => String(it.id) === String(id));
        setNote(found || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const ok = confirm("Delete this note? This cannot be undone.");
    if (!ok) return; 
// same thing will return as it is not change in this 
// else
    setDeleting(true);
    try {
      // TODO: replace with real delete API
      console.log("Deleting note", id);
      await new Promise((r) => setTimeout(r, 500));
      navigate("/"); // redirect after delete
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (!note) return <div className="p-8">Loading note details...!</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold">{note.title}</h2>

        <div className="flex gap-2">
           {/* IF PRRESSING IN  THE EDIT BTN  WILL LINK TO ANOTHER PAGE THAT IS /NOTE/499/EDIT */}
          <Link
            to={`/notes/${id}/edit`}
            className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500"
          >
            Edit
          </Link>
          {/* HANDELING THE DELETING  */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`px-3 py-1 rounded text-white ${
              deleting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {note.image && (
        <img
          src={note.image}
          alt={note.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p className="mb-4">{note.content}</p>
      <div className="text-sm text-gray-500">
        Created at:{" "}
        {note.createdAt
          ? new Date(note.createdAt).toLocaleDateString()
          : "N/A"}
      </div>
      <div className="text-sm text-gray-500">
        Last Updated at:{" "}
        {note.updatedAt
          ? new Date(note.updatedAt).toLocaleDateString()
          : "N/A"}
      </div>
    </div>
  );
};

export default NoteDetail;
