import React from 'react'; 
import useAuth from '../customHooks/useAuth.jsx';

function Logout() {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;