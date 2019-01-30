import React from 'react';
import { string, bool, shape, func } from 'prop-types';
import { TextField } from '@material-ui/core';

const propTypes = {
  disabled: bool,
  error: string,
  title: string,
  placeholder: string,
  required: bool,
  fullWidth: bool,
  type: string,
  margin: string,
  onChange: func,
  input: shape({}),
  meta: shape({}),
  helperText: string,
};

const defaultProps = {
  disabled: false,
  error: '',
  fullWidth: true,
  helperText: '',
  input: {},
  margin: 'normal',
  meta: {},
  onChange: () => {},
  placeholder: '',
  required: false,
  type: 'text',
  title: '',
};

/**
 * @description
 */
const InputBase = props => {
  const {
    input,
    meta: { touched, error },
    helperText,
    onChange,
  } = props;

  const onChangeInput = e => {
    const str = e.target.value;
    props.input.onChange(str);
    onChange(str);
  };

  return (
    <TextField
      {...input}
      {...props}
      onChange={onChangeInput}
      helperText={(touched && error) || helperText}
      error={!!touched && !!error}
    />
  );
};
InputBase.propTypes = propTypes;
InputBase.defaultProps = defaultProps;
export default InputBase;
