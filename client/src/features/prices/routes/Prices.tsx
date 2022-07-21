import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'
import { PricesList } from '../components/PriceList'
import { PriceForm } from '../components/PriceForm'
import { CustomProps } from '@/components/CustomHeader/CustomHeader'
import { ContentLayout } from '@/components/Layout'


type ComponentMapProps = {
  [x: string]: FC<CustomProps>
}

export const Prices = () => {

  const [currentState, setCurrentState] = useState<'form'|'list'>('list')

  const COMPONENT_MAP: ComponentMapProps = {
    list: PricesList,
    form: PriceForm
  }

  const Component = COMPONENT_MAP[currentState]

  return (
    <ContentLayout title="Price Plans">
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Component setCurrentState={setCurrentState}/>
      </div>
    </ContentLayout>
    
  )
}
