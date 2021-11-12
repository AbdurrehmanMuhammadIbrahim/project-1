import '../../App.css';
import {useHistory} from "react-router-dom";
import React from 'react';
import Stack from '@mui/material/Stack';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import axios from 'axios';
import { baseurl } from '../../core';
import { GlobalContext } from '../../context/Context';
import { useContext } from "react";


const validationSchema = Yup.object({ 
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





function Loginform() {

  let history = useHistory();
  let { state, dispatch } = useContext(GlobalContext);



  const submit = (values) => {
    console.log("values", values)


    axios.post(`${baseurl}/api/v1/login`,
      {
        email: values.email,
        password: values.password
      },{
        withCredentials: true
      })
      .then(res => {
        console.log(res.data);

      history.push("/")
        alert('User Logined')

        if (res.data.email) {
          
          dispatch({
            type: "USER_LOGIN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              lastName: res.data.lastName,
              _id: res.data._id
            }
          })
        }

        
      })



  }

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: '',
      password: '',

    },
    onSubmit: submit
  },
  );


  return (
    < >
      <div className="form">
        <div className="main">
        <h1>LOGIN FORM</h1>
          <form onSubmit={formik.handleSubmit}>


            <Stack spacing={2}>
 
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

export default Loginform;