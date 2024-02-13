import React from 'react'

export default function Todo(props) {
  return (
    <div>
        <div>{props.title}</div>
        <div>{props.description}</div>
        <button>{props.completed?"done":"do it"} </button>
    </div>
  )
}
