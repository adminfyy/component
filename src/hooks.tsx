import { useContext, useEffect,useRef } from "react"
import StickContext from "./context"
export const useSticky = (handleContainerEvent: Function) => {
    const context = useContext(StickContext)
    useEffect(() => {
        if (!context.subscribe) throw new TypeError("Expected Sticky to be mounted within StickyContainer");
        context.subscribe(handleContainerEvent)
        return () => {
            context.unsubscribe(handleContainerEvent)
        }
    }, [context, handleContainerEvent])
}

export function useEnsuredForwardedRef(forwardedRef) {
    var ensuredRef = useRef(forwardedRef === null || forwardedRef === void 0 ? void 0 : forwardedRef.current);
    useEffect(function () {
        if (!forwardedRef) {
            return;
        }
        forwardedRef.current = ensuredRef.current;
    }, [forwardedRef]);
    return ensuredRef;
}
