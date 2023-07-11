import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../../Cart/AddToCart";
import BuyNow from "../../OrderDetails/BuyNow";

const ShowSelectedContent = ({ userLogin }) => {
  const routedPath = sessionStorage.getItem("productPath");
  const [click, setClcik] = useState(false);
  const { id } = useParams();
  let url = `http://localhost:8000/${routedPath}/${id}`;
  // const { data, pending, err } = useFetch(url)

  const [data, setData] = useState([]);

  // console.log(id)
  // console.log(goToPath)

  useEffect(() => {
    return () => {
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          // console.log(response)
          // console.log(response.data)
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, [click]);

  const like = () => {
    let changedData = data;
    changedData.like = !changedData.like;
    console.log(changedData);
    axios
      .put(url, changedData)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setClcik(!click);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ShowSelectedContent container">
      {/* {pending && <div><span className='spinner-border spinner-border-sm text-dark'></span> <h1>Loading</h1></div>}
      {err && <h1>{err}</h1>} */}
      {data && (
        <div className="mainShowSelectedContent ">
          <div className="imageShow ">
            <div className="card">
              <div className="card-body text-center">
                <button onClick={() => like()} className="btn like">
                  {data.like ? (
                    <i className="fa-solid fa-heart text-danger fa-2x"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </button>
                <div className="imge mb-4">
                  <img
                    src={data.image}
                    alt=""
                    height={data.height}
                    width={data.width}
                    className="mt-3"
                  />
                </div>
                <BuyNow productToBuy={data} />
                <AddToCart itemToCart={url} userLogin={userLogin} data={data} />
              </div>
            </div>
          </div>
          <div className="mobileInfo ">
            <h4>{data.text}</h4>
            <h6>Color : {data.color}</h6>
            <h6>Processor : {data.processor}</h6>
            <h6>Camera : {data.camera}</h6>
            <h6>Battery : {data.battery}</h6>
            <h6>Display : {data.display}</h6>
            <h6>Charging Speed : {data.charger} Watt</h6>
            <h6>Operating Sysytem : {data.os}</h6>
            <h6>Version : {data.version}</h6>
            <div className="mem">
              <p
                className="me-3 pe-3"
                style={{ borderRight: "2px solid black" }}
              >
                {data.ram} GB RAM
              </p>
              <p>{data.rom} GB ROM</p>
            </div>
            <h4 className="text-success">Cost : {data.cost}</h4>
            {data.description && (
              <div className="description mt-2 mb-3 ps-3 pe-5 card">
                <h3>Description</h3>
                <p>{data.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSelectedContent;
