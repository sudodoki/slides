const image = require('../images/modules.png');
require('./styles.css');
const React = require('react');
const ReactDom = require('react-dom');
class MyApp extends React.Component {
  render() {
    return <div>
      <h1>Hi!</h1>
      <img src={image} style={{width: 350}}/>
      </div>
  }
}
ReactDom.render(<MyApp />, document.getElementById('app'));
