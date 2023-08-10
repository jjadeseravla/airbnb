import { useContext } from 'react';
import { UserContext } from '../UserContext.jsx';
import { Navigate } from 'react-router-dom';

const AccountPage = () => {

  const { user, ready } = useContext(UserContext);

  // if user is not fetched yet
  if (!ready) {
    return 'Loading...';
  }

  //if we are ready but no user
  if (ready && !user) {
    return <Navigate to={'/login'}/>
  }

  return (
    <div>
      Account page for {user?.name}
    </div>
  )
}

export default AccountPage;