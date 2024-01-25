import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useCameraDevice, Camera, useCameraFormat, CameraRuntimeError, PhotoFile, VideoFile, useFrameProcessor } from "react-native-vision-camera";
import { frameProcessorKotlinSwiftPlugin, frameProcessorPlugin, useIsForeground, usePreferredCameraDevice } from "@/hooks";
import Reanimated, { interpolate, useAnimatedProps, useSharedValue, Extrapolation } from "react-native-reanimated";
import { Gesture, GestureDetector, TapGestureHandler } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CaptureButton, StatusBarBlurBackground } from "@/components";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { cameraConstants } from "@/constants/constants";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
    zoom: true,
});

const Create = () => {
    const insets = useSafeAreaInsets();
    const camera = useRef<Camera | null>(null);
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const hasMicrophonePermission = useMemo(() => Camera.getMicrophonePermissionStatus() === 'granted', []);
    const zoom = useSharedValue(0);
    const isPressingButton = useSharedValue(false)
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
    const [preferredDevice] = usePreferredCameraDevice();
    let device = useCameraDevice(cameraPosition);
    if (preferredDevice != null && preferredDevice.position === cameraPosition) {
        device = preferredDevice
    }
    const [targetFps, setTargetFps] = useState(60);
    const screenAspectRatio = Dimensions.get('window').height / Dimensions.get('window').width;
    const format = useCameraFormat(device, [
        { fps: targetFps },
        { videoAspectRatio: screenAspectRatio },
        { videoResolution: 'max' },
        { photoAspectRatio: screenAspectRatio },
        { photoResolution: 'max' },
    ]);
    const fps = Math.min(format?.maxFps ?? 1, targetFps);
    const supportsFlash = device?.hasFlash ?? false;
    const supportsHdr = format?.supportsPhotoHdr;
    const supports60Fps = useMemo(() => device?.formats.some((f) => f.maxFps >= 60), [device?.formats]);
    const canToggleNightMode = device?.supportsLowLightBoost ?? false;
    const minZoom = device?.minZoom ?? 1
    const maxZoom = Math.min(device?.maxZoom ?? 1, cameraConstants.maxZoomFactor)
    const cameraAnimatedProps = useAnimatedProps(() => {
        const z = Math.max(Math.min(zoom.value, maxZoom), minZoom)
        return {
            zoom: z,
        }
    }, [maxZoom, minZoom, zoom]);
    const setIsPressingButton = useCallback(
        (_isPressingButton: boolean) => {
            isPressingButton.value = _isPressingButton
        },
        [isPressingButton],
    );
    const onError = useCallback((error: CameraRuntimeError) => {
        console.error(error)
    }, []);
    const onInitialized = useCallback(() => {
        console.log('Camera initialized!')
        setIsCameraInitialized(true)
    }, []);
    const onMediaCaptured = useCallback(
        (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
            console.log(`Media captured! ${JSON.stringify(media)}`)
            // router.push('/somepagelater');
            // navigation.navigate('MediaPage', {
            //     path: media.path,
            //     type: type,
            // })
        },
        [{ /*navigation*/ }],
    );

    const onFlipCameraPressed = useCallback(() => {
        setCameraPosition((p) => (p === 'back' ? 'front' : 'back'))
    }, []);

    const onFlashPressed = useCallback(() => {
        setFlash((f) => (f === 'off' ? 'on' : 'off'))
    }, []);

    const onDoubleTap = useCallback(() => {
        onFlipCameraPressed()
    }, [onFlipCameraPressed]);
    const neutralZoom = device?.neutralZoom ?? 1;
    useEffect(() => {
        // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
        zoom.value = neutralZoom
    }, [neutralZoom, zoom]);
    const pinchContext = useRef<number | null>(null)
    const onPinchGesture = Gesture.Pinch().onStart((event) => {
        pinchContext.current = zoom.value
    }).onUpdate((event) => { // could be onChange instead of onUpdate, check back later
        if (isActive === false) return;
        const startZoom = pinchContext.current ?? 0;
        const scale = interpolate(event.scale, [1 - 1 / cameraConstants.scaleFullZoom, 1, cameraConstants.scaleFullZoom], [-1, 0, 1], Extrapolation.CLAMP)
        zoom.value = interpolate(scale, [-1, 0, 1], [minZoom, startZoom, maxZoom], Extrapolation.CLAMP)
    }).onEnd(() => {
        pinchContext.current = null
    });
    useEffect(() => {
        const f =
            format != null
                ? `(${format.photoWidth}x${format.photoHeight} photo / ${format.videoWidth}x${format.videoHeight}@${format.maxFps} video @ ${fps}fps)`
                : undefined
        console.log(`Camera: ${device?.name} | Format: ${f}`)
    }, [device?.name, format, fps]);
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'

        console.log(`${frame.timestamp}: ${frame.width}x${frame.height} ${frame.pixelFormat} Frame (${frame.orientation})`)
        frameProcessorPlugin(frame)
        frameProcessorKotlinSwiftPlugin(frame)
    }, []);
    return (
        <View style={styles.container}>
            {device != null && (
                <GestureDetector gesture={onPinchGesture}>
                    <Reanimated.View style={StyleSheet.absoluteFill}>
                        <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
                            <ReanimatedCamera
                                ref={camera}
                                style={StyleSheet.absoluteFill}
                                device={device}
                                format={format}
                                fps={fps}
                                photoHdr={enableHdr}
                                videoHdr={enableHdr}
                                lowLightBoost={device.supportsLowLightBoost && enableNightMode}
                                isActive={isActive}
                                onInitialized={onInitialized}
                                onError={onError}
                                enableZoomGesture={false}
                                animatedProps={cameraAnimatedProps}
                                exposure={0}
                                enableFpsGraph={true}
                                orientation="portrait"
                                photo={true}
                                video={true}
                                audio={hasMicrophonePermission}
                                frameProcessor={frameProcessor}
                            />
                        </TapGestureHandler>
                    </Reanimated.View>
                </GestureDetector>
            )}

            <CaptureButton
                style={[styles.captureButton, { bottom: cameraConstants.safeAreaPadding(insets).paddingBottom }]}
                camera={camera}
                onMediaCaptured={onMediaCaptured}
                cameraZoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                flash={supportsFlash ? flash : 'off'}
                enabled={isCameraInitialized && isActive}
                setIsPressingButton={setIsPressingButton}
            />

            <StatusBarBlurBackground />

            <View style={[styles.rightButtonRow, {
                right: cameraConstants.safeAreaPadding(insets).paddingRight,
                top: cameraConstants.safeAreaPadding(insets).paddingTop
            }]}>
                <TouchableOpacity style={styles.button} onPress={onFlipCameraPressed}>
                    <Ionicons name="camera-reverse" color="white" size={24} />
                </TouchableOpacity>
                {supportsFlash && (
                    <TouchableOpacity style={styles.button} onPress={onFlashPressed}>
                        <Ionicons name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={24} />
                    </TouchableOpacity>
                )}
                {supports60Fps && (
                    <TouchableOpacity style={styles.button} onPress={() => setTargetFps((t) => (t === 30 ? 60 : 30))}>
                        <Text style={styles.text}>{`${targetFps}\nFPS`}</Text>
                    </TouchableOpacity>
                )}
                {supportsHdr && (
                    <TouchableOpacity style={styles.button} onPress={() => setEnableHdr((h) => !h)}>
                        <MaterialIcons name={enableHdr ? 'hdr-on' : 'hdr-off'} color="white" size={24} />
                    </TouchableOpacity>
                )}
                {canToggleNightMode && (
                    <TouchableOpacity style={styles.button} onPress={() => setEnableNightMode(!enableNightMode)}>
                        <Ionicons name={enableNightMode ? 'moon' : 'moon-outline'} color="white" size={24} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.button} onPress={() => {/*router.push('/devices')*/ }}>
                    <Ionicons name="settings-outline" color="white" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {/*router.push('/codescannerpage')*/ }}>
                    <Ionicons name="qr-code-outline" color="white" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    captureButton: {
        position: 'absolute',
        alignSelf: 'center',
    },
    button: {
        marginBottom: cameraConstants.contentSpacing,
        width: cameraConstants.controlButtonSize,
        height: cameraConstants.controlButtonSize,
        borderRadius: cameraConstants.controlButtonSize / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButtonRow: {
        position: 'absolute',
    },
    text: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Create;