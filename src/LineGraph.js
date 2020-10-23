import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

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

const LineGraph = ({ casesType }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType)
          setData(chartData)
        })
    }

    fetchData()
  }, [casesType])

  return (
    <div>
      <h3>Worldwide new cases</h3>
      <div>
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
      label: function (tooltipItem) {
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
          callback: function (value) {
            return numeral(value).format('0a')
          },
        },
      },
    ],
  },
}

export default LineGraph
