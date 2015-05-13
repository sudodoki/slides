var React = require('react');

var Counter = React.createClass({
  render: function() {
    var styleObj = {padding:"10px", "margin-left":"5px"};
    return (<div>
        Total {this.props.purpose} count: {this.props.count}
        <button style={styleObj} onClick={this.props.onClick}>⊕</button>
      </div>)
  }
});

var CounterSet = React.createClass({
  getInitialState: function () {
    return { counters: [
          {purpose: 'Yes', count: 0},
          {purpose: 'No', count: 0},
          {purpose: 'Maybe', count: 0}
      ] };
  },
  counterIncrease: function (counter) {
    var counters = this.state.counters;
    var toModify = counters.filter(function (counterItem) {
      return counterItem === counter;
    })[0];
    toModify.count += 1;
    this.setState({counters: counters});
  },
  renderCounter: function (counter) {
    var count = counter.count,
        purpose = counter.purpose;
    return (<Counter count={count} purpose={purpose} onClick={this.counterIncrease.bind(this, counter)} />)
  },
  getTotal: function () {
    return this.state.counters.reduce(function (sum, counter) {
      return sum + counter.count;
    }, 0)
  },
  render: function() {
      return (<div>
        <h1>Hello, I can count stuff using Callbacks!</h1>
        <h1>Final Results</h1>
        { this.state.counters.map(this.renderCounter) }
        Total count is: {this.getTotal()}
      </div>)
  }
})
React.render(<CounterSet />, global.document.getElementById('myApp'));

