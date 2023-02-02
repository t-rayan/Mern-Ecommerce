import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Textarea,
  Select,
  Image,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaUpload, FaMinus } from "react-icons/fa";

import { useEffect, useState, useRef } from "react";
import FormLayout from "../../../layouts/FormLayout";
import { useParams } from "react-router-dom";
import Alertbox from "../../../components/Alertbox";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  reset,
  updateProduct,
} from "../../../features/product/productSlice";
import { getAllCategories } from "../../../features/category/categorySlice";
import {
  RiCheckboxCircleLine,
  RiCloseLine,
  RiUpload2Line,
} from "react-icons/ri";
import AppButton from "../../../components/AppButton";
import useMedia from "../../../hooks/useMedia";

const EditProduct = () => {
  const multiFileRef = useRef();
  const { isMobile } = useMedia();

  const { isError, message, isLoading, isEdit, product } = useSelector(
    (state) => state.products
  );

  const [images, setImages] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    inventory: "",
    desc: "",
    price: "",
    size: "",
    color: "",
    category: "",
    thumbnail: "",
    images: [],
  });

  const dispatch = useDispatch();
  const { id } = useParams();

  const { categories } = useSelector((state) => state.categories);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData?.name);
    formData.append("inventory", productData?.inventory);
    formData.append("price", productData?.price);
    formData.append("size", productData?.size);
    formData.append("color", productData?.color);
    formData.append("desc", productData?.desc);
    formData.append("category", productData?.category);
    // formData.append("thumbnail", thumbnailFile);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(updateProduct({ id, formData }));
  };

  useEffect(() => {
    dispatch(getAllCategories());
    id && dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product?.name,
        inventory: product?.inventory,
        price: product?.price,
        desc: product?.desc,
        size: product?.size,
        color: product?.color,
        category: product?.category?._id,
        thumbnail: product?.thumbnail,
        images: product?.images,
      });
    }
    dispatch(getAllCategories);
  }, [product, dispatch]);

  return (
    <FormLayout title={"Edit Product"}>
      <Box borderRadius="md">
        <form onSubmit={onSubmit}>
          {/* main form */}
          <Box
            display="grid"
            gap="3rem"
            gridTemplateColumns={!isMobile ? "1fr .5fr" : "1fr"}
          >
            {/* left form controls */}

            <Stack spacing={8} shadow="lg" p={"1.5rem"} borderRadius="10px">
              <FormControl>
                <FormLabel htmlFor="cat-name"> Name</FormLabel>
                <Input
                  size="lg"
                  name="name"
                  defaultValue={productData?.name}
                  type="text"
                  borderColor="gray.300"
                  placeholder="Product Name"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="cat-name"> Desc</FormLabel>
                <Textarea
                  size="lg"
                  type="text"
                  name="desc"
                  defaultValue={productData?.desc}
                  borderColor="gray.300"
                  rows="8"
                  placeholder="Product Description.."
                />
              </FormControl>

              {/* multiple image upload */}
              <FormControl>
                <FormLabel htmlFor="cat-name"> Images</FormLabel>
                <Flex my={5} wrap="wrap">
                  {productData?.images?.map((img) => (
                    <Image w="3rem" key={img._id} src={img.img_url} />
                  ))}
                </Flex>
                <Box display="flex" flexDir="column">
                  <Input
                    // {...register("myimages")}
                    ref={multiFileRef}
                    type="file"
                    hidden="hidden"
                    multiple
                    onChange={(e) => setImages([...images, ...e.target.files])}
                  />
                  <Box
                    w="100%"
                    p={"5rem"}
                    borderStyle="dotted"
                    borderColor="gray.300"
                    borderWidth="2px"
                    borderRadius="5"
                    display="flex"
                    flexDir="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      variant="solid"
                      colorScheme="orange"
                      size="sm"
                      onClick={(e) => {
                        multiFileRef.current.click();
                      }}
                      cursor="pointer"
                      _focus={{ outline: "none" }}
                      display="flex"
                      placeItems="center"
                      fontSize=".8rem"
                      fontWeight="medium"
                    >
                      <Icon as={RiUpload2Line} w="4" h="4" marginRight={2} />
                      Upload
                    </Button>
                  </Box>
                </Box>
                <Box my="1rem">
                  {images.length > 0 ? (
                    images.map((im, index) => (
                      <Box
                        display="grid"
                        gridTemplateColumns=".06fr 1fr .1fr"
                        alignItems={"center"}
                        color="green.400"
                        my={3}
                        gap={3}
                        justifyContent="space-between"
                      >
                        <Icon as={RiCheckboxCircleLine} w="20px" h="20px" />
                        <Text key={im.name}>{im.name}</Text>
                        <Icon
                          color="red.400"
                          as={RiCloseLine}
                          cursor="pointer"
                          onClick={() => {
                            setImages([
                              ...images.filter((img, i) => i !== index),
                            ]);
                          }}
                        />
                      </Box>
                    ))
                  ) : (
                    <Text my={2} color="gray.400">
                      No files selected
                    </Text>
                  )}
                </Box>
              </FormControl>
            </Stack>

            {/* right form controls */}

            <Stack spacing={8}>
              <VStack shadow="lg" p="1.5rem" borderRadius="10px" spacing={10}>
                <FormControl>
                  <FormLabel htmlFor="cat-name"> Inventory</FormLabel>
                  <Input
                    // {...register("inventory")}
                    type="number"
                    name="inventory"
                    defaultValue={productData.inventory}
                    borderColor="gray.300"
                    placeholder="Product in stock"
                    size="lg"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="cat-name"> Price</FormLabel>
                  <Input
                    // {...register("price")}
                    type="number"
                    name="price"
                    defaultValue={productData?.price}
                    borderColor="gray.300"
                    placeholder="Product Price"
                    size="lg"
                  />
                </FormControl>
              </VStack>

              <VStack spacing={10} shadow="lg" p="1.5rem" borderRadius="10px">
                <HStack spacing={5}>
                  <FormControl>
                    <FormLabel htmlFor="cat-name"> Storage</FormLabel>
                    <Input
                      // {...register("size")}
                      type="text"
                      name="size"
                      defaultValue={productData?.size}
                      borderColor="gray.300"
                      placeholder="Storage"
                      size="lg"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="cat-name"> Color</FormLabel>
                    <Input
                      // {...register("color")}
                      type="text"
                      name="color"
                      defaultValue={productData?.color}
                      borderColor="gray.300"
                      placeholder="Color"
                      size="lg"
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel htmlFor="product-cat"> Category </FormLabel>
                  <Select
                    // {...register("category")}
                    name="category"
                    defaultValue={productData?.category}
                    borderColor="gray.300"
                    placeholder="Select category"
                    fontSize=".9rem"
                    size="lg"
                  >
                    {categories?.map((category) => (
                      <option key={category._id} defaultValue={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </VStack>

              {isError && <Alertbox msg={message} closeFunc={reset} />}

              <Button
                mt="1.5rem"
                w="100%"
                bg="gray.800"
                color="gray.100"
                height="55px"
                type="submit"
                fontSize=".9rem"
                _hover={{ bg: "gray.700" }}
                isLoading={
                  isLoading && isEdit ? false : isLoading ? true : false
                }
                loadingText="Saving"
              >
                Save Changes
              </Button>
            </Stack>
          </Box>
        </form>

        {/* multiple images uploading form */}
      </Box>
    </FormLayout>
  );
};

export default EditProduct;
