import React from 'react'
import './Table.css'

const Table = ({ countries }) => {
  return (
    <div className='container'>
      <table className='table'>
        <thead>
          <tr id='title-row'>
            <th>
              <h3 className='title'>Live Cases by Country</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>{cases.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
