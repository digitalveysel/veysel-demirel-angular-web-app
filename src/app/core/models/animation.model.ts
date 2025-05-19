import { AnimationOptions, DOMKeyframesDefinition, EventOptions } from 'motion';

interface IBaseAnimation {
  selector?: string;
  keyframes: DOMKeyframesDefinition;
  options?: AnimationOptions;
}

interface IPureAnimation extends IBaseAnimation {
  type?: 'pure';
}

type IMarginValue = `${number}${'px' | '%'}`;

type IMarginType =
  | IMarginValue
  | `${IMarginValue} ${IMarginValue}`
  | `${IMarginValue} ${IMarginValue} ${IMarginValue}`
  | `${IMarginValue} ${IMarginValue} ${IMarginValue} ${IMarginValue}`;

export interface IInViewOptions {
  root?: Element | Document;
  margin?: IMarginType;
  amount?: 'some' | 'all' | number;
}

interface IInViewAnimation extends IBaseAnimation {
  type: 'inView';
  callbackKeyframes: DOMKeyframesDefinition;
  callbackOptions?: AnimationOptions;
  inViewOptions?: IInViewOptions;
}

interface IHoverAnimation extends IBaseAnimation {
  type: 'hover' | 'inView';
  callbackKeyframes: DOMKeyframesDefinition;
  callbackOptions?: AnimationOptions;
  hoverOptions?: EventOptions;
}

export type IAnimation = IPureAnimation | IInViewAnimation | IHoverAnimation;

export enum IAnimationTypes {
  PURE = 'pure',
  HOVER = 'hover',
  IN_VIEW = 'inView',
}
