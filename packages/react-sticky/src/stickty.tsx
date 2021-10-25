import React, {
  useContext,
  useCallback,
  useRef,
  useState,
  useMemo,
} from "react";
import { IStickyProps } from "./interface";
import { StickContext } from "./context";
import { useSticky } from "./hooks";

function Sticky(props: IStickyProps) {
  const {
    relative = false,
    topOffset = 0,
    bottomOffset = 0,
    disableCompensation = false,
    disableHardwareAcceleration = false,
    children,
  } = props;
  const context = useContext(StickContext);
  const [state, setState] = useState({
    isSticky: false,
    wasSticky: false,
    distanceFromTop: 0,
    distanceFromBottom: 0,
    calculatedHeight: 0,
    style: {},
  });
  const placeholder = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLElement>(null);

  const handleContainerEvent = useCallback(
    ({
      distanceFromTop,
      distanceFromBottom,
      eventSource,
    }: {
      distanceFromTop: number;
      distanceFromBottom: number;
      eventSource: HTMLElement;
    }) => {
      const parent = context.getParent();
      if (!placeholder.current || !content.current) return;
      let preventingStickyStateChanges = false;
      if (relative) {
        preventingStickyStateChanges = eventSource !== parent;
        distanceFromTop =
          -(eventSource.scrollTop + eventSource.offsetTop) +
          placeholder.current?.offsetTop;
      }

      const placeholderClientRect = placeholder.current.getBoundingClientRect();
      const contentClientRect = content.current.getBoundingClientRect();
      const calculatedHeight = contentClientRect.height;
      //in case of element was display: 'none' height was zero(renderWrapper)
      if (calculatedHeight === 0) return;
      const bottomDifference =
        distanceFromBottom - bottomOffset - calculatedHeight;
      const wasSticky = !!state.isSticky;
      const isSticky = preventingStickyStateChanges
        ? wasSticky
        : distanceFromTop <= -topOffset && distanceFromBottom > -bottomOffset;

      distanceFromBottom =
        (relative
          ? parent.scrollHeight - parent.scrollTop
          : distanceFromBottom) - calculatedHeight;
      const top =
        bottomDifference > 0
          ? relative
            ? parent.offsetTop - parent.offsetParent.scrollTop + -topOffset
            : -topOffset
          : bottomDifference;
      const style = !isSticky
        ? {}
        : {
            transform: "",
            position: "fixed",
            top,
            left: placeholderClientRect.left,
            width: placeholderClientRect.width,
          };

      if (!disableHardwareAcceleration) {
        style.transform = "translateZ(0)";
      }
      setState({
        isSticky,
        wasSticky,
        distanceFromTop,
        distanceFromBottom,
        calculatedHeight,
        style,
      });
    },
    [state.isSticky, context, props]
  );

  useSticky(handleContainerEvent);

  const style = useMemo(
    () =>
      state.isSticky
        ? {
            paddingBottom: disableCompensation ? 0 : state.calculatedHeight,
          }
        : {},
    [state, placeholder, disableCompensation]
  );

  const Child = useMemo(() => React.forwardRef(children), [children]);
  return (
    <div className="my-sticky">
      <div ref={placeholder} className="my-sticky-placeholder" style={style} />
      <Child {...state} ref={content} />
    </div>
  );
}
export default Sticky;
