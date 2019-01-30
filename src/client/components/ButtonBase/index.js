import React from 'react';
import { string, bool, shape } from 'prop-types';
import { Button } from '@material-ui/core';

const propTypes = {
  color: string,
  disabled: bool,
  fullWidth: bool,
  input: shape({}),
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
  fullWidth: false,
  input: {},
  placeholder: '',
  required: false,
  title: '',
  type: 'submit',
  value: '',
  variant: 'raised',
};

/**
 * @description Custom base button
 */
const ButtonBase = props => {
  const { input, title } = props;

  return (
    <Button {...input} {...props}>
      {title}
    </Button>
  );
};
ButtonBase.propTypes = propTypes;
ButtonBase.defaultProps = defaultProps;
export default ButtonBase;
