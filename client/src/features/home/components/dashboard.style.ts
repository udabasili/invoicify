import { device } from '@/utils/responsiveBreakpoints';
import styled from 'styled-components'

export const DashboardWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  grid-template-rows: 12rem  ;
  grid-auto-rows: 16rem ;
  gap: 10px;
  background-color: #2196F3;
  padding: 2rem ;

  @media ${device.tabletLand} {
      grid-column: 1 / -1 ;
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));

      width: 100%;
  }


  & > div {
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
  }
  

`;

const Card = styled.div`
  width: 100% ;
  height: 100% ;
  background-color: blue ;


`

export const CardSmall = styled(Card)`
  background-color: blue ;

`

export const CardMedium = styled(Card)`
  background-color: green ;
  grid-column: span 2;
  padding: 4rem;
  width: 80%;
  justify-self: flex-end ; 

  @media ${device.tabletLand} {
      grid-column: 1 / -1 ;
      width: 100%;

  }

  @media ${device.tabletPort} {
      grid-column: 1 / -1 ;
      width: 100%;
  }

  &.activity {
    grid-row: 4 / 5;
    width: 100%;
    grid-column: 1 / 3;

    @media ${device.tabletPort} {
      grid-row:unset;
      grid-column: 1 / -1 ;


    }
  }

  &.country-wise {
    grid-row: 4 / 5;
    width: 100%;
    grid-column: 3 / - 1;

    @media ${device.tabletPort} {
      grid-row:unset;
      grid-column: 1 / -1 ;


    }
  }

`

export const CardLarge = styled(Card)`
    grid-column: span 2;
    grid-row: span 2;
    background-color: pink ;
    width: 120%;

    @media ${device.tabletLand} {
      grid-column: 1 / -1 ;
      width: 100%;
      grid-row: unset
    }

    @media ${device.mobile} {
      grid-column: 1 / -1 ;
      width: 100%;
    }

    
    
`


