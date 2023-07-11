import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddToCart from '../../Cart/AddToCart'

const EachLaptopList = () => {


  const [data, setData] = useState([])
  const { path } = useParams()

  const setSelectedPath = (path) => {
    sessionStorage.setItem('productPath', path)
  }
  
  useEffect(() => {
    return () => {
      // axios.get(`http://localhost:8000/${routedPath}`)
      axios.get(`http://localhost:8000/${path}`)
        .then(response => {
          console.log(response)
          console.log(response.data)
          setData(response.data)
        }).catch(error => {
          console.log(error)
        })
    }
  }, [])

  return (
    <div className='eachLaptopList container'>
      {
        data.map(item => {
          return (
            <div className="card my-2 shadow-lg" key={item.id}>
              <Link to={`${item.id}`} onClick={setSelectedPath(`${item.path}`)} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="card-body border">
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 text-center">
                      <span style={{ position: 'relative', top: '0px', right: '0px', float: 'right' }}>
                        {item.like ? <i className='fa-solid fa-heart text-danger fa-2x'></i> : <i className='fa-regular fa-heart'></i>}
                      </span>
                      <img src={item.image} alt="" className='pb-4  pt-2 p-3' height={item.height / 1.2} width={item.width * 2} />
                    </div>
                    <div className="col-md-6 order-2 order-md-2">
                      <h4>{item.name.slice(0, 75)}......</h4>
                      <ul>
                        <li>
                          {item.processorBrand} {item.processorGeneration} {item.processorName}
                        </li>
                        <li>{item.ram} GB {item.ramType}</li>
                        <li>{item.os}</li>
                        <li>{item.size}</li>
                        <li>{item.internalStorage} GB {item.storageType}</li>
                        <li>Ms.Office: {item.msOffice}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 col-lg-2 text-center order-md-3 ">
                      <h4 className='fw-bold'>₹{item.cost.toFixed(2)}</h4>
                      <p>Free Delivery</p>
                      {/* <AddToCart data={data} /> */}
                      {/* <AddToCart data={item} /> */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default EachLaptopList