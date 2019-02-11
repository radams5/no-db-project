import React from 'react'

export default function ListShoes(props){
  return(
    <div>
      <button onClick={() => props.listShoes()}>List Shoes</button>
    </div>
  )
}