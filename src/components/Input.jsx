
import React from 'react';


export default function Input({ name, type, onChange, options, formValues, index, error, obligatory }) {
  
  
  return (
    <div className="CampContainer">
      {type === "select" ? (
        <div className="CampContainer">
          <label htmlFor={name}>{name} {obligatory==="No" ? " (Opcional)": ""}</label>
          <select id={name} name={name} onChange={(e) => onChange(e.target.value, type, index, obligatory)} value={formValues[index].value || ""}>
            {options.map((option, optionindex) => (
              <option key={optionindex} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error?.ErrorName && <p className="Validation">{error?.ErrorName}</p>}
        </div>
      ) : type === "radio" ? (
        <div className="RadioContainer">
          <label htmlFor={name}>{name} {obligatory==="No" ? " (Opcional)": ""}</label>
          {options.map((option, optionindex) => (
            <div key={optionindex}>
              <input
                type="radio"
                id={`${name}-${optionindex}`}
                name={name}
                onChange={(e) => onChange(e.target.value, type, index, obligatory)}
                value={option.value}
              />
              <label style={{ marginLeft: "5px" }} htmlFor={`${name}-${optionindex}`}>{option.label}</label>
              
            </div>
          ))}
          {error?.ErrorName && <p className="Validation">{error?.ErrorName}</p>}
        </div>
      ) : type === "date" || type === "text" || type === "password" || type === "number" || type === "email" ? (
        <div className="CampContainer">
          <label htmlFor={name}>{name} {obligatory==="No" ? " (Opcional)": ""}</label>
          <input
            type={type}
            id={name}
            name={name}
            onChange={(e) => onChange(e.target.value, type, index, obligatory)}
            value={formValues[index].value || ""}
          />
          {error?.ErrorName && <p className="Validation">{error?.ErrorName}</p>}
        </div>
      ) : type === "submit" ? (
        <>
        {error?.ErrorName === "" ? (<><button disabled type={type} id={name} name={name}>Enviar</button></>) : (<><button type={type} id={name} name={name}>Enviar</button></>)}
        
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}