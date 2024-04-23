import React, { useState, useEffect } from 'react'
import ValidationInputList from './ValidationInputList.js';
import './style/inputListMaker.css'
export default function InputListMaker({SendInfo}  ) {
    const [NumberInput,setNumberInput] = useState(1);
    const [DisplayForm, setDisplayForm] = useState(false);
    const [formEdited, setFormEdited] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [designValue, setDesignValues] = useState([
        
        {  type: 'submit',
        name: 'Button',
        options: [
                
        ]
        },
     ]);
     const [fieldErrors, setFieldErrors] = useState([

     ]);

    const handleFirstForm = (e) => {
      e.preventDefault();
      let NewfieldErrors = [...fieldErrors]
      for(let i = 0; i < NumberInput; i++){
        NewfieldErrors.unshift(
          {
            errorName: '',
            errorOptions: {
              
            }
            
            
            
          }
        )
      }
      let NewDesignValue = [...designValue]
      for(let i = 0; i < NumberInput; i++){
        NewDesignValue.unshift(
          {
            type: 'None',
            name: '',
            obligatory: 'Yes',
            options: [
                
            ]}
        )
      }
      setDisplayForm(true);
      setFieldErrors(NewfieldErrors)
      setDesignValues(NewDesignValue)
    }

    const handleFirstFormChange = (e) => {
      
      const newValue = parseInt(e.target.value, 10);
      if(newValue > 0){
        setNumberInput(newValue);
      }
      
    };

    const handleSend = (e) => {
        e.preventDefault();
        const hasErrors = fieldErrors.some((error) => Object.keys(error).length > 0);
        console.log(hasErrors);
        
        setFormEdited(true);
        if (hasErrors) {
          console.log('Please fix the errors before submitting.');
          alert("Aun tiene errores en su formulario")
          console.log(fieldErrors);
        } else {
          console.log('Form is valid:', designValue);
          SendInfo(designValue);
          console.log(fieldErrors);
        }
      };
      
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        
        setDesignValues((prevDesignValues) => {
          const updatedDesignValues = [...prevDesignValues];
          if(name==="type"){
            updatedDesignValues[index] = {
              ...updatedDesignValues[index],
              [name]: value,
              options: []
            }
            setFormEdited(false);
          }else{
          updatedDesignValues[index] = {
            ...updatedDesignValues[index],
            [name]: value,
          }
        };
          return updatedDesignValues;
        });
      };
      const handleOptionChange = (e, index) => {

        setDesignValues((prevDesignValues) => {
          const updatedDesignValues = [...prevDesignValues];
          updatedDesignValues[index] = {
            ...updatedDesignValues[index],
            options: [...updatedDesignValues[index].options, { label: '', value: '' }],
          };
          

          return updatedDesignValues;
        });

      };
    
      const handleOptionDelete = (index, optionIndex) => {
        setDesignValues((prevDesignValues) => {
          const updatedDesignValues = [...prevDesignValues];
          console.log(updatedDesignValues);
          updatedDesignValues[index].options.splice(optionIndex, 1);
          return updatedDesignValues;
        });
      };
    
      const handleOptionInputChange = (e, index, optionIndex) => {
        const { name, value } = e.target;
    
        setDesignValues((prevDesignValues) => {
          const updatedDesignValues = [...prevDesignValues];
          updatedDesignValues[index].options[optionIndex] = {
            ...updatedDesignValues[index].options[optionIndex],
            [name]: value,
          };
      
          
          return updatedDesignValues;
        });
      };

      const GoBack = () => {
        setDisplayForm(false);
        setFormEdited(false);
        setDesignValues([
        
          {  type: 'submit',
          name: 'Button',
          },
       ])
       setFieldErrors([

       ])
      }
      const AddOne = () => {
        let NewfieldErrors = [...fieldErrors];

        NewfieldErrors.splice(NewfieldErrors.length-1,0,(
          {
            errorName: '',
            errorOptions: {
              
            }
          }
        ))
        let NewDesignValue = [...designValue]
        NewDesignValue.splice(NewDesignValue.length-1,0,(
          {
            type: 'None',
            name: '',
            obligatory: 'Yes',
            options: [
                
            ]}
        ))
        setFieldErrors(NewfieldErrors)
        setDesignValues(NewDesignValue)
      }

      const DeleteOne = (e, index) => {
        let NewfieldErrors = [...fieldErrors];
        console.log(index);
        NewfieldErrors.splice()
        let NewDesignValue = [...designValue]
        NewDesignValue.splice(index, 1)
        setFieldErrors(NewfieldErrors)
        setDesignValues(NewDesignValue)
      }
      useEffect(() => {
        
        const validationErrors = designValue.map((field) => ValidationInputList(field, designValue));
        
       
        const hasErrors = validationErrors.some((error) => Object.keys(error).length > 0);
        
        if (hasErrors) {
          setDisableSubmit(true);
          setFieldErrors(validationErrors);

        }else{
          setDisableSubmit(false);
          setFieldErrors(validationErrors);
        }
      
      }, [formEdited, designValue]);
  return (
    <div> 
        {DisplayForm ? (
          <>

          <form className="form" onSubmit={handleSend}>
          <button onClick={GoBack}>Ir atras</button>
          {designValue.map((data, index) => (
            <div className="ValueMappedBox" key={index}>
            {data.type === "submit" ? (
              <>
              </>
            ) : (
              <>
              <div className="InputStart">
               <select
            id={`type-${index}`}
            name="type"
            value={designValue[index].type}
            onChange={(e) => handleInputChange(e, index)}>
               <option value="None">Selecciona una opcion</option>
               <option value="text">Texto</option>
               <option value="password">Contraseña</option>
               <option value="number">Numero</option>
               <option value="email">Email</option>
               <option value="radio">Radio</option>
               <option value="select">Select</option>
               <option value="date">Fecha</option>
           </select>
           <button type="button" className="DeleteInput" onClick={(e) => DeleteOne(e, index)}>Borrar</button>
           </div>
              {designValue[index].type === "radio" || designValue[index].type === "select" ? (
               <div className="radioSelection">
                 
                 <input
               id="name"
               name="name"
               type="text"
               placeholder="name"
               value={designValue[index].name}
               onChange={(e) => handleInputChange(e, index)}
               />
                
              {fieldErrors[index].errorName && <p className="Validation">{fieldErrors[index].errorName}</p>}
              <p>Opcional?</p>
              <select
              id={`type-${index}`}
              name="obligatory"
              value={designValue[index].obligatory}
              onChange={(e) => handleInputChange(e, index)}>
                <option value="Yes">No</option>
                <option value="No">Si</option>
            </select>
               {designValue[index].options.map((option, optionIndex) => (
                 <div className="Option" key={optionIndex}>
                  <div>
                  <input
                     type="text"
                     name={`label`}
                     placeholder="Label"
                     value={option.label}
                     onChange={(e) => handleOptionInputChange(e, index, optionIndex)}
                   />
                   <input
                     type="text"
                     name={`value`}
                     placeholder="Value"
                     value={option.value}
                     onChange={(e) => handleOptionInputChange(e, index, optionIndex)}
                   />
                   <button
                   className="delete"
                     type="button"
                     onClick={() => handleOptionDelete(index, optionIndex)}
                   >
                     Eliminar opcion
                   </button>
                  </div>
                   
                   
                   {fieldErrors[index]?.errorOptions && fieldErrors[index]?.errorOptions[optionIndex]?.errorName && <p className="Validation">{fieldErrors[index]?.errorOptions[optionIndex]?.errorName}</p>}
                   
                
                 </div>
                
               ))}
               <button className="add" type="button" onClick={(e) => handleOptionChange(e, index)}>
                 Añadir opcion
               </button>
               {fieldErrors[index].errorRadio && <p className="Validation">{fieldErrors[index].errorRadio}</p>}
               
               </div>
              ) : designValue[index].type === "text" || designValue[index].type === "number"  || designValue[index].type === "email" || designValue[index].type === "password" || designValue[index].type === "date" ? (
               <div className="CampContainer">
                   <input
                   id={`name-${index}`}
                   name="name"
                   type="text"
                   placeholder="name"
                   value={designValue[index].name}
                   onChange={(e) => handleInputChange(e, index)}
                   />
                   {fieldErrors[index].errorName && <p className="Validation">{fieldErrors[index].errorName}</p>}
                   <p>Opcional?</p>
                        <select
                    id={`type-${index}`}
                    name="obligatory"
                    value={designValue[index].obligatory}
                    onChange={(e) => handleInputChange(e, index)}>
                      <option value="Yes">No</option>
                      <option value="No">Si</option>
                  </select>
               </div>
              ) : (
              <div><h1>Elija una opcion!</h1></div>
              )
              } 
              
              </>
              
            )}
            
              </div>
            ))}
            <button onClick={() => AddOne()} type="button" >Nuevo Input</button>
           {disableSubmit ? (<><button type="submit" disabled>Enviar</button></>): (<><button type="submit" >Enviar</button></>
           )}
            
        </form>
       
          </>
        ) : (
          <>
          <form className="form" onSubmit={handleFirstForm}>
          <label htmlFor="number">Cuantas preguntas quiere en su formulario?</label>
          <input
                   id="Number"
                   name="Number"
                   type="number"
                   placeholder="Numero de preguntas"
                   value={NumberInput}
                   onChange={(e) => handleFirstFormChange(e)}
                   />
          <button type="submit">Enviar</button>
          </form>
          </>
        )}
        

    </div>
  )
}
