import React, { useState, useEffect } from 'react'
import axios from "axios"
import CountryList from './components/CountryList'
import './App.css'

function App() {
  // State for dropdowns
  const [showHeader3Dropdown, setShowHeader3Dropdown] = useState(false)
  // State for button text
  const [header1ButtonText, setHeader1ButtonText] = useState('Sort by Population')
  const [header3ButtonText, setHeader3ButtonText] = useState('Filter by Continents')
  // State for filters and sorting
  const [sortByPopulation, setSortByPopulation] = useState(false)
  const [continentFilter, setContinentFilter] = useState('')

  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  // State for debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  // Fetch countries from REST Countries API
  const API_URL = "https://restcountries.com/v3.1/independent?status=true"
  useEffect(()=> {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      const response = await axios.get(API_URL)
      const data =  response.data
      if (data) {
        // Sort by name by default for consistent initial display
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountries(sortedData)
        setFilteredCountries(sortedData)
      }  
    } catch (error) {
      console.error('Error fetching countries:', error)
      setFilteredCountries([])
    }
  }

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300) // 300ms debounce
    return () => clearTimeout(handler)
  }, [searchTerm])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...countries] // Start with a fresh copy of countries

    // Apply continent filter (header3)
    if (continentFilter && continentFilter !== 'All Countries') {
      result = result.filter((country) => country.continents.includes(continentFilter))
    }

    // Apply search filter
    if (debouncedSearchTerm) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    }

    // Apply sorting (header1)
    if (sortByPopulation) {
      //console.log('Applying sort: Population') // Debug log
      result = [...result].sort((a, b) => b.population - a.population) // Descending
    }
    //console.log('Filtered and sorted countries:', result.length) // Debug log
    //console.log(result)
    setFilteredCountries(result)
  }, [debouncedSearchTerm, continentFilter, sortByPopulation, countries])
  
  // Toggle dropdowns
  const toggleHeader3Dropdown = () => setShowHeader3Dropdown(!showHeader3Dropdown)

  // Handle search input
  const handleSearch = (e) => setSearchTerm(e.target.value)

  // Toggle sorting for header1
  const toggleSortByPopulation = () => {
    const newSortState = !sortByPopulation;
    //console.log('Toggling sort:', newSortState ? 'Population' : 'None') // Debug log
    setSortByPopulation(newSortState)
    setHeader1ButtonText(newSortState ? 'Sorted by Population' : 'Sort by Population')
  }

  // Handle header3 option selection (continent filter)
  const handleHeader3Option = (option) => {
    setHeader3ButtonText(option === 'All Countries' ? 'Filter by Continent' : option)
    setContinentFilter(option === 'None' ? 'All Countries' : option)
    setShowHeader3Dropdown(false)
  }

return (
    <div className="app">
      <div className="header">
        <div className="header1">
        <button
            className="dropdown-button"
            onClick={toggleSortByPopulation}
            aria-label={`Toggle ${header1ButtonText}`}
          >
            {header1ButtonText}
          </button>
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
                filteredCountries.slice(0, 10).map((country) => (
                  <div key={country.cca3}>{country.name.common} ({country.continents[0]})</div>
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
            <div className="dropdown-menu show" >
              <button onClick={() => handleHeader3Option('All Countries')}>All countries</button>
              <button onClick={() => handleHeader3Option('Africa')}>Africa</button>
              <button onClick={() => handleHeader3Option('Asia')}>Asia</button>
              <button onClick={() => handleHeader3Option('Europe')}>Europe</button>
              <button onClick={() => handleHeader3Option('North America')}>North America</button>
              <button onClick={() => handleHeader3Option('South America')}>South America</button>
              <button onClick={() => handleHeader3Option('Oceania')}>Oceania</button>
            </div>
          )}
        </div>
      </div>
      <div className="main">
        {filteredCountries.length === 0 && <p>No countries match the current filters.</p>}
        <CountryList filteredCountries = {filteredCountries} />
      </div>
    </div>
  )
}

export default App;