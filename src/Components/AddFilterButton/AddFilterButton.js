import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class AddFilterButton extends Component {
    state = { 
        input : "+Add",
        default : "+Add",
        visible : false
     }
     ConfirmButton = () => {
        console.log("confirmerd")
        this.setState({visible: !this.state.visible, input : "+Add"});
        this.props.addFilterButton(this.state.input);
     }
    render() { 
        return (
            <div>
                <div className="purple-button"><Button variant="danger" onClick={(e) => {this.setState({visible : !this.state.visible, input:"+Add"})}}>{this.state.input}</Button></div>
                <div style={this.state.visible ? {visibility:"visible"} : {visibility: "hidden", default: this.state.input}} className="add-filter">
                    <Button variant="danger" onClick={() => {this.ConfirmButton()}} className="filter-item">Confirm</Button>
                    <input onChange={(e) => {this.setState({input : e.currentTarget.value})}} className="filter-input filter-item"/>
                    <Button variant="danger" onClick={() => {this.setState({input : this.state.default, visible:!this.state.visible})}} className="filter-item">Cancel</Button>
                </div>
            </div>
             );
    }
}
 
export default AddFilterButton;