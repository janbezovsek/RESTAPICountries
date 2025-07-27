import React, { useState, useEffect } from 'react'
import axios from "axios"
import CountryList from './components/CountryList'
import './App.css'

function App() {
  // State for dropdowns
  const [showHeader1Dropdown, setShowHeader1Dropdown] = useState(false);
  const [showHeader3Dropdown, setShowHeader3Dropdown] = useState(false);
  // State for button text
  const [header1ButtonText, setHeader1ButtonText] = useState('Options');
  const [header3ButtonText, setHeader3ButtonText] = useState('Continents');
  // State for action message
  const [actionMessage, setActionMessage] = useState('');
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch countries from REST Countries API
  const API_URL = "https://restcountries.com/v3.1/independent?status=true"
  useEffect(()=> {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      const response = await axios.get(API_URL)
      const data =  response.data
      
      if (data) setCountries(data)
      

    } catch (error) {
      console.log(error)
    }
  }

  


  // Filter countries based on search term
  

  
  // Toggle dropdowns
  const toggleHeader1Dropdown = () => setShowHeader1Dropdown(!showHeader1Dropdown);
  const toggleHeader3Dropdown = () => setShowHeader3Dropdown(!showHeader3Dropdown);

  // Handle search input
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Handle header1 option selection
  const handleHeader1Option = (option) => {
    setHeader1ButtonText(option === 'None' ? 'Options' : option);
    setShowHeader1Dropdown(false);
    // Signal action 
    if (option !== 'None') {
    setActionMessage(`Header1 action: ${option}`);
    if (option === 'Sort by Name') {
      setCountries([...countries].sort((a, b) => a.name.common.localeCompare(b.name.common)));
    } else if (option === 'Sort by Population') {
      setCountries([...countries].sort((a, b) => b.population - a.population));
    }
  } else {
    setActionMessage('');
  }
  console.log('Header1 selected:', option);
    console.log('Header1 selected:', option);
  };

  // Handle header3 option selection
  const handleHeader3Option = (option) => {
    setHeader3ButtonText(option === 'None' ? 'More' : option);
    setShowHeader3Dropdown(false);
    // Signal action 
    setActionMessage(option === 'None' ? '' : `Header3 action: ${option}`);
    console.log('Header3 selected:', option);
  }

  console.log(countries)

  return (
    <div className="app">
      <div className="header">
        <div className="header1">
          <button className="dropdown-button" onClick={toggleHeader1Dropdown}>
            {header1ButtonText}
          </button>
          {showHeader1Dropdown && (
            <div className="dropdown-menu show">
              <button onClick={() => handleHeader1Option('None')}>None</button>
              <button onClick={() => handleHeader1Option('Sort by Name')}>
                Sort by Name
              </button>
              <button onClick={() => handleHeader1Option('Sort by Population')}>
                Sort by Population
              </button>
              <button onClick={() => handleHeader1Option('Sort by Area')}>
                Sort by Area
              </button>
              <button onClick={() => handleHeader1Option('Sort by GDP')}>
                Sort by GDP
              </button>
            </div>
          )}
        </div>
        <div className="header2">
          <input
            type="text"
            className="search-input"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <div className="search-results show">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <div key={country.cca3}>{country.name.common}</div>
                ))
              ) : (
                <div>No results found</div>
              )}
            </div>
          )}
        </div>
        <div className="header3">
          <button className="dropdown-button" onClick={toggleHeader3Dropdown}>
            {header3ButtonText}
          </button>
          {showHeader3Dropdown && (
            <div className="dropdown-menu show">
              <button onClick={() => handleHeader3Option('Continents')}>Continents</button>
              <button onClick={() => handleHeader3Option('Asia')}>Asia</button>
              <button onClick={() => handleHeader3Option('Africa')}>Africa</button>
              <button onClick={() => handleHeader3Option('North America')}>North America</button>
              <button onClick={() => handleHeader3Option('South America')}>South America</button>
              <button onClick={() => handleHeader3Option('Antarctica')}>Antarctica</button>
              <button onClick={() => handleHeader3Option('Europe')}>Europe</button>
              <button onClick={() => handleHeader3Option('Australia')}>Australia</button>
            </div>
          )}
        </div>
      </div>
      <div className="main">
        <CountryList countries = {countries} />
      </div>
    </div>
  );
}

export default App;