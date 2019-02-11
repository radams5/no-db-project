import React from 'react'

export default function DeleteShoes(props){
  return(
    <div>
      <button onClick={() => props.deleteShoes(props.id)} >Sell Shoes</button>
    </div>
  )
}