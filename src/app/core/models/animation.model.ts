import { AnimationOptions, DOMKeyframesDefinition } from 'motion';

export interface IAnimation {
  type?: 'pure' | 'hover' | 'inView';
  selector?: string;
  keyframes: DOMKeyframesDefinition;
  options?: AnimationOptions;
  callbackKeyframes?: DOMKeyframesDefinition;
  callbackOptions?: AnimationOptions;
  exitKeyframes?: DOMKeyframesDefinition;
  exitOptions?: AnimationOptions;
}

export enum IAnimationTypes {
  PURE = 'pure',
  HOVER = 'hover',
  IN_VIEW = 'inView',
}
