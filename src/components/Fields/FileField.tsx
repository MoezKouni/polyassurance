// import {
//   Icon,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Text,
// } from "@chakra-ui/react";
// import { Controller, useFormContext, useFormState } from "react-hook-form";
// import _ from "lodash";
// import { FiFile } from "react-icons/fi";
// import { useRef } from "react";

// const FileField = ({
//   name,
//   label,
//   rules,
//   placeholder,
//   icon,
//   bg = "gray.100",
//   hidden = false,
//   disabled = false,
//   type = "text",
//   acceptedFileTypes,
//   value
// }: any) => {
//   const { control, watch } = useFormContext();
//   const { errors } = useFormState({ control });
//   const inputRef: any = useRef();

//   return (
//     <div>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={_.get(watch(), name)}
//         render={({ field: { ref, ...rest } }) => (
//           <InputGroup>
//             <InputLeftElement
//               pointerEvents="none"
//               children={<Icon as={FiFile} />}
//             />
//             <input
//               type="file"
//               accept={acceptedFileTypes}
//               //   name={name}
//               ref={inputRef}
//               {...rest}
//               //   @ts-ignore
//             //   inputRef={ref}
//               style={{ display: "none" }}
//             ></input>
//             <Input
//               placeholder={placeholder || "Your file ..."}
//               onClick={() => inputRef.current.click()}
//                 value={value}
//             />
//           </InputGroup>
//         )}
//         rules={rules}
//       />
//       {!hidden && (
//         <Text color="red" fontSize="sm">
//           {_.get(errors, name) ? _.get(errors, `${name}.message`) : null}
//         </Text>
//       )}
//     </div>
//   );
// };

// export default FileField;

import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useController } from "react-hook-form";
import { useRef } from "react";

const FileUpload = ({
  name,
  placeholder,
  acceptedFileTypes,
  control,
  children,
  isRequired = false,
}: any) => {
  const inputRef = useRef<any>();
  const {
    field: { ref, value, ...inputProps },
    // meta: { invalid, isTouched, isDirty },
  }: any = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FiFile} />}
        />
        <input
          type="file"
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef}
          {...inputProps}
          inputRef={ref}
          style={{ display: "none" }}
        ></input>
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => inputRef.current.click()}
          value={value}
        />
      </InputGroup>
      {/* <FormErrorMessage>{invalid}</FormErrorMessage> */}
    </FormControl>
  );
};

export default FileUpload;
