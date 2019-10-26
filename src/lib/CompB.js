import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/styles.scss';

export default class CompB extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
      return (
        <div className='testB'>
          BBBBBBB
        </div>
      )
  }
}
