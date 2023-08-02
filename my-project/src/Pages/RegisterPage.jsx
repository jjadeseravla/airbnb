import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const registerUser = (e) => {
    // so it doesnt reload the page
    e.preventDefault();
    // send req to api
    try {
      axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Successfull, now you can login')
    } catch (e) {
      alert("registration failed");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-64">
      <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
        <input type="name"
               placeholder="Jade"
            value={name}
               onChange={(e) => {setName(e.target.value)}}
                />
        <input type="email"
               placeholder="your@email.com"
            value={email}
              onChange={(e) => {setEmail(e.target.value)}}
                />
        <input type="password"
               placeholder="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
               />
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
            Already have an account? Login instead
          <Link className="underline text-black" to={'/login'}>Login now</Link>
        </div>
      </form>
      </div>
      
  </div>
  )
}