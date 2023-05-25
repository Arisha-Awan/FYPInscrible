import React from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../Containers/Index";

const SearchCard = ({
  username,
  address,
  file,
  caption,
  imageText,
  likeCount,
  query,
  filteruser,
  filterUserAdress,
}) => {
  const navigate = useNavigate();
console.log({username});
  const handleClick = () => {
    navigate(`/profile/${address}/${username}/`);
    console.log({username});
  };

  return (
    <div className="card">
      <div className="card-header">
        <ul className="list" style={{ cursor: "pointer" }}>
          <li className="username" onClick={handleClick}>
            {username}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchCard;
