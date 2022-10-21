import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import style from "../pages/style.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const Navbar = () => {
  const [user, setUser] = useState([]);
  const [referredUser, setReferredUser] = useState([]);
  const navigate = useNavigate();
  const referCode = localStorage.getItem("refferalCode");
  const userId = localStorage.getItem("userId");
  const apiCall = async () => {
    await fetch(`https://still-plains-21247.herokuapp.com/alluser/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const referral = async () => {
    await fetch(
      `https://still-plains-21247.herokuapp.com/referral?refer_By=${referCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReferredUser(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(referredUser);

  useEffect(() => {
    apiCall();
    referral();
  }, []);
  //   console.log(user[0].name);
  return (
    <Box className={style.navbar}>
      <Text fontSize={"3xl"}>Referral Code Generate</Text>
      <Box>
        {user
          ? user.map((el, i) => {
              return (
                <Box key={el._id} className={style.navBox}>
                  <Image
                    className={style.avatar}
                    src="https://cdn1.vectorstock.com/i/thumb-large/82/55/anonymous-user-circle-icon-vector-18958255.jpg"
                  />
                  <Text>{el.name}</Text>
                  <Text marginLeft={"30px"}>
                    Referral Points: {referredUser.length * 5 + 10}
                  </Text>
                </Box>
              );
            })
          : ""}
      </Box>
    </Box>
  );
};

export default Navbar;
