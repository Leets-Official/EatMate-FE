import { Navigate } from 'react-router-dom';

const SignupGuard = ({ children }: { children: React.ReactNode }) => {
  const signupCompleted = localStorage.getItem('signupCompleted') === 'true';

  return signupCompleted ? <Navigate to="/intro" replace /> : <>{children}</>;
};

export default SignupGuard;
