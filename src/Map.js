import React from 'react'
import { Map as Leaflet, TileLayer } from 'react-leaflet'
import { Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'
import './Map.css'

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <div className='map'>
      <Leaflet center={center} zoom={zoom}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {showDataOnMap(countries, casesType)}
      </Leaflet>
    </div>
  )
}

export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color='transparent'
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div>
          <div className='info'>
            <strong>{country.country}</strong>
          </div>
          <div className='info'>
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className='info'>
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className='info'>
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ))

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
}

export default Map
