import { device } from '@/utils/responsiveBreakpoints';
import styled from 'styled-components'


export const PriceListContainer = styled.div`
    display:  grid;
    grid-template-rows: min-content max-content ;
    height: 100vh ;
    grid-template-columns: 1fr ;

    @media ${device.tabletPort} {
        padding-left: 3rem;
        padding-right: 3rem;
    }
`