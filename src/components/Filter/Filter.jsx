import PropTypes from 'prop-types';
import styles from '../App.module.css';

const Filter = ({ inputChange }) => {
  return (
    <>
      <p className={styles.text}>Find contacts by Name</p>
      <input type="text" name="text" onChange={inputChange}></input>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  inputChange: PropTypes.func.isRequired,
};
