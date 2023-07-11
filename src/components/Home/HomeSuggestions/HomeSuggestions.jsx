import axios from "axios";
import React, { useEffect, useState } from "react";
import EachSuggestion from "./EachSuggestion";
import topOffers from "../../../assets/Images/topOffers.jpg";

const HomeSuggestions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    return () => {
      const getData = async () => {
        await axios
          .get("http://localhost:8000/homeSuggestions")
          .then((response) => {
            console.log(response.data);
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getData();
    };
  }, []);

  return (
    <div id="HomeSuggestions" className="mt-3">
      <div className="text-center">
      <h1 className="text-center text-success display-1 fw-bold d-inline-block me-3">Top Offers</h1>
        <img src={topOffers} alt="topOffers"  className="d-inline-block cornersCurveSm shadowsSm"/>
      </div>
      <div className="row mx-2 mt-3">
        {data.map((item) => {
          return (
            <div className="col-4 mb-3">
              <div className="card shadowsSm">
                <div className="card-body">
                  <EachSuggestion data={item} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeSuggestions;
