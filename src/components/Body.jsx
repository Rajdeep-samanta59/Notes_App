import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Note from "./Note";
import { useEffect } from "react";

const Body = () => {
  const [data, setData] = useState([]);
  //fetching logi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.myjson.online/v1/records/eec8828e-5973-4f42-b019-135092b826de"
        );
        const json = await response.json();
        const result = json.data.data;
        setData(result);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Data NOWW:", data);
  // console.log("First ID:", data?.[0]?.id);

  const handlesearch = (value) => {

    console.log('typing:', value);
  };

  return (
    <div className="border-4 border-amber-400  flex flex-col items-center justify-center">
      BODY !{/* // search bar */}
      <Search onsearch={handlesearch} />
      {/* //create note button */}
      <Link to="/create">
        <button className="bg-blue-500 hover:underline cursor-pointer rounded-3xl">
          CREATE NOTE
        </button>
      </Link>
      {/* // notes container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {data.map((curr) => (
          <Note
            key={curr.id}
            id={curr.id}
            tags={curr.tags}
            image={curr.image}
            title={curr.title}
            content={curr.content}
            createdAt={curr.createdAt}
            updatedAt={curr.updatedAt}
            categories={curr.categories}
          />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Body;
