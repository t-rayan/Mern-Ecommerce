import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Img,
} from "@chakra-ui/react";
import bannerImg from "../images/bannerImg.jpg";
import iph14Img from "../images/iphone14pro.png";
import watchUltraImg from "../images/applewatchultra.png";
import earpodImg from "../images/earpods.png";
import galaxyFoldImg from "../images/galaxyfold.png";
import airPodImg from "../images/airpod.png";
import useMedia from "../hooks/useMedia";

const ShopBanner = () => {
  const { sm, md, lg, xl, xxl } = useMedia();

  const getResponsiveBannerLayout = () => {
    if (sm) {
      return {
        tempCol: "1fr",
        tempRow: "repeat(4,1fr)",
        height: "50rem",
      };
    } else if (md || lg) {
      return {
        tempCol: "repeat(4,1fr)",
        tempRow: "repeat(2,1fr)",
        height: "28rem",
      };
    } else {
      return {
        tempCol: "repeat(6,1fr)",
        tempRow: "repeat(2,1fr)",
        height: "28rem",
      };
    }
  };
  const getResponsiveGridItemLayout = () => {
    if (sm) {
      return {
        gItemsHeight: "10rem",
      };
    } else if (md || lg) {
      return {
        gItemsHeight: "13rem",
      };
    } else {
      return {
        gItemsHeight: "28rem",
      };
    }
  };

  return (
    <Grid
      h={getResponsiveBannerLayout().height}
      templateColumns={getResponsiveBannerLayout().tempCol}
      templateRows={getResponsiveBannerLayout().tempRow}
      gap={"1rem"}
    >
      <GridItem
        // display="flex"
        maxH={getResponsiveGridItemLayout().gItemsHeight}
        alignContent={"center"}
        colSpan={{ xl: 2, lg: "2", md: "2", base: "1" }}
        rowSpan={{ xl: 2, lg: "1", md: "1", base: "1" }}
        bg="gray.300"
        rounded={"2xl"}
        pos="relative"
        p={{ lg: "5", base: "5" }}
        justifyContent={{ lg: "space-between" }}
        alignItems={"center"}
        display={"flex"}
      >
        {" "}
        <Box
          pos={{ xl: "absolute", sm: "static" }}
          top={{ xl: "53%" }}
          left={{ xl: "8%" }}
          flex="2"
        >
          <Heading fontSize="1.5rem" color="white">
            Latest
          </Heading>
          <Heading
            fontSize={{
              xl: "2.6rem",
              lg: "2.3rem",
              md: "1.8rem",
              base: "1.6rem",
            }}
            color="white"
          >
            Iphone 14 pro
          </Heading>
          <Button
            shadow={"lg"}
            size="md"
            mt={{ xl: 6, lg: 5, md: "5", base: "5" }}
          >
            Shop Now
          </Button>
        </Box>
        <Image
          flex="1"
          src={iph14Img}
          width="100%"
          objectFit="contain"
          h={sm ? "12rem" : "100%"}
          alt="iphone"
        />
      </GridItem>
      <GridItem
        maxH={getResponsiveGridItemLayout().gItemsHeight}
        // width={"100%"}
        display={"flex"}
        flexDir={{ xl: "column", lg: "row", base: "row" }}
        p={5}
        alignItems="center"
        justifyContent={"center"}
        colSpan={{ xl: 2, lg: "2", md: "2", sm: "1" }}
        rowSpan={{ xl: 2, lg: "1", md: "1", sm: "1" }}
        bg="orange.100"
        rounded={"2xl"}
        gap={sm && "3"}
      >
        <Box flex="1.5">
          <Img
            src={galaxyFoldImg}
            h="100%"
            width="100%"
            objectFit={"contain"}
          />
        </Box>

        <Box flex="1.5" display={"flex"} flexDir="column">
          <Heading fontSize={sm ? "1.1rem" : "1.4rem"}>
            Samsung Galaxy Fold 4
          </Heading>
          <Button rounded="full" colorScheme="black" variant="outline" mt={5}>
            Shop now
          </Button>
        </Box>
      </GridItem>
      <GridItem
        display={"grid"}
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="1fr"
        alignContent="center"
        px={4}
        colSpan={{ xl: 2, lg: "2", md: "2", sm: "1" }}
        rowSpan={{ xl: 1, lg: "2", md: "2", sm: "1" }}
        bg="gray.100"
        rounded={"2xl"}
        maxH={sm ? "10rem" : "13rem"}
        pos={"relative"}
        alignItems="center"
        p={8}
        justifyContent="space-between"
      >
        {" "}
        <Box>
          <Heading fontSize={sm ? "1.1rem" : "1.4rem"}>
            Apple Watch Ultra Series
          </Heading>
          <Button shadow="lg" mt={4} colorScheme={"purple"}>
            Learn More
          </Button>
        </Box>
        <Img
          src={watchUltraImg}
          width="100%"
          objectFit="contain"
          h={sm ? "auto" : "100%"}
        />
      </GridItem>
      <GridItem
        display="flex"
        p={6}
        colSpan={{ xl: 2, lg: "2", md: "2", sm: "1" }}
        rowSpan={{ xl: 1, lg: "2", md: "2", sm: "1" }}
        bg="blackAlpha.900"
        rounded={"2xl"}
        maxH={sm ? "10rem" : "13rem"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        {" "}
        <Img src={airPodImg} width="100%" objectFit="contain" h="100%" />
        <Box>
          <Heading fontSize={sm ? " 1.1rem " : "1.4rem"} color="gray.200">
            Apple Airpods Headset Wireless Bluetooth
          </Heading>
          <Button shadow="lg" size="sm" mt={5}>
            Buy now
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ShopBanner;
