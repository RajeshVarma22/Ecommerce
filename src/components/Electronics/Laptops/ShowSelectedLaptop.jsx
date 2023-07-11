import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../../Cart/AddToCart";
import BuyNow from "../../OrderDetails/BuyNow";

const ShowSelectedLaptop = ({ userLogin }) => {
  let routedPath = localStorage.getItem("path");
  const [data, setData] = useState([]);
  const [click, setClcik] = useState(false);
  const { id } = useParams();
  // let id = 1
  const [selectedPath, setSelectedPath] = useState(
    sessionStorage.getItem("productPath")
  );

  useEffect(() => {
    return () => {
      // console.log(routedPath)
      // console.log("id", id)
      axios
        .get(`http://localhost:8000/${selectedPath}/${id}`)
        .then((response) => {
          // console.log(response)
          let dataFromServer = response.data;
          // console.log(dataFromServer)
          // let parsedData = JSON.parse(dataFromServer)
          setData(dataFromServer);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, []);

  const like = () => {
    let changedData = data;
    changedData.like = !changedData.like;
    console.log(changedData);
    axios
      .put(`http://localhost:8000/${selectedPath}/${id}`, changedData)
      .then((response) => {
        console.log(response)
        // console.log(response.data)
        setClcik(!click);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="showSelectedLaptop container ">
      {data && (
        <div className="showLaptopContent ">
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
                    className="container-fluid card-body"
                  />
                </div>
                <div>
                  <BuyNow productToBuy={data} />
                  <AddToCart
                    itemToCart={data}
                    userLogin={userLogin}
                    data={data}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lapInfo ">
            <h4>{data.name}</h4>
            <h3>Brand : {data.brand}</h3>
            <h6>Color : {data.color}</h6>
            <h6>
              Processor : {data.processorBrand} {data.processorGeneration}{" "}
              {data.processorName}
            </h6>
            <h6>Operating Sysytem : {data.os}</h6>
            <h6>Display Size : {data.size}</h6>
            <h6>Weight : {data.weight} Watt</h6>
            <h6>Type : {data.type}</h6>
            <div className="mem">
              <p
                className="me-3 pe-3"
                style={{ borderRight: "2px solid black" }}
              >
                {data.ram} GB RAM
              </p>
              <p>
                {data.internalStorage} GB {data.storageType}
              </p>
            </div>
            <h4 className="text-success">Price : ₹{data.cost}.00</h4>
            <div className="card">
              <div className="card-body">
                <h4>More Info</h4>
                <span>RAM Type : {data.ramType}</span>
                <br />
                <span>Storage Type : {data.storageType}</span>
                <br />
                <span>Dimensions : {data.dimensions}</span>
                <br />
                <span>weight : {data.weight}</span>
                <br />
                <span>Clock Speed : {data.clockSpeed}</span>
                <br />
                <span>numberOfCores : {data.numberOfCores}</span>
                <br />
                <span>cache : {data.cache} MB</span>
                <br />
                <span>Bluetooth : {data.bluetooth}</span>
                <br />
                <span>WirelessLAN : {data.wirelessLAN}</span>
                <br />
                <span>mic : {data.mic}</span>
                <br />
                <span>keyboard : {data.keyboard}</span>
                <br />
                <span>backlitKeyboard : {data.backlitKeyboard}</span>
                <br />
                <span>model : {data.model}</span>
                <br />
                <span>series : {data.series}</span>
                <br />
                <span>type : {data.type}</span>
                <br />
                <span>suitable for : {data.suitable}</span>
                <br />
              </div>
            </div>
            {data.description && (
              <div className="description mt-2 mb-3 ps-3 pe-5 card">
                <h3>Description</h3>
                <p>{data.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* <div className="row">
        {
          <div className="col-5 card p-3 pb-5 shadow-lg fixed" height={100}>
            <button onClick={() => setClcik(!click)} className='btn like'>
                  {click ? <i className='fa-solid fa-heart text-danger fa-2x'></i> : <i className='fa-regular fa-heart'></i>}
                </button>
            <img src={ data.image } alt="" className='container-fluid card-body' />
            <button className="btn btn-success mb-2">Buy Now</button>
            <AddToCart />
            
          </div>
        }
      </div> */}
    </div>
  );
};

export default ShowSelectedLaptop;
