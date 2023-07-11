import React from "react";
import { Link } from "react-router-dom";

const EachSuggestion = ({ data }) => {
  const setSessionPath = (path) => {
    sessionStorage.setItem("productPath", path);
  };
  return (
    <div id="EachSuggestion" className="text-center">
      {data.productType === "mobile" ? (
        <Link
          to={`/${data.redirectedPath}`}
          onClick={() => setSessionPath(data.path)}
          className="linksDecorate text-black fw-bold"
        >
          <img
            src={data.image}
            className="my-3"
            height={data.height / 1.5}
            width={data.width / 1.5}
            alt={data.text}
          />
          <p>{data.text}</p>
        </Link>
      ) : data.productType === "laptop" ? (
        <Link
          to={`/${data.redirectedPath}`}
          onClick={() => setSessionPath(data.path)}
          className="linksDecorate text-black fw-bold"
        >
          <img
            src={data.image}
            className="my-3"
            height={data.height / 1.5}
            // width={data.width}
            alt={data.text}
          />
          <p>{data.name.slice(0, 75)}....</p>
        </Link>
      ) : (
        <Link
          to={`/${data.redirectedPath}`}
          className="linksDecorate text-black fw-bold"
        >
          <img
            src={data.image}
            className="my-3 text-center"
            height={data.height / 1.5}
            width={data.width / 1.5}
            alt={data.text}
            style={{ borderRadius: "inherit" }}
          />
          <p>{data.text}</p>
        </Link>
      )}
    </div>
  );
};

export default EachSuggestion;
