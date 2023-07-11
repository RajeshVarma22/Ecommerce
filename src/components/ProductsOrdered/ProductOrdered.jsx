import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { json, Link } from 'react-router-dom'
import DeliveryTime from './DeliveryTime'

const ProductOrdered = () => {
  const [orderedList, setOrderedList] = useState([])

  useEffect(() => {
    return () => {
      let localUser = JSON.parse(localStorage.getItem('currentUser'))
      const userOrdersDetails = []
      axios.get(`http://localhost:8000/userOrders`)
        .then(response => {
          // console.log(response)
          // console.log(response.data)
          for (let userOrders of response.data) {
            console.log(userOrders)
            if (localUser.email === userOrders.userEmail) {
              setOrderedList(userOrders.orders)
              console.log(userOrders.orders)
              // for (let products of userOrders.orders) {
              //   console.log(products.item)
              // }
            }
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }, [])

  const gotoPath = (path) => {
    sessionStorage.setItem('productPath', path)
  }

  return (
    <div id='ProductOrdered' className='container'>
      <h1 className='text-center text-primary fw-bold display-3'>Your Orders 🤩</h1>
      {
        orderedList.map(product => {
          return (
            <div className="card mb-4 shadow-lg" key={product.id}>
              <div className="card-body my-3">
                <div className="row">
                  <div className="col-4 text-center">
                    <Link to={`/${product.item.redirectedPath}`} onClick={() => gotoPath(product.item.path)}>
                      {
                        product.item.productType === "laptop"
                          ?
                          <img src={product.item.image} alt="" className='' height={product.item.height} width={product.item.width * 2} />
                          :
                          <img src={product.item.image} alt="" className='' height={product.item.height} width={product.item.width} />
                      }
                    </Link>
                  </div>
                  <div className="col-8">
                    <div className="my-2">
                      <h5>{product.item.text}</h5>
                      <p> <b>Color :</b> {product.item.color} </p>
                      {
                        product.item.ram ? typeof (product.item.ram) === "number" ? <p> <b>RAM:</b>  {product.item.ram} GB</p> : "" : ""
                      }
                      {
                        typeof (product.item.rom) === "number" ? <p> <b>ROM:</b>  {product.item.rom} GB</p> : ""
                      }
                      {
                        typeof (product.item.internalStorage) === 'number' ? <p><b>Storage : </b>{product.item.internalStorage} GB</p> : ''
                      }
                      <p> <b>Price :</b> ₹ {(product.item.cost).toLocaleString()}.00 </p>
                      <p><b>Ordered on :</b> {product.orderedOn}</p>
                    </div>

                    <DeliveryTime product={product} />

                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductOrdered