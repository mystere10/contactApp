import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import ListContact from './ListContact'
import * as contactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {

  state = {
    contacts: [],
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
    contactsAPI.remove(contact)
  }

  createContact = (contact) => {
    contactsAPI.create(contact)
    .then((contacts) => (
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contacts])
      }))
    ))
  }
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
        <ListContact
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
        />
        )}/>
        <Route path="/create" render={({history}) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
