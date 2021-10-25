import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
} from "react";
import { IStickyContainerProps } from "./interface";
import { useEnsuredForwardedRef } from "./hooks";
import StickContext from "./context";
const raf = requestAnimationFrame;
const caf = cancelAnimationFrame;
const events: string[] = [
  "Resize",
  "TouchStart",
  "TouchMove",
  "TouchEnd",
  "PageShow",
  "Load",
  "Wheel",
  "Scroll",
];
export const StickyContainer = forwardRef<
  HTMLDivElement,
  IStickyContainerProps
>((props, ref) => {
  const subscribers = useRef<Function[]>([]);
  const framePending = useRef(false);
  const divRef = useEnsuredForwardedRef<HTMLDivElement>(
    ref as React.MutableRefObject<HTMLDivElement>
  );
  const rafHandle = useRef(0);

  const notifySubscribers = useCallback(
    (evt) => {
      if (framePending.current) return;
      const { currentTarget } = evt;
      rafHandle.current = raf(() => {
        framePending.current = false;
        const { top, bottom } = divRef.current?.getBoundingClientRect() || {
          top: 0,
          bottom: 0,
        };
        const event = {
          distanceFromTop: top,
          distanceFromBottom: bottom,
          eventSource:
            currentTarget === window ? document.body : divRef.current,
        };
        subscribers.current.forEach((handler) => handler(event));
      });
      framePending.current = true;
    },
    [framePending, subscribers]
  );

  const delegates: Record<string, Function> = useMemo(
    () =>
      events.reduce((d, event) => {
        d[`on${event}`] = notifySubscribers;
        return d;
      }, {} as Record<string, Function>),
    [notifySubscribers]
  );

  useEffect(() => {
    events.forEach((e) => {
      window.addEventListener(e.toLowerCase(), notifySubscribers);
    });
    return () => {
      if (rafHandle) {
        caf(rafHandle.current);
        rafHandle.current = 0;
      }
      events.forEach((e) => {
        window.removeEventListener(e.toLowerCase(), notifySubscribers);
      });
    };
  }, []);

  const subscribe = useCallback(
    (handler) => {
      subscribers.current = subscribers.current.concat(handler);
    },
    [subscribers]
  );
  const unsubscribe = useCallback(
    (handler) => {
      subscribers.current = subscribers.current.filter(
        (current) => current !== handler
      );
    },
    [subscribers]
  );

  return (
    <StickContext.Provider
      value={{
        subscribe,
        unsubscribe,
        getParent: () => divRef.current,
      }}
    >
      <div ref={divRef} {...delegates} {...props} />
    </StickContext.Provider>
  );
});

StickyContainer.displayName = "StickyContainer";

export default StickyContainer;
