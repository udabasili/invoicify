import { device } from '@/utils/responsiveBreakpoints'
import styled from 'styled-components'

export const InvoiceListContainer = styled.div`
    display:  grid;
    grid-template-rows: min-content max-content ;
    min-height: 100vh ;
    grid-template-columns: 1fr ;

    @media ${device.tabletPort} {
        padding-left: 1rem;
        padding-right: 1rem;
    }
`

export const FormContainerExtended = styled.div`
    display: grid ;
    grid-template-columns: repeat(2, 1fr) ;
`
export const Form = styled.form`
`

export const InvoiceItemForm = styled.form`
    display: flex;
    flex-direction: column;
`