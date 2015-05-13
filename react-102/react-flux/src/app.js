var React = require('react');
var CounterSet = require('./components/counterSet');
var App = React.createClass({

  render: function() {
    return (<div>
      <h1>Hello, I can count stuff using Flux!</h1>
      <CounterSet />
    </div>);
  }

});

module.exports = App;
