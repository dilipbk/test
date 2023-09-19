import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth, setAuth } = useAuth();
    const reauth =JSON.parse(localStorage.getItem("token")); 
   
    const refresh = async () => {
        if (Object.keys(auth).length === 0) {
            // Execute this code when auth is empty
            setAuth({ user: reauth.user, roles:reauth.roles,  access_token: reauth.access_token});
          }
        const response = await axios.post('/reGenToken',{email:reauth.user}
        );
        setAuth(prev => {           
            return {
                ...prev,
                roles: response.data.role,
                access_token: response.data.access_token
            }
        });
        return response.data.access_token;
    }
    return refresh;
};

export default useRefreshToken;
