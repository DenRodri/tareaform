import React, { useState }  from 'react'
import Input from './components/Input.js'
import {InputList} from './InputList.js'
import './App.css'
export default function App() {
  const [formValues, setFormValues] = useState({});
 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Values:', formValues);
    
  };
  const handleInputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div>
       <form className="form" onSubmit={handleSubmit}>
      {InputList.map((Inp, i) => { 
          return <Input key={i} name={Inp.name} type={Inp.type} options={Inp.options} onChange={handleInputChange} />;
          })}
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}
