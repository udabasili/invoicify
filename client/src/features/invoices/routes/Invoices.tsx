import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'
import { CustomProps } from '@/components/CustomHeader/CustomHeader'
import { InvoiceList } from '../components/InvoiceList'
import { InvoiceForm } from '../components/InvoiceForm'
import { ContentLayout } from '@/components/Layout'


type ComponentMapProps = {
  [x: string]: FC<CustomProps>
}

export const Invoices = () => {

  const [currentState, setCurrentState] = useState<'form'|'list'>('list')

  const COMPONENT_MAP: ComponentMapProps = {
    list: InvoiceList,
    form: InvoiceForm
  }

  const Component = COMPONENT_MAP[currentState]

  return (
    <ContentLayout title="Invoices">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Component setCurrentState={setCurrentState}/>
      </div>
    </ContentLayout>
  )
}


