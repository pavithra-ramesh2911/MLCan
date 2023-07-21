import * as Yup from 'yup';

export const userAddFormValidationSchema = Yup.object().shape({


    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email('E-mail is not valid!')
      .required('Email is required!'),
    phone: Yup.string()
    .matches(/^\d{10}$/, "Phone Number is invalid!")
    .required("Phone Number is required!"),
    password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!')
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_])/,
      'Password must contain one uppercase and one special character!'),
    //   passwords: Yup.string()
    // .min(6, 'Password has to be longer than 6 characters!'),
})