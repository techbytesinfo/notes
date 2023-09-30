const data = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    gender: "male",
    address: "New York",
    phone: {
      mobile: "123-456-7890",
      home: "123-456-7890",
    }
  },
  {
    firstName: "Marcell",
    lastName: "Wessels",
    age: 55,
    gender: "male",
    address: "Netherlands",
    phone: {
      mobile: "31-456-7890",
      home: "87-456-7890",
    }
  }
];

export const config = {
    inputType: "text",
    type: "input",
    validations: {
      required: true,
      minLength: 3,
      maxLength: 10,
    }
}
