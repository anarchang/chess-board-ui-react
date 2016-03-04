/**
* @flow
**/

const React = require('react')
var PropTypes = React.PropTypes;
require('../styles/square.scss')

module.exports = React.createClass({
  propTypes: {
    black: PropTypes.bool
  },

  render () {
    var black = this.props.black
    var className = black ? 'square black' : 'square'

    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
})
