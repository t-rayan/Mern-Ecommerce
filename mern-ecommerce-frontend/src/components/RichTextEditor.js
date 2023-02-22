import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, setValue }) => {
  // const [value, setValue] = useState();
  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      {/* <Box>{value}</Box> */}
    </>
  );
};

export default RichTextEditor;
