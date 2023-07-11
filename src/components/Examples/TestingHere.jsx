import React from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetch from '../CustomHooks/useFetch'

const TestingHere = () => {
  const { id } = useParams()
  const{data, pending, err} = useFetch(`http://localhost:8000/onePlusMobiles/${id}`);
  console.log(data)
  return (
    <div className="test">
      <h1>Hello</h1>
      <h1>{data.text}</h1>
      <h3>{data.image}</h3>
      <h3>images/Mobiles/OnePlus/OnePlus9pro5g.jpg</h3>
      <img src={data.image} alt="" />
    </div>
  )
}

export default TestingHere