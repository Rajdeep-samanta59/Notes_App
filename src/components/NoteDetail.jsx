import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(
          "https://api.myjson.online/v1/records/eec8828e-5973-4f42-b019-135092b826de"
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

  if (!note) return <div className="p-8">LOADINGGG!!!! WAITT ! THIS MAY TAKE SOME TIME !</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
      {note.image && (
        <img
          src={note.image}
          alt={note.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p className="mb-4">{note.content}</p>
      <div className="text-sm text-gray-500">Created at: {new Date(note.createdAt).toLocaleDateString()}</div>
      <div className="text-sm text-gray-500">Last Updated at: {new Date(note.updatedAt).toLocaleDateString()}</div>
    </div>
  );
};

export default NoteDetail;
