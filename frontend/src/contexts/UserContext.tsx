import {createContext, useState} from 'react';

export const UserContext = createContext({
  user: JSON.parse(localStorage.getItem("user") || '{}'),
  setUser: (user: any) => {},
  resetUser: () => {}
});

export const UserContextProvider = (props: any) => {
  const setUser = (user: any) => {
    let expireMinutes = (new Date()).setMinutes((new Date()).getMinutes() + 30);

    setState({...state, user: {...user, expireMinutes: expireMinutes}});

    localStorage.setItem('user', JSON.stringify({...user, expireMinutes: expireMinutes}));
  };

  const resetUser = () => {
    setState({...state, user: null});
    localStorage.removeItem('user');
  };

  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user") || '{}'),
    setUser: setUser,
    resetUser: resetUser,
  });

  return (
    <UserContext.Provider value={state}>
      {props.children}
    </UserContext.Provider>
  );
}

