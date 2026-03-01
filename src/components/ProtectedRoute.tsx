import { ReactNode } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAdmin();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('admin-login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
