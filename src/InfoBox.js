import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography className='infoBox__title' color='textPrimary'>
          {title}
        </Typography>
        <Typography className='infoBox__cases' color='textPrimary'>
          24 hours: {cases}
        </Typography>
        <Typography className='infoBox__total' color='textPrimary'>
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
