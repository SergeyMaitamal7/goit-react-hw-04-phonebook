import { Label, Input } from 'components/FormContact/FormContact.styled';
import { Title } from './Filter.styled';
import PropTypes from 'prop-types';
export const Filter = ({ onChange}) => {
  // console.log(onChange);
  return (
    <>
      <Label>
      <Title>Find contacts by name:</Title>
        <Input type="text"   onChange={onChange} />
      </Label>
    </>
  );
};


Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

