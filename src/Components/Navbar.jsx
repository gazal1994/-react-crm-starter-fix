import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import '../styles/Navbar.css'

// @inject("shopStore")

// @observer

class Navbar extends Component {

  render() {
  

    // const shopStore = {cartQuantity: this.props.shopStore.cartQuantity, cartTotal:this.props.shopStore.cartTotal}

    return (
      <div id='navbar'>
        <div id='links'>
            <Link to="/Clients">Clients  </Link>
            <Link to="/Actions">Actions</Link>
            <Link to="/Analytice"> Analytice</Link>
        </div>
        {/* <div id='cart-info'>
          <ShoppingCartIcon /> {shopStore.cartQuantity} items | ${shopStore.cartTotal}
        </div> */}
        
      </div>
    )
  }
}

export default Navbar



