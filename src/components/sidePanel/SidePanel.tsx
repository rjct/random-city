import { Settings } from "./Settings";
import { MiniMap } from "./MiniMap";

export function SidePanel() {
  return (
    <div className={"settings"}>
      <MiniMap />
      <Settings />
    </div>
  );
}
