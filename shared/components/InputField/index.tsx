import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from 'antd';
import Error from "../Error";

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
    addonBefore?:any;
    prefix?:any
    value?:any
     required?: boolean;

}

const InputField: FC<InputFieldProps> = ({ required, ...props }) => {
  return (
    <div>
      <Field as={Input} {...props} {...(required ? { required: true } : {})} />
      <ErrorMessage name={props.name}>
        {(message: string) => <Error message={message} />}
      </ErrorMessage>
    </div>
  );
};



export default InputField;