import React, { useState } from 'react';
import useAuth from '../customHooks/useAuth.jsx';

function Login() {
  const { login } = useAuth();
  // If the form grows, consider storing the state in one object
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function changeInput(value, setState) {
    setState(value);
  }
  
  return (
    <div>
      <form>
        <label htmlFor="username">username:</label><br/>
        <input type="text" value={username} onChange={(e) => changeInput(e.target.value, setUsername)} id="username" name="username"/><br/>
        <label htmlFor="password">password:</label><br/>
        <input type="text" value={password} onChange={(e) => changeInput(e.target.value, setPassword)} id="password" name="password"/>
      </form>
      <button onClick={() => login(username, password)}>Login</button>
    </div>
  );

}

export default Login;