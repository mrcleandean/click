import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

const useIsForeground = () => {
    const [isForeground, setIsForeground] = useState(false);
    useEffect(() => {
        const onChange = (state: AppStateStatus): void => {
            setIsForeground(state === 'active')
        }
        const listener = AppState.addEventListener('change', onChange)
        return () => listener.remove();
    }, [setIsForeground]);

    return isForeground
}

export default useIsForeground;