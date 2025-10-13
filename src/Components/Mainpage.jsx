import React, { useState } from 'react'
import Mealcards from './Mealcards'

const Mainpage = () => {
  
  const [data, setData] = useState();
  const [search, setSearch] = useState(""); 
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
  }

  const myFun = async () => {
    if (search === "") {
      setMessage("Please Enter Something");
      setData(null); 
    } else {
      const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const jsonData = await get.json();
      setData(jsonData.meals);
      setMessage(""); 
    }
  }

  return (
    <>
      <h1 className='head'>FOOD RECIPE APP</h1>
      <div className="container">
        <div className="searchBar">
          <input type="text" placeholder='Enter Dish' onChange={handleInput} />
          <button onClick={myFun}>Search</button>
        </div>
        <h4 className='msg'>{message}</h4>
        <div>
          <Mealcards detail={data} />
        </div>
      </div>
    </>
  )
}

export default Mainpage;
