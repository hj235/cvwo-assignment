import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './useUserContext.tsx';
import { axiosPrivate } from '../../helpers/axios.ts';
import { UserState } from '../../context/UserContext.tsx';

export const useLogin = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { userDispatcher } = useUserContext();
  const navigate = useNavigate();

  async function login(username: string, password: string) {
    setError('');
    setLoading(true);

    const data = {
      username: username,
      password: password,
    };

    await axiosPrivate
      .post('/user/login', data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        userDispatcher({ type: 'LOGIN', payload: (res.data as UserState) });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        const message = error.response?.data ? `, ${error.response.data.msg}` : 'error loading user';
        setError(error.message + message);
      });

    setLoading(false);
  };

  return { login, loading, error };
};
