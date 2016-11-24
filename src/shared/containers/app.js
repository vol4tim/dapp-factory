import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Header from '../components/app/header'
import Footer from '../components/app/footer'
import { load as loadAccounts } from '../../modules/accounts/actions'
import { load as loadTemplates } from '../../modules/templates/actions'

import './style.css'

class App extends Component {
  componentWillMount() {
    this.props.loadAccounts()
    this.props.loadTemplates()
  }
  render() {
    let content
    if (!this.props.isLoad) {
      content = <p>...</p>
    } else {
      content = this.props.children
    }
    return (
      <div>
        <Header title={'DAO FACTORY'} />
        <div className="container">
          {content}
        </div>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoad: _.has(state.accounts.list, state.accounts.active) &&
      _.has(state.templates.list, state.templates.active)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadAccounts,
    loadTemplates
  }, dispatch)
  return {
    loadAccounts: actions.loadAccounts,
    loadTemplates: actions.loadTemplates
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
