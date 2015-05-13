var CounterConstants = require('../constants/counter-constants');
var CounterDispatcher = require('../dispatchers/counter-dispatcher.js');

var AppActions = {
  decreaseItem:function(index){
    CounterDispatcher.handleViewAction({
      actionType: CounterConstants.DECREASE_COUNTER,
      index: index
    });
  },
  increaseItem:function(index){
    CounterDispatcher.handleViewAction({
      actionType: CounterConstants.INCREASE_COUNTER,
      index: index
    });
  }
};

module.exports = AppActions;