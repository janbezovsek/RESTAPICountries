import {useState} from 'react'
import './CountryList.css'
import CountryCard from './CountryCard'

const CountryList = ({countries}) => {


  return  (
    <div className='countryList'>
        {countries.map((country, index) => {
            return <CountryCard key={index} country={country}
            style={{animationDelay: `${index * 0.1}s`}}/>
        })}
    </div>
  )
  
}

export default CountryList