import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import toSnakeCase from 'to-snake-case'
import * as currentUserActions from '../actions/currentUserActions'
import Nav from '../containers/Nav'
import SettingsNav from '../components/SettingsNav'
import AccountForm from '../components/AccountForm'
import styles from '../styles/EditAccount.scss'

class EditAccount extends Component {
  constructor(props) {
    super(props)
    this.state = { avatar: null }
    this.handleDrop = this.handleDrop.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleDrop(files) {
    this.setState({ avatar: files[0] })
  }

  handleSubmit(values) {
    let data = new FormData()
    Object.keys(values).forEach((key) => {
      if ((key == 'avatar') && !values[key]) {
        return
      }
      data.append(toSnakeCase(key), values[key])
    })
    this.props.updateCurrentUser(data)
  }

  render() {
    return (
      <div styleName="container">
        <Nav />
        <SettingsNav />
        <AccountForm
          initialValues={this.props.currentUser}
          avatar={this.state.avatar}
          handleDrop={this.handleDrop}
          onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

EditAccount.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(currentUserActions, dispatch)
}

EditAccount = CSSModules(EditAccount, styles)

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)
