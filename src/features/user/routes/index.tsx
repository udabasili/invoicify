import { Route, Routes } from 'react-router-dom';
import UserComponent from './UserComponent';

export const UserRouter = () => (
    <Routes>
        <Route path='/user' element={<UserComponent/>}/>
    </Routes>
)