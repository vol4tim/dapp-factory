import React from 'react'

const Template = props => (
  <div className="panel panel-default">
    <div className="panel-heading">
      {props.title}
      <span className="pull-right">Cost: <span className="label label-success">{props.cost} ETH</span></span>
    </div>
    <div className="panel-body">
      {props.children}
    </div>
  </div>
)

export default Template
