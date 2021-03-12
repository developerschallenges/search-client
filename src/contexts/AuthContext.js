import { createContext, useContext } from 'react';

// Create new auth context
export const AuthContext = createContext();

// React hook to use auth context
export function useAuth() {
    return useContext(AuthContext);
}

export const baseApiUrl = 'https://fa-developerschallenges-search.azurewebsites.net';
// export const baseApiUrl = 'http://localhost:7071';