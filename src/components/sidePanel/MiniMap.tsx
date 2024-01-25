import React from "react";
import useStore from "../../engine/store";

export function MiniMap() {
  const isUiBusy = useStore((state) => state.ui.isBusy);
  const miniMapDataUrl = useStore((state) => state.miniMapDataUrl);

  return (
    <div
      className={"mini-map"}
      data-busy={isUiBusy || undefined}
      style={{
        backgroundImage: `url(${miniMapDataUrl})`,
      }}
    ></div>
  );
}
