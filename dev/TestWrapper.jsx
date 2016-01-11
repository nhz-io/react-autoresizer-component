import React from 'react';
import Resizer from '../src/main.jsx';

export default class TestWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() { this.forceUpdate() }

  componentDidMount() { window.addEventListener('resize', this.handleResize) }

  componentWillUnmount() { window.removeEventListener('resize', this.handleResize) }

  render() {
    return(
      <Resizer callback={this.handleResize}>
        <div style={this.state.style} />
      </Resizer>
    );
  }

  handleResize() {
    const { innerWidth, innerHeight } = window;
    this.setState({
      style: {
        width: innerWidth/2,
        height: innerHeight/2,
        marginTop: innerHeight/4,
        marginLeft: innerWidth/4,
        background: 'black'
      }
    });
  }
}
