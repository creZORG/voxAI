import { useAuthContext } from './auth-context';

export const useUser = () => {
  const { user, loading } = useAuthContext();
  return { user, loading };
};
