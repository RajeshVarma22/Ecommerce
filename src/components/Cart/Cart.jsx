import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PlaceOrder from '../OrderDetails/PlaceOrder'
import ShowEachItemInCart from './ShowEachItemInCart'

const Cart = () => {

  const [usersCart, setUsersCart] = useState([])
  // const [showCartItems, setShowCartItems] = useState({ items: [] })
  const [userCartId, setUserCartId] = useState()
  const [itemRemoved, setItemRemoved] = useState()
  const [userCartDatabase, setUserCartDatabase] = useState([])
  const [totalCartItems, setTotalCartItems] = useState([])
  // const [ userCartDatabasePreviousCount, setUserCartDatabasePreviousCount] = useState()
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState()
  const [totalCostItems, setTotalCostItems] = useState()
  const [totalItems, setTotalItems] = useState(null)
  const [tsst, settsst] = useState()

  useEffect(() => {
    return async () => {
      let data = []
      await axios.get('http://localhost:8000/usersCart') // Bringing usersCarts data
        .then((response) => {
          // console.log(response)
          // console.log(response.data)
          setUsersCart(response.data)
          data = response.data
        })
        .catch(error => {
          console.log(error)
        })
      let userLoggedIn = JSON.parse(localStorage.getItem('currentUser'));
      // console.log(data)
      let catchData = []
      data.forEach(async userCart => {
        // console.log(userCart)
        // console.log(userCart.user)
        // console.log(userCart.id)
        // console.log(userLoggedIn.email)
        if (userLoggedIn.email === userCart.user) { // Checking the users cart to match in database
          setCurrentUserLoggedIn(userCart.user);
          localStorage.setItem('userCartId', userCart.id);
          await axios.get(`http://localhost:8000/usersCart/${userCart.id}`) //Bringing a particular user cart
            .then(response => {
              // console.log(response)
              // console.log(response.data)
              // console.log(userCart.user)
              setUserCartId(userCart.id)
              let usersCart = (response.data.cart);
              // console.log(usersCart)
              // let itemCount = 0
              let userCartItems = []
              let totalCost = 0
              let totalItems = 0
              usersCart.forEach(item => {
                // console.log(item)
                userCartItems.push(item)
                setUserCartDatabase(userCartItems)
                totalCost += item.productsCount * item.item.cost
                // console.log(totalCost)
                setTotalCostItems(totalCost)
                totalItems += 1
                // console.log(totalItems)
                setTotalItems(totalItems)

              })
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
  }, [itemRemoved, tsst])


  return (
    <div className='cartShow mx-3 mb-3'>
      {totalItems === null ? <div className='emptyTextDiv'><h1 className='emptyText fw-bold'>Cart is Empty</h1></div> : <h1 className='text-success text-center'>Welcome to Cart</h1>}
      {/* {totalItems === null ? <div className='emptyTextDiv'><h1 className='emptyText fw-bold'>Cart is Empty</h1></div> : ""} */}
      <div className='row'>
        <div className="col-8">
          {
            userCartDatabase.map(eachProduct => {
              return (
                <div key={eachProduct.id}>
                  <ShowEachItemInCart settsst={settsst} uniqueId={eachProduct.id} data={eachProduct.item} currentUserCart={userCartId} setItemRemoved={setItemRemoved} userCartDatabase={userCartDatabase} userCartDatabaseId={eachProduct.dbid} currentUserLoggedIn={currentUserLoggedIn} productsCount={eachProduct.productsCount} setTotalCartItems={setTotalCartItems} totalCartItems={totalCartItems} />
                </div>
              )
            })
          }
        </div>
        {totalItems !== null ? <div className="col-4">
          <div className="card mt-2 overallBill shadow-lg">
            <div className="card-header bg-primary text-white">
              <h1><b>Price Details</b></h1>
            </div>
            <div className="card-body">
              <h5>Price ({totalItems}) Items<span id='totalItemsCount' className='float-end'>₹{totalCostItems.toLocaleString()}.00</span></h5>
              <h5>Delivery Charges <span className='float-end text-success'>FREE</span></h5>
              <hr />
              <h4>Total Amount <span id='totalItemsCost' className='float-end'>₹{totalCostItems.toLocaleString()}.00</span></h4>
            </div>
          </div>
        </div> : ""}
      </div>
      <PlaceOrder totalItems={totalItems} totalCartItems={userCartDatabase} />
    </div >
  )
}

export default Cart