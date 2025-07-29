import {} from 'react'
import './CountryCard.css'

const CountryCard = ({country, style}) => {


  return (
    <div className='countryCard' style={style}>
        <img src={country.flags.svg} alt={country.name.common} className='flag' />
        <div className='info'>
            <h2>{country.name.common}</h2>
            <p><strong>Population: </strong>{country.population.toLocaleString()}</p>
            <p><strong>Region: </strong>{country.region}</p>
            <p><strong>Capital: </strong>{country.capital}</p>
            <p><strong>Language: </strong>{country.languages
            ? Object.values(country.languages).join(', ')
                : 'No language data available'
            }</p>
            <p><strong>Currencies: </strong>{country.currencies
            ? Object.values(country.currencies)
                    .map((currency) => `${currency.name} (${currency.symbol})`)
                    .join(', ')
                : 'No currency data available'
            }</p>
            <p><strong>Map: </strong>
            {country.maps ? (
                <>
                    <a
                      href={country.maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                
                  </>
                  ) : (
                  'No map links available'
                )}
                          
            </p>
        </div>
    
    </div>
  )
}

export default CountryCard