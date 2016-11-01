import React from 'react'
import { Column as Col, Row } from 'react-native-flexbox-grid'

export default class Container extends React.Component {

  static propTypes = {
    children: React.PropTypes.any,
    sm: React.PropTypes.number,
    md: React.PropTypes.number,
    lg: React.PropTypes.number
  }

  static defaultProps = {
    sm: 10,
    md: 6,
    lg: 4
  }

  getOffset (size) {
    return Math.round((12 - size) / 2)
  }

  render () {
    return (
      <Row>
        <Col
        smOffset={this.getOffset(this.props.sm)}
        sm={this.props.sm}
        mdOffset={this.getOffset(this.props.md)}
        md={this.props.md}
        lgOffset={this.getOffset(this.props.lg)}
        lg={this.props.lg}>
          {this.props.children}
        </Col>
      </Row>
    )
  }

}
