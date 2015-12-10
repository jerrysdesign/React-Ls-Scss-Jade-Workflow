MyComponent = React .create-class do
  propTypes : do
    children: React.PropTypes.element.isRequired

  render : ->
    ``(
      <div>
        {this.props.children}
      </div>
    )``

