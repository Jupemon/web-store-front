import React, { Component } from 'react';
import './Products.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Filters from '../Filters/Filters';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedFilter : null,
            products:[],
            filteredProducts : [],
            activeFilters : []
        }
    }

    componentDidMount() {
        if (this.props.selectedCategory.length > 0) {
            console.log(this.props, "NOT SELECTED THOURGHT CATEGORIES")
        }
        const products = this.props.products
        products.forEach(element => {
            element.selected = false;
        });
          this.setState({
            products: this.props.products, //this is what is rendered
            filteredProducts : this.props.products
          });
        
      }

      handleFilterProducts = (e, color, filter) => { // add a filter to the activefilters
        console.log(color, filter);
        e.target.classList.toggle("active");

        const activeFilters = this.state.activeFilters;
        
        if (activeFilters.includes(color)) { // remove a filter
            this.setState({activeFilters: activeFilters.filter(fil => {
                return fil !== color
            })}, () => {this.filterProducts(color, filter)})
        }
        else { // add a filter
            activeFilters.push(color);
            this.setState({ activeFilters }, () => {this.filterProducts(color, filter)})
        }
        /*
          const activeFilters = this.state.activeFilters; // //hard candy
          e.target.classList.toggle("active");
          if (!activeFilters.includes(color)) { // if active filters doesnt contain the color push it to active filters list and call filter products
            activeFilters.push(color)
            this.setState({activeFilters: activeFilters}, () => {this.handletheFilterProducts(e, color, filter)})

          }
          else { // color is already in filters then remove it from the filter list and call filter products
            this.setState({activeFilters: activeFilters.filter(fil => {
                return fil !== color
            })}, () => {this.handletheFilterProducts(e, color, filter)})
          }
          */

          
      }


      handletheFilterProducts = (e, type, filter) => { // adds/removes the filters
        if (this.state.activeFilters.length <= 0) {
            this.setState({filteredProducts:this.state.products})
        }
        else {
            const filteredProducts = this.state.filteredProducts.filter(item => {
                return this.state.activeFilters.includes(item[filter])
             })
             console.log(filteredProducts, "!!!")
             this.setState({ filteredProducts:filteredProducts})
        }
        
      }

      filtertheProducts = () => {
          console.log("products filtered");
      }

      DeleteProduct = (id) => { //  fetch(`http://localhost:3000/deleteproduct/${id}`
          fetch(`http://localhost:3000/deleteproduct/${id}`, {
              method: "post"
          })
          .then(res => {
              if (res.status === 400) {
                  console.log("product deleted")
              }
          })
      }

      //get all yellow candies, push them to the currently rendered products array
    filterProducts(color, filter) { //render products based on activefilters

        console.log(this.state.filteredProducts, this.state.activeFilters, "HCEK")

        if (this.state.activeFilters.length <= 0) { // if there are no active filters, render all products
            this.setState({filteredProducts : this.state.products})
        }

        else {
            const filteredProducts = this.state.products.filter(item => { // color = hard candy / filter = Category
                if (this.state.activeFilters.includes(item[filter])) { // if the active filter contains the specifc item, return it
                    return item
                }
            })
            this.setState({filteredProducts : filteredProducts})
        }
        /*
        else {
            const filteredProducts = this.state.products.filter(item => { // color = hard candy / filter = Category
                Object.values(item).filter(value => {
                    return value === this.state.activeFilters
                })
                console.log(Object.values(item).filter(value => {this.state.activeFilters.includes(value)}), "WHAT IS THIS?")
                if (this.state.activeFilters.includes(item[filter])) { // if the active filter contains the specifc item, return it
                    console.log(item, "filtered")
                    return item
                }
                else {
                    //console.log(item, filter, "why you no work?")
                }
            })
            this.setState({filteredProducts : filteredProducts})
        }
        */
        /*
        const filt = this.state.filteredProducts.filter((item) => {
            if (item[filter] === color) {
                return item
            }
            return null;
        })
        this.setState({filteredProducts: filt})
        */
        /*
        if (this.state.activeFilters.length <= 0) { // if there are no active filters, render all products
            this.setState({filteredProducts : this.state.products})
        }
        else {
            const filteredProducts = this.state.products.filter(item => { // color = hard candy / filter = Category
                if (this.state.activeFilters.includes(item[filter])) { // if the active filter contains the specifc item, return it
                    console.log(item, "filtered")
                    return item
                }
                else {
                    //console.log(item, filter, "why you no work?")
                }
            })
            this.setState({filteredProducts : filteredProducts})
        }

        console.log(this.state.activeFilters, "ACTIVE FILTERS HERE");
        this.setState({filteredProducts : this.state.products.filter((item) => { // only return items that have the filter
            return this.state.activeFilters.includes(item[filter]) //
        }, console.log(this.state.filteredProducts, "FILTERED HERE"))})
        */


      }
            render(){
                return (
                        <div>
                        {console.log(this.state.filteredProducts, this.props.products)}
                        <Container>
                            <Row>
                            <Filters handleFilterProducts={this.handleFilterProducts}/>
                                <Col md="8">
                                <div className="products-holder">
                                <div className="products-holder-holder">
                                {this.state.filteredProducts.map(item => 
                                <Card style={{ width: '12rem' }} key={item.ID}>
                                <div className={`outer`}>
                                <div style={{right:"0px"}} className="overlay" onClick={ ()=> this.props.toggleModal("deleteproduct", item)}>
                                <i style={{paddingTop:"50px", color:"white"}} className="fas fa-trash-alt fa-4x"><p style={{fontSize:"15px"}}>Delete</p></i>
                                </div>
                                <div className="overlay" onClick={()=> this.props.toggleModal("changeproduct", item)}>
                                <i style={{paddingTop:"50px", color:"white"}} className="fas fa-file-invoice fa-4x"><p style={{fontSize:"15px"}}>Change Data</p></i>
                                </div>
                                <Card.Img variant="top" style={{width:"190px", height:"190px"}} src={`http://localhost:3000/image/${item.productid}`}/>
                                </div>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.price}€</Card.Text>
                                </Card>)}
                                </div>
                                </div>
                                </Col>
                            </Row>
                        </Container>
                    </div> );
                
            }
    
}
 
export default Products;