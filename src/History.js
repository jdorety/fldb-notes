import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { flureeQL } from '@fluree/react-wrapper';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function HistoryBlock({ blockData }) {
  const { block, t, flakes } = blockData;
  return (
    <div>
      Block: {block} ({t})
      <br />
      Flakes: {JSON.stringify(flakes)}
    </div>

  );
}

function SubjectHistory({ subject, data }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        History
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          History for subject: {subject}
          {data.result.map(blockData => <HistoryBlock key={blockData.block} blockData={blockData} />)}

        </Typography>
      </Popover>
    </div>
  );
}

function historyQuery(props) {
  return {
    history: props.subject,
    prettyPrint: true
  }
}

const SubjectHistoryFluree = flureeQL(historyQuery, { queryType: "history" })(SubjectHistory);


function PredicateHistory({ subject, predicate, data, child }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  console.warn("Open???", open, data.result);


  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {child}
      </Typography>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          History for subject: {subject}

        </Typography>
      </Popover>
    </div>
  );
}

function predicateQuery(props) {
  return {
    history: [props.subject, props.predicate],
    prettyPrint: true
  }
}

const PredicateHistoryFluree = flureeQL(predicateQuery, { queryType: "history" })(PredicateHistory);


export { SubjectHistoryFluree as SubjectHistory, PredicateHistoryFluree as PredicateHistory };