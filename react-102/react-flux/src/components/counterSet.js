var React = require('react');
var CounterStore = require('../stores/counter-store.js');
var Counter = require('./counter');

function getCounters () {
  return CounterStore.getCounters();
}
var CounterSet = React.createClass({
  getInitialState: function () {
    return getCounters(); // {counters: [...]}
  },
  componentWillMount:function(){
    CounterStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(nextProps, nextState) {
    CounterStore.removeChangeListener(this._onChange);
  },
  _onChange:function(){
    this.setState(getCounters());
  },
  renderCounter: function (counter, index) {
    var count = counter.count,
        purpose = counter.purpose;
    return (<Counter count={count} purpose={purpose} index={index} />)
  },
  getTotal: function () {
    return this.state.counters.reduce(function (sum, counter) {
      return sum + counter.count;
    }, 0)
  },
  render: function() {
      return (<div>
        <h1>Final Results</h1>
        { this.state.counters.map(this.renderCounter) }
        Total count is: {this.getTotal()}
      </div>)
  }
});

module.exports = CounterSet;