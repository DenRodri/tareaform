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
          updatedDesignValues[index] = {
            ...updatedDesignValues[index],
            [name]: value,
          };
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
               {designValue[0].type === "radio" ? (
                <div><input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={designValue[0].name}
                onChange={(e) => handleInputChange(e, 0)}
                /></div>
               ) : designValue[0].type === "select" ? (
                <div><input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={designValue[0].name}
                onChange={(e) => handleInputChange(e, 0)}
                /></div>
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
            {designValue[1].type === "radio" ? (
                <div><input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={designValue[1].name}
                onChange={(e) => handleInputChange(e, 1)}
                /></div>
               ) : designValue[1].type === "select" ? (
                <div><input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={designValue[1].name}
                onChange={(e) => handleInputChange(e, 1)}
                /></div>
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
