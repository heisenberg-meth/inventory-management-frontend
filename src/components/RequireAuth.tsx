import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from './PageLoader';

/**
 * RequireAuth: client-side guard that blocks access to protected
 * shells (/app, /admin) when the user isn't authenticated. This is
 * defense-in-depth only — the backend must still enforce authorization
 * on every API call — but it prevents unauthenticated users from
 * loading authenticated UI, triggering API 401s, and briefly seeing
 * cached state from localStorage.
 *
 * `requirePlatform`: additionally gate /admin behind a platform-user
 * flag so tenant users can't land on the platform-admin shell.
 */
export function RequireAuth({
  children,
  requirePlatform = false,
}: {
  children: ReactNode;
  requirePlatform?: boolean;
}) {
  const { token, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!token) {
    const loginPath = requirePlatform ? '/platform/login' : '/login';
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (requirePlatform && user && !user.isPlatformUser && user.role !== 'PLATFORM_ADMIN') {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
