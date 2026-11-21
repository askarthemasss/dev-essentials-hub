import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Moves focus to the page's main region after client-side navigation.
 * Without this, activating a catalogue card or a palette result leaves focus
 * on <body>, so keyboard and screen-reader users lose their place.
 */
const RouteFocus = () => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const main = document.getElementById("main-content");
    if (!main) return;

    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default RouteFocus;
