import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios.get('/profile', { withCredentials: true })
    }
  }, []);

  return (
    <UserContext.Provider value={({user, setUser})}>
      {children}
    </UserContext.Provider>
  )
}