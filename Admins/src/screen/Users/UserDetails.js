import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const getUser = async () => {
    try {
      const res = await axios.get(`/admin/user/${id}`);
      setUser(res.data.user);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return <div>userDetails {user?.name}</div>;
};

export default UserDetails;
