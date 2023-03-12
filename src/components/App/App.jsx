import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/FormContact/FormContact';
import { Section } from 'components/Section/Section';
import { RenderContacts } from 'components/RenderContacts/RenderContacts';
import { Filter } from 'components/Filter/Filter';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onHandleSubmit = e => {
    const filterName = this.state.contacts.find(
      contact => contact.name === e.name
    );
    if (filterName) {
      alert(`You have already added ${filterName.name} to Contact list!!!`);
      return;
    }

    const contact = {
      id: nanoid(4),
      name: e.name,
      number: e.number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    console.log('hell0');
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    
    if (parseContacts) {
    this.setState({ contacts: parseContacts});
    }
    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('hi');
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.onHandleSubmit}></ContactForm>
        </Section>
        <Section title="Contacts">
          <Filter onChange={this.changeFilter} />
          <RenderContacts
            contacts={visibleContacts}
            onDelete={this.deleteContacts}
          />
        </Section>
      </Container>
    );
  }
}
