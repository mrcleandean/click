import { createContext, useContext, useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UserContextType, UserDocType } from '@/constants/types';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

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
    const [userDoc, setUserDoc] = useState<(FirebaseFirestoreTypes.DocumentData & UserDocType) | undefined>(undefined);
    const [loadedAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setUserAuth(user)
            if (user) {
                firestore().collection('users').doc(user.uid).get().then(snapshot => {
                    const snapshotData = snapshot.data() as FirebaseFirestoreTypes.DocumentData & UserDocType | undefined;
                    setUserDoc(snapshotData);
                });
            }
            setLoadingAuth(true)
        });
        return unsubscribe
    }, []);

    const value = {
        userAuth,
        userDoc,
        loadedAuth,
        setUserDoc
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}