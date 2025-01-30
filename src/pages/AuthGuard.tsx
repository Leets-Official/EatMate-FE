import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserInfo } from '@/apis/auth/auth';
import Loading from '@/pages/Loading';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const userInfo = await getUserInfo();
        setIsBlocked(userInfo?.role === 'USER');
      } catch (error) {
        setIsBlocked(false);
      }
    };

    checkAccess();

    const loadingTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isBlocked === null || showLoading) return <Loading />;
  return isBlocked ? <Navigate to="/intro" replace /> : <>{children}</>;
};

export default AuthGuard;
