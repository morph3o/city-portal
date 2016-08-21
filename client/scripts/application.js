import React from 'react';
import ReactDOM from 'react-dom';

/* eslint no-undef: "off", react/prefer-stateless-function: "off",
react/jsx-filename-extension: "off" */
class App extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
