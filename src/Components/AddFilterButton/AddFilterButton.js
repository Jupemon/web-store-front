import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class AddFilterButton extends Component {
    state = { 
        input : "+Add",
        default : "+Add",
        visible : false
     }

     componentDidMount() {
         
     }

     VisibilityToggle = (e) => {
        e.target.classList.toggle("active");
        this.setState({visible : !this.state.visible, input:"+Add"})
     }

     ConfirmButton = () => {
        this.setState({visible: !this.state.visible, input : "+Add"});
        if (this.props.addFilterButton) {
            this.props.addFilterButton(this.state.input);
        }
        else {
            console.log("added")
            const token = localStorage.getItem('token');
            console.log(this.props.CategoryName)
                //http://localhost:3000/
            fetch("https://young-bayou-22235.herokuapp.com/addfilter", {
                method : 'POST',
                headers: {
                  'Authorization' : `Bearer ${token}`,
                  'Content-Type' : 'application/json'
                },
                body : JSON.stringify({name : this.props.CategoryName, items : [this.state.input]})
              })
              .then(res => {
                  if (res.status === 401) {
                      alert("Unathorized accesss, please sign in")
                  }
                  else {
                    res.json()
                  }
                })
              .then(data => {
                  console.log(data)
              })
        }
     }

    render() { 
        return (
            <div>
                <div className="purple-button"><Button variant="danger" onClick={(e) => {this.VisibilityToggle(e)}}>{this.state.input}</Button></div>
                <div style={this.state.visible ? {visibility:"visible"} : {visibility: "hidden", default: this.state.input}} className="add-filter">
                <div className="add-filter-background">
                    <Button variant="danger" onClick={() => {this.ConfirmButton()}} className="filter-item">Confirm</Button>
                    <input  onChange={(e) => {this.setState({input : e.currentTarget.value})}} className="filter-input filter-item"/>
                    <Button variant="danger" onClick={() => {this.setState({input : this.state.default, visible:!this.state.visible})}} className="filter-item">Cancel</Button>
                </div>
                </div>
            </div>
             );
    }
}
 
export default AddFilterButton;