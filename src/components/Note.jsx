import React from "react";
import { Link } from "react-router-dom";

const Note = ({ id, title, image, content, tags, createdAt }) => {
  // guard dates
  const created = createdAt ? new Date(createdAt).toLocaleDateString() : "N/A";

  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131';
  return (
    <Link to={`/notes/${id}`} className="group">
      <article className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Image - fixed aspect, cover, zoom on hover */}
        <div className="w-full overflow-hidden bg-gray-100" style={{ aspectRatio: '4 / 3' }}>
          <img
            src={image || DEFAULT_IMAGE}
            alt={title || 'note image'}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{content}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              {tags?.slice(0, 3)?.map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">#{tag}</span>
              ))}
            </div>

            <div className="text-xs text-gray-500">{created}</div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Note;
