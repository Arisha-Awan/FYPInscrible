import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractABI, contractAddress } from "./Constants";

//CREATING CONTEXT
export const InscribleContext = React.createContext();

const FetchContract = (signerProvider) =>
  new ethers.Contract(contractAddress, contractABI, signerProvider);

//FUNCTION TO CREATE CONTRACT
const CreateContract = async () => {
  try {
    //CREATING A ETHEREUM PROVIDER AND GETTING THE SIGNER
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    //SENDING THE SIGNER TO FetchContract FUNCTION TO GET THE SMART CONTRACT
    const contract = FetchContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

//CREATING CONTEXT PROVIDER
export const InscribleProvider = ({ children }) => {
  const [isMetamask, setIsMetamask] = useState(true);
  const [connectedAccount, setConnectedAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [isSignedin, setIsSignedin] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [singleUserPost, setSingleUserPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserLists] = useState([]);
  const [followerLists, setfollowerLists] = useState([]);
  const [followingLists, setfollowingLists] = useState([]);
  const [error, setError] = useState("");

  //FUNCTION TO GET THE CONNECTED ACCOUNT
  const ConnectWallet = async () => {
    try {
      if (!window.ethereum) return setIsMetamask(false);

      window.ethereum.on("chainChanged", () => {
        signInState(false);
        window.location.reload(true);
      });
      window.ethereum.on("accountsChanged", () => {
        signInState(false);
        console.log("in wallet...........");
        window.location.reload(true);
      });

      //GETTING ACCOUTNS ARRAY FROM ETHEREUM/METAMASK
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      //GETTING FIRST ACCOUNT FROM ACCOUNTS ARRAY
      const firstAccount = accounts[0];
      setConnectedAccount(firstAccount);

      const _contract = await CreateContract();

      setContract(_contract);
    } catch (error) {
      console.log(error);
    }
  };
  //ADD YOUR FRIENDS
  const addFriends = async ({ accountAddress }) => {
    try {
      // const contract = await ConnectWallet();
      const addMyFriend = await contract.addFriend(accountAddress);
      await addMyFriend.wait();
      console.log("follower !!!");
      const followerListing = await contract.getMyFriendList();
      setfollowerLists(followerListing);
      console.log("this is from follower list");
      console.log(followerListing);

      console.log("followings    ????");
      const followingListing = await contract.getMyFollowingsList();
      setfollowingLists(followingListing);
      console.log("this is my following list");
      console.log(followingListing);
    } catch (error) {
      setError("Something went wrong while adding friends, try again");
    }
  };

  const checkAlreadyFriend = async ({
    connectedAccountAddress,
    accountAddress,
  }) => {
    try {
      // console.log(contract);
      // console.log(connectedAccountAddress + "          " + accountAddress);
      const checkFriend = await contract.checkAlreadyFriends(
        connectedAccountAddress,
        accountAddress
      );
      console.log("is friends " + checkFriend);
      return checkFriend;
    } catch (error) {
      console.log(error);
      setError("Something went wrong while adding friends, try again");
      return false;
    }
  };

  //check is user already exits

  const removeFriends = async ({ accountAddress }) => {
    try {
      // const contract = await ConnectWallet();
      const removeMyFriend = await contract.removeFriend(accountAddress);
      await removeMyFriend.wait();
      console.log("this is from remove friend!!!");
      console.log("follower !!!");
      const followerListing = await contract.getMyFriendList();
      setfollowerLists(followerListing);
      console.log("this is from follower list");
      console.log(followerListing);

      console.log("followings    ????");
      const followingListing = await contract.getMyFollowingsList();
      setfollowingLists(followingListing);
      console.log("this is my following list");
      console.log(followingListing);
    } catch (error) {
      setError("Something went wrong while adding friends, try again");
    }
  };

  const RegisterUser = async (username) => {
    const createdUser = await contract.createAccount(username);
    await createdUser.wait();
  };

  const CheckIfUserIsRegistered = async (account) => {
    const isUser = await contract.checkUser(account);
    if (isUser) {
      return true;
    } else {
      return false;
    }
  };

  const signInState = (state) => {
    setIsSignedin(state);

    localStorage.setItem("isSignedIn", JSON.stringify(state));
  };
  const getAllAppUser = async () => {
    console.log("GetAllUser function called");

    setIsLoading(true);
    const userList = await contract.getAllAppUser();
    // console.log(userList[1].accountAddress);
    setUserLists(userList);

    console.log("userList");

    setIsLoading(false);
  };
  const getSignInState = () => {
    return JSON.parse(localStorage.getItem("isSignedIn"));
  };

  const ValidateUsername = async (username) => {
    const _username = await contract.getUsername(connectedAccount);

    if (username === _username) {
      setCurrentUsername(_username);
      return true;
    } else {
      return false;
    }
  };

  const UploadPost = async (imageHash, caption, imageText) => {
    setIsLoading(true);
    const uploaded = await contract.addPostImage(imageHash, caption, imageText);
    await uploaded.wait();
    setIsLoading(false);
  };

  const GetAllPosts = async () => {
    setIsLoading(true);
    const Posts = await contract.GetAllPosts();

    setAllPosts(Posts);
    setIsLoading(false);
  };

  const GetPostByUser = async (address) => {
    console.log(contract);
    console.log(address);
    console.log(connectedAccount);
    setIsLoading(true);
    const Posts = await contract.getSingleUserPost(address);
    console.log("possssssssssssssst");
    console.log(Posts);
    console.log("Context post" + Posts);
    console.log("Context post wait " + Posts);
    setSingleUserPost(Posts);
    setIsLoading(false);
  };

  useEffect(() => {
    const getAccount = async () => {
      await ConnectWallet();
    };
    getAccount();
  }, [isMetamask]);

  return (
    <InscribleContext.Provider
      value={{
        ConnectWallet,
        RegisterUser,
        CheckIfUserIsRegistered,
        signInState,
        getSignInState,
        ValidateUsername,
        setIsSignedin,
        UploadPost,
        setIsLoading,
        GetAllPosts,
        GetPostByUser,
        getAllAppUser,
        addFriends,
        removeFriends,
        isMetamask,
        connectedAccount,
        contract,
        isSignedin,
        currentUsername,
        allPosts,
        singleUserPost,
        isLoading,
        userList,
        checkAlreadyFriend,
      }}
    >
      {children}
    </InscribleContext.Provider>
  );
};
