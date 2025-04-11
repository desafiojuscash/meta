import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

function validate(schema) {
  const validateFn = ajv.compile(schema);
  
  return (req, res, next) => {
    const valid = validateFn(req.body);
    if (!valid) {
      return res.status(400).json({
        errors: validateFn.errors,
      });
    }
    next();
  };
}

export default validate;
