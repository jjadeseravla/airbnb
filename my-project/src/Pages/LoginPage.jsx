import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    await axios.post('/login', {
      email,
      password,
    })
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-64">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={loginUser}>
        <input type="email"
               placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                />
        <input type="password"
               placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
               />
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
            Do not have an account yet?
          <Link className="underline text-black" to={'/register'}>Register now</Link>
        </div>
      </form>
      </div>
      
  </div>
  )
}