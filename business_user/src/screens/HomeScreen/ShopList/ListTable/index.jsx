import React from 'react'
import ListItem from '../ListItem'
import './style.css'

export default function ListTable({lists}) {
  if (lists.length === 0) {
    return (
      <h3>Please register a store</h3>
    )
  }
  return (
    <div>
      {
        lists.map((list, index) => {
          return <ListItem key={index} {...list}/>
        })
      }
    </div>
  )
}

ListTable.defaultProps = {
  lists: []
}
