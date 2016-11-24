import React from 'react'

const Result = props => (
  <div>
    <h2>Contract info</h2>
    <span>Address:</span>
    <pre>{props.address}</pre><br />
    <span>Abi:</span>
    <pre>{props.abi}</pre>
  </div>
)

export default Result
