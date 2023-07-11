// import React from 'react'
// import AddToCart from '../AddToCart'
// import BuyNow from '../BuyNow'
// import HomeSubContent from './HomeSubContent'
// import useFetch from '../useFetch'

import AddToCart from "../Cart/AddToCart";
import BuyNow from "../OrderDetails/BuyNow";
import useFetch from "../CustomHooks/useFetch";
import HomeSubContent from "./HomeSubContent";
import HomeSuggestions from "./HomeSuggestions/HomeSuggestions";

const Home = () => {
  const offers = 'http://localhost:8000/mainOffers'
  const { data, pending, err } = useFetch(offers);
  // console.log(data)
  let removeClasEl = document.querySelector('.offersCarousel');

  setTimeout(() => {
    removeClasEl.classList.add('active')
  }, 1)

  return (
    <div className='homeContent'>

      <HomeSubContent />

      <div className="carouselArea">
        <div id="carouselExampleIndicators" className="carousel carousel-dark slide" data-bs-ride="true">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active bg-dark" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" className='bg-dark'></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" className='bg-dark'></button>
          </div>
          <div className="carousel-inner bg-light py-5">
            {
              data.map((item) => {
                return (
                  <div className="carousel-item text-center offersCarousel" key={item.name}>
                    <div className="image">
                      <img src={item.image} className="d-block m-auto" alt="..." width={item.width} height={item.height} />
                      <p><b>{item.name}</b></p>
                    </div>
                    <div className="mx-4 offersSubContent">
                      <h5><b className='fs-4'>{item.brand}</b></h5>
                      <h6><b>Processor :</b> {item.processor}</h6>
                      <p><b>Ram :</b> {item.ram}Gb</p>
                      <p className='mx-2'><b>Rom :</b> {item.rom}Gb</p>
                      <div className="offerings">
                        <p> <b>Original Price :</b> <s>{item.originalcost.toFixed(2)}</s> </p>
                        <p><b>Discount :</b> {item.dicount}%</p>
                      </div>
                      <h6><b>Price :</b> {item.cost.toFixed(2)}</h6>
                      <AddToCart data={item} />
                      <BuyNow productToBuy={item} />
                    </div>
                  </div>
                )
              })
            }
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <HomeSuggestions />
      
    </div>
  )
}

export default Home