import React from 'react'
import { Link } from 'react-router-dom'

const BuyNow = ({ productToBuy }) => {

  const itemToBuy = () => {
    let currentItem = sessionStorage.getItem('itemToBuy')
    let product = {
      id: Math.floor(Math.random() * 10000) + 1,
      productsCount: 1,
      item: { ...productToBuy }
    }
    if (currentItem === null || currentItem === undefined) {
      let itemToBuy = JSON.stringify(product)
      sessionStorage.setItem('itemToBuy', itemToBuy)
      sessionStorage.setItem('from', 'BuyNow')
    } else {
      sessionStorage.setItem('from', 'BuyNow')
      sessionStorage.removeItem('itemToBuy')
      let itemToBuy = JSON.stringify(product)
      sessionStorage.setItem('itemToBuy', itemToBuy)
    }
  }

  return (
    <>
      <Link to={'/orderConformation'}>
        <button className="btn btn-success m-1 fw-b" onClick={() => itemToBuy()}>Buy Now</button>
      </Link>
    </>
  )
}

export default BuyNow