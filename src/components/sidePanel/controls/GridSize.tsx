import Input from "@mui/joy/Input";

export function GridSize(props: {
  value: Size;
  onChange: (value: Size) => void;
}) {
  return (
    <Input
      type="number"
      defaultValue={props.value.width}
      slotProps={{
        input: {
          min: 10,
          step: 1,
        },
      }}
      onChange={(e) => {
        const value = Number(e.target.value);

        props.onChange({ width: value, height: value });
      }}
    />
  );
}
