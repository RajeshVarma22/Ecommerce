import React from 'react'
import useFetch from '../CustomHooks/useFetch'

const Tstng = () => {
  const {data, pending, err} = useFetch('http://localhost:8000/onePlusMobiles/22');
  console.log(data)


  return (
    <div>
      <h1>Here working</h1>
      {pending && <div>Load...</div>}
      {err && <div>{err}</div>}
      <h1>{data.text}</h1>
      {/* <h1>{data.image}</h1> */}
      <h1>"images/Mobiles/Oneplus/Oneplus 10R(Sierra Black, 256 Gb).jpg"</h1>
      <h1>"images/Mobiles/Oneplus/Oneplus 10R(Sierra Black, 256 Gb).jpg"</h1>
      <img src={data.image} alt="ntg" />
      {/* {
        data.mobiles && data.mobiles.map((mobo) => {
          return (
            <div className="card">
              <div className="card-body">
                <h1>{mobo.text}</h1>
              </div>
            </div>
          )
        })
      } */}
    </div>
  )
}

export default Tstng