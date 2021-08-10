import logo from './logo.svg';
import contacts from "./contacts.json";
import React from 'react'
import './App.css';
import { Component } from 'react/cjs/react.production.min';

export class App extends Component {

  constructor(props){
    super(props);
    this.originalContacts=contacts;
    this.SortedByName=false;
    this.SortedByPop=false;
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

  sortList = (criteria)=>{

    const copy = [...this.state.contactList];
    
    if ( criteria==="Name" && this.SortedByName===false ){
      
      copy.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.SortedByName=true;
      this.SortedByPop=false;
    }
    

    else if(criteria==="Popularity" && this.SortedByPop===false )
    {
      copy.sort((a,b)=>{
        return b.popularity-a.popularity;
      })
      this.SortedByName=false;
      this.SortedByPop=true;
    }    

      this.setState({contactList:copy});

  }




  render(){
    return (
      <div className="ContactsWrapper">
        <h1>Iron Contacts</h1>
        <button onClick={this.addRandom}>Add Random Contact</button>
        <button className={this.SortedByName? "selected" : ""} onClick={()=>{this.sortList('Name')}}>Sort by Name</button>
        <button className={this.SortedByPop? "selected" : ""}onClick={()=>{this.sortList('Popularity')}}>Sort by Popularity</button>
        <table className="contactTable">
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
