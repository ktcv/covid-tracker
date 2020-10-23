import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import { prettyPrintStat } from './utils'
import './InfoBox.css'

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className='infoBox'>
      <CardContent>
        <div className='infoBox__title'>{title}</div>
        <div className='infoBox__label'>
          <div>24 hours:</div>
          <span className='infoBox__span'>
            +{cases && prettyPrintStat(cases)}
          </span>
        </div>
        <div className='infoBox__label'>
          <div>Total:</div>
          <span>{total && total.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default InfoBox
