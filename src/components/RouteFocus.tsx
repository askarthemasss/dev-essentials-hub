import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Moves focus to the page's main region after client-side navigation.
 * Without this, activating a catalogue card or a palette result leaves focus
 * on <body>, so keyboard and screen-reader users lose their place.
 * A destination hash wins over the top-of-page reset, so cross-route links
 * such as /usage#privacy land on the section they name.
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

    const hash = window.location.hash.slice(1);
    if (hash) {
      let targetId = hash;
      try {
        targetId = decodeURIComponent(hash);
      } catch {
        // Keep the raw fragment when it is not valid percent-encoding.
      }

      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default RouteFocus;
