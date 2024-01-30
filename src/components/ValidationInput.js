export default function ValidationInput(values) {
    const errors = {};
  
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  
    if (values.name === '') {
      errors.value = 'El nombre es requerido!';
    }
    if (!email_pattern.test(values.name) || values.type === "email") {
      errors.email = "No es un email";
    }
    if (values.age === '') {
      errors.age = 'Age is required!';
    } else if (values.age < 0) {
      errors.age = 'Age must be a positive number or not 0';
    }
    if (values.gender === '') {
      errors.gender = 'Gender is required!';
    }
    if (values.country === '') {
      errors.country = 'Country is required!';
    }
  
    return errors;
  }