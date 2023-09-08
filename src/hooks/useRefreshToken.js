import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth, setAuth } = useAuth();
    const reauth =JSON.parse(localStorage.getItem("token"));  
    const refresh = async () => {
        const response = await axios.post('/reGenToken',{email:auth.user}
        );
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access_token);
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
