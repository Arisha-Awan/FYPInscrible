import "./Profile.css";
import { Navbar, ProfileHeader } from "../../Components/Index";
import { InscribleContext } from "../../Context/Context";

import React, { useContext, useEffect, useState } from "react";


const Profile = () => {
  
  return (
    <>
      <Navbar />
      <div className="profile">
        <ProfileHeader />
      </div>
    </>
  );
};

export default Profile;
