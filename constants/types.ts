import { Dispatch, SetStateAction } from "react";

export type ProjectionType = 'mercator' | 'globe';
export type SetStateType<T> = Dispatch<SetStateAction<T>>;
export type InteractionsPropType = {
    projectionType: ProjectionType;
    setProjectionType: SetStateType<ProjectionType>;
}