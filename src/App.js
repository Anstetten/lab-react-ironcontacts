import logo from './logo.svg';
import contacts from "./contacts.json";
import React from 'react';
import './App.css';

function App() {

  let contactList = contacts.slice(0,5);

  return (
    <div className="ContactsWrapper">
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

          {contactList.map((contact)=>{
            return <tr key={contact.id}>
            <td ><img src={contact.pictureUrl} alt='image'></img></td>
            <td >{contact.name}</td>
            <td >{contact.popularity}</td>
          </tr>
          })}

        </tbody>


      </table>
    </div>
  );
}

export default App;
