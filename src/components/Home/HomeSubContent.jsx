import React from "react";
import electronicsMain from "../../assets/Images/ElectronicsMain.jpg";
import clothesMain from "../../assets/Images/ClothesMains.jpg";
import grocerryMain from "../../assets/Images/GrocerryMain.jpg";
import mobilesMain from "../../assets/Images/MoboMain.jpg";
import furnitureMain from "../../assets/Images/FurnitureMain.jpg";
import footwearMain from "../../assets/Images/FootwearMain.jpg";
import { Link } from "react-router-dom";

const HomeSubContent = () => {
  return (
    <div className="homeSubContent container">
      <div className="row">
        <div className="col-2 text-center">
          <Link to={"/electronics"}>
            <img
              src={electronicsMain}
              alt="ElectronicsMain"
              width={100}
              className="bg-light"
            />
            <h6>Electronics</h6>
          </Link>
        </div>
        <div className="col-2 text-center">
          <Link to={"/mobiles"}>
            <img
              src={mobilesMain}
              alt="ElectronicsMain"
              width={100}
              className="bg-light"
            />
            <h6>Mobiles</h6>
          </Link>
        </div>
        <div className="col-2 text-center">
          <Link to={"/clothes"}>
            <img
              src={clothesMain}
              alt="ElectronicsMain"
              width={100}
              className="clothesImg"
            />
            <h6>Clothes</h6>
          </Link>
        </div>
        <div className="col-2 text-center">
          <a href="#">
            <img
              src={furnitureMain}
              alt="ElectronicsMain"
              width={100}
              className="bg-light"
            />
            <h6>Furniture</h6>
          </a>
        </div>
        <div className="col-2 text-center mt-4 py-3">
          <a href="#">
            <img
              src={footwearMain}
              alt="ElectronicsMain"
              width={100}
              className="bg-light"
            />
            <h6>Footwear</h6>
          </a>
        </div>
        <div className="col-2 text-center">
          <a href="#">
            <img
              src={grocerryMain}
              alt="ElectronicsMain"
              width={100}
              className="bg-light"
            />
            <h6>Grocery</h6>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeSubContent;
