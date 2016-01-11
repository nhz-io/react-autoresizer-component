import React from 'react';
const { PropTypes } = React;
var running = false;

const throttleResizeEvent = function() {
  if(running) { return }
  running = true;
  requestAnimationFrame(function() {
    dispatchEvent(new CustomEvent('reactAutoresizerUpdate'));
    running = false;
  });
}

addEventListener('scroll', throttleResizeEvent);
addEventListener('resize', throttleResizeEvent);

export default class ReactAutoresizerComponent extends React.Component {
  static propTypes = { callback: PropTypes.func.isRequired }

  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() { this.props.callback() }

  componentDidMount() {
    addEventListener('reactAutoresizerUpdate', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    removeEventListener('reactAutoresizerUpdate', this.handleResize);
  }

  render() { return this.props.children }
}
