import React, { useState, useEffect } from 'react'
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core'

import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'

import './App.css'
import 'leaflet/dist/leaflet.css'
import { sortData } from './utils'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 16.5388, lng: 10.0418 })
  const [mapZoom, setMapZoom] = useState(2)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    const getCountries = () => {
      // fetch worldwide stats from API upon mount
      fetch('https://disease.sh/v3/covid-19/all')
        .then((response) => response.json())
        .then((data) => setCountryInfo(data))

      // fetch countries from API upon mount
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))

          const sortedData = sortData(data)
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)
        })
    }

    getCountries()
  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
        setMapCenter(
          countryCode === 'worldwide'
            ? [16.5388, 10.0418]
            : [data.countryInfo.lat, data.countryInfo.long]
        )
        setMapZoom(countryCode === 'worldwide' ? 2 : 4)
      })
  }

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1 className='app__title'>Live COVID-19 Heatmap</h1>

          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox
            title='Cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            onClick={() => setCasesType('cases')}
            active={casesType === 'cases'}
            isRed
          />
          <InfoBox
            title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            onClick={() => setCasesType('recovered')}
            active={casesType === 'recovered'}
          />
          <InfoBox
            title='Deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            onClick={() => setCasesType('deaths')}
            active={casesType === 'deaths'}
            isRed
          />
        </div>
        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />
      </div>

      <Card className='app__right'>
        <CardContent className='app__right-content'>
          <Table countries={tableData} />
          <LineGraph
            casesType={casesType}
            country={country}
            countryInfo={countryInfo}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
