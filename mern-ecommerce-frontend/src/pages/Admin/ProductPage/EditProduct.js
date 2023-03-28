import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Select,
  Text,
  Icon,
  VStack,
  Flex,
  Image,
} from "@chakra-ui/react";
import JoditEditor from "jodit-react";

import "react-quill/dist/quill.snow.css";
import { MdHighlightOff } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import FormLayout from "../../../layouts/FormLayout";
import Alertbox from "../../../components/Alertbox";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  removeAndUpdateProductImage,
  reset,
  updateProduct,
} from "../../../features/product/productSlice";
import { getAllCategories } from "../../../features/category/categorySlice";
import {
  RiCheckboxCircleLine,
  RiCloseLine,
  RiUpload2Line,
} from "react-icons/ri";
import useMedia from "../../../hooks/useMedia";
import AppInput from "../../../components/AppInput";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../../../components/LoadingState";
import { getAllBrands } from "../../../features/brand/brandSlice";
import BrandSelector from "../../../components/BrandSelector";

const EditProduct = () => {
  // custom hooks
  const { sm, md } = useMedia();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const multiFileRef = useRef();
  const { id } = useParams();
  const joEditor = useRef(null);

  // getting current product to edit
  const [currentProduct, setCurrentProduct] = useState(null);

  const [images, setImages] = useState([]);

  // importing states from store
  const { isError, message, isLoading, isEdit, product } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector((state) => state.categories);

  // handling input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  // creating product data
  const productData = () => {
    const formData = new FormData();
    for (let property in currentProduct) {
      formData.append(property, currentProduct[property]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("newImgs", images[i]);
    }
    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = productData();

    dispatch(updateProduct({ id, formData, navigate }));
  };

  // getting categories and product
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // getting default values for inputs
  useEffect(() => {
    if (id && product) {
      let data = {
        ...product,
        brand: product?.brand?._id,
        category: product?.category?._id,
      };
      setCurrentProduct(data);
    }
  }, [id, product]);

  // if (isLoading) {
  //   return <LoadingState title="Please Wait...." />;
  // }

  return (
    <FormLayout title="Edit Product">
      <form onSubmit={handleSubmit}>
        {/* main form */}
        <Box
          display="grid"
          gap="3rem"
          gridTemplateColumns={sm || md ? "1fr" : "1fr .5fr"}
        >
          {/* left form controls */}
          <Stack spacing={8}>
            <Stack bg="white" spacing={8} shadow="sm" p={"1.5rem"} rounded="md">
              <AppInput
                name="name"
                label="Product Name"
                type="text"
                placeholder="Enter Product Name"
                onChange={handleChange}
                value={currentProduct?.name}
              />

              <FormControl>
                <FormLabel htmlFor="cat-name"> Desc</FormLabel>
                <JoditEditor
                  ref={joEditor}
                  value={currentProduct?.desc}
                  // config={config}
                  tabIndex={1} // tabIndex of textarea
                  // onBlur={newContent => setProductDesc(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {
                    setCurrentProduct({ ...currentProduct, desc: newContent });
                  }}
                />
              </FormControl>
            </Stack>

            <Stack bg="white" spacing={8} shadow="sm" p={"1.5rem"} rounded="md">
              {/* multiple image upload */}
              <FormControl>
                <FormLabel htmlFor="product-images"> Images</FormLabel>

                <Flex my={5} gap={5} wrap="wrap">
                  {currentProduct?.images?.map((img) => (
                    <Box
                      key={img._id}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="4px"
                      p="2"
                      pos="relative"
                    >
                      <Box pos="absolute" top={0} right={1}>
                        <Icon
                          color="gray.500"
                          as={MdHighlightOff}
                          w="1.1rem"
                          h="1.1rem"
                          _hover={{ color: "red.400" }}
                          cursor="pointer"
                          onClick={() =>
                            dispatch(
                              removeAndUpdateProductImage({
                                productId: id,
                                imageId: img.pub_id,
                              })
                            )
                          }
                        />
                      </Box>
                      <Image w="3rem" h="3rem" src={img.img_url} />
                    </Box>
                  ))}
                </Flex>
                <Box display="flex" flexDir="column">
                  <Input
                    ref={multiFileRef}
                    type="file"
                    hidden="hidden"
                    multiple
                    onChange={(e) => setImages([...images, ...e.target.files])}
                  />
                  <Box
                    w="100%"
                    p={10}
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
                      display="flex"
                      placeItems="center"
                      fontSize=".8rem"
                      _focus={{ outline: "none" }}
                      fontWeight="medium"
                    >
                      <Icon as={RiUpload2Line} w="4" h="4" marginRight={2} />
                      Browse
                    </Button>
                  </Box>
                </Box>

                {/* images list */}
                <Box mt={5}>
                  {images.length > 0 ? (
                    images.map((im, index) => (
                      <Box
                        key={index}
                        display="grid"
                        gridTemplateColumns=".06fr 1fr .1fr"
                        alignItems={"center"}
                        color="gray.700"
                        my={2}
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
          </Stack>

          {/* right form controls */}

          <Stack spacing={8}>
            <VStack
              bg="white"
              spacing={8}
              shadow="sm"
              p={"1.5rem"}
              rounded="md"
            >
              <AppInput
                name="inventory"
                label="Inventory"
                type="text"
                placeholder="Product inventory"
                onChange={handleChange}
                value={currentProduct?.inventory}
              />

              <AppInput
                name="price"
                label="Price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                value={currentProduct?.price}
              />

              {/* select brand */}
              <BrandSelector
                handleChange={handleChange}
                value={currentProduct?.brand}
              />
            </VStack>

            <VStack
              bg="white"
              spacing={8}
              shadow="sm"
              p={"1.5rem"}
              rounded="md"
            >
              <HStack spacing={5}>
                <AppInput
                  name="size"
                  label="Storage"
                  type="text"
                  placeholder="Storage"
                  onChange={handleChange}
                  value={currentProduct?.size}
                />

                <AppInput
                  name="color"
                  label="Color"
                  type="text"
                  placeholder="Product color"
                  onChange={handleChange}
                  value={currentProduct?.color}
                />
              </HStack>

              <FormControl>
                <FormLabel htmlFor="product-cat"> Category </FormLabel>
                <Select
                  name="category"
                  borderColor="gray.300"
                  placeholder="Select category"
                  fontSize=".9rem"
                  size="lg"
                  onChange={handleChange}
                  value={currentProduct?.category}
                >
                  {categories?.map((category) => (
                    <option value={category?._id} key={category?._id}>
                      {category?.name}
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
              isLoading={isLoading && isEdit ? false : isLoading ? true : false}
              loadingText="Saving"
            >
              Update Product
            </Button>
          </Stack>
        </Box>
      </form>
    </FormLayout>
  );
};

export default EditProduct;
