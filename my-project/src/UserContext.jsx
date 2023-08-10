import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('-----------p1')
    if (!user) {
      console.log('-----------p2')
      axios.get('/profile', { withCredentials: true }).then(({data}) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={({user, setUser})}>
      {children}
    </UserContext.Provider>
  )
}