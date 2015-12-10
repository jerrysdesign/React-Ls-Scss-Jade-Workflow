# React-Ls-Scss-Jade-Workflow
Workflow for ReactJs using Livescript, Jade, Sass and Gulp
<<<<<<< HEAD

Usage example:

LiveScript Source

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

```

is translated to JSX

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
```

and then compiled to JS

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
```