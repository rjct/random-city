import React from "react";
import { Viewport } from "./Viewport";
import { ProgressLine } from "./ProgressLine";
import { Messages } from "./Messages";
import { SidePanel } from "./sidePanel/SidePanel";
export function Main() {
  return (
    <div className={"game"}>
      <Messages />
      <ProgressLine />
      <SidePanel />
      <Viewport />
    </div>
  );
}
