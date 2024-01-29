import React, { useState } from 'react'

export default function InputListMaker({SendInfo}  ) {

    const [designValue, setDesignValues] = useState([
        {
        type: 'None',
        name: '',
        options: [
            
        ]},
        {  type: 'None',
        name: '',
        options: [
            
        ]},
     ]);

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
        const { name, value } = e.target;
    
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
      
          console.log('After Update:', designValue);
          return updatedDesignValues;
        });
      };


  return (
    <div> 

        <form className="form" onSubmit={handleSend}>
            <select
             id="type"
             name="type"
             value={designValue[0].type}
             onChange={(e) => handleInputChange(e, 0)}>
                <option value="None">Selecciona una opcion</option>
                <option value="text">Texto</option>
                <option value="password">Contraseña</option>
                <option value="number">Numero</option>
                <option value="radio">Radio</option>
                <option value="select">Select</option>
            </select>
               {designValue[0].type === "radio" || designValue[0].type === "select" ? (
                <div className="radioSelection">
                  
                  <input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={designValue[0].name}
                onChange={(e) => handleInputChange(e, 0)}
                />
                {designValue[0].options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      name={`label`}
                      placeholder="Label"
                      
                      onChange={(e) => handleOptionInputChange(e, 0, optionIndex)}
                    />
                    <input
                      type="text"
                      name={`value`}
                      placeholder="Value"
                      
                      onChange={(e) => handleOptionInputChange(e, 0, optionIndex)}
                    />
                    <button
                    className="delete"
                      type="button"
                      onClick={() => handleOptionDelete(0, optionIndex)}
                    >
                      Eliminar opcion
                    </button>
                  </div>
                ))}
                <button className="add" type="button" onClick={(e) => handleOptionChange(e, 0)}>
                  Añadir opcion
                </button>
                
                </div>
               ) : designValue[0].type === "text" || designValue[0].type === "password"|| designValue[0].type === "number"  ? (
                <div>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="name"
                    value={designValue[0].name}
                    onChange={(e) => handleInputChange(e, 0)}
                    />
                </div>
               ) : (
                <div><h1>Elija una opcion!</h1></div>
               )
               }
            <select
             id="type"
             name="type"
             value={designValue[1].type}
             onChange={(e) => handleInputChange(e, 1)}>
                <option value="None">Selecciona una opcion</option>
                <option value="text">Texto</option>
                <option value="password">Contraseña</option>
                <option value="number">Numero</option>
                <option value="radio">Radio</option>
                <option value="select">Select</option>
            </select>
            {designValue[1].type === "radio" || designValue[1].type === "select" ? (
                <div className="radioSelection"><input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={designValue[1].name}
                onChange={(e) => handleInputChange(e, 1)}
                />
                {designValue[1].options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      name={`label`}
                      placeholder="Label"
                      
                      onChange={(e) => handleOptionInputChange(e, 1, optionIndex)}
                    />
                    <input
                      type="text"
                      name={`value`}
                      placeholder="Value"
                      
                      onChange={(e) => handleOptionInputChange(e, 1, optionIndex)}
                    />
                    <button
                    className="delete"
                      type="button"
                      onClick={() => handleOptionDelete(1, optionIndex)}
                    >
                      Eliminar opcion
                    </button>
                  </div>
                ))}
                <button className="add" type="button" onClick={(e) => handleOptionChange(e, 1)}>
                  Añadir opcion
                </button>
                </div>
               ) : designValue[1].type === "text" || designValue[1].type === "password"|| designValue[1].type === "number"  ? (
                <div><input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={designValue[1].name}
                onChange={(e) => handleInputChange(e, 1)}
                /></div>
               ) : (
                <div><h1>Elija una opcion!</h1></div>
               )
               }
            <button type="submit">Submit</button>
        </form>

    </div>
  )
}
