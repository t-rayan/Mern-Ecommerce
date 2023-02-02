import { Box, Icon, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";

const ImageSlider = ({ imgArray, thumbnail }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(imgArray);

  const arrayJoiner = (arr, item) => {
    let newImgArray;
    if (arr !== undefined && item !== undefined) {
      newImgArray = [...arr];

      newImgArray.unshift(item);
    }
    return newImgArray;
  };

  const images = arrayJoiner(imgArray, thumbnail);
  const lastIndex = imgArray?.length - 1;

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Icon
          as={RiArrowDropLeftFill}
          w={10}
          h={10}
          color={currentIndex > 0 ? "black" : "gray.500"}
          cursor={currentIndex > 0 ? "pointer" : "not-allowed"}
          onClick={() =>
            currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : null
          }
        />
        <Image
          w="85%"
          h="auto"
          src={imgArray && imgArray[currentIndex].img_url}
        />
        <Icon
          as={RiArrowDropRightFill}
          w={10}
          h={10}
          color={currentIndex < lastIndex ? "black" : "gray.500"}
          cursor={currentIndex < lastIndex ? "pointer" : "not-allowed"}
          onClick={() =>
            currentIndex < lastIndex ? setCurrentIndex(currentIndex + 1) : null
          }
        />
      </Box>
      <Box mt={5} display="flex" justifyContent="center" alignItems="center">
        {imgArray &&
          imgArray?.map((img, index) => (
            <Image
              key={img?.img_url}
              cursor="pointer"
              src={img?.img_url}
              w="3rem"
              onClick={() => setCurrentIndex(index)}
            />
          ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
