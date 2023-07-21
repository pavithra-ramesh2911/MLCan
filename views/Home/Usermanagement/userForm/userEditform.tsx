import {Formik, Form, Field, } from "formik";
import { Select, Input, Button, Switch } from "antd";
import React, { useState } from "react";
import "./userForm.scss";
import { userEditFormValidationSchema } from "./userEditFormValidation";
import InputField from "../../../../shared/components/InputField";
import UserDataService from "../../../../services/UserService/user.service";
import { User } from "../../../../models/user.model";

interface UserEditFormProps {
  // initialValues?: User;
  handleSubmit?: (values: User) => void;
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  active?: boolean;
  closeEditModal?: () => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ id , username, email, phone, active, closeEditModal}) => {
  const { editUserData } = UserDataService();
  const [switchChecked, setSwitchChecked] = useState(false);

  const handleSubmit = async (values: User) => {
    const {...formData } = values;
    JSON.stringify(formData);
    console.log("This is :", formData);
    await editUserData(values, id ? id : "");
    closeEditModal?.();
  };

  
  return (
    <div className="userForm-body">
      <Formik
        initialValues={{
          name: username,
          email: email,
          phone: phone,
          active: active,
        }}
        validationSchema={userEditFormValidationSchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="fields">
              <label>Name</label>
              <InputField type="text" name="name" placeholder="Enter" />
            </div>
            <div className="fields">
              <label>Email</label>
              <InputField
                type="email"
                name="email"
                placeholder="Enter"
                prefix={<span className="icon-mail"></span>}
              />
            </div>
            <div className="fields">
              <label>Phone Number</label>
              <InputField
                type="text"
                name="phone"
                placeholder="Enter"
                prefix={
                  <>
                    <i className="icon-call"></i>
                    <span>+1</span>
                  </>
                }
              />
            </div>
            <div className="fields">
              <label>Password</label>
              <InputField type="text" name="optional field" placeholder="Enter"  />
            </div>

            <div className="status">
              <label>Status</label>

              <div className="Status-body" style={{ backgroundColor: values?.active ? "#0563441A" : "#C92B3E1A"}}>
                <Field name="active">
                  {() => (
                    <>
                      <h2
                        style={{
                          color: values?.active ? "#056344" : "#941818",
                        }}
                      >
                        {values?.active ? "Active" : "Inactive"}
                      </h2>
                      <Switch
                        checked={!!values?.active}
                        onChange={(switchChecked) => {
                          setFieldValue("active", switchChecked ? true : false);
                        }}
                      />
                    </>
                  )}
                </Field>
              </div>
            </div>
            <Button type="primary" htmlType="submit">
              Update Admin
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserEditForm;
