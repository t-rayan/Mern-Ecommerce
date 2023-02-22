import { Box, Image } from "@chakra-ui/react";
import bannerImg from "../images/bannerImg.jpg";

const ShopBanner = () => {
  return (
    <Box w="100%" bg="green.200" borderRadius={10}>
      <Image src={bannerImg} w="100%" h="100%" borderRadius="10" />
    </Box>
  );
};

export default ShopBanner;
