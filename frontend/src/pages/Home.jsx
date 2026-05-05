import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/topDoctors'
import Banner from '../components/Banner'
const Home = () => {
  return (
    <h1>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </h1>
  )
}

export default Home