import PropTypes from 'prop-types';
import styles from '../App.module.css';

const ContactList = ({ listFilter, listDelete }) => {
  return (
    <ul className={styles.list}>
      {listFilter().map(contact => (
        <li key={contact.id} className={styles.item}>
          {contact.name}: {contact.number}
          <button
            type="button"
            onClick={listDelete}
            id={contact.id}
            className={styles.btnDel}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  listFilter: PropTypes.func,
  listDelete: PropTypes.func,
};
