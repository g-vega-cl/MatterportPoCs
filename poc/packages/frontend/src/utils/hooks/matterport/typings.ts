import { Observable, Subscription } from 'rxjs';

// SDK type for 3.2

// The SDK returns almost all this enums, maybe we should just declare types for the keys and use the enums dynamically?
export enum MatterPhase {
  ERROR = 'appphase.error',
  LOADING = 'appphase.loading',
  PLAYING = 'appphase.playing',
  STARTING = 'appphase.starting',
  UNINITIALIZED = 'appphase.uninitialized',
  WAITING = 'appphase.waiting',
}

export enum MatterEvent {
  PHASE_CHANGE = 'application.phasechange',
}

export enum MatterSdkApplication {
  SHOWCASE = 'application.showcase',
}

export enum MatterMode {
  DOLLHOUSE = 'mode.dollhouse',
  FLOORPLAN = 'mode.floorplan',
  INSIDE = 'mode.inside',
  OUTSIDE = 'mode.outside',
  TRANSITIONING = 'mode.transitioning',
}

export enum MatterIntersetedObject {
  MODEL = 'intersectedobject.model',
  NONE = 'intersectedobject.none',
  SWEEP = 'intersectedobject.sweep',
  TAG = 'intersectedobject.tag',
  UNKNOWN = 'intersectedobject.unknown',
}

interface MatterAppState {
  // deprecated use state observable
  application: any;
  phase: MatterPhase;
}

interface MatterApp {
  AppState: MatterAppState;
  State: State;
  state: Observable<MatterAppState>;
  getLoadTimes: Promise<object>;
  getState: Promise<MatterAppState>;
  Phase: MatterPhase;
  Event: MatterEvent;
  SdkApplication: MatterSdkApplication;
}

export interface MatterPose {
  mode: MatterMode;
  position: MatterVector3;
  projection: Float32Array;
  rotation: MatterVector2;
  sweep: string;
}

interface MatterRotateOptions {
  speed?: number;
}

interface MatterRotation {
  x: number;
  y: number;
  z?: number;
}

interface MatterVector2 {
  x: number;
  y: number;
}

interface MatterVector3 {
  x: number;
  y: number;
}

interface MatterCamera {
  pose?: Observable<MatterPose>; // seems like pose it's not always loaded marking as optional to enforce check
  getPose: Promise<MatterPose>;
  lookAtScreenCoords: (x: number, y: number) => Promise<void>;
  pan: ({ x, z }: { x: number; z: number }) => Promise<void>;
  rotate: (horizontal: number, vertical: number, options?: MatterRotateOptions) => Promise<void>;
  setRotation: (rotation: MatterRotation, options?: MatterRotateOptions) => Promise<void>;
}

interface State extends MatterAppState {
  phaseTimes: {
    [key in MatterPhase]: number;
  };
}

interface MatterPointer {
  intersection: Observable<MatterIntersection>;
  Colliders: any; // enum of MatterIntersetedObject
}

interface MatterIntersection {
  normal: MatterVector3;
  object: MatterIntersetedObject;
  position: MatterVector3;
}

interface MatterSize {
  w: number;
  h: number;
}

interface MatterConversion {
  worldToScreen: (
    worldPos: MatterVector3,
    cameraPose: MatterPose,
    windowSize: MatterSize,
    result?: MatterVector3,
  ) => MatterVector3;
}

export interface MatterSubscription extends Subscription {
  cancel?: () => void;
}

export interface MatterSDK {
  App: MatterApp;
  Camera: MatterCamera;
  Conversion: MatterConversion;
  Floor: any;
  Label: any;
  Mattertag: any;
  Measurements: any;
  Mode: any;
  Model: any;
  Pointer: MatterPointer;
  Renderer: any;
  Settings: any;
  Sweep: any;
  Tour: any;
}
