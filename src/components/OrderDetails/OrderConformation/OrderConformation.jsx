import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../OrderConformation.css'

const OrderConformation = ({ userSelectedAddress }) => {
  const [randumDay, setRandomDay] = useState(Math.floor(Math.random() * 6) + 2)
  const [orderStatus, setOrderStatus] = useState(false)
  const [totalUsersDetails, setTotalUsersDetails] = useState([])
  const [orderConformationStatus, setOrderConformationStatus] = useState(null)
  const [dayAndTime, setDayAndTime] = useState()

  useEffect(() => {
    return () => {
      axios.get(`http://localhost:8000/userOrders`)
        .then(response => {
          setTotalUsersDetails(response.data)
          var currentdate = new Date();
          var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
          console.log(datetime)
          setDayAndTime(datetime)
        }).catch(error => {
          console.log(error)
        })
    }
  }, [])

  let navigate = useNavigate()

  const orderPlaced = () => {
    let localUser = JSON.parse(localStorage.getItem('currentUser'))
    let itemsToBuy = JSON.parse(sessionStorage.getItem('itemToBuy'))
    let orderFrom = sessionStorage.getItem('from')
    // let navigate = useNavigate()
    // console.log(itemsToBuy)
    // console.log(itemsToBuy)
    for (let i of totalUsersDetails) {
      if (localUser.email === i.userEmail) {
        if (orderFrom === "Cart") {
          // let userDetails = [...i.orders, ...itemsToBuy]
          let userDetails = [...i.orders]
          for (let products of itemsToBuy) {
            userDetails.push({ ...products, orderedOn: dayAndTime, delivery: randumDay, selectedAddress: userSelectedAddress })
          }
          axios.put(`http://localhost:8000/userOrders/${i.id}`, {
            userEmail: i.userEmail,
            orders: userDetails,
          }).then(response => {
            console.log(response)
            let userCartId = localStorage.getItem('userCartId')
            axios.delete(`http://localhost:8000/usersCart/${userCartId}`)
              .then(response => {
                console.log(response)
                navigate('/orders')
              })
              .catch(error => {
                console.log(error)
              })
          }).catch(error => {
            console.log(error)
          })
        } else {
          let userDetails = [...i.orders, { ...itemsToBuy, orderedOn: dayAndTime, delivery: randumDay, selectedAddress: userSelectedAddress }]
          // console.log(userDetails)
          axios.put(`http://localhost:8000/userOrders/${i.id}`, {
            userEmail: i.userEmail,
            orders: userDetails,
          }).then(response => {
            console.log(response)
            navigate('/orders')
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
    if (totalUsersDetails.length === 0) {
      if (orderFrom === "Cart") {
        // let userDetails = [...itemsToBuy]
        // console.log(userDetails)
        let userDetails = []
        for (let products of itemsToBuy) {
          userDetails.push({ ...products, orderedOn: dayAndTime, delivery: randumDay, selectedAddress: userSelectedAddress })
        }
        axios.post(`http://localhost:8000/userOrders`, {
          id: 1,
          userEmail: localUser.email,
          orders: userDetails,
        }).then(response => {
          console.log(response)
          let userCartId = localStorage.getItem('userCartId')
          axios.delete(`http://localhost:8000/usersCart/${userCartId}`)
            .then(response => {
              console.log(response)
              navigate('/orders')
            })
            .catch(error => {
              console.log(error)
            })
        }).catch(error => {
          console.log(error)
        })
      } else {
        let userDetails = { ...itemsToBuy, orderedOn: dayAndTime, delivery: randumDay, selectedAddress: userSelectedAddress }
        // console.log(items)
        // console.log(itemsToBuy)
        // console.log(userDetails)
        axios.post(`http://localhost:8000/userOrders`, {
          id: 1,
          userEmail: localUser.email,
          orders: [...userDetails],
        }).then(response => {
          console.log(response)
          console.log(response.data)
          navigate('/orders')
        }).catch(error => {
          console.log(error)
        })
      }
    }
    setOrderStatus(true)
  }

  return (
    <div id='OrderConformation'>
      <button className='btn' onClick={orderPlaced} disabled={!userSelectedAddress} data-bs-toggle="modal" data-bs-target="#btnForOrderStatus">Confirm Order</button>
      <div className="modal fade" id="btnForOrderStatus" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content animate__animated animate__fadeInTopLeft animate_delay-3s animate__slow">
            <div className="modal-body">
              <div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div>
                <h1>Your product will be delivered in {randumDay} days</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default OrderConformation