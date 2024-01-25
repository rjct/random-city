import Button from "@mui/joy/Button";
import useStore from "../../engine/store";
import { randomInt } from "../../engine/helpers";

export function RandomButton(props: { onClick: (args: NewCityArgs) => void }) {
  const busy = useStore((state) => state.ui.isBusy);

  const handleRandomButtonClick = () => {
    const size = randomInt(10, 1000);

    props.onClick({
      seed: randomInt(1, 65535),
      blockSize: randomInt(2, 15),
      perlinScale: {
        x: randomInt(1, 100) / 10,
        y: randomInt(1, 100) / 10,
      },
      perlinElevation: randomInt(5, 150) / 10,
      gridSize: { width: size, height: size },
    });
  };

  return (
    <Button sx={{ mt: 2 }} loading={busy} onClick={handleRandomButtonClick}>
      Random
    </Button>
  );
}
