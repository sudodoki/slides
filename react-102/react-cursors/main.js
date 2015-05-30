var React = require('react');

var Baobab = require('baobab'),
    rootMixin = require('baobab-react/mixins').root,
    branchMixin = require('baobab-react/mixins').branch;

var tree = new Baobab({
  counters: [
    {purpose: 'Yes', count: 0},
    {purpose: 'No', count: 0},
    {purpose: 'Maybe', count: 0}
  ]
});

var Counter = React.createClass({
  mixins: [branchMixin],
  cursors: function () {
    return {
      purpose: ['counters', this.props.index, 'purpose'],
      count: ['counters', this.props.index, 'count']
    };
  },
  increaseCount: function() {
    this.cursors.count.apply(function(i) {
      return i + 1;
    });
  },
  render: function() {
    var styleObj = {padding: "10px", "marginLeft": "5px"};
    return (<div>
      Total {this.state.purpose} count: {this.state.count}
      <button style={styleObj} onClick={this.increaseCount}>⊕</button>
    </div>)
  }
});

// baobab deletes state on the root component
// so we cannot have corresponding cursor in root
// and reduce it or
// use tree.get('counters') ... because it breaks reactivity
var Total = React.createClass({
  mixins: [branchMixin],
  cursors: {counters: ['counters']},
  getTotal: function (countersCursors) {
    return this.state.counters.reduce(function(total, counter){
      return total + counter.count;
    },0)
  },
  render: function() {
    return (<p>
      Total count is: {this.getTotal()}
    </p>);
  }
});

var CounterSet = React.createClass({
  mixins: [rootMixin],
  render: function() {
    countersCursors = this.props.tree.select('counters')
    function renderCounter(counterCursor, index) {
      return (<Counter key={index} index={index} />)
    }
    return (<div>
      <h1>Hello, I can count stuff using baobab-react (single immutable tree)!</h1>
      <h1>Final Results</h1>
      { countersCursors.map(renderCounter) }
      <Total />
    </div>)
  }
});

React.render(<CounterSet tree={tree} />, global.document.getElementById('myApp'));