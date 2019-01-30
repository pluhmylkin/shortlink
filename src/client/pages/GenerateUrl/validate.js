import validator from 'validator';

/**
 * @description Validation for component GenerateUrl
 * @param {Object} values
 */
export default values => {
  const errors = {};
  if (!values.url) {
    errors.url = `Please write URL`;
  }
  if (values.url && !validator.isURL(values.url)) {
    errors.url = `Invalid URL`;
  }
  return errors;
};
