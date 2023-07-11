import axios from 'axios'
import React from 'react'
import './clothes.css'
import { useEffect } from 'react'
import { useState } from 'react'
import AddToCart from '../Cart/AddToCart'
import BuyNow from '../OrderDetails/BuyNow'
import { useParams } from 'react-router-dom'

const ShowEachClothes = () => {

  const [data, setData] = useState([])
  const [click, setClcik] = useState(false)
  const {path} = useParams()

  // let dataDisplayed =  document.querySelector('showClothesCards')
  // if(path === "womensWear") {
  //   dataDisplayed.classList.add('col-3 text-center my-2 showClothesCards')
  // }

  useEffect(() => {
    return () => {
      axios.get(`http://localhost:8000/${path}`)
        .then(response => {
          // console.log(response)
          // console.log(response.data)
          console.log(path)
          setData(response.data)
        }).catch(error => {
          console.log(error)
        })
    }
  }, [click])

  const like = (id) => {
    // let changedData = data
    // changedData.like = !changedData.like
    // console.log(changedData)
    let modifiedData = {}
    data.forEach(item => {
      if (item.id === id) {
        item.like = !item.like
        modifiedData = item
      }
    })

    console.log(modifiedData)

    axios.put(`http://localhost:8000/${path}/${id}`, modifiedData)
      .then(response => {
        console.log(response)
        console.log(response.data)
        setClcik(!click)
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='showEachClothes container'>
      <div className="row">
        {
          data.map(item => {
            return (
              <>
                {
                  path === "womensWear" ?
                    <div className="col-4 text-center my-2 showClothesCards" key={item.id + item.text}>
                      <div className="card">
                        <div className="card-body ">
                          <button onClick={() => like(item.id)} className='womensWearBtnLike' >
                          {/* <button onClick={() => like(item.id)} className='btn btnForLike' style={{ position: 'relative', top: '0px', float: 'right', outline: 'none', border: 'none' }}> */}
                            {item.like ? <i className='fa-solid fa-heart text-danger fa-2x'></i> : <i className='fa-regular fa-heart fa-2x'></i>}
                          </button>
                          <div className="clothesImageContainer">
                            <img src={item.image} alt="here" height={item.height} width={item.width} />
                            <div className="clothesImageContent p-2">
                              <h6 className='bg-info p-2 cornersCurveSm'>₹ {item.cost}</h6>
                              <h6 className='bg-secondary p-2 cornersCurveSm'>Color: {item.color}</h6>
                              <AddToCart data={item} className="mb-2"/>
                              <BuyNow productToBuy={item} />
                            </div>
                            <div className="clothesImageContent2" style={{ float: 'right' }}>
                              <select style={{ display: 'block' }} className='fw-bold py-1 text-center' >
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <h6>{item.text}</h6>
                        </div>
                      </div>
                    </div> :
                    <div className="col-4 text-center my-2 showClothesCards" key={item.id}>
                      <div className="card">
                        <div className="card-body ">
                          <div className="clothesImageContainer ">
                            {/* <button onClick={() => like(item.id)} className='mx-2 bg-white p-2' style={{ position: 'absolute', top: '10px', right: '10px', float: 'right', outline: 'none', border: 'none', borderRadius: '50%' }}> */}
                            <button onClick={() => like(item.id)} className='mx-2 bg-white p-2 btnForLike' >
                              {item.like ? <i className='fa-solid fa-heart text-danger'></i> : <i className='fa-regular fa-heart'></i>}
                            </button>
                            <img src={item.image} alt="here" className='' height={item.height} width={item.width} />
                            <div className="clothesImageContent p-2">
                              <h6 className='bg-info p-2 '>₹ {item.cost}</h6>
                              <h6 className='bg-secondary p-2'>Color: {item.color}</h6>
                              <AddToCart data={item} />
                              <BuyNow productToBuy={item}/>
                            </div>
                            <div className="clothesImageContent2" style={{ float: 'right' }}>
                              <select style={{ display: 'block' }} className='fw-bold py-1 text-center'>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <h6>{item.text}</h6>
                        </div>
                      </div>
                    </div>
                }
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default ShowEachClothes