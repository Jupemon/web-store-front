import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navbar/Navbar';
import Modal from './Components/Modal/Modal'
import Roster from './Components/Roster/Roster';
import Promo from './Components/Promo/Promo';
import Footer from './Components/Footer/Footer';
import Categories from './Components/Categories/Categories';
import Loading from './Components/Loading/Loading';

class App extends Component {
  constructor(props) {
      super(props);
      
      this.removeFromCart = this.removeFromCart.bind(this);
      this.addToCart = this.addToCart.bind(this);
      this.state = {
        session : {
          timeSpendOnSite : 0,
          registered : false,
          activeSession : false,
          cart : {itemSelected: "" }
        },
        selectedProduct : {},
        account : {},
        selectedCategory : '',
        addCategoryComponent : '',
        deleteProductComponent : '',
        changeProductComponent : '',
        productsComponent : '',
        RegisterComponent: '',
        SigninComponent: '',
        AccountComponent: '',
        addProductComponent : '',
        renderedModal : "",
        retrievedData : false,
        itemAmounts: [],
        cartSum : 0,
        isModalOpen : false,
        loggedIn : false,
        route: "main",
        cart: [],
        products: []
      }
  }

  componentDidMount() {
    console.log("user doesnt exist in the localstorage");
    this.GetProducts();
    
  }

  GetProducts = () => { //"http://localhost:3000/getproducts"
    fetch("https://young-bayou-22235.herokuapp.com/getproducts", {
      method: 'get'
    })
    .then( resp => resp.json())
    .then( data => {
      this.setState({
        products: data,
        retrievedData : true
      });
    })
    this.forceUpdate()
  }

  saveSession = () => {
    console.log("session saved");
  }

  logOut = () => {
    console.log("logout");
    localStorage.clear();
    this.setState({loggedIn : false, account: {}}, () => {console.log("log out happened")})
    this.toggleModal("");

  }


  toggleModal = (modalName, item) => { // toggles modal on/off
    if (item) {
      this.setState({selectedProduct : item})
    }
    document.body.classList.toggle("stop-scrolling");
    if (modalName.length > 0) {
      if (modalName==="addproduct") {
        import('./Components/Addproduct/AddProduct').then((adder) => {
          this.setState({renderedModal: modalName, addProductComponent : adder.default})
        }) // asyncronous
      }
      else if (modalName==="account") {
        import('./Components/Account/Account').then((Account) => {
          this.setState({renderedModal: modalName, AccountComponent : Account.default})})
      }
      else if (modalName==="changeproduct") {
        import('./Components/ChangeProduct/ChangeProduct').then((component) => {
          this.setState({renderedModal: modalName, changeProductComponent : component.default})})
      }
      else if (modalName==="deleteproduct") {
        import('./Components/DeleteProduct/DeleteProduct').then((component) => {
          this.setState({renderedModal: modalName, deleteProductComponent : component.default})})
      }
      else if (modalName==="signin") {
        import('./Components/Signin/Signin').then((Signin) => {
          this.setState({renderedModal: modalName, SigninComponent : Signin.default})})
      }
      else if (modalName==="register") {
        import('./Components/Register/Register').then((Register) => {
          this.setState({renderedModal: modalName, RegisterComponent : Register.default})})
      }
      else if (modalName==="addcategory") {
        import('./Components/AddCategory/AddCategory').then((comp) => {
          this.setState({renderedModal: modalName, addCategoryComponent : comp.default})})
      }
    }
    //this.setState({itemAmounts : this.emptyItemAmounts()})
    this.setState(prevState => ({
      ...prevState,
      isModalOpen: !prevState.isModalOpen,
      itemAmounts : this.emptyItemAmounts()
    }))
  }
  calculateItemCost = (amount, ID, price) => {
    const itemAmounts = this.state.itemAmounts;

    itemAmounts.filter(item => {
      return item.ID === ID
    })[0].amount = Number(amount)
    //this.calculateSum(amount * price, true)
    this.setState({itemAmounts: itemAmounts})

  }

  logIn = (account) => {
    console.log(account, "DATA HERE?");
    this.setState({loggedIn : true, account: account}, () => {console.log("log in happened")})
  }

  changeRoute = (route) => {
    import('./Components/Products/Products').then((Product) => {
      this.setState({route : route, productsComponent : Product.default})})
  }

  emptyItemAmounts = () => {
    const itemAmounts = this.state.itemAmounts
    return itemAmounts.map(item => {
      item.amount = 0;
      return item
    })
  }

