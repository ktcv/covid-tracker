import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        <Typography className='infoBox__cases'>24 hours: {cases}</Typography>
        <Typography className='infoBox__total' color='textSecondary'>
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
