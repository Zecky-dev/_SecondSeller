import {createContext, useContext, useState} from 'react';

const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const {user, setUser} = useContext(UserContext);
  return {user, setUser};
};

export default UserContextProvider;
