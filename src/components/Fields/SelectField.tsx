import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ISelectField } from "../../types";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import _ from "lodash";

export default function SelectField({
  options,
  name,
  value,
  closeOnSelect = true,
  bg = "gray.100",
  bg_hover = "gray.200",
  placeholder,
  type = "radio",
  rules,
  height,
  hidden = false,
  disabled = false,
}: ISelectField) {
  const { control, watch } = useFormContext();
  const { errors } = useFormState({ control });
  const bgColorMode = useColorModeValue(
    !hidden && _.get(errors, name) ? "red.50" : bg,
    !hidden && _.get(errors, name) ? "dark-blue-dark" : "dark-blue-dark"
  );
  const bgColorModeHover = useColorModeValue(bg_hover, "dark-blue-dark");
  const bgMenuList = useColorModeValue("white", "blue-dark");

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={_.get(watch(), name)}
        render={({ field: { ref, ...rest } }) => (
          <Menu closeOnSelect={closeOnSelect}>
            <MenuButton
              disabled={disabled}
              px={4}
              py={2}
              w="100%"
              // height={{ base: "2.5rem", "2xl": "3rem" }}
              height={"3rem"}
              _disabled={{ cursor: "not-allowed", opacity: 0.6 }}
              bg={bgColorMode}
              borderWidth={!hidden && _.get(errors, name) ? "1px" : "0px"}
              borderColor={
                !hidden && _.get(errors, name) ? "red.100" : "transparent"
              }
              transition="all 0.2s"
              borderRadius="md"
              _hover={{ bg: bgColorModeHover }}
              _active={{ bg: bgColorModeHover }}
              type="button"
            >
              <Flex as={"div"} align="center" justifyContent="space-between">
                {(value && options.find((el) => el.value === value)?.label) ||
                  placeholder}{" "}
                <Icon as={ChevronDownIcon} />
              </Flex>
            </MenuButton>
            <MenuList
              width={"100%"}
              // h={height || "auto"}
              overflowY={"auto"}
              zIndex={3}
              bg={bgMenuList}
            >
              <MenuOptionGroup {...rest} value={value} type={type}>
                {options.map((option: any) => (
                  <MenuItemOption
                    value={option.value}
                    key={option.id}
                    _hover={{ bg: "blue-light", color: "black" }}
                  >
                    {option?.label}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
