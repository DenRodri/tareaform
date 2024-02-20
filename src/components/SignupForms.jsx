import React, { useState, useEffect }  from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'


export default function SignupForms({Submit}) {
  const [Add, SetAdd] = useState(true);
  const [Display, setDisplay] = useState(true);
  const SwitchForm = () => {
    setDisplay(!Display);
    const fieldsToReset = ['email', 'password', 'confirmPassword', 'modeOfContact', 'phone'];
    setTimeout(() => {
      fieldsToReset.forEach(field => {
        setFieldTouched(field, false);
      });
    }, 0);
    if(Display){
      setFieldValue("confirmPassword", '');
      setFieldValue("modeOfContact", '');
      setFieldValue("phone", '');
    }
  };
  const formLabel = Display ? 'Iniciar Sesion' : 'Registro';


  

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
      modeOfContact: Display ?
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
      let NewLocal = JSON.parse(localStorage.getItem("users"))
      if(Display){
        
     
        if(Add === true){
            alert("Has creado una cuenta!");
            let NewUser =
            { email: values.email,
             password: values.password,
             modeOfContact: values.modeOfContact,
             phone: values.phone
            }
          NewLocal.push(NewUser);
          localStorage.setItem("users", JSON.stringify(NewLocal))
          console.log(localStorage.getItem("users"));
          console.log(NewLocal);
        }else{
          alert("Ya este email tiene una cuenta")
        }
        SetAdd(false)
      }else{
        let Test = false;
        for(let i = 0; i < NewLocal.length ; i++){
          if(NewLocal[i].email === values.email && NewLocal[i].password === values.password){
            alert("Inicio de Sesion Exitoso")
            Test = true;
            localStorage.setItem("loggedin", JSON.stringify([true, values.email, values.password]))
            Submit(values.email, values.password);

            break;
          }else{
            Test = false;
          }
        }
        if(Test === false){
          alert("Email o Contraseña incorrectas")
        }

      }
    }
  })

  useEffect(() => {
        
    if(localStorage.getItem("users") === null || localStorage.getItem("loggedin") === null){
      localStorage.setItem("users", JSON.stringify([]));
      localStorage.setItem("loggedin", JSON.stringify([false, '', '']))
    }

    let NewLocal = JSON.parse(localStorage.getItem("users"))
    for(let i = 0; i < NewLocal.length ; i++){
      if(NewLocal[i].email === values.email){
        SetAdd(false)
        break;
      }else{
        SetAdd(true)
      }
    }
  },[values.email]);

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
            {touched.email && Display && Add===false &&<p className="Validation">"Este email ya esta en uso</p>}
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
                  <option value="">Selecciona el modo de contacto</option>
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