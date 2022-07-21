import { device } from '@/utils/responsiveBreakpoints';
import styled from 'styled-components'


export const TodoListContainer = styled.div`
    display:  grid;
    grid-template-rows: min-content max-content ;
    min-height: 100vh ;
    grid-template-columns: 1fr ;
    margin-top: 4rem;

    @media ${device.tabletPort} {
        padding-left: 3rem;
        padding-right: 3rem;
    }
`

export const FormContainerExtended = styled.div`
    display: grid ;
    grid-template-columns: repeat(2, 1fr) ;
`
export const Form = styled.form`
`

export const TodoItemForm = styled.form`
    display: flex;
    flex-direction: column;
`