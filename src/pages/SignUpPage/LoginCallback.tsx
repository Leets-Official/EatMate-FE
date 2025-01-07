import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface TokenPayload {
  email: string;
  role: string;
  exp: number;
}

const LoginCallback: React.FC = () => {
  const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const nav = useNavigate();

  useEffect;
};

export default LoginCallback;
