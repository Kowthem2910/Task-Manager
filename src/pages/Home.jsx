import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {data} = useSelector(mapStatetoProps);
  return (
    <div>
      <h1>Home</h1>
      <h2>{data.email}</h2>
    </div>
  )
}

const mapStatetoProps = (user) =>{
  return (
    user.user.userInfo
  )
}

export default Home