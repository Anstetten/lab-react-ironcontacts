import logo from './logo.svg';
import contacts from "./contacts.json";
import React from 'react'
import './App.css';
import { Component } from 'react/cjs/react.production.min';

export class App extends Component {

  constructor(props){
    super(props);
    this.originalContacts=contacts;
    this.state ={
      contactList:this.originalContacts.slice(0,5),
    }
  }

  addRandom = ()=>{
    
    let succes = false;
    while(!succes){
      let randomContact=this.originalContacts[Math.floor(Math.random()*this.originalContacts.length)]
      //Check if we do not have duplicates
      if (!this.state.contactList.some((contact)=>{
        return contact.name===randomContact.name;
      })){
        console.log("hi");
        let intermediateArray = [...this.state.contactList];
        intermediateArray.push(randomContact);
        succes=true;
        this.setState({contactList:intermediateArray});
      }
    }

  }

  render(){
    return (
      <div className="ContactsWrapper">
        <button onClick={this.addRandom}>Add Random Contact</button>
        <table className="contactTable">
          <thead>
            <tr>
              <th colSpan="3">IronContacts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td >Picture</td>
              <td >Name</td>
              <td >Popularity</td>
            </tr>
  
            {this.state.contactList.map((contact)=>{
              return <tr key={contact.id}>
              <td ><img src={contact.pictureUrl} alt='image'></img></td>
              <td >{contact.name}</td>
              <td >{contact.popularity.toFixed(2)}</td>
            </tr>
            })}
  
          </tbody>
  
  
        </table>
      </div>
    );
  }
  
}

export default App;
