import { Button, Card, Grid, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { loginUserAction } from '../../Redux/Auth/auth.action'
import { useNavigate } from 'react-router-dom'

const initialValues = { email: "", password: "" }
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})
function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    console.log('handle submit', values)
    dispatch(loginUserAction(values))
    navigate("/")
  }
  return (
    <div>
      <Grid container>
        <Grid className='h-screen overflow-hidden' size={7}>
          <img className='w-full h-full' src='https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png' />
        </Grid>
        <Grid size={5}>
          <div className='px-20 flex flex-col justify-center h-full'>
            <Card className='card p-8 '>

              <div className='flex flex-col items-center mb-5 space-y-1'>
                <h1 className='logo text-center'>Social Media</h1>
                <p className='text-center text-sm w-[70%]'>Connecting Lives, Sharing Stories: Your Social World, Your Way</p>
              </div>

              <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                <Form className="space-y-5">
                  <div className='space-y-5'>
                    <div>
                      <Field as={TextField}
                        name='email'
                        placeholder='Email'
                        type='email'
                        variant='outlined'
                        fullWidth
                      />
                      <ErrorMessage name='email' component='div' className='text-red-500' />

                    </div>
                  </div>
                  <div className='space-y-5'>
                    <div>
                      <Field as={TextField}
                        name='password'
                        placeholder='Password'
                        type='password'
                        variant='outlined'
                        fullWidth
                      />
                      <ErrorMessage name='password' component='div' className='text-red-500' />

                    </div>
                  </div>
                  <div className='space-y-5'>
                    <div>
                      <Button sx={{ padding: ".8rem 0rem" }} fullWidth type='submit' variant='contained' color='primary'>Login</Button>

                    </div>
                  </div>
                </Form>
              </Formik>
              <div className='flex gap-2 items-center justify-center pt-5'>
                <p>
                  If you don't have an account?
                </p>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </div>


            </Card>
          </div>
        </Grid>
      </Grid>
    </div>

  )
}

export default Login