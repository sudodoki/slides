title: Insert Title here
author:
  name: sudodoki
  email: smd.deluzion@gmail.com
  github: sudodoki
  twitter: sudodoki
theme: ../../reveal-cleaver-theme
output: index.html

--

# ES 201X
## Segway #1

--

## Shorthand obj creation / desctructuring
```js
const x = 2;
let two = 2;

console.log({ x, two }); // -> {x: 2, two: 2}
const { something:
  { property: Alias }
  , anything
} = bigPileOfMess;
```
--

# Arrow FN
```js
var flag = false; // window.flag
const object = {
  flag: true,
  //  this, arguments, super, or new.target
  bound: () => console.log(this.flag),
  unbound: function() { console.log(this.flag); }
}
const cb1 = object.bound;
const cb2 = object.unbound;
object.bound(); // false
object.unbound(); // true
setTimeout(cb1, 1); // false
setTimeout(cb2, 1); // false
```

--

### Classes
```js
class Base {
  constructor() {
    this.anotherFlag = true;
} }

const WithInspect = (klass) =>
  class extends klass {
    inspect() { console.log(JSON.stringify(this)); }  }

class A extends WithInspect(Base) {
  constructor(...args) {
    super(...args);
    this.flag = true;
  } }
(new A).inspect(); // "{\"anotherFlag\":true,\"flag\":true}"
```

--

# React
## ⚛

--

# What is it?
+ a javascript library for building user interfaces
+ opensourced: May 2013
+ React is **V** in **MVC**

--

# Key Features
## 🔑

+ Component Based
+ Simple & Declarative
+ Virtual DOM
+ Enforcing One-way Dataflow

--

# Components
## ⚙

+ Not web-components
+ Not ng directives

--

### Your app as Component tree
## 🌲

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

# State
## 🇺🇸
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

#### Authoring Component (JSX) ✎

```js
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
