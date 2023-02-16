import { FormControl, FormLabel, Select, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { fetchAllTitles } from "../../../../../api/index.js";

function FormTodTitle({ setTodTitle }) {
  const token = localStorage.getItem("auth");

  const toast = useToast();

  const [titles, setTitles] = useState([]);

  const handleFetchAllTitles = async () => {
    try {
      const { data } = await fetchAllTitles(token);
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          description: "Error while fetching titles",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Titles fetched successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTitles(data.data);
      }
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: "error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    handleFetchAllTitles();
  }, []);
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Tod Title</FormLabel>
      <Select
        placeholder="Select option"
        focusBorderColor="#790202"
        onChange={(e) => {
          setTodTitle(e.target.value);
        }}
      >
        {titles.map((title) => {
          return <option value={title?.name}>{title?.name}</option>;
        })}
      </Select>
    </FormControl>
  );
}

export default FormTodTitle;
