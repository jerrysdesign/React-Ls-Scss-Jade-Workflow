# React-Ls-Scss-Jade-Workflow
Workflow for ReactJs using Livescript, Jade, Sass and Gulp

Things included:
  -  LiveScript
  -  gulp
  -  react
  -  browserify
  -  livereload
  -  Connect
  -  Jade
  -  Sass/Scss (use RubyGem to install : Compass, Susy, BreakPoint, Modular-Scale)


### Usage example:

##### LiveScript Source

```ls
MyComponent = React .create-class do
  propTypes : do
    children: React.PropTypes.element.isRequired

  render : ->
    ``(
      <div>
        {this.props.children}
      </div>
    )``
module.exports = MyComponent
```

##### is translated to JSX

```jsx
var MyComponent;
MyComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
  render: function(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});
module.exports = MyComponent;
```

##### and then compiled to JS

```js
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

module.exports = MyComponent;
```
##### The Main.js file

```js
React = require('react')
ReactDOM = require('react-dom')

MyComponent = require('./react.jsx')
MyComponent2 = require('./react2.jsx')


ReactDOM.render(<Button />, document.getElementById("content"))

```


### Folder structure

```
src/                           # Sources dir
  jade/                        # Jade dir
    _includes/                 # use "_" for included file or dir
  livescript/                  # Livescript dir
    toJSX/                     # dir for livescript -> jsx file
    toJS/                      # dir for livescript -> simple js file
  scss/                        # base dir for Scss file


builds/dev/                    # Out dir
  css/                         # Css out dir
  images/                      # images sources/out dir for compass
  js/                          # Js out dir
    components/                # JSX base out dir
      /main.js                 # required for using reactify + browserify
    scripts/                   # dir for all JS before concat
    scripts.js                 # concat Js file out
    scripts.min.js             # ugly Js file
```

### Gulp task

You can run Livereload, connect, livescript compile, jade compile, Scss, reactify compile and the Watcher with the default task
```sh
  gulp
```

finaly for concat all files

```sh
  gulp concat
```

### License

This WorkFlow has an MIT License, see the LICENSE.txt for more information.

********************************************************
  - follow me on twitter : https:twitter.com/thonymg
  - follow us on twitter : https:twitter.com/anosibe

