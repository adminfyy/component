import React, { ReactNode } from "react";
interface IStickyState {
  isSticky: boolean;
  wasSticky: boolean;
  distanceFromTop: number;
  distanceFromBottom: number;
  calculatedHeight: number;
  style: React.CSSProperties;
}
export interface IStickyProps {
  topOffset?: number;
  bottomOffset?: number;
  relative?: boolean;
  disableCompensation?: boolean;
  disableHardwareAcceleration?: boolean;
  children: React.ForwardRefRenderFunction<HTMLElement, IStickyState>;
}

export interface IStickyContainerProps {
  className?: string;
  children?: ReactNode | undefined;
}
