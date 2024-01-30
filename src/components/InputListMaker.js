import React, { useState } from 'react'

export default function InputListMaker({SendInfo}  ) {
    const [NumberInput,setNumberInput] = useState(1);
    const [display, setDisplay] = useState(false);
    const [designValue, setDesignValues] = useState([
        
        {  type: 'submit',
        name: 'Button',
        },
     ]);
     const [errors, setErrors] = useState([
      
     ]);

    const handleFirstForm = (e) => {
      e.preventDefault();
      let NewDesignValue = [...designValue]
      let NewErrors = [...errors]
      for(let i = 0; i < NumberInput; i++){
        NewDesignValue.unshift(
          {
            type: 'None',
            name: '',
            options: [
                
            ]}
        )

        NewErrors.unshift(
          {
            type: 'None',
            name: '',
            options: [
                
            ]}
        )
      }
      setDisplay(true);
      setDesignValues(NewDesignValue);
      setErrors(NewErrors);
    }

    const handleFirstFormChange = (e) => {
      
      const newValue = parseInt(e.target.value, 10);
      if(newValue > 0){
        setNumberInput(newValue);
      }
      
    };

    const handleSend = (e) => {
        e.preventDefault();
        console.log(designValue)
        SendInfo(designValue)
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


  return (
    <div> 
        {display ? (
          <>

          <form className="form" onSubmit={handleSend}>
          {designValue.map((data, index) => (
            <>
            {data.type === "submit" ? (
              <>
              </>
            ) : (
              <>
               <select
            id="type"
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
           </select>
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
               {designValue[index].options.map((option, optionIndex) => (
                 <div key={optionIndex}>
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
               ))}
               <button className="add" type="button" onClick={(e) => handleOptionChange(e, index)}>
                 Añadir opcion
               </button>
               
               </div>
              ) : designValue[index].type === "text" || designValue[index].type === "password"|| designValue[index].type === "number"  || designValue[index].type === "email" ? (
               <div>
                   <input
                   id="name"
                   name="name"
                   type="text"
                   placeholder="name"
                   value={designValue[index].name}
                   onChange={(e) => handleInputChange(e, index)}
                   />
               </div>
              ) : (
               <div><h1>Elija una opcion!</h1></div>
              )
              } 
              </>
            )}
            
              </>
            ))}
            
           
            <button type="submit">Enviar</button>
        </form>

          </>
        ) : (
          <>
          <form className="form" onSubmit={handleFirstForm}>
          <label htmlFor="number">Cuantas preguntas quiere en su formulario?</label>
          <input
                   id="name"
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
