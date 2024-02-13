import React, { useState }  from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


export default function SignupForms({Submit}) {
  
  const [Display, setDisplay] = useState(true);
  const SwitchForm = () => {
    setDisplay(!Display);
  };
  const formLabel = Display ? 'Login' : 'Sign Up';
  const options = [
    { key : 'Email', value: 'emailmoc'},
    {key: 'Telefono', value: 'telephonemoc'}
  ]
  
  const initialValuesRegistro = {
    email: '',
    password: '',
    confirmPassword: '',
    modeOfContact: '',
    phone: ''
  }

  const initialValuesLogin = {
    email: '',
    password: ''
  }

  const validationSchemaLogin = Yup.object({
    email: Yup.string().email('Invalid email format').required('Requerido'),
    password: Yup.string().required('Requerido')
  })


  const validationSchemaRegistro = Yup.object({
    email: Yup.string()
    .email('Formato de Email Invalido')
    .required('Requerido'),
    password: Yup.string().required('Requerido'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas deben alinearse')
    .required('Requerido'),
    modeOfContact: Yup.string().required('Requerido'),
    phone: Yup.string().when('modeOfContact', {
      is: 'telephonemoc',
      then: () => Yup.string().required('Requerido')
    })
  })
  
  const onSubmit = values => {
    console.log('Form data', values)
    Submit();
  }



  return (
    <>
      <Formik
        initialValues={Display ? initialValuesRegistro : initialValuesLogin}
        validationSchema={Display ? validationSchemaRegistro : validationSchemaLogin}
        onSubmit={onSubmit}
      >
        <Form className="LoginForm">
          <button type="button" onClick={SwitchForm}>{formLabel}</button>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-control">
              <label htmlFor="password">Contraseña</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
          {Display && (
            <>
              <div className="form-control">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <div className="form-control">
                <label htmlFor="modeOfContact">Modo de contacto</label>
                <Field as="select" id="modeOfContact" name="modeOfContact">
                  <option value="">Select mode of contact</option>
                  <option value="emailmoc">Email</option>
                  <option value="telephonemoc">Telefono</option>
                </Field>
                <ErrorMessage name="modeOfContact" component="div" className="error" />
              </div>
              <div className="form-control">
                <label htmlFor="phone">Telefono</label>
                <Field type="text" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
            </>
          )}
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
}