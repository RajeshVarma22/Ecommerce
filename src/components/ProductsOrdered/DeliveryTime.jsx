import React, { useState } from 'react'

const DeliveryTime = ({ product }) => {

  const productDeliveryTime = () => {

    let date = '16/2/2023'
    let days = product.delivery

    // var currentdate = new Date();
    // var datetime = currentdate.getDate() + "/"
    //   + (currentdate.getMonth() + 1) + "/"
    //   + currentdate.getFullYear() + " @ "
    //   + currentdate.getHours() + ":"
    //   + currentdate.getMinutes() + ":"
    //   + currentdate.getSeconds();
    // console.log(datetime)

    // let cnhg = currentdate.setDate(currentdate.getDate() + days)
    // console.log(cnhg)

    let newDate = new Date()
    let cnvrt = newDate.getDate()
    let aa = newDate.setDate(newDate.getDate() + 5)
    console.log(aa)
    console.log(cnvrt)
  }

  return (
    <div id='DeliveryTime'>
      {/* <div className="orderStatus mb-3">
        <label htmlFor="disabledRange" className="form-label">Delivery Status</label>
        <input type="range" className="form-range" id="disabledRange" min={1} max={10} value={10} disabled />
        <div className="progress">
          <div className="progress-bar" role="progressbar" aria-label="Example with label" style={{width: '40%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
          <div className="progress-bar bg-success" role="progressbar" aria-label="Example with label" style={{ width: '7%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
        </div>
      </div> */}
      {/* <button className="btn btn-success" onClick={productDeliveryTime}>Click</button> */}
      <button className="btn btn-danger mb-1" data-bs-toggle="collapse" data-bs-target="#clp1">Show Address</button>
      <div className="collapse mt-3" id="clp1">
        <div className="card">
          <div className="card-body">
            <p>Name : {product.selectedAddress.name}</p>
            <p>Phone : {product.selectedAddress.number}</p>
            <p>Address : {product.selectedAddress.address}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryTime