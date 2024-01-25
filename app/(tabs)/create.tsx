import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native"
import { useCameraDevice, Camera } from "react-native-vision-camera";
import { useIsForeground } from "@/hooks";

const Create = () => {
    const device = useCameraDevice('back');
    const camera = useRef<Camera | null>(null);
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const hasMicrophonePermission = useMemo(() => Camera.getMicrophonePermissionStatus() === 'granted', []);
    // const zoom = useSharedValue(0);
    // const isPressingButton = useSharedValue(false)

    const [isFocused, setIsFocused] = useState(false);
    useFocusEffect(
        useCallback(() => {
            setIsFocused(true);
            return () => setIsFocused(false);
        }, [])
    );
    const isForeground = useIsForeground();
    const isActive = isFocused && isForeground;
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const [enableHdr, setEnableHdr] = useState(false);
    const [flash, setFlash] = useState<'off' | 'on'>('off');
    const [enableNightMode, setEnableNightMode] = useState(false);
    return (
        <View />
    )
}

export default Create;