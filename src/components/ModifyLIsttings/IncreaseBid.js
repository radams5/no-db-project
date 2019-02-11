import React from 'react'

export default function IncreaseBid(props){
  return(
    <div>
       <button onClick={() => props.increaseBid(props.id)}>Bid $5 </button>
    </div>
  )
}