  getItemAmounts = (id, type) => {
    if (type==="amount") { // return the amount with the same id
      return this.state.itemAmounts.filter(item => {
        return item.ID === id
      })[0].amount
    }
    else if (type==="price") {
      return Number(this.state.itemAmounts.filter(item => {
        return item.ID === id
      })[0].price * this.state.itemAmounts.filter(item => {
        return item.ID === id
      })[0].amount).toFixed(2)
    }
  }

 calculateSum = () => {
   let sum = 0
   this.state.itemAmounts.forEach(item => {
     sum += item.price * item.amount
   })
   return sum.toFixed(2);
   /*
   let cartSum = this.state.cartSum
  for(var i = cart.length - 1; i >= 0; i--) {
    cartSum += Number(cart[i].price)
    
  }
  this.setState({cartSum : cartSum});*/
 }

 selectFromProducts = (filterbutton) => {
   this.setState({selectedCategory : filterbutton}, () => {this.changeRoute("products");})
 }

  removeFromCart(e, item ) {
    item.selected = false;
    const cart = this.state.cart;
    const itemAmounts = this.state.itemAmounts;
    for(var i = cart.length - 1; i >= 0; i--) {
      if(cart[i] === item) {
         cart.splice(i, 1);
      }
    }
    for(var b = itemAmounts.length - 1; b >= 0; b--) {
      console.log(itemAmounts[b].ID);
      if(itemAmounts[b].ID === item.ID) {
         itemAmounts.splice(b, 1);
      }
    }
    this.setState({cart : cart, itemAmounts: itemAmounts}, () => {console.log(cart, itemAmounts, "HIT");})
    
  }

  addToCart(item, e) {
    e.currentTarget.parentElement.childNodes[0].style.display = "initial";
    const cart = this.state.cart
    if (cart.includes(item)) {
      console.log("item already included")
    }
    else {
      item.selected = true;
      cart.push(item);
      //console.log(this.state.cart)
      const itemAmounts = this.state.itemAmounts;
      itemAmounts.push({selected: true, ID: item.ID, amount: 0, price: item.price});
      this.setState({cart: cart}, () => {console.log(itemAmounts)})
    }
  }
  render() {
/*  
    return (
      {this.state.route==="main" ?  : <div>No</div>}
    )*/
    if (this.state.route.length > 0) {
      return(
        <div className="App"> 
        <Navigation cart={this.state.cart} toggleModal={this.toggleModal} loggedIn={this.state.loggedIn} changeRoute={this.changeRoute}/>
        { this.state.isModalOpen && <Modal>
          { this.state.renderedModal==="addproduct" && <this.state.addProductComponent getItemAmounts={this.getItemAmounts} itemAmounts={this.state.itemAmounts} calculateItemCost= {this.calculateItemCost} calculateSum = {this.calculateSum} removeFromCart={this.removeFromCart} cart={this.state.cart} toggleModal={this.toggleModal}/>}
          { this.state.renderedModal==="account" && <this.state.AccountComponent logOut={this.logOut} account={this.state.account} toggleModal={this.toggleModal}/>}
          { this.state.renderedModal==="signin" && <this.state.SigninComponent logIn={this.logIn} toggleModal={this.toggleModal}/>}
          { this.state.renderedModal==="register" && <this.state.RegisterComponent toggleModal={this.toggleModal}/>}
          { this.state.renderedModal==="changeproduct" && <this.state.changeProductComponent getProducts={this.GetProducts} selectedProduct={this.state.selectedProduct} toggleModal={this.toggleModal}/>}
          { this.state.renderedModal==="deleteproduct" && <this.state.deleteProductComponent getProducts={this.GetProducts} selectedProduct={this.state.selectedProduct} toggleModal={this.toggleModal}/>}
          { this.state.renderedModal==="addcategory" && <this.state.addCategoryComponent toggleModal={this.toggleModal}/>}
        </Modal>}
        {this.state.route==="main" ? <div>
        <Promo />
        <Categories selectFromProducts={this.selectFromProducts}/>
        <Footer />
        </div> :
         <div>
          <this.state.productsComponent toggleModal={this.toggleModal} selectedCategory={this.state.selectedCategory} products={this.state.products} addToCart={this.addToCart}/>
         </div>}

        
        </div>
      );
    }
    else {
      return (<div>Loading</div>)
    }
  }
}
export default App;
