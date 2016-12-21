title: "React: lessons learned"
author:
  name: sudodoki
  email: smd.deluzion@gmail.com
  github: sudodoki
  twitter: sudodoki
theme: sudodoki/reveal-cleaver-theme
output: index.html

--

## ⚛ React: lessons learned

--

# whoami

## [@sudodoki](http://twitter.com/sudodoki)
## FE lead in R⚡️R

--

# How do I know React
+ pet projects
+ POC for customers
+ our current project
  1. ~350 routes
  2. ~190kLOC

--

## Why choose react + redux 🤔

--

## Well, to choose something, you need to know about it 🤓

--

# React
+ a javascript library for building user interfaces
+ opensourced: May 2013
+ React is **V** in **MVC**

--

# Key Features 🔑

+ Component Based
+ Simple & Declarative
+ Virtual DOM
+ Enforcing One-way Dataflow

--

# Components ⚙

+ Not web-components
+ Not ng directives

--

# Component tree 🌲

```
App
├── Header
│   └── h1
└── List
    └── ul
        ├── li
        ├── li
        └── li
```

--

## Single component
+ can have its own state
+ can have props passed from parent component
+ whenever state or props changes -> rerender triggered

--

# State 🇺🇸

+ to access, use `this.state`
+ to set, use
  ```
  this.setState({
    keyInStateToMerge: newValue
  })
  ```

--
# Props (~attrs)
+ to access, use `this.props`
+ ~~to set~~ no way to set those - enforces one way data flow
--

# Component Lifecycle
## 👶 → 👱 → 👼

+ componentWillMount()
+ componentDidMount()
+ componentWillReceiveProps()
+ shouldComponentUpdate()
+ componentWillUpdate()
+ componentDidUpdate()
+ componentWillUnmount()

--

## Why 'rerender everything' is effective?
+ VDOM
+ shouldComponentUpdate
+ extra benefits of immutable data

--

### Authoring Component (JSX) ✎

```
class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.state = { count: 0 }
  }
  handleIncrease() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <h1>Count is {this.state.count}</h1>
        <Counter onIncrease={this.handleIncrease} />
      </div>
    )
  } }
```

--

## Event handling 👉

+ Synthetic Events (crossbrowser wrapper)
+ Pooled
+ handlers on{Event} / on{Event}Capture
```
<button onClick={doCoolStuff}>
  Do Cool Stuff
</button>
```

--

# Declarative / FP-ish
## 𝑓(ℹ️) = 🌈

--

## PropTypes 👮

```javascript
import React, { Component, PropTypes } from 'react'
class App extends Component {
  static propTypes = {
    sum: PropTypes.number
  }
}
```
--

# Good enough for view.
## But to build complex apps, we need state management & component interactions

--

## Solutions 💡

+ parent component passing callbacks everywhere
+ PubSub & derivatives:
  1. Event Emitters
  2. Observables
  3. Reactive data structures
  4. Flux

--

# Redux ♻️
## as most popular flux based solution

--

# Sidestep 🚲

--

## Task
>You have some calculator view, it produces array of strings with either 'Inc' or 'Dec'.

>Build function to get total result if you started with 0.

--

# Possible solution
```javascript
const initialSum = 0;
const operations = ['inc', 'dec', 'whatever', 'dec'];
const sum  = operations.reduce((currentSum, opType) => {
  if (opType === 'inc') {
    return currentSum + 1
  }
  if (opType === 'dec') {
    return currentSum - 1;
  }
  return currentSum;
}, initialSum)
console.log(sum); // - 1
```
--
# Some renaming
```javascript
const initialState = 0;
const actions = [
  {type: 'inc'}, {type: 'dec'},
  {type: 'whatever', {type: 'dec'}];
const store  = actions.reduce((currentSum, {type}) => {
  if (type === 'inc') {
    return currentSum + 1
  }
  if (type === 'dec') {
    return currentSum - 1;
  }
  return currentSum;
}, initialState)
console.log(store); // - 1
```
--

```javascript
const initialState = 0;
count sumReducer = (state = initialState, action) {
  switch (action.type) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    default:
      return state
  }
}
```

--

# Thats basically the reducer Redux is using

--

# Redux
+ ```javascript
const store = createStore(combineReducers({ sum: sumReducer }))```
+ `store` is object. You can `subscribe` to its changes
+ You can get `store` state by calling `store.getState()`
+ to pass action, you call `dispatch` on store with action.
  ```
  store.dispatch({ type: 'inc' })
  ```
--

# React+Redux
+ `react-redux` is glue tying react + redux store
+ provides handy helpers
+ `<Provider store={store}><YourApp /></Provider>` wrapper

--

## Component connected to store
```
const mapStateToProps = (state) => ({
  sum: state.sum,
});
class App extends React.component {
  // some binding in constructor left behind
  increase() { this.props.dispatch({ type: 'inc' }) }
  decrease() { this.props.dispatch({ type: 'dec' }) }
  render() {
    const btn = (text, cb) => <button onClick={cb}>{text}</button>;
    return (
      <div>Sum: {this.props.sum}
        {btn(this.increase, '+')}{btn(this.decrease, '-')}
      </div>
    )
  }
}
export default connect(mapStateToProps)(App)
```

