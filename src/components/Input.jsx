
import React from 'react';


export default function Input({ name, type, onChange, options, formValues, index, error }) {
  return (
    <div className="CampContainer">
      {type === "select" ? (
        <div className="CampContainer">
          <label htmlFor={name}>{name}</label>
          <select value={formValues[index].value || ""} id={name} name={name} onChange={(e) => onChange(e.target.value, type, index)}>
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
          <label htmlFor={name}>{name}</label>
          {options.map((option, optionindex) => (
            <div key={optionindex}>
              <input
                type="radio"
                id={`${name}-${optionindex}`}
                name={name}
                value={option.value}
                onChange={(e) => onChange(e.target.value, type, index)}
              />
              <label style={{ marginLeft: "5px" }} htmlFor={`${name}-${optionindex}`}>{option.label}</label>
              
            </div>
          ))}
          {error?.ErrorName && <p className="Validation">{error?.ErrorName}</p>}
        </div>
      ) : type === "text" || type === "password" || type === "number" || type === "email" ? (
        <div className="CampContainer">
          <label htmlFor={name}>{name}</label>
          <input
            type={type}
            id={name}
            name={name}
            value={formValues[index].value || ""}
            onChange={(e) => onChange(e.target.value, type, index)}
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