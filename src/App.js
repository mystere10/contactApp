import React, { Component } from 'react';
import ListContact from './ListContact'
import * as contactsAPI from './utils/ContactsAPI';

class App extends Component {

  state = {
    contacts: []
  }

  componentDidMount(){
    contactsAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c)=>{
        return c.id !== contact.id
      })
    }))
  }
  render() {
    return (
      <div>
        <ListContact
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
