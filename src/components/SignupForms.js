import React, { useState }  from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'


export default function SignupForms({Submit}) {
  
  const [Display, setDisplay] = useState(true);
  const SwitchForm = () => {
    setDisplay(!Display);
    const fieldsToReset = ['email', 'password', 'confirmPassword', 'modeOfContact', 'phone'];
    setTimeout(() => {
      fieldsToReset.forEach(field => {
        setFieldTouched(field, false);
      });
    }, 0);
  };
  const formLabel = Display ? 'Login' : 'Sign Up';
  const options = [
    { key : 'Email', value: 'emailmoc'},
    {key: 'Telefono', value: 'telephonemoc'}
  ]

  

  const { handleSubmit, values,setFieldValue, errors, touched, setFieldTouched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      modeOfContact: '',
      phone: ''
    },
    validationSchema: Yup.object({
      
      email: Yup.string()
        .email('Formato de Email Invalido').required('Requerido'),
      password: Yup.string().required('Requerido'),
      confirmPassword: Display ? 
      Yup.string().oneOf([Yup.ref('password'), ''], 'Las contraseñas deben alinearse')
          .required('Requerido')
      : Yup.string(),
      modeOfContact: Display?
      Yup.string().required('Requerido')
      : Yup.string(),
      phone: Display ?
      Yup.string().when('modeOfContact', {
        is: 'telephonemoc',
        then: () => Yup.string().matches(/^[0-9]+$/, 'Solo pueden ser digitos')
        .min(9, 'Debe ser exactamente 9 digitos')
        .max(9, 'Debe ser exactamente 9 digitos')
        .required('Requerido'),
      }) : Yup.string(),
  }),
    onSubmit: (data) => {
      console.log('Form data', data)
      Submit();
    }
  })



  return (
    <>
        <form onSubmit={handleSubmit} className="LoginForm">
          <button type="button" onClick={SwitchForm}>{formLabel}</button>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input onChange={ (e)=>{
              setFieldValue("email", e.target.value)
            }} 
            value={values.email}
            type="email" 
            id="email" 
            name="email"
            onFocus={() => setFieldTouched('email', true)}/>
            {touched.email && errors.email && <p className="Validation">{errors.email}</p>}
          </div>
          <div className="form-control">
              <label htmlFor="password">Contraseña</label>
              <input 
              onChange={ (e)=>{
                setFieldValue("password", e.target.value)                
              }} 
              value={values.password}
              type="password" 
              id="password" 
              name="password"
              onFocus={() => setFieldTouched('password', true)} />
              {touched.password && errors.password && <p className="Validation">{errors.password}</p>}
            </div>
          {Display && (
            <>
              <div className="form-control">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input onChange={ (e)=>{
                setFieldValue("confirmPassword", e.target.value)
              }} 
              value={values.confirmPassword}
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              onFocus={() => setFieldTouched('confirmPassword', true)}/>
                {touched.confirmPassword && errors.confirmPassword && <p className="Validation">{errors.confirmPassword}</p>}
              </div>
              <div className="form-control">
                <label htmlFor="modeOfContact">Modo de contacto</label>
                <select onChange={ (e)=>{
                setFieldValue("modeOfContact", e.target.value)
              }} 
              value={values.modeOfContact}
              id="modeOfContact" 
              name="modeOfContact"
              onFocus={() => setFieldTouched('modeOfContact', true)}>
                  <option value="">Selecciona el modo de contactot</option>
                  <option value="emailmoc">Email</option>
                  <option value="telephonemoc">Telefono</option>
                </select>
                {touched.modeOfContact && errors.modeOfContact && <p className="Validation">{errors.modeOfContact}</p>}
              </div>
              <div className="form-control">
                <label htmlFor="phone">Telefono</label>
                <input onChange={ (e)=>{
                setFieldValue("phone", e.target.value)
              }} 
              value={values.phone}
              type="text" 
              id="phone" 
              name="phone" 
              onFocus={() => setFieldTouched('phone', true)}/>
                {touched.phone && errors.phone && <p className="Validation">{errors.phone}</p>}
              </div>
            </>
          )}
          <button type="submit">Enviar</button>
        </form>
    </>
  );
}