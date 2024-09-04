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
    namespaceId: {
      type: "string",
    },
  },
  required: ["title", "href", "namespaceId"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = validate;
