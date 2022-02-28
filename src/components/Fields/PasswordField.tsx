import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { IInputField } from "../../types";
import _ from "lodash";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function PasswordField({
  name,
  label,
  rules,
  placeholder,
  icon,
  bg = "gray.100",
  hidden = false,
  disabled = false,
}: IInputField) {
  const [showPassword, setShowPassword] = useState(false);
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
          <InputGroup>
            <Input
              bg={bgColorMode}
              hidden={hidden}
              type={showPassword ? "text" : "password"}
              variant={"primary"}
              disabled={disabled}
              placeholder={placeholder}
              {...rest}
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
              color={"gray.500"}
            />
            <InputRightElement h="full">
              <Button
                variant={"ghost"}
                fontSize={"xl"}
                p="0"
                h="full"
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                _focus={{ outline: "none" }}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
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
}
