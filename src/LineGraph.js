import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import './LineGraph.css'

const buildChartData = (data, casesType = 'cases') => {
  let chartData = []
  let lastDataPoint
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      }
      chartData.push(newDataPoint)
    }
    lastDataPoint = data[casesType][date]
  }
  return chartData
}

const LineGraph = ({ casesType, country, countryInfo }) => {
  const [data, setData] = useState({})
  const countryCode = country === 'worldwide' ? 'all' : country

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120`
      )
        .then((response) => response.json())
        .then((data) => {
          if (country === 'worldwide') {
            const chartData = buildChartData(data, casesType)
            setData(chartData)
          } else {
            const chartData = buildChartData(data.timeline, casesType)
            setData(chartData)
          }
        })
    }

    fetchData()
  }, [casesType, countryCode, country])

  return (
    <div>
      <h3 className='chart-title'>
        {country === 'worldwide' ? 'Worldwide' : countryInfo.country} Daily{' '}
        {casesType}
      </h3>
      <div className='chart-container'>
        {data?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: 'rgba(204, 16, 52, 0)',
                  borderColor: '#CC1034',
                  data: data,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
    </div>
  )
}

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: (tooltipItem) => {
        return numeral(tooltipItem.value).format('+0,0')
      },
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            return numeral(value).format('0a')
          },
        },
      },
    ],
  },
}

export default LineGraph
