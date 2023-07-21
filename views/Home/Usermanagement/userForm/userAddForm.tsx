import {
  Formik,
  Form,
  Field,
  FormikValues,
  validateYupSchema,
  useFormikContext,
} from "formik";
import { Select, Input, Button, Switch } from "antd";
import React, { useState } from "react";

import "./userForm.scss";

import { userAddFormValidationSchema } from "./userAddFormValidation";
import InputField from "../../../../shared/components/InputField";
import UserDataService from "../../../../services/UserService/user.service";
const { Option } = Select;

interface User {

  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  active?: boolean;
  admin?: boolean;
  closeAddModal?: () => void;
}

const UserAddForm: React.FC<User> = ({ closeAddModal}) => {
  const { addUserData } = UserDataService();
  const [switchChecked, setSwitchChecked] = useState(true);

  const handleSubmit = async(values: User) => {
    JSON.stringify(values);
    console.log("This is :", values);
    await addUserData(values);
    closeAddModal?.();
};


  return (
    <div className="userForm-body">
      <Formik
        initialValues={{
          admin: true,
          name: "",
          email: "",
          phone: "",
          password: "",
          active: switchChecked,
        }}
        validationSchema={userAddFormValidationSchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="fields">
              <label>User Type</label>
              <Select
                id="selectUser"
                className="selectUser"
                placeholder="Admin"
                disabled
              >
              </Select>
            </div>
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
              <InputField type="text" name="password" placeholder="Enter" />
            </div>

            <div className="status">
              <label>Status</label>

              <div className="Status-body" style={{ backgroundColor: values?.active ? "#0563441A" : "#C92B3E1A"}}>
                <Field name="active">
                  {() => (
                    <>
                      <h2 style={{ color: values?.active ? "#056344" : "#941818" }}>
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
              Add User
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserAddForm;
