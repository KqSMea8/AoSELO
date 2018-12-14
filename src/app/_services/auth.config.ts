import { ENV } from '../_helpers/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'um17KwIT3wtYvhV1ADfG6qf2tgidXoqD',
  CLIENT_DOMAIN: 'aoselo.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'http://localhost:3000/api/', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile',
  NAMESPACE: 'http://myapp.com/roles'
};