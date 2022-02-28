import CheckBoxField from "./CheckboxField";
import FileField from "./FileField";
import PasswordField from "./PasswordField";
import SelectField from "./SelectField";
import TextField from "./TextField";

const Field = ({ type, ...rest }: any) => {
  return (
    <>
      {type === "text" ? (
        <TextField {...rest} />
      ) : type === "password" ? (
        <PasswordField {...rest} />
      ) : type === "select" ? (
        <SelectField {...rest} />
      ) : type === "checkbox" ? (
        <CheckBoxField {...rest} />
      ) : type === "file" ? (
        <FileField {...rest} />
      ) : null}
    </>
  );
};

export default Field;
