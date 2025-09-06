import React from "react";
import { Link } from "react-router-dom";

const Note = ({
  id,
  title,
  image,
  content,
  tags,
  createdAt,
  updatedAt,
  categories,
}) => {



// console.log(id);


  return (

   <Link to={`/notes/${id}`}>

    
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        {/* Title */}
        <div className="font-bold text-xl mb-2">{title}</div>
        {/* Content */}
        <div className="mt-2 text-gray-800 text-sm leading-relaxed line-clamp-3">
          {content}
        </div>
        {/* Created & Updated */}
        <p className="text-gray-500 text-sm mb-2">
          <span className="font-semibold">Created:</span>{" "}
          {new Date(createdAt).toLocaleDateString()}
          <br />
          <span className="font-semibold">Updated:</span>{" "}
          {new Date(updatedAt).toLocaleDateString()}
        </p>

        {/* Categories */}
        <div className="text-sm text-gray-700 font-semibold">
          {categories?.join(", ")}
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pt-4 pb-2">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}

      </div>
    
    </div>
  </Link>
  );
};

export default Note;
