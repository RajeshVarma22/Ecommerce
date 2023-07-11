import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import './cart.css'

const AddToCart = ({ itemToCart, userLogin, data }) => {

  const [checkCurrentUserLogin, setCheckCurrentUserLogin] = useState(false)
  const [checkUsersCart, setCheckUsersCart] = useState([])
  const [cartOfUser, setCartOfUser] = useState(false)

  let checkCurrentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    return () => {
      axios.get('http://localhost:8000/usersCart')
        .then(response => {
          // console.log(response)
          setCheckUsersCart(response.data)
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  let handleData = async () => {
    let disableBtn = document.querySelector('.cartBtn');
    let userDetails = JSON.parse(checkCurrentUser);
    // console.log(userDetails.login)
    let cartPresent = false
    // console.log(userDetails)
    if (userDetails !== null && userDetails.login === true) {
      let userLocalEmail = userDetails.email;
      let userCart = []
      let randomId = Math.floor(Math.random() * 10000) + 1
      let itemSelected = {
        id: randomId,
        productsCount: 1,
        item: data
      }
      userCart.push(itemSelected)
      //Stop
      // console.log(itemToCart)
      // let toAddItem = JSON.stringify(itemToCart)
      // userCart.push(toAddItem)
      let userCartId = null
      let userAddress = null
      for (let i in checkUsersCart) {
        // console.log(checkUsersCart[i].user)
        if (userLocalEmail === checkUsersCart[i].user) {
          setCartOfUser(true)
          userCartId = checkUsersCart[i].id;
          userAddress = checkUsersCart[i].address;
          console.log(userAddress)
          for (let j in checkUsersCart[i].cart) {
            userCart.push(checkUsersCart[i].cart[j])
            // console.log(checkUsersCart[i].cart[j])
          }
          // console.log(checkUsersCart[i].cart)
          cartPresent = true;
          // console.log(userCart)
        }
      }
      if (cartPresent) {
        // console.log(JSON.parse(presentCart))
        // console.log(data)
        // console.log(userCart)
        await axios.put(`http://localhost:8000/usersCart/${userCartId}`, {
          id: userCartId,
          user: userLocalEmail,
          address: userAddress,
          cart: userCart,
        }).then(response => {
          console.log(response)
          console.log(response.data)
          disableBtn.classList.add('disabled')
        }).catch(error => {
          console.log(error)
          console.log(userCart)
        })
      } else {
        await axios.post(`http://localhost:8000/usersCart`, {
          user: userLocalEmail,
          address: userAddress,
          cart: userCart
        }).then(response => {
          console.log(response)
          console.log(response.data)
          disableBtn.classList.add('disabled')
        }).catch(error => {
          console.log(error)
          console.log(userCart)
        })
      }
    }
    else {
      alert("Please Login")
    }
  }
  return (
    <button className="btn btn-primary cartBtn" onClick={() => handleData()} ><b>Add Cart</b></button>
  )
}

export default AddToCart