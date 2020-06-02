import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { flureeQL } from '@fluree/react-wrapper';

var urlParams = new URLSearchParams(window.location.search);
// var p = urlParams.get('p');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function UserSelect({data}) {
  const classes = useStyles();

  const handleClick = (p) => {
    return () => {
        if (p)
            window.location = 'index.html?p=' + p;
        else
            window.location = 'index.html';
    }
  };

  const p = urlParams.get('p');
  console.warn("P is: ", p)
  const Star = <ListItemIcon><StarIcon /></ListItemIcon>;

  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      <ListItem button onClick={handleClick(null)}>
        {p ? null : Star}
        <ListItemText inset={p ? true : false} primary="None (Root)" />
      </ListItem>
      {data.result.map( user =>       
        <ListItem button onClick={handleClick(user.private)}>
            {(p === user.private) ? Star : null}
            <ListItemText inset={(p === user.private) ? false : true} primary={user.username} />
        </ListItem>)}
    </List>
  );
}

const userQuery = {
    select: ["*"],
    from: "_user"
};

export default flureeQL(userQuery)(UserSelect);
