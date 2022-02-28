import {
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { IInputField } from "../../types";
import _ from "lodash";

const TextField = ({
  name,
  label,
  rules,
  placeholder,
  icon,
  bg = "gray.100",
  hidden = false,
  disabled = false,
  type = "text",
}: IInputField) => {
  const { control, watch } = useFormContext();
  const { errors } = useFormState({ control });
  const bgColorMode = !hidden && _.get(errors, name) ? "red.50" : bg;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={_.get(watch(), name)}
        render={({ field: { ref, ...rest } }) => (
          <Input
            bg={bgColorMode}
            hidden={hidden}
            type={type}
            variant={"primary"}
            disabled={disabled}
            placeholder={placeholder}
            // inputref={ref}
            {...rest}
            // label={label}
            // border={"none"}
            size={"lg"}
            borderRadius={"8px"}
            fontWeight={"normal"}
            _placeholder={{
              fontWeight: "light",
              color: "gray.500",
              fontSize: { base: "0.9rem", "2xl": "1rem" },
            }}
            borderWidth={!hidden && _.get(errors, name) ? "1px" : "0px"}
            borderColor={
              !hidden && _.get(errors, name) ? "red.100" : "transparent"
            }
            // height={{ base: "2.5rem", "2xl": "3rem" }}
            color={"gray.500"}
          />
        )}
        rules={rules}
      />
      {!hidden && (
        <Text color="red" fontSize="sm">
          {_.get(errors, name) ? _.get(errors, `${name}.message`) : null}
        </Text>
      )}
    </div>
  );
};

export default TextField;
