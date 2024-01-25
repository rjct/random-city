import Slider from "@mui/joy/Slider";
import React from "react";

export function BlockSize(props: {
  value: number;
  onChange: (value: number) => void;
}) {
  const marks = [
    {
      value: 3,
      label: "3",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 15,
      label: "15",
    },
  ];

  return (
    <Slider
      value={props.value}
      marks={marks}
      step={1}
      min={2}
      max={15}
      onChange={(e) => {
        props.onChange(Number((e.target as HTMLInputElement).value));
      }}
      valueLabelDisplay="auto"
    />
  );
}
