import { Location } from "@rnmapbox/maps";
import { CameraRef } from "@rnmapbox/maps/lib/typescript/src/components/Camera";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

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
export type CenterButtonPropType = { cameraRef: MutableRefObject<CameraRef | null>, locationRef: MutableRefObject<Location | null>, currentTheme: 'light' | 'dark' }