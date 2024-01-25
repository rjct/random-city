import FormControl from "@mui/joy/FormControl/FormControl";
import Slider from "@mui/joy/Slider";
import React from "react";

export function PerlinElevation(props: {
  value: number;
  onChange: (value: number) => void;
}) {
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 16,
      label: "16",
    },
  ];

  return (
    <FormControl orientation={"horizontal"} sx={{ ml: 1.6, mr: 1.6 }}>
      <Slider
        value={props.value}
        step={1}
        marks={marks}
        min={0.5}
        max={16}
        valueLabelDisplay="auto"
        onChange={(e) => {
          props.onChange(Number((e.target as HTMLInputElement).value));
        }}
      />
    </FormControl>
  );
}
