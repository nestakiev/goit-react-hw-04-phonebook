import React, {Component} from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Container } from "./App.styled";
import shortid from "shortid";

export class App extends Component {
  
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));

    if(parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = (newContactInfo) => {
    const {contacts} = this.state;
    const isDuplicate = contacts.map(a => a.name).includes(newContactInfo.name);
    if (isDuplicate) {
      alert(`${newContactInfo.name} is already in your contacts`)
      return
    }
    
    const newContactId = shortid.generate();
    const newContact = {
      id: newContactId,
      ...newContactInfo,
    };
    this.setState( prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }))

  }

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(a => a.id !== id),
    }))
  }

  getFiltredContacts = () => {
    const {filter, contacts} = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  render () {
  const filtredContacts = this.getFiltredContacts();

  return (
    
      <Container>
    <h1>Phonebook</h1>
    <ContactForm addContact={this.addNewContact}/>

    <h2>Contacts</h2>
    <Filter onChange={e => this.setState({filter: e.target.value})}
            value={this.state.filter}/>
    <ContactList contacts={filtredContacts} onDelete={this.deleteContact}/>
      </Container>
    
  );
    }
};
