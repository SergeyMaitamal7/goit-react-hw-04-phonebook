import { Form, Label, Input, Button } from './FormContact.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleClickChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
      return
    }
    if (name === 'number') {
    }
    setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({name, number});
    resetForm();
  };

  const resetForm = e => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleClickChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleClickChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">Add Contact</Button>
      </Form>
    </>
  );
};

// ContactForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   number: PropTypes.number.isRequired,
// };
