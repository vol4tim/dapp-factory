import React from 'react'
import { Link } from 'react-router'

export default function () {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          Not Found. <Link to="/">home page</Link>?
        </div>
      </div>
    </div>
  )
}
