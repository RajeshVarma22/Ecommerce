import { useState, useEffect } from "react";

const useFetch = (url) => {
  const[data, setData] = useState([]);
  const[pending, setPending] = useState(true);
  const[err, setErr] = useState();
  // console.log("In Fetching",pending)

  useEffect(() => { 
    let fetchData = async () => {
      try{
        const res = await fetch(url);
        if(!res.ok){
          throw ('Cannot access data')
        }
        const data = await res.json();
        setData(data);
        setPending(false)
        // console.log(pending)
        setErr(null) 
      } catch(err) {
        setErr(err);
      }
    }

    fetchData();

    // setTimeout(() => {
    //   fetchData();
    // }, 1000);

  }, [url])

  return {data, pending, err, setData, setErr, setPending}  
  
}

export default useFetch