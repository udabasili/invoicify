import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'
import { ClientsList } from '../components/ClientList'
import { ClientForm } from '../components/ClientForm'
import { CustomProps } from '@/components/CustomHeader/CustomHeader'
import { ContentLayout } from '@/components/Layout'
import { useLocation } from 'react-router-dom'


type ComponentMapProps = {
  [x: string]: FC<CustomProps>
}

interface LocationState {
  type: 'form'|'list'
}


export const Clients = () => {

  const location = useLocation();
  const pathname = location.state ? (location.state as LocationState).type : ''
  const [currentState, setCurrentState] = useState<'form'|'list'>(pathname ? pathname : 'list')

  const COMPONENT_MAP: ComponentMapProps = {
    list: ClientsList,
    form: ClientForm
  }

  const Component = COMPONENT_MAP[currentState]

  return (
    <ContentLayout title="Clients">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Component setCurrentState={setCurrentState}/>
      </div>
    </ContentLayout>
  )
}

