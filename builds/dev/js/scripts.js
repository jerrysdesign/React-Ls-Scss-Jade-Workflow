(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var react, script;
react = require('./react');


},{"./react":2}],2:[function(require,module,exports){
var MyComponent;
MyComponent = React.createClass({displayName: "MyComponent",
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
  render: function(){
    return (
      React.createElement("div", null, 
        this.props.children
      )
    );
  }
});

},{}]},{},[1])
var salut, out$ = typeof exports != 'undefined' && exports || this;
out$.salut = salut = function(){
  return console.log('salut');
};