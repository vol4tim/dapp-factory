import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import _ from 'lodash'
import { submit } from '../../../modules/templates/actions';
import Form from '../../../shared/components/app/form';
import { api } from '../../../parity';

function isAddress(address, required = true) {
  if (!required && address === '') {
    return true;
  }
  if (_.has(api, 'util')) {
    return api.util.isAddressValid(address)
  }
  if (address && address.length === 42 && /^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return true;
  }
  return false;
}

const validate = (values, props) => {
  const errors = {};
  _.each(props.fields, (item) => {
    if (item.required && !values[item.name]) {
      errors[item.name] = 'required'
    } else {
      let isError
      switch (item.validate) {
        case 'address':
          isError = isAddress(values[item.name], item.required) ? false : 'bad address'
          break;

        case 'uint':
          isError = _.isNumber(values[item.name] * 1) && !_.isNaN(values[item.name] * 1) ? false : 'no number'
          break;

        default:
          isError = false
      }
      if (isError) {
        errors[item.name] = isError
      }
    }
  })
  return errors
};

function mapStateToProps(state, props) {
  return {
    fields: props.fields,
    initialValues: _.zipObject(_.map(props.fields, 'name'), _.map(props.fields, 'value'))
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    submit
  }, dispatch)
  return {
    onSubmit: form => actions.submit(
      props.templateId, props.address, props.abi, form, props.account
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'Form',
  validate
})(Form))
