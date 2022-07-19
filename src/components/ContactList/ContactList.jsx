import PropTypes from "prop-types";
import { P, Li, DelButton } from "./ContactList.styled";

export const ContactList = ({contacts, onDelete}) => {
    const isContactsEmpty = contacts.length > 0;
    return (
    isContactsEmpty ? 
    <ul>{contacts.map(a => <Li key={a.id}>
        <P>{a.name}: {a.number}</P>
        <DelButton type="button" key={a.id} onClick={() => onDelete(a.id)}>Delete</DelButton> 
        </Li>)}
    </ul>
    : <p>You dont have any contacts or matches</p>
    
    )

};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.node.isRequired,
    })),

}