import React, { ReactElement, ReactNode } from "react";
import { RegisterOptions } from "react-hook-form";

interface IAuthLayout {
  children: ReactNode;
  illustration?: string;
}
interface IAuthLayout2 {
  children: ReactNode;
  illustration: string;
}

interface IInputField {
  name: string;
  label?: string;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  placeholder: string;
  icon?: ReactNode;
  bg?: string;
  hidden?: boolean = false;
  disabled?: boolean = false;
  type: string = "text";
  height?: string | undefined;
  options?: { id: number; value: string; label: string }[];
}

interface ISelectField {
  options: any[];
  value?: string;
  setValue?: (x: any) => void;
  name: string;
  type?: "radio" | "checkbox";
  closeOnSelect?: boolean;
  bg?: string;
  bg_hover?: string;
  placeholder: string;
  height?: string | undefined;
  hidden?: boolean = false;
  disabled?: boolean = false;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

interface UseQueryDataType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: undefined | string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

interface AuthContextType {
  data: UseQueryDataType | undefined;
  remove: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface IUniversity {
  _id: string;
  name: string;
}

interface IonBoarding {
  isLoading: boolean;
  methods: any;
  step: number;
  setStep: (x: number) => void;
  universities: any;
  status: any;
  promotions: any;
  specialities: any;
}

interface IPermission {
  name: string;
  _id: string;
}

interface ICollabForm {
  params: {
    fullname: string;
  };
  collaborateur: UseQueryDataType;
  permissions: IPermission[];
}

interface IMyToast {
  toast: any;
  status: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
}

interface IDialog {
  children: ReactElement;
  description: string | ReactElement;
  question: string;
  isLoading?: boolean;
  onClick: any;
  withTooltip?: boolean = false
  tooltipText?: string;
  full?: boolean = false
}

interface IPopup {
  children: ReactElement;
  header: string;
  button: ReactElement;
}

interface IColumnTable {
  textAlign: string;
  label: string;
}

interface IResourcesTable {
  path: string;
  columns: IColumnTable[];
}
