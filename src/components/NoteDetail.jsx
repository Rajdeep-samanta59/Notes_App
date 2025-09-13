import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useContext(AuthContext) || {};

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      try {
        const API = import.meta.env.VITE_API_URL || '';
        const token = accessToken || localStorage.getItem('accessToken');
        const res = await fetch(`${API}/note/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.status === 404) {
          setError('Note not found');
          setNote(null);
          return;
        }
        if (res.status === 401) {
          setError('Unauthorized. Please login again.');
          setNote(null);
          return;
        }
        if (!res.ok) {
          const b = await res.json().catch(() => ({}));
          throw new Error(b.msg || 'Failed to fetch note');
        }
        const json = await res.json();
        setNote(json.note || null);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to load note');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, accessToken]);

  const handleDelete = async () => {
    const ok = confirm("Delete this note? This cannot be undone.");
    if (!ok) return; 
// same thing will return as it is not change in this 
// else
    setDeleting(true);
    try {
  const API = import.meta.env.VITE_API_URL || '';
  // try to get token from AuthContext then fallback to localStorage
  const headerToken = accessToken || localStorage.getItem('accessToken');
      const res = await fetch(`${API}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(headerToken ? { Authorization: `Bearer ${headerToken}` } : {}),
        },
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Delete failed');
      navigate('/'); // redirect after delete
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-8">Loading note details...!</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!note) return <div className="p-8">Note not found</div>;

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
