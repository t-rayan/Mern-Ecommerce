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
  Text,
  Icon,
  VStack,
  Flex,
  Image,
} from "@chakra-ui/react";
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
import { addProduct } from "../../../features/product/productSlice";
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

const AddProduct = () => {
  // custom hooks
  const { isMobile } = useMedia();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const multiFileRef = useRef();
  const { id } = useParams();

  // defining states
  const [values, setValues] = useState({
    name: "",
    brand: "",
    inventory: "",
    price: "",
    color: "",
    size: "",
    category: "",
    desc: "",
    imgs: [],
  });

  const [images, setImages] = useState([]);

  // importing states from store
  const { isError, message, isLoading, isEdit, product, isDel } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector((state) => state.categories);

  // creating product data
  const productData = () => {
    const formData = new FormData();
    for (let property in values) {
      formData.append(property, values[property]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("imgs", images[i]);
    }
    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = productData();

    if (!id) {
      dispatch(addProduct({ formData, navigate }));
    } else {
      dispatch(updateProduct({ id, formData, navigate }));
    }
  };

  // handling input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // getting categories and product
  useEffect(() => {
    dispatch(getAllCategories());
    id && dispatch(getProduct(id));
  }, [dispatch, id]);

  // getting default values for inputs
  useEffect(() => {
    if (id && product) {
      setValues({
        name: product?.name || "",
        brand: product?.brand || "",
        price: product?.price || "",
        inventory: product?.inventory || "",
        desc: product?.desc || "",
        size: product?.size || "",
        category: product?.category?._id || "",
        color: product?.color || "",
        imgs: product?.images || [],
      });
    }
  }, [id, product]);

  if (isLoading) {
    return <LoadingState title="Deleting...." />;
  }

  return (
    <FormLayout title={!id ? "Add Product" : "Edit Product"}>
      <Box borderRadius="md">
        <form onSubmit={handleSubmit}>
          {/* main form */}
          <Box
            display="grid"
            gap="3rem"
            gridTemplateColumns={!isMobile ? "1fr .5fr" : "1fr"}
          >
            {/* left form controls */}
            <Stack spacing={8} shadow="lg" p={"1.5rem"} borderRadius="10px">
              <AppInput
                name="name"
                label="Product Name"
                type="text"
                placeholder="Enter Product Name"
                onChange={handleChange}
                value={values?.name}
              />

              <FormControl>
                <FormLabel htmlFor="cat-name"> Desc</FormLabel>
                <Textarea
                  size="lg"
                  name="desc"
                  type="text"
                  borderColor="gray.300"
                  rows="8"
                  placeholder="Product Description.."
                  onChange={handleChange}
                  value={values?.desc}
                />
              </FormControl>

              {/* multiple image upload */}
              <FormControl>
                <FormLabel htmlFor="product-images"> Images</FormLabel>

                <Flex my={5} gap={5} wrap="wrap">
                  {values?.imgs?.map((img) => (
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

            {/* right form controls */}

            <Stack spacing={8}>
              <VStack shadow="lg" p="1.5rem" borderRadius="10px" spacing={10}>
                <AppInput
                  name="inventory"
                  label="Inventory"
                  type="text"
                  placeholder="Product inventory"
                  onChange={handleChange}
                  value={values?.inventory}
                />

                <AppInput
                  name="price"
                  label="Price"
                  type="number"
                  placeholder="Price"
                  onChange={handleChange}
                  value={values?.price}
                />
                <AppInput
                  name="brand"
                  label="Brand Name"
                  type="text"
                  placeholder="Enter product brand"
                  onChange={handleChange}
                  value={values?.brand}
                />
              </VStack>

              <VStack spacing={10} shadow="lg" p="1.5rem" borderRadius="10px">
                <HStack spacing={5}>
                  <AppInput
                    name="size"
                    label="Storage"
                    type="text"
                    placeholder="Storage"
                    onChange={handleChange}
                    value={values?.size}
                  />

                  <AppInput
                    name="color"
                    label="Color"
                    type="text"
                    placeholder="Product color"
                    onChange={handleChange}
                    value={values?.color}
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
                    value={values?.category}
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
                isLoading={
                  isLoading && isEdit ? false : isLoading ? true : false
                }
                loadingText="Saving"
              >
                {!id ? "Save Changes" : "Update "}
              </Button>
            </Stack>
          </Box>
        </form>

        {/* multiple images uploading form */}
      </Box>
    </FormLayout>
  );
};

export default AddProduct;
