import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import { pipe } from 'ramda';
import validate from './validate';
import asyncValidate from './asyncValidate';
import InputBase from '../../components/InputBase';
import ButtonBase from '../../components/ButtonBase';

const propTypes = {
  handleSubmit: func.isRequired,
  name: string,
  onSubmit: func.isRequired,
  onUpdateShortUrl: func.isRequired,
  url: string,
  shortUrl: string.isRequired,
};

const defaultProps = {
  name: '',
  url: '',
};

/**
 * @description
 * @param {Object} props
 */
const GenerateUrl = ({ handleSubmit, onSubmit, url, name, shortUrl, onUpdateShortUrl }) => (
  <form method="post" onSubmit={handleSubmit(onSubmit)}>
    Hello {name}! Please write URL
    <Field
      component={InputBase}
      onChange={() => onUpdateShortUrl('')}
      name="url"
      placeholder="Write your URL"
    />
    <div>You wrote: {url}</div>
    <br />
    <Field
      component={ButtonBase}
      title="Generate short url"
      name="generateUrl"
      disabled={!!shortUrl}
    />
    <br />
    <br />
    <div>New short url: {shortUrl}</div>
  </form>
);

GenerateUrl.propTypes = propTypes;
GenerateUrl.defaultProps = defaultProps;

const MapStateToProps = (state, ownProps) => {
  const selector = formValueSelector(ownProps.form);
  const url = selector(state, 'url');
  return { url };
};

export default pipe(
  connect(MapStateToProps),
  reduxForm({
    validate,
    asyncValidate,
  })
)(GenerateUrl);
