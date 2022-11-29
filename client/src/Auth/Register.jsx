import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  // If the form grows, consider storing the state in one object
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function changeInput(value, setState) {
    setState(value);
  }

  async function register() {
    const credentials = { username, password };
    const result = await axios.post('http://localhost:3001/auth/register', credentials, { withCredentials: true });
    if (result.data.success) navigate('/');
  }
  
  return (
    <div>
      <form>
        <label htmlFor="username">username:</label><br/>
        <input type="text" value={username} onChange={(e) => changeInput(e.target.value, setUsername)} id="username" name="username"/><br/>
        <label htmlFor="password">password:</label><br/>
        <input type="text" value={password} onChange={(e) => changeInput(e.target.value, setPassword)} id="password" name="password"/>
      </form>
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;