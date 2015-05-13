var CounterDispatcher = require('../dispatchers/counter-dispatcher');
var CounterConstants = require('../constants/counter-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _counters = [
    {purpose: 'Yes', count: 0},
    {purpose: 'No', count: 0},
    {purpose: 'Maybe', count: 0}
  ];

function _increaseItem(index){
  _counters[index].count++;
}

function _decreaseItem(index){
  if(_counters[index].count>1){
    _counters[index].count--;
  }
}

var CounterStore = merge(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCounters:function(){
    return {counters: _counters};
  },

  dispatcherIndex: CounterDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case CounterConstants.INCREASE_COUNTER:
        _increaseItem(payload.action.index);
        break;

      case CounterConstants.DECREASE_COUNTER:
        _decreaseItem(payload.action.index);
        break;
    }
    CounterStore.emitChange();

    return true;
  })
});

module.exports = CounterStore;