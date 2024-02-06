export default function ValidationInputList(values, designValues) {
    let error = {};
    
    const isNameDuplicated = designValues.filter(item => item.name === values.name).length > 1;
    
    if (values.name === '') {
      error.errorName = 'El nombre es requerido!';
    }else if (isNameDuplicated) {
      error.errorName = 'El nombre no puede estar duplicado!'; 
    }else if(values.name.length < 2 && values.type === "text"){
      error.errorName = 'Debe de ser mayor de 2 caracteres!';
    }else if(values.name.length < 6 && values.type === "password"){
      error.errorName = 'Debe de ser mayor de 6 caracteres!';
    }
    if(values.type === "radio" && values.options.length >= 5){
    error.errorRadio = 'No puede tener mas de 5 opciones!';
    }
    if((values.type === "radio" || values.type === "select") && values.options.length < 2){
      error.errorRadio = 'Debe llevar por lo menos dos opciones';
      }
    if ((values.type === "radio" || values.type === "select") && values.options.length > 0) {
      const optionsErrors = values.options.map((option) => {
        let optionError = {};
  
        if (!option.label || !option.value) {
          optionError.errorName = 'Ambas etiqueta y valor deben tener texto en las opciones!';
        }
  
        return optionError;
      });
  
       if (optionsErrors.some((optionError) => Object.keys(optionError).length > 0)) {
    error.errorOptions = optionsErrors;
  }
    }
    return error;
  }