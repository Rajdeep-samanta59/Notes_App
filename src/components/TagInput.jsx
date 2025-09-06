import React from "react";
import { useState } from "react";

const TagInput = ({ presets = [], initialTags = [], onChange = () => {} }) => {
  const [tags, setTags] = useState(initialTags);
  const [input, setInput] = useState(""); // input stuffs; user whatever typing !

// Connection between child and parent.. notifies  the parent ..
  const notify = (next) => {
    setTags(next);   // local state update
    onChange(next);  // parent is also notified 
  };

  const add = (value) => {
    const v = String(value).trim();
    if (!v) return;
    if (!tags.includes(v)) notify([...tags, v]);//Create a new array with all the values from tags, and add v at  end
    setInput("");
  };
  
// Removes the selected tag from tags |and  Notifies parent again
  const remove = (value) => notify(tags.filter((t) => t !== value)); 

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === ",") { // while typingg of tags if user pressing enter or comma then auto new tags 
      e.preventDefault();
      add(input);
    }
  };

  return (

    // present tags // clickable buttons 
    <div>
      <div className="flex gap-2 flex-wrap mb-2">
        {presets.map((p) => {
          const active = tags.includes(p);
          return (
            <button
              key={p}
              type="button"
              onClick={() => (active ? remove(p) : add(p))}
              className={`px-3 py-1 rounded-full text-sm ${
                active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              #{p}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Add tag and press Enter"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="button"
          onClick={() => add(input)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
          >
            #{t}
            <button
              type="button"
              onClick={() => remove(t)}
              className="text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
