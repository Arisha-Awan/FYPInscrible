import React, { useState, useEffect, useContext } from "react";
import "./ProfileUserCard.css";
import { UnFollowModal } from "../Index";
import { useNavigate } from "react-router-dom";
import { InscribleContext } from "../../Context/Context";
const ProfileUserCard = ({ userName, profilePic, address }) => {
  const [isUnFollowModalOpen, setIsUnFollowModalOpen] = useState(false);
  const {
    checkAlreadyFriend,
    connectedAccount,
    contract,
    addFriends,
    removeFriends,
  } = useContext(InscribleContext);
  const [isFollowingBtnProfile, setIsFollowingBtnProfile] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/profile/${address}/${userName}/`);
  };
  useEffect(() => {
    const checkFriends = async () => {
      const isFollowStatus = await checkAlreadyFriend({
        connectedAccountAddress: connectedAccount,
        accountAddress: address,
      });
      setIsFollowingBtnProfile(isFollowStatus);
      console.log("isFollowSTatus    " + isFollowStatus);
    };
    checkFriends();
  }, [connectedAccount, contract]);

  const handleFollowingToggle = () => {
    if (isFollowingBtnProfile) {
      // Perform the unfollow action
      // ...
      setIsUnFollowModalOpen(true);
      setIsFollowingBtnProfile(false); // Update the state to reflect unfollowing
    } else {
      // Perform the follow action
      // ...
      addFriends({ accountAddress: address });
      setIsFollowingBtnProfile(true); // Update the state to reflect following
    }
  };

  const handleUnfollow = async () => {
    // Perform unfollow action here
    console.log("Unfollowedddddddddddddddddddddddd");
    console.log(address);
    await removeFriends({ accountAddress: address });
    // Close the modal
    setIsUnFollowModalOpen(false);
  };

  return (
    <>
      <div className="profile-usercard">
        <div className="profiel-usercard-main-info">
          <img
            src={profilePic}
            alt="Profile"
            className="profile-usercard-pic"
          />
          <span className="profile-usercard-name" onClick={handleClick}>
            {userName}
          </span>
          <button
            onClick={handleFollowingToggle}
            className={
              connectedAccount.toLowerCase() === address.toLowerCase()
                ? "d-none"
                : "profile-remove-follower"
            }
          >
            {isFollowingBtnProfile ? "Following" : "Follow"}
          </button>
        </div>
        <small className="profile-usercard-address">{address}</small>
      </div>
      <UnFollowModal
        isOpen={isUnFollowModalOpen}
        onClose={() => setIsUnFollowModalOpen(false)}
        followingName={userName}
        onUnfollow={handleUnfollow}
      />
    </>
  );
};

export default ProfileUserCard;
