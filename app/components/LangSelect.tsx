import { Button, Combobox, useCombobox } from "@mantine/core";

interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const languages = [
  { label: "Dansk", value: "da", flag: "" },
  { label: "English", value: "en", flag: "" },
];

export const LangSelect = (props: CustomInputProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = languages.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  const selectedItem = languages.find(
    (item) => item.value === props.defaultValue
  );

  return (
    <>
      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        withinPortal={false}
        onOptionSubmit={(val) => {
          props.onChange && props.onChange(val as never);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Button variant="subtle" onClick={() => combobox.toggleDropdown()}>
            {selectedItem?.label || "Engelsk"}
          </Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};
