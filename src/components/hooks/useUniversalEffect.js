import { useEffect, useLayoutEffect } from "react";

/**
 * Allow React not to complain when we want to use a Layout effect on client side
 * and not on SSR
 */
const useUniversalEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default useUniversalEffect;
