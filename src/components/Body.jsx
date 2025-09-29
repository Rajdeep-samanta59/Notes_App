import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Note from "./Note";
import AuthContext from "../context/AuthContext";

const Body = () => {
  const [data, setData] = useState([]);
  const [searcheddata, setsearcheddata] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useContext(AuthContext) || {};
  const { user } = useContext(AuthContext) || {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const API = import.meta.env.VITE_API_URL || '';
        const token = accessToken || localStorage.getItem('accessToken');
        const response = await fetch(`${API}/notes`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) throw new Error('Failed to fetch notes');
        const json = await response.json();
        const items = json.notes || [];
        setData(items);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const handlesearch = (value) => {
    setsearcheddata(value || "");
  };

  const filtered = data.filter((curr) => {
    if (!searcheddata) return true;
    const q = String(searcheddata).toLowerCase().trim();
    const matchTitle = curr.title && curr.title.toLowerCase().includes(q);
    const matchContent = curr.content && curr.content.toLowerCase().includes(q);
    const matchTags =
      Array.isArray(curr.tags) &&
      curr.tags.some((tag) => tag && tag.toLowerCase().includes(q));
    return matchTitle || matchContent || matchTags;
  });

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/*Search */}
        <Search onsearch={handlesearch} />
        <div className="flex items-center justify-between mb-6">
          <div>
            {/* <h1 className="text-2xl font-semibold">Notes</h1> */}
            {user && <div className="text-sm text-gray-600">👋Hello {user.name} Be Super Productive Today</div>}
          </div>
          <Link
            to="/notes/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700"
          >
            + Create
          </Link>
        </div>

      {/* before loading  etc edge cases handle  */}
        {loading && (
          <div className="text-center py-24 text-gray-500">
            Loading notes...
          </div>
        )}
        {!loading && error && (
          <div className="text-center py-24 text-red-500">{error}</div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            No notes found.{" "}
            <Link to="/notes/new" className="text-purple-600 underline">
              Create your  note
            </Link>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((curr) => {
              const noteId = curr._id || curr.id;
              return (
                <Note
                  key={noteId}
                  id={noteId}
                  tags={curr.tags}
                  image={curr.image}
                  title={curr.title}
                  content={curr.content}
                  createdAt={curr.createdAt}
                  updatedAt={curr.updatedAt}
                />
              );
            })}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Body;
