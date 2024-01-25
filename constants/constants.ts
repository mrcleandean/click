import { Dimensions, Platform } from "react-native"
import { EdgeInsets } from "react-native-safe-area-context";

export const theme = {
    light: {
        primary: 'white',
        secondary: '#dbdbdc',
        lowColor: 'rgb(186, 210, 235)',
        highColor: 'black',
        shadowBorder: {
            borderColor: 'rgb(186, 210, 235)',
            borderWidth: 2,
            shadowColor: 'rgb(186, 210, 235)',
            shadowRadius: 10,
            shadowOffset: {
                width: 10,
                height: 5
            },
            shadowOpacity: 1
        }
    },
    dark: {
        primary: 'black',
        secondary: '#dbdbdc',
        lowColor: 'rgb(186, 210, 235)',
        highColor: 'white',
        shadowBorder: {
            borderColor: 'rgb(186, 210, 235)',
            borderWidth: 2,
            shadowColor: 'rgb(186, 210, 235)',
            shadowRadius: 10,
            shadowOffset: {
                width: 10,
                height: 5
            },
            shadowOpacity: 1
        }
    }
    // highColor: 'rgb(36, 92, 223)'
}



// Control Button like Flash
const createCameraConstants = () => {
    const contentSpacing = 15;
    return {
        contentSpacing,
        safeBottom: (safeAreaInsets: EdgeInsets) => {
            return (
                Platform.select({
                    ios: safeAreaInsets.bottom,
                }) ?? 0
            )
        },
        safeAreaPadding: (safeAreaInsets: EdgeInsets) => {
            return {
                paddingLeft: safeAreaInsets.left + contentSpacing,
                paddingTop: safeAreaInsets.top + contentSpacing,
                paddingRight: safeAreaInsets.right + contentSpacing,
                paddingBottom: (Platform.select({
                    ios: safeAreaInsets.bottom,
                }) ?? 0) + contentSpacing,
            }
        },
        screenWidth: Dimensions.get('window').width,
        screenHeight: (safeAreaInsets: EdgeInsets) => {
            return (
                Platform.select<number>({
                    android: Dimensions.get('screen').height - safeAreaInsets.bottom,
                    ios: Dimensions.get('window').height,
                }) as number
            )
        },
        captureButtonSize: 78,
        controlButtonSize: 40,
        maxZoomFactor: 10,
        scaleFullZoom: 3
    }
}
export const cameraConstants = createCameraConstants();

export const initialCameraAnimDuration = 850;