import React, { useState }  from 'react'
import Input from './components/Input.js'
import InputListMaker from './components/InputListMaker.js'
import './App.css'
export default function App() {
  const [formValues, setFormValues] = useState({});
 
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

  function UploadParentValue(value){
    setFormValues({});
    setFormatLists(value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Values:', formValues);
    console.log(FormatList)
    
  };
  const handleInputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
       <InputListMaker SendInfo={UploadParentValue}/>
       <form className="form" onSubmit={handleSubmit}>
      {FormatList.map((Inp, i) => { 
          return <Input key={i} name={Inp.name} type={Inp.type} options={Inp.options} onChange={handleInputChange} />;
          })}
          <button type="submit">Submit</button>
        </form>
    </>
  )
}
