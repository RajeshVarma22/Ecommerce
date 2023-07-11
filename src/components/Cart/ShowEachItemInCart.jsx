import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BuyNow from '../OrderDetails/BuyNow';

const ShowEachItemInCart = ({ uniqueId, data, currentUserCart, setItemRemoved, userCartDatabase, currentUserLoggedIn, productsCount, setTotalCartItems }) => {
  let userLoggedIn = JSON.parse(localStorage.getItem('currentUser'));
  let url = `http://localhost:8000/usersCart/${currentUserCart}`
  let randomNum = Math.floor(Math.random() * 10000) + 1

  const iteToRemove = async (itemToREmove) => {
    // console.log(itemToREmove)
    await axios.get(url).then(response => {
      // console.log(response)
      console.log(response.data)
      // console.log(response.data.cart[0])
      let userCart = response.data.cart
      console.log("userCart", userCart)
      let modifiedCart = []
      userCart.forEach(item => {
        console.log(item)
        if (item.id !== uniqueId) {
          modifiedCart.push(item)
        }
      })
      console.log(modifiedCart)
      axios.put(url, {
        user: userLoggedIn.email,
        cart: modifiedCart
      }).then(response => {
        console.log(response)
        console.log(response.data)
        setItemRemoved(randomNum)
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })
  }
  let increment = async (id) => {
    console.log(userCartDatabase)
    let userEmail = currentUserLoggedIn
    let changedData = []
    userCartDatabase.forEach(item => {
      console.log(item.id)
      console.log(id)
      setTotalCartItems(item.productsCount)
      if (item.id === id) {
        // console.log(item)
        let productsPreviousCount = item.productsCount
        // console.log(typeof(productsCount))
        productsPreviousCount += 1
        console.log(productsPreviousCount)
        changedData.push({
          id: item.id,
          item: item.item,
          productsCount: productsPreviousCount
        })
      } else {
        changedData.push(item)
      }
    })
    // console.log(changedData)
    axios.put(url, {
      user: userEmail,
      cart: changedData
    }).then(response => {
      console.log(response)
      setItemRemoved(randomNum) // This is used to change the data present in cart.jsx (useEffetc[here.,])
    }).catch(error => {
      console.log(error)
    })

  }
  let decrement = async (id) => {
    // console.log(userCartDatabase)
    let userEmail = currentUserLoggedIn
    let changedData = []
    userCartDatabase.forEach(item => {
      // console.log(item.id)
      // console.log(id)
      if (item.id === id && item.productsCount > 1) {
        // console.log(item)
        let productsPreviousCount = item.productsCount
        // console.log(typeof(productsCount))
        productsPreviousCount -= 1
        console.log(productsPreviousCount)
        changedData.push({
          id: item.id,
          item: item.item,
          productsCount: productsPreviousCount
        })
      } else {
        changedData.push(item)
      }
    })
    // console.log(changedData)
    axios.put(url, {
      user: userEmail,
      cart: changedData
    }).then(response => {
      console.log(response)
      setItemRemoved(randomNum) // This is used to change the data present in cart.jsx (useEffetc[here.,])
    }).catch(error => {
      console.log(error)
    })
  }

  const setSessionPath = (path) => {
    sessionStorage.setItem('productPath', path)
  }

  return (
    <div id='eachItemInCart' className='my-3'>
      {
        <div className="card my-2 shadowsSm">
          <div className="card-body row bglightGery mx-0">
            <div className="col-4 text-center border my-1 ms-2 shadowsSm cornersCurve bg-white">
              {
                data.productType === "mobile" ?
                  <Link to={`/${data.redirectedPath}`} onClick={() => setSessionPath(data.path)}>
                    <img src={data.image} className="my-3" height={(data.height) / 1.5} width={(data.width) / 1.5} alt="" />
                  </Link>
                  :
                  data.productType === 'laptop' ?
                    <Link to={`/${data.redirectedPath}`} onClick={() => setSessionPath(data.path)}>
                      <img src={data.image} className="my-3" style={{width: "250px"}} height={(data.height) / 1.5} width={(data.width)} alt="" />
                    </Link>
                    :
                    <Link to={`/${data.redirectedPath}`}>
                      <img src={data.image} className="my-3 img-fluid text-center" alt="" style={{ borderRadius: 'inherit' }} />
                    </Link>
              }

              <h3 className='text-success'><span className='fa-solid fa-circle-minus fa-sm bg-white decrement' onClick={() => decrement(uniqueId)}></span> <span className='border border-lg  px-4 bg-white cornersCurveMd shadowsSm'>{productsCount}</span> <span className='fa-solid fa-circle-plus fa-sm bg-white' onClick={() => increment(uniqueId)}></span></h3>
            </div>
            <div className="col-7 mt-2 ms-3">
              <h4>{data.text}</h4>
              <p> <b>Color :</b> {data.color} </p>
              {
                data.ram ? typeof (data.ram) === "number" ? <p> <b>RAM:</b>  {data.ram} GB</p> : "" : ""
              }
              {typeof (data.rom) === "number" ? <p> <b>ROM:</b>  {data.rom} GB</p> : ""}
              {typeof (data.internalStorage) === 'number' ? <p><b>Storage : </b>{data.internalStorage} GB</p> : ''}
              <p> <b>Price :</b> ₹ {data.cost}.00 </p>

              <div className="btns mt-3">
                <div>
                  <button className="btn btn-primary ms-1" onClick={() => iteToRemove(uniqueId)}><b>Remove</b></button>
                </div>
                <BuyNow productToBuy={data} />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ShowEachItemInCart