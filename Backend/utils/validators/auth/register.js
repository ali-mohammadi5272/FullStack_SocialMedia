const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  $data: true,
});

const schema = {
  type: "object",
  properties: {
    firstname: {
      type: "string",
      minLength: 3,
      pattern: `^[a-zA-Z]{3,}$`,
    },
    lastname: {
      type: "string",
      minLength: 3,
      pattern: `^[a-zA-Z]{3,}$`,
    },
    username: {
      type: "string",
      minLength: 3,
      pattern: `^[a-z]{1}[a-z0-9]{2,}(_[a-z0-9]+)*?$`,
    },
    email: {
      type: "string",
      pattern: `^[\\w\\.\\-_]+@[\\w]{5,8}\\.[a-z]{2,3}$`,
    },
    phone: {
      type: "string",
      pattern: `^(0|\\+98)?9\\d{9}$`,
    },
    age: {
      type: "number",
      minimum: 0,
    },
    password: {
      type: "string",
      minLength: 8,
    },
    confirmPassword: {
      const: {
        $data: "1/password",
      },
      type: "string",
    },
  },
  required: [
    "firstname",
    "lastname",
    "username",
    "email",
    "phone",
    "age",
    "password",
    "confirmPassword",
  ],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = validate;
