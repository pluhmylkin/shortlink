import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, string } from 'prop-types';
import axios from 'axios';

class UrlRedirect extends Component {
  state = {
    url: {
      url: '',
    },
  };

  async componentWillMount() {
    const {
      match: {
        params: { shortUrl },
      },
    } = this.props;
    const check = await axios.get(`/api/url/${shortUrl}`);
    const result = check.data && check.data.result;
    this.setState({ url: result.url });
  }

  render() {
    const { url } = this.state;
    if (url) {
      return <a href={url}>Your real link is here</a>;
    }
    return <div>Link is not work</div>;
  }
}

UrlRedirect.propTypes = {
  match: shape({
    params: shape({
      shortUrl: string,
    }),
  }).isRequired,
};

export default withRouter(UrlRedirect);
