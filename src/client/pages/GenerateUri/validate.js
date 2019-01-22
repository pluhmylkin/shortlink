import validator from 'validator';

/**
 * @description Validation for component GenerateUri
 * @param {Object} values
 */
export default values => {
  const errors = {};
  if (!values.longURI) {
    errors.longURI = `Please write URI`;
  }
  if (values.longURI && !validator.isURL(values.longURI)) {
    errors.longURI = `Invalid URI`;
  }
  return errors;
};
