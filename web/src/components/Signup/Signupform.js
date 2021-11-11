import '../../App.css';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';

import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import axios from 'axios';
import { baseurl } from '../../core';

const submit = (values,{ resetForm }) => {
  console.log("values", values)
  axios.post(`${baseurl}/api/v1/signup`,
  {
    name: values.name,
    lastName:values.lastName,
    email: values.email,
    password: values.password
  
  })
  .then(res => {
    console.log(res.data);
    // alert('User Signed in')
    resetForm({})
  })
}



const SignupSchema = Yup.object({
  name: Yup
  .string('Enter your First Name')
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Enter your name'),
  lastName: Yup
  .string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Enter your LastName'),
  email: Yup

  .string('Enter your Email')
  .email('Enter a valid Email')
  .min(6, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  password:Yup
  .string('Enter your Password')
.required('Enter a password')
  .min(6, 'password is weak!')
  .required('Please enter password here'),
});





function Signupform() {

  const formik = useFormik({
    validationSchema: SignupSchema,
    initialValues: {
   
      name: '',
      lastName:'',
      email: '',
      password: ''
     
    },
    onSubmit: submit
  },
  );


  return (
    <>
      <div className="form"> 
        <div className="main">
          <form onSubmit={formik.handleSubmit}>

          <h1>SIGNUP FORM</h1>
          <Stack spacing={2}>
 <TextField
     fullWidth
     className="text"
     color="secondary"

     id=" name"
     name="name"
     label="Name"
     value={formik.values.name}
     onChange={formik.handleChange}
     error={formik.touched.name && Boolean(formik.errors.name)}
     helperText={formik.touched.name && formik.errors.name}
   />
 <TextField
     fullWidth
     className="text"
     color="secondary"
     id="lastName"
     name="lastName"
     label="lastName"
     value={formik.values.lastName}
     onChange={formik.handleChange}
     error={formik.touched.lastName && Boolean(formik.errors.lastName)}
     helperText={formik.touched.lastName && formik.errors.lastName}
   />
   <TextField
     fullWidth
     color="secondary"
     className="text"
     id="email"
     name="email"
     label="Email"
     value={formik.values.email}
     onChange={formik.handleChange}
     error={formik.touched.email && Boolean(formik.errors.email)}
     helperText={formik.touched.email && formik.errors.email}
   />
   <TextField
     fullWidth
     color="secondary"
     className="text"
     id="password"
     name="password"
     label="Password"
     type="password"
     value={formik.values.password}
     onChange={formik.handleChange}
     error={formik.touched.password && Boolean(formik.errors.password)}
     helperText={formik.touched.password && formik.errors.password}
   />
   <Button color="secondary" variant="contained" fullWidth type="submit">
     Submit
   </Button>
   </Stack>
 </form>
 </div>

      </div>
    </>
  );
}

export default Signupform;