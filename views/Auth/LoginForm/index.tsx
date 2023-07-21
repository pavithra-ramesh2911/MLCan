import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../../shared/components/InputField";
import { validationSchema } from "./loginValidation";
import { Button } from "antd";
import UserService from "../../../services/AuthService/auth.service";
import { Navigate, useNavigate } from "react-router-dom";
import logo from '../../../assets/img/MLCAN logo.svg';
import './loginForm.scss';




interface User {
  email: string;
  password: string;
}

const initialValue = {
  email: "",
  password: "",
};

const LoginForm = (props: any)=> {
  const { error, loading, loginUser } = UserService();

  const navigate = useNavigate();



  const onSubmit = (user: User) => {
    loginUser(user);

  };

  

  return (
    <div className="image">
       <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
          
            <div className="login_body">
               <div className="login_body__logo">
              <img src={logo}  />
              </div>
            <Form>  
              <div className="login_body__login_box">
              <h1>Login to admin portal</h1>
              <div className="login_body__login_box__email">
              
                    <label>Email</label>
                    <InputField 
                    type="email" 
                    name="email" 
                    placeholder="Enter"
                    prefix={<span className="icon-mail"></span>}
                    
                    />

              </div>

              <div className="login_body__login_box__password">
                    <label>Password</label>
                    <InputField 
                    type="password" 
                    name="password" 
                    placeholder="Enter"
                    prefix={<span className="icon-password"></span>}
                    />
                  </div>

                  <Button type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="loginbtn"
                  >Login</Button> 

                  <div className="login_body__login_box__forgot_pass">
                    <label>Forgot Password?</label>
                  </div> 
               </div>


           </Form> 
            </div>      

      </Formik>

       </div> 
  );
};

export default LoginForm;
