import React, { useState, useEffect }  from 'react'
import InputListMaker from './components/InputListMaker.jsx'
import SignupForms from './components/SignupForms.jsx'
import DesignForm from './components/DesignForms.jsx'
import './App.css'
export const DataContext = React.createContext();

export default function App() {
  const [account, setAccount] = useState()
  const [formValues, setFormValues] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [Display, setDisplay] = useState(true);
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
    obligatory: item.obligatory,
    options: item.options?.map((option) => ({ ...option })),
    
  }));

  setFormValues(newFormValues);
  
  let newFormErrors = newFormValues.map((item) => (
    
    { ErrorName: ""}
  ));

  setFormErrors(newFormErrors);
}
const Login = (email, password) => {
  setAccount([email, password])
  setDisplay(false);
};
  
  const handleInputChange = (value, type, index, obligatory) => {
    let Error="";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    const updatedErrorValues = [...formErrors];
    if (type === "number" && value < 1) {
      value = 1;
    }
    if(obligatory === "Yes"){
      if(value.length===0){
        Error="No puede estar vacio el campo"
      }else if (type === "text" && value.length < 2){
        Error="Este campo debe ser mas largo que 2 caracteres"
      }else if(type==="password" && value.length < 6){
        Error="Este campo debe ser mas largo que 6 caracteres"
      } else if(type==="email" && !emailRegex.test(value)){
        Error="Debe de entrar un email valido"
      }
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
  useEffect(() => {
    let NewLogged = JSON.parse(localStorage.getItem("loggedin"))
    if(NewLogged[0] === true){
      Login(NewLogged[1], NewLogged[2])
    }
  },[]);
  return (
    <>
    {Display ? (
      <>
      <SignupForms Submit={Login}></SignupForms>
      </>
    ) : ( 
      <>
      <InputListMaker sendInfo={UploadParentValue}/>
      <DataContext.Provider value={{FormatList, formValues, formErrors, account}}>
        <DesignForm displayChange={setDisplay} inputChange={handleInputChange}/>
      </DataContext.Provider>
      
      
      </>
    )}
       
    </>
  )
}
