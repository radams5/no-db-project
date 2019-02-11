import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import ListShoes from './ModifyLIsttings/ListNewShoes';
import DeleteShoes from './ModifyLIsttings/DeleteShoes';
import ChangeCondition from './ModifyLIsttings/ChangeCondition';
import IncreaseBid from './ModifyLIsttings/IncreaseBid';
export default class CombinedComponents extends Component {
  constructor() {
    super()
    this.state = {
      shoes: [],

      brand: '',
      model: '',
      condition: '',
      price: null,
      pin: null,
      confirmIdentity: false,
      pinEntry: '',
      highBidder: ''
    }

    this.listShoes = this.listShoes.bind(this)
    this.deleteShoes = this.deleteShoes.bind(this)
    this.changeCondition = this.changeCondition.bind(this)
    this.increaseBid = this.increaseBid.bind(this)

  }
  handleBrand(val) {
    this.setState({
      brand: val
    })
  }
  handleModel(val) {
    this.setState({
      model: val
    })
  }
  handleSize(val) {
    this.setState({
      size: val
    })
  }
  handleCondition(val) {
    this.setState({
      condition: val
    })
  }
  handlePrice(val) {
    this.setState({
      price: val
    })
  }
  handlePin(val) {
    this.setState({
      pin: val
    })
  }

  componentDidMount() {
    axios.get('api/shoes').then(res => {
      console.log(res)
      this.setState({
        shoes: res.data,

      })
    })
  }



  listShoes() {
    const { brand, model, condition, price, pin } = this.state
    if (brand && model && condition && price && pin != null) {
      axios.post('/api/shoes', { brand, model, condition, price, pin }).then(res => {

        this.setState({
          shoes: res.data,
          brand: '',
          model: '',
          size: '',
          condition: '',
          price: '',
          pin: ''
        })
        console.log(this.state)

      })
    }
    else { alert('fill in all inputs please') }
  }


  deleteShoes(id) {
    const { shoes, pinEntry } = this.state
    let confirmIdentity = false
    let pinFiller = prompt('enter pin', '####')

    if (pinEntry == shoes.map(e => {
      if (e.pin == pinFiller) {
        confirmIdentity = true
      }
    }))

      console.log(confirmIdentity)

    if (confirmIdentity == true) {
      console.log(111111, 'hit')
      axios.delete(`/api/shoes/${id}`).then(res => {
        this.setState({
          shoes: res.data
        })
        console.log(this.state)
      })
    }
    else { alert('Wrong pin Sir/Madam, Are you sure these are your shoes to sell?') }

  }

  async increaseBid(id) {
    let whosWinning = await prompt('Please Enter Your Name', 'Harry Potter')
    this.setState({
      highBidder: whosWinning
    })
    axios.put(`/api/shoes/${id}/bid`, this.state).then(res => {
      this.setState({
        shoes: res.data,

      })
      console.log(111111)

    })
  }

  async changeCondition(id) {
    let accident = await prompt('What happened to your shoes?', 'Dog Chewed')
    this.setState({
      condition: accident
    })
    const { condition } = this.state
    axios.put(`/api/shoes/${id}/condition`, { condition }).then(res => {
      this.setState({
        shoes: res.data,

      })
      this.setState({ condition: '' })
    })
  }




  render() {
    return (

      <div>
        <h1>Welcome to shoEbay</h1>
        <input placeholder='Brand' onChange={e => this.handleBrand(e.target.value)} value={this.state.brand} />
        <input placeholder='Model' onChange={e => this.handleModel(e.target.value)} value={this.state.model} />
        <input placeholder='Size' onChange={e => this.handleSize(e.target.value)} value={this.state.size} />
        <input placeholder='Condition' onChange={e => this.handleCondition(e.target.value)} value={this.state.condition} />
        <input placeholder='Price' type='number' onChange={e => this.handlePrice(e.target.value)} value={this.state.price} />
        <input placeholder='Pin' onChange={e => this.handlePin(e.target.value)} value={this.state.pin} />
        <ListShoes id='listButton' listShoes={this.listShoes} />

        <div>

          {this.state.shoes.map((shoe) => {
            return <div class='shoelisting'>
              <div>Brand: {shoe.brand}</div>
              <div>Model: {shoe.model}</div>
              <div>Size: {shoe.size}</div>
              <div>Condition: {shoe.condition}</div>
              <div>Price: {shoe.price}</div>
              <div>Bids: {shoe.bids}</div>
              <div>Highest Bidder: {shoe.highBidder}</div>
              <div class='modifiers'>
                <IncreaseBid increaseBid={this.increaseBid} id={shoe.id} />
                <DeleteShoes deleteShoes={this.deleteShoes} id={shoe.id} />
                <ChangeCondition changeCondition={this.changeCondition} id={shoe.id} />
              </div>

            </div>
          })}
        </div>
      </div>
    );
  }
}