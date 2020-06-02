import React from 'react'
import logo from './logo.svg';
import './App.css';
import { ReactConnect, FlureeProvider, flureeQL } from '@fluree/react-wrapper';
import CollectionTable from './CollectionTable';


// import '@fluree/react-wrapper/dist/index.css'
const myconn = ReactConnect({
  servers: "http://localhost:8090",
  ledger: "example/ledger",
  workerUrl: "flureeworker.js",
  private: null
});


const App = () => {
  // return <ExampleComponent text="Create React Library Example 😄" />
  return (
    <FlureeProvider conn={myconn}>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Fluree! The sample below uses a generic CollectionTable component to query for any collection.</p>
        <p>Predicates in your ledger are:</p>
        <CollectionTable
          collection="_predicate"
          predicates={["name", "doc", "type", "unique", "multi"]}
        />
      </div>
    </FlureeProvider >
  );
}

export default App
