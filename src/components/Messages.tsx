import Snackbar from "@mui/joy/Snackbar";
import useStore from "../engine/store";
import React from "react";

export function Messages() {
  const time = useStore((state) => state.ui.generationTime);
  const busy = useStore((state) => state.ui.isBusy);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(!busy && time > 0);
  }, [busy, time]);

  return (
    <Snackbar
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
      open={open}
      size={"sm"}
      variant={"outlined"}
      color={"success"}
    >
      Generated in {time / 1000} sec
    </Snackbar>
  );
}
