import React from 'react'
import styles from './style.css'

const Accounts = props => (
  <div className="dropdown pull-right" style={{ paddingBottom: 20 }}>
    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      {props.account.name} <span className="caret" />
    </button>
    <ul className="dropdown-menu">
      {props.list.map((item, index) => {
        return (<li key={index}>
          <button onClick={() => props.onSetAccount(index)} className={styles.btnMenu}>
            {item.name}
          </button>
        </li>)
      })}
    </ul>
  </div>
)

export default Accounts
