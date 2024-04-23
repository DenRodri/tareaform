import React, { useCallback, useContext } from 'react'
import Input from './Input.jsx'
import { DataContext } from '../App.jsx'
import './style/DesignForms.css'

export default function DesignForms({displayChange, inputChange}) {
    const {FormatList, formValues, formErrors, account} = useContext(DataContext)
    const setDisplay = useCallback(event => {
        displayChange(true)
      }, [displayChange])

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Errors:', formErrors)
        console.log('Form Values:', formValues);
        console.log(FormatList)
        
      };


  return (
    <>
<div className='EndSessionBT'>
      <button onClick={()=> {
        setDisplay(true)
        localStorage.setItem("loggedin", JSON.stringify([false, '', '']))
      }}>Acabar Sesion</button>
      </div>
       <form className="form" onSubmit={handleSubmit}>
       {FormatList.map((Inp, i) => (
  <Input
    key={i}
    name={Inp.name}
    type={Inp.type}
    options={Inp.options}
    error={formErrors[i]}
    onChange={inputChange}
    formValues={formValues}
    obligatory={Inp.obligatory}
    index={i}
  />
))}
          
        </form>
        <div className="AccountData">
        <h2>{account[0]}</h2>
        </div>

    
    </>
  )
}
