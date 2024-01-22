import React from 'react'

export default function Input({ name, type, onChange, options }) {
  return (
  
    <div className="CampContainer">
      {type === "select" ? (
        <div className="SelectContainer">
          <label htmlFor={name}>{name}</label>
        <select id={name} name={name} onChange={(e) => onChange(name, e.target.value)}>
        <option value="">
          Selecciona una opcion
        </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        </div>
      ) : type === "radio" ? (
        <div className="RadioContainer">
          <label htmlFor={name}>{name}</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`${name}-${index}`}
              name={name}
              value={option.value}
              onChange={(e) => onChange(name, e.target.value)}
            />
            <label htmlFor={`${name}-${index}`}>{option.label}</label>
          </div>))} 
        </div>
      ): (
        <div>
        <label htmlFor={name}>{name}</label>
        <input
          type={type}
          id={name}
          name={name}
          onChange={(e) => onChange(name, e.target.value)}
        />
        </div>
      )}
      
    </div>
  )
}
