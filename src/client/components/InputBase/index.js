import React from 'react';
import { string, bool, shape } from 'prop-types';
import {TextField} from '@material-ui/core';

const propTypes = {
  disabled: bool,
  error: string,
  title: string,
  placeholder: string,
  required: bool,
  fullWidth: bool,
  type: string,
  margin: string,
  input: shape({}),
  meta: shape({}),
  helperText: string,
};

const defaultProps = {
  title: '',
  placeholder: '',
  fullWidth: true,
  meta: {},
  required: false,
  type: 'text',
  margin: 'normal',
  input: {},
  error: '',
  helperText: '',
  disabled: false,
};

/**
 * @description
 */
const InputBase = props => {
  const {
    input,
    meta: { touched, error },
    helperText,
  } = props;

  console.log('props', props)
  return (
    <TextField
      {...input}
      {...props}
      helperText={(touched && error) || helperText}
      error={!!touched && !!error}
    />
  );
};
InputBase.propTypes = propTypes;
InputBase.defaultProps = defaultProps;
export default InputBase;
