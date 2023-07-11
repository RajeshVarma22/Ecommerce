import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../src/components/CustomHooks/useFetch'


const SingleMobile = () => {
  // const { id } = useParams()
  // // const { data, pending, err } = useFetch('http://localhost:8000/onePlusMobiles/21')
  // // console.log(data)
  // const[data, setSmtg] = useState({

  // })
  // useEffect(() => {
  //   axios.get(`http://localhost:8000/onePlusMobiles/${id}`)
  //   .then(res => {
  //     // console.log(res.data)
  //     setSmtg(res.data)
  //   })
  // }, [id])
  
  // return (
  //   <div className='ShowSelectedContent container'>
  //     <div className="card">
  //       {/* {pending && <div><span className='spinner-border spinner-border-sm text-dark'></span> <h1>Loading</h1></div>} */}
  //       {/* {err && <h1>{err}</h1>} */}
  //       {data &&
  //         <div className="row">
  //           <div className="col-4">
  //             <img src={data.image} alt="No image" />
  //             {/* <img src={smg} alt="" /> */}
  //           </div>
  //           <div className="col-6">
  //             <h1>{data.text}</h1>
  //           </div>
  //         </div>
  //       }
  //     </div>
  //     <img src={data.image} alt="here" width={data.width} height={data.height} />
  //     <p className='p-5 bg-success'>{data.text}</p>
  //   </div>
  // )

  
}

export default SingleMobile