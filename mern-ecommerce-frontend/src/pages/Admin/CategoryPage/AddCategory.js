import { useEffect, useState } from "react";
import FormLayout from "../../../layouts/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getCategory,
  resetCategory,
  updateCategory,
} from "../../../features/category/categorySlice";
import Alertbox from "../../../components/Alertbox";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Stack } from "@chakra-ui/react";
import useMedia from "../../../hooks/useMedia";
import AppInput from "../../../components/AppInput";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sm } = useMedia();

  let { id } = useParams();

  const [values, setValues] = useState({
    name: "",
  });

  const { isError, message, isLoading, isEdit, category } = useSelector(
    (state) => state.categories
  );

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!id) {
      dispatch(addCategory({ values, navigate }));
    } else {
      dispatch(updateCategory({ id, values, navigate }));
    }
  };

  // useEffect
  useEffect(() => {
    if (id) {
      dispatch(getCategory(id));
    }
    // return () => dispatch(resetCategory());
  }, [dispatch, id]);

  useEffect(() => {
    if (id)
      setValues({
        name: category?.name || "",
      });
  }, [id, category?.name]);

  return (
    <FormLayout title={id ? "Edit Category" : "Add Category"}>
      <Box w={sm ? "100%" : "30rem"} borderRadius="md">
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* <FormControl>
              <FormLabel
                htmlFor="cat-name"
                color="gray.700 "
                fontWeight="bold"
                mb={4}
              >
                {" "}
                Category Name
              </FormLabel>
              <Input
                defaultValue={id ? category?.name : ""}
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter Category Name"
              />

              {errors?.name ? (
                <Box mt={4}>
                  <Alertbox
                    msg={
                      errors.name?.type === "required" &&
                      "Category name is required"
                    }
                    closeFunc={() =>
                      reset({
                        errors: "",
                      })
                    }
                  />
                </Box>
              ) : null}
            </FormControl> */}

            <AppInput
              name="name"
              label="Category Name"
              type="text"
              placeholder="Enter Category Name"
              onChange={handleChange}
              value={values.name}
            />

            {isError && <Alertbox msg={message} closeFunc={resetCategory} />}

            <Button
              w="100%"
              size="lg"
              bg="gray.800"
              color="gray.200"
              h="50px"
              _hover={{ bg: "gray.700", color: "white" }}
              fontSize=".9rem"
              type="submit"
              isLoading={isLoading ? true : false}
              loadingText="Saving"
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Box>
    </FormLayout>
  );
};

export default AddCategory;
