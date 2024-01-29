import { createContext, useContext, useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UserContextType } from '@/constants/types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userAuth, setUserAuth] = useState<FirebaseAuthTypes.User | null>(null);
    const [userDoc, setUserDoc] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setUserAuth(user)
            if (user) {
                // get stored user data
            }
            setLoadingAuth(false)
        });
        return unsubscribe
    }, []);

    const value = {
        userAuth,
        userDoc,
        loadingAuth
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}