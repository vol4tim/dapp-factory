import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Accounts from '../components/accounts'
import Template, { Menu, Result } from '../components/templates'
import Form from './form'
import { setAccount } from '../../../modules/accounts/actions'
import { setTemplate } from '../../../modules/templates/actions'

const Container = (props) => {
  const {
    accounts,
    account,
    onSetAccount,
    list,
    onSetTemplate,
    templateId,
    template,
    result
  } = props
  if (_.isEmpty(account)) {
    return <p>...</p>
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Accounts account={account} list={accounts} onSetAccount={onSetAccount} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Menu list={list} active={templateId} onSetTemplate={onSetTemplate} />
        </div>
        <div className="col-md-9">
          <Template title={template.name} cost={template.cost}>
            <Form
              templateId={templateId}
              address={template.address}
              abi={template.abi}
              fields={template.fields}
              account={account.address}
            />
            {!_.isEmpty(result) &&
              <Result
                address={result.address}
                abi={result.abi}
              />
            }
          </Template>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts.list,
    account: _.has(state.accounts.list, state.accounts.active)
      ? state.accounts.list[state.accounts.active]
      : {},
    list: state.templates.list,
    templateId: state.templates.active,
    template: state.templates.list[state.templates.active],
    result: (_.has(state.templates.list[state.templates.active], 'result'))
      ? state.templates.list[state.templates.active].result
      : {}
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    setAccount,
    setTemplate
  }, dispatch)
  return {
    onSetAccount: actions.setAccount,
    onSetTemplate: actions.setTemplate
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
