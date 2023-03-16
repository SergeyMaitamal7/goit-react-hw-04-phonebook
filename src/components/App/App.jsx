import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/FormContact/FormContact';
import { Section } from 'components/Section/Section';
import { RenderContacts } from 'components/RenderContacts/RenderContacts';
import { Filter } from 'components/Filter/Filter';
import { Container } from './App.styled';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  const onHandleSubmit = ({ name, number }) => {
    const filterName = contacts.find(contact => contact.name === name);
    console.log(contacts);
    if (filterName) {
      alert(`You have already added ${name} to Contact list!!!`);
      return;
    }

    const contact = {
      id: nanoid(4),
      name: name,
      number: number,
    };

    setContacts([contact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContacts = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      const parseContacts = JSON.parse(localStorage.getItem('contacts'));
      if (parseContacts) {
        setContacts(parseContacts);
      }
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const normalizeFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={onHandleSubmit}></ContactForm>
      </Section>
      <Section title="Contacts">
        <Filter onChange={changeFilter} />
        <RenderContacts contacts={visibleContacts} onDelete={deleteContacts} />
      </Section>
    </Container>
  );
};

App.prototype = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
