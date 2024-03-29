import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export const AppInput = ({
  label,
  name,
  onChange,
  value,

  ...rest
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <Input
        my="3"
        name={name}
        onChange={onChange}
        _focus={{ border: "2px", borderColor: "gray.400" }}
        defaultValue={value}
        {...rest}
      />
    </FormControl>
  );
};
export default AppInput;
