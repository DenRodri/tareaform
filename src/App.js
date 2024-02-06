import React, { useState }  from 'react'
import Input from './components/Input.js'
import InputListMaker from './components/InputListMaker.js'
import './App.css'
export default function App() {
  const [formValues, setFormValues] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [FormatList, setFormatLists] = useState([
    {
    type: 'TEST! ',
    name: 'TEST',
    options: [
        
    ]},
    {  type: '',
    name: '',
    options: [
        
    ]},
 ]);

 function UploadParentValue(value) {
  setFormValues([]);
  setFormErrors([]);
  setFormatLists(value);

  let newFormValues = value?.map((item) => ({
    type: item.type,
    name: item.name,
    value: '', 
    options: item.options?.map((option) => ({ ...option })),
  }));

  setFormValues(newFormValues);

  let newFormErrors = newFormValues.map(() => ({
    ErrorName: ""
  }));

  setFormErrors(newFormErrors);
}
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Errors:', formErrors)
    console.log('Form Values:', formValues);
    console.log(FormatList)
    
  };
  const handleInputChange = (value, type, index) => {
    let Error="";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    const updatedErrorValues = [...formErrors];
    if (type === "number" && value < 1) {
      value = 1;
    }
    if(value.length===0){
      Error="No puede estar vacio el campo"
    }else if (type === "text" && value.length < 2){
      Error="Este campo debe ser mas largo que 2 caracteres"
    }else if(type==="password" && value.length < 6){
      Error="Este campo debe ser mas largo que 6 caracteres"
    } else if(type==="email" && !emailRegex.test(value)){
      Error="Debe de entrar un email valido"
    }
    
    if(Error===""){
      updatedErrorValues[index] = {}
    }else{
      updatedErrorValues[index] = {
        ErrorName: Error 
      }
    }
    
    const updatedFormValues = [...formValues];
    updatedFormValues[index] = {
      ...updatedFormValues[index],
      value: value,
    };
    setFormErrors(updatedErrorValues);
    setFormValues(updatedFormValues);

    if (
      updatedErrorValues.slice(0, -1).every((errorValue) => Object.keys(errorValue).length === 0)
    ) {
      updatedErrorValues[updatedErrorValues.length - 1] = {};   
    }else{
      updatedErrorValues[updatedErrorValues.length - 1] = {ErrorName: ""};  
    }

  };

  return (
    <>
       <InputListMaker SendInfo={UploadParentValue}/>
       <form className="form" onSubmit={handleSubmit}>
       {FormatList.map((Inp, i) => (
  <Input
    key={i}
    name={Inp.name}
    type={Inp.type}
    options={Inp.options}
    error={formErrors[i]}
    onChange={handleInputChange}
    formValues={formValues}
    index={i}
  />
))}
          
        </form>
    </>
  )
}
