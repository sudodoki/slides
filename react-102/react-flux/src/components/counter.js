var React = require('react');
var CounterActions = require('../actions/counter-actions');

var Counter = React.createClass({
  incrementCount: function () {
    CounterActions.increaseItem(this.props.index);
  },
  render: function() {
    var styleObj = {padding:"10px", "margin-left":"5px"};
    return (<div>
        Total {this.props.purpose} count: {this.props.count}
        <button style={styleObj} onClick={this.incrementCount}>⊕</button>
      </div>)
  }
});

module.exports = Counter;