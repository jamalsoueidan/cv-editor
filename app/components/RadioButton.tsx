import { Radio, type RadioCardProps } from "@mantine/core";
import { useState } from "react";
import classes from "./RadioButton.module.css";

export function RadioButton(props: RadioCardProps) {
  const [checked, setChecked] = useState(false);

  return (
    <Radio.Card
      className={classes.root}
      radius="md"
      {...props}
      checked={checked}
      onClick={(event) => {
        setChecked((c) => !c);
        props.onClick && props.onClick(event);
      }}
    >
      {props.children}
    </Radio.Card>
  );
}
