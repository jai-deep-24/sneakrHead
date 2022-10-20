import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update';
var UsaStates = require('usa-states').UsaStates;
var countries = require('country-list')();

export default class Popup extends Component {
  constructor () {
    super()
    this.state = {
      form: {
        product: '',
        productQty: 0,
        qty: 1
      }
    }
  }
  change = (event) => {
    var name = event.target.name
    var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    let currentState = this.state
    let newState = ''
    if (name == 'product' && value != 'none'){
      let productQty = this.props.allProducts.filter(
        (item) => item.id == value)
          productQty = productQty[0].qty
         console.log(productQty)
      newState = update(currentState, {
        form: {
          $merge: {
            [name]: value,
            productQty: productQty
          }
        }
      }, () => console.log(this.state))
    } else {
      newState = update(currentState, {
        form: {
          $merge: {
            [name]: value
          }
        }
      })
    }
    this.setState(newState, () => console.log(this.state))
  }

  showProducts = () => {
    if(this.props.allProducts != ''){
      return this.props.allProducts.map((item) => (
        <option key={item.id} value={item.id}>{item.title}</option>))
    }
  }
  showQty = () => {
    let options = []

    let number = 0
    if( this.state.form.productQty >= 11){
      number = 11
    } else {
      number = this.state.form.productQty + 1
    }

    if(this.state.form.productQty != 0 || this.state.form.productQty != 'none') {
      for (var i = 1; i < number; i++) {
        options.push(i)
      }
      return options.map((i) => (
        <option key={i} value={`${i}`}>
          {i}
        </option>)
      )
    } else{
      return (<option key={`no value`} value={`none`}>
        Please choose a product thats available
      </option>)
    }

  }
  clickedSaveItemBtn = () => {

    let product = this.props.allProducts.filter((product) => product.id == this.state.form.product)
    let itemData = {
      productInfo: product[0],
      qtyBuying: this.state.form.qty
    }
    this.props.addItemToList(itemData)
    this.props.closePopup()
  }
  clickedCancelBtn = () => {
    this.props.closePopup()
  }


  render () {
    return (
      <div className={`popup ${(this.props.showPopup) ? 'active': ''}`} >
        <div className="container-box">
          <div className="row">
            <div className="col-md-12">
              <h2>Add Item to Order</h2>
              <div className="form-group">
                <label htmlFor="">Product</label>
                <select className="custom-select" name="product" value={this.state.form.product} onChange={this.change}>
                  <option value="none">Select A Sneaker</option>
                  {this.showProducts()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Quantity</label>
                <select className="custom-select" name="qty" value={this.state.form.qty} onChange={this.change}>

                  {this.showQty()}
                </select>
              </div>
              <div className="add-btn btn btn-primary mb-3" onClick={this.clickedSaveItemBtn}>
                save item
              </div>
              <div className="add-btn btn btn-danger mb-3" onClick={this.clickedCancelBtn}>
                cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
