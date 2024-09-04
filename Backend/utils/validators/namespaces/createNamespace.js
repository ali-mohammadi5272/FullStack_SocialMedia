const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  $data: true,
});

const schema = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    href: {
      type: "string",
    },
  },
  required: ["title", "href"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = validate;
