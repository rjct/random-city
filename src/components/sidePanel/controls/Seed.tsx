import Input from "@mui/joy/Input";

export function Seed(props: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Input
      type="number"
      defaultValue={props.value}
      slotProps={{
        input: {
          min: 0,
          max: 65535,
          step: 1,
        },
      }}
      onChange={(e) => {
        props.onChange(Number(e.target.value));
      }}
    />
  );
}
