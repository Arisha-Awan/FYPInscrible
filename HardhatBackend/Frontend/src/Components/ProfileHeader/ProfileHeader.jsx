import React, { useState, useEffect, useContext } from "react";
import "./ProfileHeader.css";
import { ProfilePosts, ProfileUserCard } from "../Index";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { InscribleContext } from "../../Context/Context";

const ProfileHeader = ({}) => {
  const [isPost, setIsPost] = useState(true);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const {
    userLists,
    addFriends,
    removeFriends,
    checkAlreadyFriend,
    ConnectWallet,
    connectedAccount,
    contract,
  } = useContext(InscribleContext);
  useEffect(() => {
    const checkFriends = async () => {
      const isFollowStatus = await checkAlreadyFriend({
        connectedAccountAddress: connectedAccount,
        accountAddress: address,
      });
      setIsFollowing(isFollowStatus);
      console.log("isFoolowSTatus    " + isFollowStatus);
    };

    checkFriends();
  }, [connectedAccount, contract]);

  const users = [
    {
      name: "Anna Wintour",
      pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      address: "0x00030503554385247875847200048nt2457vn",
    },
    {
      name: "Alia Chaudhary",
      pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      address: "0x00030503554385247875847200048nt2457vn",
    },
    {
      name: "Nathan Freeman",
      pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      address: "0x00030503554385247875847200048nt2457vn",
    },
    {
      name: "Samuel Drake",
      pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      address: "0x00030503554385247875847200048nt2457vn",
    },
  ];
  const { username, address } = useParams();

  // Function to handle the follow/unfollow action
  const handleFollowToggle = () => {
    if (isFollowing) {
      // Perform the unfollow action
      // ...
      removeFriends({ accountAddress: address });

      setIsFollowing(false); // Update the state to reflect unfollowing
    } else {
      // Perform the follow action
      // ...
      addFriends({ accountAddress: address });

      setIsFollowing(true); // Update the state to reflect following
    }
  };

  return (
    <>
      <div className="profile-header">
        <div className="profile-header_image">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?
                        ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=
                        format&fit=crop&w=1170&q=80"
            alt="Pofile"
          />
        </div>
        <div className="profile-header_content">
          <div className="profile-header_content-name-edit">
            <p id="profile-name" className="bold-5 size-l">
              {username}
            </p>
            <button onClick={handleFollowToggle}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-header_content-info">
            <div>
              <span className="bold-5">12</span>
              <span
                className={isPost ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(false);
                  setIsFollowing(false);
                  setIsPost(true);
                }}
              >
                {" "}
                Posts
              </span>
            </div>
            <div>
              <span className="bold-5">12</span>
              <span
                className={isFollower ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(true);
                  setIsFollowing(false);
                  setIsPost(false);
                }}
              >
                {" "}
                Followers
              </span>
            </div>
            <div>
              <span className="bold-5">12</span>
              <span
                className={isFollowing ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(false);
                  setIsFollowing(true);
                  setIsPost(false);
                }}
              >
                {" "}
                Following
              </span>
            </div>
          </div>
        </div>
      </div>

      {isPost && <ProfilePosts />}

      {isFollower && (
        <div className="profile-usercard-container">
          <div className="profile-usercard-header">
            <h3>Followers</h3>
          </div>
          <div className="profile-usercard-body">
            {users.map((item, i) => {
              return (
                <ProfileUserCard
                  userName={item.name}
                  profilePic={item.pic}
                  address={item.address}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      )}

      {isFollowing && (
        <div className="profile-usercard-container">
          <div className="profile-usercard-header">
            <h3>Following</h3>
          </div>
          <div className="profile-usercard-body">
            {users.map((item, i) => {
              return (
                <ProfileUserCard
                  userName={item.name}
                  profilePic={item.pic}
                  address={item.address}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
