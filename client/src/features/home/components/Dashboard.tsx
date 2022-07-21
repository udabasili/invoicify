import React from 'react'
import { CardLarge, CardMedium, CardSmall, DashboardWrapper } from './dashboard.style'

export const Dashboard = () => {
  return (
    <DashboardWrapper>
        <CardSmall className='sales'>

        </CardSmall>
        <CardSmall className='revenue'>

        </CardSmall>
        <CardSmall className='cost'>

        </CardSmall>
        <CardSmall className='profit'>

        </CardSmall>
        <CardLarge className="sales-overview">

        </CardLarge>
        <CardMedium className="cost-breakdown">

        </CardMedium>
        <CardMedium className="monthly-profits">

        </CardMedium>
        <CardMedium className="country-wise ">

        </CardMedium>
        <CardMedium className="activity">

        </CardMedium>

    </DashboardWrapper>
  )
}

