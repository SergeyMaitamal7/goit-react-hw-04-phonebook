import { nanoid } from 'nanoid';
import { ContactForm } from 'components/FormContact/FormContact';
import { Section } from 'components/Section/Section';
import { RenderContacts } from 'components/RenderContacts/RenderContacts';
import { Filter } from 'components/Filter/Filter';
import { Container } from './App.styled';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts === null) {
      return [];
    }
    return savedContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContacts = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

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
