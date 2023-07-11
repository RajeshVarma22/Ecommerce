import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import OrderConformation from './OrderConformation/OrderConformation'


const CartOrderConformation = () => {
  const [name, setName] = useState("")
  const [phNum, setPhNum] = useState("")
  const [pincode, setPincode] = useState("")
  const [locality, setLocality] = useState("")
  const [address, setAddress] = useState("")
  const [data, setData] = useState("")
  const [count, setCount] = useState()
  const [price, setPrice] = useState()
  const [userSavedAddress, setUserSavedAddress] = useState([])
  const [userAddressOrders, setUerAddressOrders] = useState()
  const [userAddressPresent, setUserAddressPresent] = useState(null)
  const [runEffect, setRunEffect] = useState()
  const [userSelectedAddress, setUserSelectedAddress] = useState()

  let userLoggedIn = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
    return () => {
      let itemsToBuy = JSON.parse(sessionStorage.getItem('itemToBuy'))
      setData(itemsToBuy)
      let count = 0
      let price = 0
      itemsToBuy.forEach(element => {
        count++;
        setCount(count)
        price += element.item.cost
        let formattedPrice = price.toLocaleString()
        setPrice(formattedPrice)
      });

      axios.get('http://localhost:8000/usersAddressAndOrders')
        .then(response => {
          let userCartPresent = false
          response.data.forEach(item => {
            if (userLoggedIn.email === item.userEmail) {
              setUerAddressOrders(item)
              let addressPresent = item.address
              if (addressPresent !== null || addressPresent !== undefined) {
                setUserSavedAddress(addressPresent)
                setUserAddressPresent(true)
              } else {
                console.log("address not present")
                setUserAddressPresent(false)
              }
            } else {
              setUserAddressPresent(false)
            }
          })
        })
    }
  }, [runEffect])


  const changeAddress = (e) => {
    e.preventDefault()
    let userLoggedInMail = userLoggedIn.email
    let changedNewAddress = `${locality}, ${address}, ${pincode}`

    if (userAddressPresent === false) {
      axios.post(`http://localhost:8000/usersAddressAndOrders`, {
        userEmail: userLoggedInMail,
        address: [
          {
            id: 1,
            name: name,
            number: phNum,
            address: changedNewAddress
          }
        ]
      }).then(response => {
        console.log(response)
        setName("")
        setPhNum("")
        setPincode("")
        setLocality("")
        setAddress("")
        setRunEffect(Math.floor(Math.random() * 10000) + 1)
      }).catch(error => {
        console.log(error)
      })
    } else {
      let newAddedAddress = [...userAddressOrders.address, {
        id: Math.floor(Math.random() * 10000) + 1,
        name: name,
        number: phNum,
        address: changedNewAddress
      }]

      console.log(newAddedAddress)
      axios.put(`http://localhost:8000/usersAddressAndOrders/${userAddressOrders.id}`, {
        userEmail: userLoggedInMail,
        address: [
          ...newAddedAddress
        ]
      }).then(response => {
        console.log(response)
        setName("")
        setPhNum("")
        setPincode("")
        setLocality("")
        setAddress("")
        setRunEffect(Math.floor(Math.random() * 10000) + 1)
      }).catch(error => {
        console.log(error)
        console.log()
      })
    }
  }

  const formSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='conformOrder container'>
      <div className="row ">
        <div className="col-12 col-lg-7 my-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <button className="btn btn-danger mb-1" data-bs-toggle="collapse" data-bs-target="#clp1">Add Address</button>
              <form onSubmit={changeAddress}>
                <div className="row collapse" id="clp1">
                  <div className='col-6 my-2'>
                    <label htmlFor="userName" className='fw-bold ms-2'>Name</label>
                    <input type="text" id='userName'
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="form-control" placeholder='Enter your name' required />
                  </div>
                  <div className='col-6 my-2'>
                    <label htmlFor="userPhone" className='fw-bold ms-2'>Phone Numebr</label>
                    <input type="text" id='userPhone'
                      onChange={(e) => setPhNum(e.target.value)}
                      value={phNum}
                      className="form-control" placeholder='Enter your Phone Numebr' required />
                  </div>
                  <div className='col-6 my-2'>
                    <label htmlFor="userPinCode" className='fw-bold ms-2'>Pincode</label>
                    <input type="text" id='userPinCode'
                      onChange={(e) => setPincode(e.target.value)}
                      value={pincode}
                      className="form-control" placeholder='Enter your Pincode' />
                  </div>
                  <div className='col-6 my-2'>
                    <label htmlFor="userLocality" className='fw-bold ms-2'>Locality</label>
                    <input type="text" id='userLocality'
                      onChange={(e) => setLocality(e.target.value)}
                      value={locality}
                      className="form-control" placeholder='Enter your Locality' />
                  </div>
                  <div className='col-11 my-2'>
                    <label htmlFor="userAddress" className='fw-bold ms-2'>Address</label>
                    <br />
                    <textarea id="userAddress"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      className='form-control'>
                    </textarea>
                  </div>
                  <div className='text-center'>
                    <button className="btn btn-warning fw-bold"
                      data-bs-toggle="collapse" data-bs-target="#clp1">Confirm Address
                    </button>
                  </div>
                </div>
              </form>
              <div className="checkAddress mt-3">
                {userSavedAddress &&
                  <>
                    <h3>Select address</h3>
                    <form>
                      {
                        userSavedAddress.map(userAddress => {
                          return (
                            <div className="form-check mb-3" key={userAddress.id}>
                              <input className="form-check-input"
                                id={userAddress.id}
                                type="radio"
                                name="address"
                                value={userAddress}
                                onChange={() => setUserSelectedAddress(userAddress)}
                              />
                              <label className="form-check-label " htmlFor={userAddress.id}>
                                <span className='fw-bold'>{userAddress.name}</span>
                                <br />
                                <span className='fw-bold'><i className="fa-solid fa-phone"></i> {userAddress.number}</span>
                                <br />
                                <span><i className="fa-solid fa-location-dot"></i> {userAddress.address}.</span>
                              </label>
                            </div>
                          )
                        })
                      }
                    </form>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-4 my-4">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className='text-center fw-bold'>Order Details</h4>
            </div>
            <div className="card-body">
              <h6>Price ({count} items) <span className='float-end'>₹ {price}.00</span></h6>
              <h6>Delivery Charges <span className='float-end text-success fw-bold'>FREE</span></h6>
              <hr />
              <h6>Total Amount <span className='float-end'>₹ {price}.00</span></h6>
            </div>
          </div>
        </div>
      </div>
      <OrderConformation userSelectedAddress={userSelectedAddress} />
    </div>
  )
}

export default CartOrderConformation