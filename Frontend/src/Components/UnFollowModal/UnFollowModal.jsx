import React from "react";
import "./UnFollowModal.css";
const UnFollowModal = ({ isOpen, onClose, followingName, onUnfollow }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Unfollow</h2>
        <p>Are you sure you want to unfollow {followingName} ?</p>
        <div className="modal-actions">
          <button onClick={onUnfollow}>Unfollow</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UnFollowModal;
