import React from 'react'

export default function changeCondition(props){
  return(
    <div>
       <button onClick={() => props.changeCondition(props.id)}>Update Condition </button>
    </div>
  )
}