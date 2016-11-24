import React from 'react'

const Menu = props => (
  <div className="list-group">
    <div className="list-group-item active">Templates</div>
    {props.list.map((item, index) => {
      return (<button
        key={index}
        onClick={() => props.onSetTemplate(index)}
        className={(index === props.active) ? 'list-group-item list-group-item-info' : 'list-group-item'}
      >
        {item.name}
      </button>)
    })}
  </div>
)

export default Menu
