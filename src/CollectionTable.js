// This example displays a collection in a table
import React from 'react';
import { flureeQL } from '@fluree/react-wrapper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ePochToString(epoch) {
  const d = new Date(epoch);
  return d.toISOString();
}


// given a predicate pattern, returns a array of key sequences for nested object access
// i.e. ["username", {"auth": ["id"]}] ==> [["username"], ["auth", "id"]]
function predPatternToKeySeq(predicates, parent = []) {
  var predicateItems = []; // each item will be an array with nested predicate access path, i.e. ["auth", "id"]

  predicates.forEach(p => {
    // console.warn("Prdicate, parent: ", p, thisParent);
    const isRef = (typeof p === 'object');
    if (isRef) { // follow a ref, i.e {"auth": ["_id", "id", "roles"]}
      const refParent = Object.keys(p)[0] // should only have a single k/v pair
      console.warn("isRef:", p);
      const refPattern = p[refParent];
      const expandedRefs = predPatternToKeySeq(refPattern, [...parent, refParent]);
      predicateItems = predicateItems.concat(expandedRefs);
    } else { // p should be just a string predicate name
      predicateItems.push([...parent, p]);
    }
  });
  return predicateItems;
}

// get nested object value if exists, will not return exception if it does not.
// coerces boolean values into strings so React will display them
// if value is a ref, i.e. {_id: 12345}, extracts the _id number out of object
function get(obj, keySeq) {
  let idx = 0;
  const length = keySeq.length;

  while (obj != null && idx < length) {
    if (Array.isArray(obj)) {
      obj = obj[0]; // LIMITATION - for now if multi-cardinality take the first one
    }
    obj = obj[keySeq[idx++]];
  }

  if (typeof obj === "boolean") { // coerce booleans to strings
    obj = (obj === true) ? "true" : "false";
  } else if (typeof obj === "object") { // coerce refs or 'components' to just _id value
    obj = obj._id;
  }

  return obj;
}


function CollectionTable({ collection, predicates, data }) {
  const cRecords = data && data.result || [];
  const predicateList = predicates ? predPatternToKeySeq(predicates) : [];
  console.warn("PredicateList: ", predicateList);
  console.warn("cRecords: ", cRecords);
  const predHeadings = predicateList.map(pItem => pItem.join("."));
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {predHeadings.map(pHeading => (<TableCell>{pHeading}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cRecords.map((cRecord) => (
            <TableRow key={cRecord._id}>
              {predicateList.map(pItem => (<TableCell>{get(cRecord, pItem)}</TableCell>))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function collectionQuery(props) {
  const { collection, predicates } = props;
  const query = (collection && predicates) ? { select: predicates, from: collection } : null;
  return query;
}

const CollectionTableFluree = flureeQL(collectionQuery)(CollectionTable);

export default CollectionTableFluree;
