import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function ProgressOnRouteAndFetch() {
  const location = useLocation();
  const isFetching = useIsFetching();

  const startDelayMs = 120;
  const minRouteShowMs = 400;

  const [routePulse, setRoutePulse] = useState(false);
  useEffect(() => {
    setRoutePulse(true);
    const t = setTimeout(() => setRoutePulse(false), minRouteShowMs);
    return () => clearTimeout(t);
  }, [location.pathname, location.search, location.hash]);

  const active = useMemo(
    () => routePulse || isFetching > 0,
    [routePulse, isFetching]
  );

  useEffect(() => {
    let startTimer;
    if (active) {
      startTimer = setTimeout(() => NProgress.start(), startDelayMs);
    } else {
      NProgress.done();
    }
    return () => clearTimeout(startTimer);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => NProgress.done(), 8000);
    return () => clearTimeout(t);
  }, [active]);

  return null;
}
