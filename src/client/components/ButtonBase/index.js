import React from 'react';
import { string, bool, shape } from 'prop-types';
import { Button } from '@material-ui/core';

const propTypes = {
  color: string,
  disabled: bool,
  fullWidth: bool,
  input: shape({}),
  meta: shape({
    touched: bool,
    error: bool,
  }).isRequired,
  placeholder: string,
  required: bool,
  title: string,
  type: string,
  value: string,
  variant: string,
};

const defaultProps = {
  color: 'primary',
  disabled: false,
  fullWidth: true,
  input: {},
  placeholder: '',
  required: false,
  title: '',
  type: 'submit',
  value: '',
  variant: 'raised',
};

/**
 * @description
 */
const ButtonBase = props => {
  const {
    input,
    title,
    meta: { touched, error },
  } = props;

  return (
    <Button {...input} {...props} error={!!touched && !!error}>
      {title}
    </Button>
  );
};
ButtonBase.propTypes = propTypes;
ButtonBase.defaultProps = defaultProps;
export default ButtonBase;
