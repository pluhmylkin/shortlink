import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import GenerateUrl from '../GenerateUrl';
import ListUrl from '../ListUrl';

const styles = () => ({
  root: {
    width: '90%',
    'margin-left': 'auto',
    'margin-right': 'auto',
  },
});

/**
 * @description Main component
 */
class Main extends Component {
  static propTypes = {
    classes: shape({
      root: string,
    }),
  };

  static defaultProps = {
    classes: {},
  };

  state = {
    name: 'World',
    shortUrl: '',
    list: [],
  };

  async componentWillMount() {
    this.checkList();
  }

  checkList = async () => {
    const check = await axios.get(`/api/url/`);
    const list = check.data && check.data.result;
    this.setState({ list });
  };

  /**
   * @description
   * @param {Object} values
   */
  handleGenerateUrl = async values => {
    const check = await axios.post(`/api/url/`, { url: values.url });
    const shortUrl = check.data.result && check.data.result.shortUrl;
    this.handleUpdateShortUrl(shortUrl);
    this.checkList();
  };

  handleUpdateShortUrl = shortUrl => this.setState({ shortUrl });

  render() {
    const { classes } = this.props;
    const { name, shortUrl, list } = this.state;
    return (
      <Typography component="div" className={classes.root}>
        <GenerateUrl
          form="main"
          name={name}
          shortUrl={shortUrl}
          onUpdateShortUrl={this.handleUpdateShortUrl}
          onSubmit={this.handleGenerateUrl}
        />
        <ListUrl list={list} />
      </Typography>
    );
  }
}

export default withStyles(styles)(Main);
