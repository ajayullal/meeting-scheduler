import { createContext } from 'react';
import useGlobalStore from './useGlobalStore';

export const GlobalContext = createContext({});

export default function GlobalStoreProvider({ children }) {
    const store = useGlobalStore();

    return (
        <GlobalContext.Provider value={store}>
            {children}
        </GlobalContext.Provider>
    );
}