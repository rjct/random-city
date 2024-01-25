import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Slider from "@mui/joy/Slider";
import React from "react";

export function PerlinScale(props: {
  value: PerlinScale;
  onChange: (value: PerlinScale) => void;
}) {
  const marks = [
    {
      value: 0.1,
      label: "0.1",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  const handlePerlinScaleXChange = (e: Event) => {
    const x = Number((e.target as HTMLInputElement).value);

    props.onChange({ ...props.value, ...{ x } });
  };

  const handlePerlinScaleYChange = (e: Event) => {
    const y = Number((e.target as HTMLInputElement).value);

    props.onChange({ ...props.value, ...{ y } });
  };

  return (
    <>
      <FormControl orientation={"horizontal"}>
        <FormLabel>X</FormLabel>
        <Slider
          value={props.value.x}
          step={0.1}
          marks={marks}
          min={0.1}
          max={10}
          valueLabelDisplay="auto"
          onChange={(e) => handlePerlinScaleXChange(e)}
        />
      </FormControl>

      <FormControl orientation={"horizontal"}>
        <FormLabel>Y</FormLabel>
        <Slider
          value={props.value.y}
          step={0.1}
          marks={marks}
          min={0.1}
          max={10}
          valueLabelDisplay="auto"
          onChange={(e) => handlePerlinScaleYChange(e)}
        />
      </FormControl>
    </>
  );
}
