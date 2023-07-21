import * as Yup from 'yup';

export const formvalidationSchema = Yup.object().shape({
  selectUser: Yup.string().required("Yard Name is required"),
  inputFieldName: Yup.string().required("Container number is required"),
  inputField2: Yup.string().required("Customer is required"),
  inputField3: Yup.string().required("Container Owner name is required"),
  inputField4: Yup.string().required("Container Length is required"),
  inputField5: Yup.string().required("Container Height is required"),
  });

