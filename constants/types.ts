import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Location } from "@rnmapbox/maps";
import { CameraRef } from "@rnmapbox/maps/lib/typescript/src/components/Camera";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


export type ProjectionType = 'mercator' | 'globe';
export type SetStateType<T> = Dispatch<SetStateAction<T>>;
export type InteractionsPropType = {
    projectionType: ProjectionType;
    setProjectionType: SetStateType<ProjectionType>;
}
export type MapRefType = MutableRefObject<CameraRef | null>
export type LocationRefType = MutableRefObject<Location | null>
export type MapPropType = { projectionType: ProjectionType, cameraRef: MapRefType, locationRef: LocationRefType }
export type ThemeContextType = {
    currentTheme: 'light' | 'dark';
    setCurrentTheme: SetStateType<'light' | 'dark'>
}
export type UserContextType = {
    userAuth: FirebaseAuthTypes.User | null,
    userDoc: (FirebaseFirestoreTypes.DocumentData & UserDocType) | undefined,
    loadedAuth: boolean,
    setUserDoc: SetStateType<(FirebaseFirestoreTypes.DocumentData & UserDocType) | undefined>
}
export type CenterButtonPropType = { cameraRef: MutableRefObject<CameraRef | null>, locationRef: MutableRefObject<Location | null>, currentTheme: 'light' | 'dark' }
export type UserDocType = {
    bio: string;
    clicks: number;
    createdAt: FirebaseFirestoreTypes.FieldValue;
    email: string;
    friends: number;
    fullName: string;
    identifier: string;
    posts: number;
    profilePicture: string | null;
    username: string;
}