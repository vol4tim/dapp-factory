import React from 'react'
import { Field } from 'redux-form'

const renderField = ({ input, type, label, placeholder, disabled, meta: { touched, error } }) => {
  if (type === 'hidden') {
    return <input {...input} type={type} />
  }
  return (
    <div className={touched && error ? 'form-group has-error' : 'form-group'}>
      <label htmlFor={input.name} className="control-label">{label}</label>
      <input {...input} placeholder={placeholder} type={type} disabled={disabled} className="form-control" />
      {touched && error && <span className="help-block">{error}</span>}
    </div>
  )
}

const Form = (props) => {
  const { fields, handleSubmit, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((item, index) => {
        return <Field key={index} component={renderField} {...item} />
      })}
      <div className="form-group">
        <div className="text-center">
          <button type="submit" className="btn btn-info" disabled={submitting}>{submitting ? '...' : 'Send transaction'}</button>
        </div>
      </div>
    </form>
  )
}

export default Form
