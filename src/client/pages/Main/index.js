import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import GenerateUri from '../GenerateUri';

/**
 * @description Main component
 */
class Main extends Component {
  state = {
    name: 'World',
  };

  /**
   * @description
   * @param {Object} values
   */
  handleGenerateUri = values => {
    // send request
  };

  render() {
    const { name } = this.state;
    return (
      <Grid container spacing={8}>
        <GenerateUri form="main" name={name} onGenerateUri={this.handleGenerateUri} />
      </Grid>
    );
  }
}

export default Main;
