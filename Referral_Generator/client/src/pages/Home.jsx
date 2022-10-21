import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import style from "../pages/style.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
const Home = () => {
  const toast = useToast();
  const toastIdRef = useRef();

  const [user, setUser] = useState([]);
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

  useEffect(() => {
    apiCall();
  }, []);
  function addToast() {
    toastIdRef.current = toast({ description: "Link is Copied to Clipboard" });
  }
  return (
    <Box>
      <Navbar />
      <Box className={style.OuterBox}>
        {user
          ? user.map((el, i) => {
              return (
                <Box key={el._id} className={style.box}>
                  <Image
                    className={style.image}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOjXY44xj2kDrEwinLBEsObi_d-A57IoxIS8eWI3UfYK4WK8oapJJiVTcb8eM5cLJc-r8&usqp=CAU"
                  />
                  <Text fontSize={"2xl"}>Name: {el.name}</Text>
                  <Text fontSize={"2xl"}>Mobile: +91 {el.mobile}</Text>
                  <Text fontSize={"2xl"} marginBottom="10px">
                    Referral Code: {el.referral}
                  </Text>
                  <Box className={style.referBox}>
                    <Text>{`https://referral-generator.vercel.app/?ref=${el.referral}`}</Text>
                    <CopyToClipboard
                      text={`https://referral-generator.vercel.app/?ref=${el.referral}`}
                    >
                      <Button
                        colorScheme={"teal"}
                        marginLeft={"10px"}
                        onClick={addToast}
                      >
                        <FiCopy color="white" />
                      </Button>
                    </CopyToClipboard>
                  </Box>
                </Box>
              );
            })
          : ""}
      </Box>
    </Box>
  );
};

export default Home;
