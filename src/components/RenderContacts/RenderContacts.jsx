import PropTypes from 'prop-types';
import { Contact, Button } from './RenderContacts.styled';

export const RenderContacts = ({ contacts, onDelete }) => {
  return (
    <>
      {contacts.map(contact => (
        <Contact key={contact.id} type="button" name={contact.name}>
          {contact.name}  :  {contact.number}
          <Button onClick={() => onDelete(contact.id)}>Delete</Button>
        </Contact>
      ))}
    </>
  );
};

RenderContacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func,
};

