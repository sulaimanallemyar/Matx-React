import { useContext } from 'react';
import UserContext from 'app/contexts/userContext';

const useUser = () => useContext(UserContext);

export default useUser;
