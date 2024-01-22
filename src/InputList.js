export const InputList = [
  {
      name: 'Nombre',
      type: 'text',

  },
  {
    name: 'Contraseña',
    type: 'password',
  },
  {
    name: 'Edad',
    type: 'number',
  },
  {
    name: 'Sexo',
    type: 'radio',
    options: [
      {
        value: "male",
        label: "Masculino"
      },{
        value: "female",
        label: "Femenino"
      }
    ],
  },
  {
    name: 'Nacionalidad',
    type: 'select',
    options: [
      {
        value: "dominican",
        label: "Republica Dominicana"
      },{
        value: "EEUU",
        label: "Estados Unidos"
      },{
        value: "german",
        label: "Alemani"
      }
    ]
  },
]