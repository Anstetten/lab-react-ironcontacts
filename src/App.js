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
        let intermediateArray = [...this.state.contactList];
        intermediateArray.push(randomContact);
        succes=true;
        this.setState({contactList:intermediateArray},()=>{
          if(this.SortedByName ===true ||this.SortedByPop===true){
            let criteria = this.SortedByName? "Name" : "Popularity";
            this.sortList(criteria);
          }
        });
      }
    }

  }

  sortList = (criteria)=>{
    console.log("Iam called")
    const copy = [...this.state.contactList];
    
    if ( criteria==="Name"){
      
      copy.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.SortedByName=true;
      this.SortedByPop=false;
    }
    

    else if(criteria==="Popularity")
    {
      copy.sort((a,b)=>{
        return b.popularity-a.popularity;
      })
      this.SortedByName=false;
      this.SortedByPop=true;
    }    

      this.setState({contactList:copy});

  }

    deleteContact = (id)=>{

      let newList = this.state.contactList.filter((contact)=>{
        if (contact.id !==id){
            return contact;
        }
      })
      console.log(newList);
      this.setState({contactList:newList});
    }



  render(){
    return (
      <div className="ContactsWrapper">
        <h1>Iron Contacts</h1>
        <div className="buttonWrapper">
        <button onClick={this.addRandom}>Add Random Contact</button>
        <button className={this.SortedByName? "selected" : ""} onClick={()=>{this.sortList('Name')}}>Sort by Name</button>
        <button className={this.SortedByPop? "selected" : ""}onClick={()=>{this.sortList('Popularity')}}>Sort by Popularity</button>
        </div>
        
        <table className="contactTable">
          <tbody>
            <tr>
              <td >Picture</td>
              <td >Name</td>
              <td >Popularity</td>
              <td >Action</td>
            </tr>
  
            {this.state.contactList.map((contact)=>{
              return (<tr key={contact.id}>
              <td ><img src={contact.pictureUrl} alt='image'></img></td>
              <td >{contact.name}</td>
              <td >{contact.popularity.toFixed(2)}</td>
              <td ><button onClick={()=>{this.deleteContact(contact.id)}}>Delete</button></td>
            </tr>)
            })}
  
          </tbody>
  
  
        </table>
      </div>
    );
  }
  
}

export default App;
