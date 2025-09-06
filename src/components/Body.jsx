import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Note from "./Note";
import { useEffect } from "react";

const Body = () => {
  const [data, setData] = useState([]);// fetch data store er jonne
  const[searcheddata,setsearcheddata]=useState(""); //  what is searched store er jone 

  //fetching logic
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

  // console.log("Data NOWW:", data);// all data coming corret
  // console.log("First ID:", data?.[0]?.id);

  const handlesearch = (value) => {
    setsearcheddata(value);

    console.log('typing:', value);
    // setsearched(value);
  }; 


  return (
    <div className="border-4 border-amber-400  flex flex-col items-center justify-center">
      BODY !{/* // search bar */}
      <Search onsearch={handlesearch} />


      {/* //create note button */}
      <Link to={"/notes/new"}>

        <button className="bg-blue-500 hover:underline cursor-pointer rounded-3xl">
          CREATE NOTE
        </button>
      </Link>

      {/* // notes container */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {data
          .filter((curr) => {
            if (!searcheddata) return true;                         // show all when empty
            const q = String(searcheddata).toLowerCase().trim();    // use searcheddata

            const matchTitle = curr.title && curr.title.toLowerCase().includes(q);
            const matchContent = curr.content && curr.content.toLowerCase().includes(q);
            const matchTags =
              Array.isArray(curr.tags) &&
              curr.tags.some((tag) => tag && tag.toLowerCase().includes(q));

            return matchTitle || matchContent || matchTags;        // return boolean
          })
          .map((curr) => (
            <Note

              key={curr.id}
              id={curr.id}
              tags={curr.tags}
              image={curr.image}
              title={curr.title}
              content={curr.content}
              createdAt={curr.createdAt}
              updatedAt={curr.updatedAt}
              // categories={curr.categories} as of now skipping 
            />
          ))}
      </div>
      <div></div>
    </div>
  );
};

export default Body;
