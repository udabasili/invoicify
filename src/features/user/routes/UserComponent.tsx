import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import UserForm from '../components/UserForm';

const UserComponent = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Log in to your account">
      <UserForm />
    </Layout>
  );
};

export default UserComponent