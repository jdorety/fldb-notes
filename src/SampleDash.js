// Sample dashboard 
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TimeTravel from './TimeTravel';
import CollectionTable from './CollectionTable';

const AppGrid = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <CollectionTable
          collection="_predicate"
          predicates={["name", "doc", "type", "unique", "multi"]}
        />
      </Grid>
      <Grid item xs={3}>
        <TimeTravel></TimeTravel>
        <CollectionTable
          collection="_collection"
          predicates={["name", "doc"]}
        />
      </Grid>
    </Grid>
  );
}