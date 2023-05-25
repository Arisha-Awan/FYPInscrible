import "./MyProfile.css";
import { Navbar, MyProfileHeader } from "../../Components/Index";
import { InscribleContext } from "../../Context/Context";

import React, { useContext, useEffect, useState } from "react";

const MyProfile = () => {
  return (
    <>
      <Navbar />
      <div className="profile">
        <MyProfileHeader />
      </div>
    </>
  );
};

export default MyProfile;
