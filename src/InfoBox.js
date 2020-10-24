import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import { prettyPrintStat } from './utils'
import './InfoBox.css'

const InfoBox = ({ title, cases, total, active, isRed, ...props }) => {
  return (
    <Card
      className={`infoBox ${active && 'infoBox--active'}`}
      onClick={props.onClick}
    >
      <CardContent>
        <div className='infoBox__title'>{title}</div>
        <div className='infoBox__label'>
          <div>24 hours:</div>
          <span className={`infoBox__span ${isRed && 'infoBox--isRed'}`}>
            +{cases && prettyPrintStat(cases)}
          </span>
        </div>
        <div className='infoBox__label'>
          <div>Total:</div>
          <span className={`infoBox__span ${isRed && 'infoBox--isRed'}`}>
            {total && total.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default InfoBox
