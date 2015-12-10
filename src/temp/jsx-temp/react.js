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