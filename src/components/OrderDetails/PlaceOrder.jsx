import React from 'react'
import { Link } from 'react-router-dom'

const PlaceOrder = ({ totalItems, totalCartItems }) => {
  let itemsConformed = () => {
    sessionStorage.setItem('itemToBuy', JSON.stringify(totalCartItems))
    sessionStorage.setItem('from', 'Cart')
  }
  return (
    <div id='placeOrder'>
      <Link to="/ordersConformation">
        {totalItems !== null ? <button className='btn btn-success btn-lg fw-bold' onClick={itemsConformed}>Place Order</button> : ''}
      </Link>
    </div>
  )
}

export default PlaceOrder