import React, { useEffect } from "react";
import { Checkbox, CheckboxGroup, HStack } from "@chakra-ui/react";
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import _ from "lodash";

interface PropType {
  name: string;
  checkBoxs?: { value: string; label: string }[];
  disabled?: boolean;
}

const CheckBoxField = ({ name, checkBoxs, disabled = false }: PropType) => {
  const { control, clearErrors, getValues, setValue } = useFormContext();
  const { errors } = useFormState({ control });
  //   const watchCheckBoxField = useWatch({
  //     control,
  //     // name: checkBoxs?.map(({ value }) => value)!,
  //   });

  //   useEffect(() => {
  //     if (watchCheckBoxField.includes(true)) {
  //       clearErrors(name);
  //     }
  //   }, [watchCheckBoxField]);

  return (
    <HStack wrap={"wrap"} spacing={5}>
      <CheckboxGroup>
        {checkBoxs?.map(({ value: checkboxValue, label }) => (
          <React.Fragment key={checkboxValue}>
            <Controller
              name={name}
              control={control}
              render={({ field: { ref, onChange, value, ...rest } }) => (
                <Checkbox
                colorScheme='red' 
                borderColor={"blue.500"}
                  {...rest}
                  //   checked={value}
                  defaultChecked={getValues("permissions").includes(
                    checkboxValue
                  )}
                  onChange={(e) =>
                    getValues("permissions").includes(checkboxValue)
                      ? setValue(
                          "permissions",
                          getValues("permissions").filter(
                            (el: string) => el !== checkboxValue
                          )
                        )
                      : getValues("permissions").push(checkboxValue)
                  }
                >
                  {label}
                </Checkbox>
              )}
            />
          </React.Fragment>
        ))}
      </CheckboxGroup>
    </HStack>
  );
};

export default CheckBoxField;
