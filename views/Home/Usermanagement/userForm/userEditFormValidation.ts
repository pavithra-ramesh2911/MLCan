import * as Yup from 'yup';

export const userEditFormValidationSchema = Yup.object().shape({


    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email('E-mail is not valid!')
      .required('Email is required!'),
    phone: Yup.string()
    .matches(/^\d{10}$/, "Phone Number is invalid!")
    .required("Phone Number is required!"),

})