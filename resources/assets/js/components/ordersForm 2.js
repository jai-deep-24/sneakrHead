import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update';
import Popup from './Popup.js';
import axios from 'axios'
var UsaStates = require('usa-states').UsaStates;
var countries = require('country-list')();

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      form: {
        f_name: '',
        l_name: '',
        address: '',
        address_2: '',
        city: '',
        state: 'NY',
        country: 'US',
        zipcode: '',
        payment_type: 'paypal'
      },
      allProducts: '',
      allItems: [],
      showPopup: false
    }
    this.submitForm = this.submitForm.bind(this)
  }
  componentWillMount(){
    this.getAllProducts()
  }
  async getAllProducts(){
    try{
      let allProducts = await axios.get('/api/admin/products')
      allProducts = allProducts.data
      console.log(allProducts)
      this.setState({
        allProducts
      }, () => console.log(this.state))
    } catch(error){
      console.log(error)
    }
  }
  addItemToList = (item) => {
    let allItems = this.state.allItems
    let oldState = this.state
    let newState = update(oldState, {
      allItems: {$push: [item]}
    })
    this.setState(newState, () => {
      console.log('New State')
      console.log(this.state)
    })
  }
  change = (event) => {
    var name = event.target.name
    var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    let currentState = this.state
    let newState = update(currentState, {
      form: {
        $merge: {
          [name]: value
        }
      }
    })

    this.setState(newState, () => {
      console.log(this.state)
    })
  }
  showStates = () => {
    var usStates = new UsaStates();

    return usStates.states.map((item) =>
      <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>)
    console.log(usStates.states)
  }
  showCountries = () => {
    var allCountries = countries.getData();

    return allCountries.map((item) =>
      <option key={item.code} value={item.code}>{item.name}</option>)
    console.log(allCountries)
  }
  removeItem = (index) => {
    let oldState = this.state
    let newState = update(oldState, {
      allItems: {
        $splice: [[index, 1]]
      }
    })
    this.setState(newState)
  }
  showAllItems = () =>{
    console.log('allitems test')
    let randomKey = function () {
      let randomNumber = '_' + Math.random().toString(36).substr(2, 9)
      randomNumber += 3
      return randomNumber;
    }
    return this.state.allItems.map((item, index) => (
      <div key={randomKey()} className="col-md-3">
        <div className="item-box">

          <div className="item-img" style={{
            background: `url("${item.productInfo.img_url}")`
          }}>
            <div className="item-delete" onClick={this.removeItem.bind(null, index)}>
              <i className="ti-close"></i>
            </div>
          </div>
          <div className="title">
            {item.productInfo.title}
          </div>
          <div className="quantity">
            <label className="col-form-label">Quantity</label>
            <h4>{item.qtyBuying}</h4>
          </div>
        </div>
      </div>
    ) )
  }
  addNewBtn = () => {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  async submitForm() {
    console.log('clicked submit')
    var self = window
    try{
      const csrf = document.getElementsByName("_csrf")[0].value
        var submit = await axios.post('/api/admin/products', {
          _csrf: csrf,
          form: this.state.form,
          allItems: this.state.allItems
        })
        if( submit.data.status == 'success') {
          self.location.href = "/admin/orders";
        } else {
          alert(`
            Status: ${submit.data.status} \n
            Message: ${submit.data.message} \n
            Error: ${submit.data.error} \n
            `)
          }
        console.log(submit)
      } catch(error) {
        console.log('======ERROR SUBMITING FORM================')
        console.log(error)
        console.log('======ERROR================')
      }
  }
  render () {
    return (
      <form action="/admin/products" method="post" >
        <div className="row form-group">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="example-text-input" className="col-form-label">First Name</label>
            <input className="form-control" type="text" value={this.state.form.f_name} onChange={this.change} name="f_name" id="example-text-input"  />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="example-text-input" className="col-form-label">Last Name</label>
            <input className="form-control" type="text" value={this.state.form.l_name} onChange={this.change} name="l_name" id="example-text-input"  />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="example-text-input" className="col-form-label">Address</label>
            <input className="form-control" type="text" value={this.state.form.address} onChange={this.change} name="address" id="example-text-input"  />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="example-text-input" className="col-form-label">Address 2</label>
            <input className="form-control" type="text" value={this.state.form.address_2} onChange={this.change} name="address_2" id="example-text-input"  />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12 col-md-3">
            <label htmlFor="example-text-input" className="col-form-label">City</label>
            <input className="form-control" type="text" value={this.state.form.city} onChange={this.change} name="city" id="example-text-input"  />
          </div>
          <div className="col-sm-12 col-md-3">
            <label htmlFor="example-text-input" className="col-form-label">State</label>
            <select className="custom-select" name="state"
            value={this.state.form.state} onChange={this.change}>
            {this.showStates()}

            </select>
          </div>


          <div className="col-sm-12 col-md-6">
            <label className="col-form-label">Country</label>
            <select className="custom-select" name="country" value={this.state.form.country} onChange={this.change}>
              {this.showCountries()}
            </select>
          </div>

        </div>
        <div className="form-group row">
          <div className="col-sm-12 col-md-6">
            <label className="col-form-label">Zipcode</label>
              <input className="form-control" type="text" value={this.state.form.zipcode} onChange={this.change} name="zipcode" id="example-text-input"  />
          </div>
          <div className="col-sm-12 col-md-6">
            <label className="col-form-label">Payment Type</label>
            <select className="custom-select" name="payment_type" value={this.state.form.payment_type} onChange={this.change}>
              <option value="paypal">Paypal</option>
              <option value="credit_card">Credit Card</option>
            </select>
          </div>
        </div>
        <div className="row order-items">
          <div className="col-md-12">
            <h2>Order Items</h2>
          </div>
          {this.showAllItems()}

          <div className="col-md-3">
            <div className="item-box">
              <div className="add-item-button" onClick={this.addNewBtn}>
                <span>+</span>
                Add New Item
              </div>
            </div>
          </div>
          <Popup showPopup={this.state.showPopup} closePopup={this.addNewBtn} allProducts={this.state.allProducts} addItemToList={this.addItemToList}/>
        </div>
        <div className="form-group">
          <div onClick={this.submitForm} className="btn btn-primary mb-3">Submit</div>
        </div>
      </form>
    )
  }
}

const ordersForm = document.getElementById('ordersForm')

ReactDOM.render(<Layout />, ordersForm)
