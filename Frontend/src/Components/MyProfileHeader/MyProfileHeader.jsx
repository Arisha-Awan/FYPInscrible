import React, { useState, useEffect, useContext } from "react";
import "./MyProfileHeader.css";
import { ProfilePosts, MyProfileUserCard } from "../Index";

import { InscribleContext } from "../../Context/Context";

const MyProfileHeader = ({}) => {
  const [isPost, setIsPost] = useState(true);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowingBtn, setIsFollowingBtn] = useState(false);
  const [followerListing, setfollowerListing] = useState([]);
  const [followingList, setfollowingList] = useState([]);
  const {
    userLists,
    addFriends,
    removeFriends,
    checkAlreadyFriend,
    ConnectWallet,
    connectedAccount,
    contract,
    getMyProfilePost,
    myProfilePosts,
    currentUsername,
    GetUserName,
  } = useContext(InscribleContext);
  useEffect(() => {
    const checkFriends = async () => {
      const isFollowStatus = await checkAlreadyFriend({
        connectedAccountAddress: connectedAccount,
        accountAddress: connectedAccount,
      });
      setIsFollowingBtn(isFollowStatus);
    };

    checkFriends();
    getFollowersList();
    getMyFollowingsList();
    getMyProfilePost(connectedAccount);
    GetUserName();
  }, [connectedAccount, contract]);

  // const { username, address } = useParams();
  const getFollowersList = async () => {
    const followerListing = await contract.getMyFollowersList(connectedAccount);
    setfollowerListing(followerListing);
  };

  const getMyFollowingsList = async () => {
    const followingList = await contract.getMyFollowingsList(connectedAccount);
    setfollowingList(followingList);
  };

  // Function to handle the follow/unfollow action
  const handleFollowToggle = () => {
    if (isFollowingBtn) {
      // Perform the unfollow action
      // ...
      removeFriends({ accountAddress: connectedAccount });

      setIsFollowingBtn(false); // Update the state to reflect unfollowing
    } else {
      // Perform the follow action
      // ...
      addFriends({ accountAddress: connectedAccount });

      setIsFollowingBtn(true); // Update the state to reflect following
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
              {currentUsername}
            </p>
          </div>
          <div className="profile-header_content-info">
            <div>
              <span className="bold-5">{myProfilePosts.length}</span>
              <span
                className={isPost ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(false);
                  setIsFollowing(false);
                  setIsPost(true);
                  getMyProfilePost(connectedAccount);
                }}
              >
                {" "}
                Posts
              </span>
            </div>
            <div>
              <span className="bold-5">{followerListing.length}</span>
              <span
                className={isFollower ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(true);
                  setIsFollowing(false);
                  setIsPost(false);
                  getFollowersList();
                }}
              >
                {" "}
                Followers
              </span>
            </div>
            <div>
              <span className="bold-5">{followingList.length}</span>
              <span
                className={isFollowing ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(false);
                  setIsFollowing(true);
                  setIsPost(false);
                  getMyFollowingsList();
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
            {followerListing.map((item, i) => {
              return (
                <MyProfileUserCard
                  userName={item.name}
                  profilePic={item.pic}
                  address={item.pubkey}
                  key={i}
                  followingBtn={isFollowing}
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
            {followingList.map((item, i) => {
              return (
                <MyProfileUserCard
                  userName={item.name}
                  profilePic={item.pic}
                  address={item.pubkey}
                  key={i}
                  followingBtn={isFollowing}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfileHeader;
