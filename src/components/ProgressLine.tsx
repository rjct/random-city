import useStore from "../engine/store";
import LinearProgress from "@mui/joy/LinearProgress";
import React from "react";

export function ProgressLine() {
  const show = useStore((state) => state.ui.isBusy);

  if (!show) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <LinearProgress color={"success"} variant={"plain"} />
    </div>
  );
}
