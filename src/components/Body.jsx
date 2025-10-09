import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Note from "./Note";
import AuthContext from "../context/AuthContext";

const Body = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // show 8 notes per page as requested
  const [total, setTotal] = useState(0);
  const [searcheddata, setsearcheddata] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useContext(AuthContext) || {};
  const { user } = useContext(AuthContext) || {};

  useEffect(() => {
    // fetch notes helper used by search and pagination
    const fetchNotes = async (p = 1, q = '') => {
      setLoading(true);
      try {
        const API = import.meta.env.VITE_API_URL || '';
        const token = accessToken || localStorage.getItem('accessToken');
        const params = new URLSearchParams();
        params.set('page', String(p));
        params.set('limit', String(limit));
        if (q) params.set('q', q);
        const response = await fetch(`${API}/notes?${params.toString()}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) throw new Error('Failed to fetch notes');
        const json = await response.json();
        const items = json.notes || [];
        setData(items);
        setTotal(json.total || 0);
        setPage(json.page || p);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    // initial load or when access token changes: load current page with current search term
    fetchNotes(page, searcheddata);
    // expose fetchNotes by attaching to ref is unnecessary; we'll call fetchNotes directly from handlers
  }, [accessToken, page, limit, searcheddata]);

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
        {!loading && !error && data.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((curr) => {
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

            {/* Pagination controls */}
            <div className="mt-6 flex justify-center items-center gap-2">
              {Array.from({ length: Math.max(1, Math.ceil(total / limit)) }).map((_, idx) => {
                const p = idx + 1;
                return (
                  <button
                    key={p}
                    onClick={() => {
                      // fetch that page
                      (async () => {
                        setLoading(true);
                        try {
                          const API = import.meta.env.VITE_API_URL || '';
                          const token = accessToken || localStorage.getItem('accessToken');
                          const params = new URLSearchParams();
                          params.set('page', String(p));
                          params.set('limit', String(limit));
                          const resp = await fetch(`${API}/notes?${params.toString()}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
                          const json = await resp.json();
                          setData(json.notes || []);
                          setPage(json.page || p);
                          setTotal(json.total || 0);
                        } catch (e) {
                          console.error('Pagination fetch failed', e);
                        } finally {
                          setLoading(false);
                        }
                      })();
                    }}
                    className={`px-3 py-1 rounded ${p === page ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};

export default Body;
