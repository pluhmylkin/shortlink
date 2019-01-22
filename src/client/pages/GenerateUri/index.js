import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import { pipe } from 'ramda';
import validate from './validate';
import InputBase from '../../components/InputBase';
import ButtonBase from '../../components/ButtonBase';

const propTypes = {
  onGenerateUri: func.isRequired,
  handleSubmit: func.isRequired,
  longURI: string,
  name: string,
};

const defaultProps = {
  longURI: '',
  name: '',
};

/**
 * @description
 * @param {Object} props
 */
const GenerateUri = ({ handleSubmit, onGenerateUri, longURI, name }) => (
  <form method="post" onSubmit={handleSubmit(onGenerateUri)}>
    Hello {name}! Please write URI
    <Field component={InputBase} name="longURI" placeholder="Write your URI" />
    You wrote: {longURI}
    <Field
      component={ButtonBase}
      name="convertUri"
      placeholder="Write your URI"
      title="Create short uri"
    />
  </form>
);

GenerateUri.propTypes = propTypes;
GenerateUri.defaultProps = defaultProps;

const MapStateToProps = (state, ownProps) => {
  const selector = formValueSelector(ownProps.form);
  const longURI = selector(state, 'longURI');
  return { longURI };
};

export default pipe(
  connect(MapStateToProps),
  reduxForm({
    validate,
  })
)(GenerateUri);
