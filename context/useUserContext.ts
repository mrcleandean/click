import { createContext, useContext } from "react";
import { UserContextType } from "@/constants/types";

export const UserContext = createContext<UserContextType>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}