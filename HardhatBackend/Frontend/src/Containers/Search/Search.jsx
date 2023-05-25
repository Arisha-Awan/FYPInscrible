import React, { useContext, useEffect, useState } from "react";
import { InscribleContext } from "../../Context/Context";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { Navbar, Loader, SearchCard } from "../../Components/Index";

const Search = () => {
  const navigate = useNavigate();
  const {
    GetPostByUser,
    isLoading,
    singleUserPost,
    connectedAccount,
    getSignInState,
    ConnectWallet,
    contract,
    userList,
    getAllAppUser,
  } = useContext(InscribleContext);

  const notify = (msg) => toast.error(msg);
  const [isSigned, setIsSigned] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    console.log("From Search");
    const state = getSignInState();
    setIsSigned(state);

    const fetchdata = async () => {
      await ConnectWallet();
      await getAllAppUser();
    };

    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      await getAllAppUser();
    };

    fetchdata();
  }, [connectedAccount, contract]);

  const backToSignIn = () => {
    if (!isSigned) {
      navigate("/");
    }
  };

  const noPostMsg = () => {
    notify("No Posts Created Yet !");
  };

  return (
    <>
      {isSigned ? (
        <>
          <input
            className="search"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          <Navbar />
          {isLoading ? (
            <Loader />
          ) : userList.length > 0 ? (
            <>
              {userList

                .filter(
                  (user) =>
                    user.accountAddress.toLowerCase() !==
                    connectedAccount.toLowerCase()
                )
                .filter((user) =>
                  user.accountAddress
                    .toLowerCase()
                    .includes(query.toLowerCase())
                )
                .map((item) => (
                  <SearchCard
                    username={item.username}
                    address={item.accountAddress}
                    key={item.id}
                    filteruser={item.username}
                    filterUserAdress={item.address}
                  />
                ))}
            </>
          ) : (
            noPostMsg()
          )}
        </>
      ) : (
        backToSignIn()
      )}
    </>
  );
};

export default Search;