--

## Avoid hardcoding constants in views
## ➡️ Action Creators
```javascript
  export const DEC_CONST = 'dec';
  export const decrease = () => ({
    type: DEC_CONST
  })
```

--

## Sure, you can keep reducer, constants and action creators in separate files

--

## ⭐️ But better ⭐️
## [Redux-ducks](https://github.com/erikras/ducks-modular-redux) 🐣

--

# All bundled up
```javascript
const DEC_CONST = 'dec';
export default const sumReducer = (initialState, action) => {
  /* handle DEC_CONST here */
}
export const decrease = () => ({
  type: DEC_CONST
});
```

--

## [Flux standard action](https://github.com/acdlite/flux-standard-action) 📧
```javascript
{
  type: /* … */
  payload: {
    /* … */
  }
  error: {
    /* … */
  }
}
```

--

## Avoid boilerplate
```javascript
// utils/redux
export function createAction(type, payloadCreator) {
  return (...args) => {
    const action = { type };

    if (typeof payloadCreator === 'function') {
      action.payload = payloadCreator(...args);
    }
    return action;
  };
}
// in module
export const decreaseBy = createAction(
  DEC_CONST, (amount) => ({ data: amount })
)
decreaseBy(15)
/* {"type":"dec","payload":{"data":14}} */
```

--

## Avoid boilerplate, pt. 2
```javascript
  // utils/redux
  export function createReducer(initialState, reducerMap) {
    return (state = initialState, action = {}) => {
      const reducer = reducerMap[action.type];

      return reducer ? { ...state, ...reducer(state, action.payload) } : state;
    };
  }
  // in module
  export default sumReducer = createReducer(initialState, {
    [DEC_CONST]: state => state - 1,
    [INC_CONST]: state => state + 1
  })
```

--

## Async Action Creators
## [Redux-thunk](https://github.com/gaearon/redux-thunk)
```javascript
function fetchThing(byId) {
  return dispatch => {
    dispatch(loading())
    requestThing(byId)
      .then((thing) => dispatch(receive(thing)))
      .catch((error) => dispatch(failure(thing)))
  };
}
```
--

# Reusable Modules
+ module factory
+ merge reusable module parts

--

## Merge reusable parts
+ Key is action creators and reducer being tied through constants

```javascript
const createConstants = (prefix) => ({
  loading: `${prefix}/loading`,
  receive: `${prefix}/receive`,
  failure: `${prefix}/failure`,
})
const createActions = (prefix) => {
  const { loading, receive, failure } = createConstants(prefix);
  return {
    loading: createAction(loading)
    receive: createAction(receive, (item) => ({ item }))
    failure: createAction(failure, (error) => ({ error }))
  }
}
```
--
## Merge reusable parts
```javascript
export const createFecthingItemReducer = (prefix) => {
  const { loading, receive, failure } = createConstants(prefix);
  return {
    [loading]: () => ({ isLoading: true, item: null, error: null }),
    [receive]: ({item}) => ({ isLoading: true, item, error: null }),
    [failure]: ({error}) => ({ isLoading: true, item: null, error }),
  }
}
export const createFetcher = (prefix) => {
  const { loading, receive, failure } = createActions(prefix);
  (byId) =>
    dispatch => {
      dispatch(loading())
      requestThing(byId)
        .then((thing) => dispatch(receive(thing)))
        .catch((error) => dispatch(failure(thing)))
    } }
```
--
# Usage
```javascript
const prefix = 'Book'
export default reducer = (initialState, {
  ...createFecthingItemReducer(prefix)
  [MY_ACTIONS]: () => ({ /* … */})
})
export fetchBook = createFetcher(prefix);
```

--

# Few words on routing 🚦
+ react-router
+ router5

--

## Screen VS Contents
## Smart VS Dump

--

## Build ⛑
+ webpack
+ webpack hot reload / hmr
+ styles

--

## Testing ✅ / ❌

+ karma
+ teaspoon

--

## Dependencies 📦

--

## Ecosystem 🏘

--

# Tips and tricks

--

```javascript
import React, { Component, PropTypes as toBe } from 'react'
class App extends Component {
  static propTypes = {
    sum: toBe.number
  }
}
```

--

## Scaffold using [plop](https://github.com/amwmedia/plop)

--

## No cancellable fetch -> handle in reducers

--

## Render issues

--

## Selectors

--

## Fetching data in routes vs component

--

## Alias +
`import { Component } from 'components'`

--

# Pitfalls

--

# Babel polyfill

--

## [Flex known bugs](https://github.com/philipwalton/flexbugs)

--

## setState can be Async

--

## Don't have too smart too deep

--

## Don't forget about circular depenedencies
