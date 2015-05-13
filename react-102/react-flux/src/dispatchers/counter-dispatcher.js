var Dispatcher = require('flux').Dispatcher;
var merge  = require('react/lib/merge');

var CounterDispatcher = new Dispatcher();
CounterDispatcher.handleViewAction = function handleViewAction(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};


module.exports = CounterDispatcher;