import { Settings } from "./Settings";
import { MiniMap } from "./MiniMap";

export function SidePanel() {
  return (
    <div className={"side-panel"}>
      <MiniMap />
      <Settings />
    </div>
  );
}
