import styles from "./Messages.module.css";
import { useState } from "react";
import { func, bool } from "prop-types";
import { MessagePropTypes } from "../../propTypes";

const Message = ({
  handleGoBack,
  selectedMessage,
  onSubmitEdit,
  handleDelete,
  allowEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const handleEditClick = () => {
    setEditText(selectedMessage.text);
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    onSubmitEdit(selectedMessage._id, editText);
  };

  return (
    <div>
      <h1 className={styles.header}>Message: </h1>
      <h2>{selectedMessage.author.username} said: </h2>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <p className={styles.message}>{selectedMessage.text}</p>
      )}
      {allowEdit && (
        <div>
          {isEditing ? (
            <button className={styles.button} onClick={() => handleSubmit()}>
              Save ✔️
            </button>
          ) : (
            <>
              <button
                className={styles.button}
                onClick={(e) => handleEditClick(e, selectedMessage._id)}
              >
                Edit ✎
              </button>
              <button
                className={`${styles.button} ${styles.delete}`}
                onClick={() => handleDelete(selectedMessage._id)}
              >
                Delete 🗑️
              </button>
            </>
          )}
        </div>
      )}
      <button className={styles.button} onClick={handleGoBack}>
        HOME
      </button>
    </div>
  );
};

export default Message;

Message.propTypes = {
  handleGoBack: func.isRequired,
  selectedMessage: MessagePropTypes,
  onSubmitEdit: func.isRequired,
  handleDelete: func.isRequired,
  allowEdit: bool.isRequired,
};
