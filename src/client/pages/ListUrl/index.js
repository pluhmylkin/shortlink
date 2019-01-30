import React from 'react';
import { shape, string, arrayOf } from 'prop-types';
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const propTypes = {
  list: arrayOf(
    shape({
      url: string,
      shortUrl: string,
    })
  ).isRequired,
  classes: shape({
    root: string,
    table: string,
  }).isRequired,
};

/**
 * @description List of added urls
 */
const ListUrl = ({ classes, list }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Url</TableCell>
          <TableCell>ShortUrl</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map(item => (
          <TableRow key={item._id}>
            <TableCell component="th" scope="row">
              {item.url}
            </TableCell>
            <TableCell>
              <a href={`/url/${item.shortUrl}`} rel="noopener noreferrer" target="_blank">
                {item.shortUrl}
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

ListUrl.propTypes = propTypes;

export default withStyles(styles)(ListUrl);
