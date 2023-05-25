import React from "react";
import "./RemoveFollowerModal.css";
const RemoveFollowerModal = ({ isOpen, onClose, onRemove, Followername }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Remove Follower?</h2>
        <p>
          Instagram won't tell {Followername} they were removed from your
          followers.
        </p>
        <div className="modal-actions">
          <button onClick={onRemove}>Remove</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveFollowerModal;
