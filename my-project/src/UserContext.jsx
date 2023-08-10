import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {

  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log('-----------p1')
    if (!user) {
      console.log('-----------p2')
      axios.get('/profile', { withCredentials: true }).then(({data}) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={({user, setUser, ready})}>
      {children}
    </UserContext.Provider>
  )
}