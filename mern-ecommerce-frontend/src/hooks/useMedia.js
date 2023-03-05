import { useMediaQuery } from "@chakra-ui/react";

const useMedia = () => {
  const [sm, md, lg, xl, xxl] = useMediaQuery([
    "(min-width: 300px) and (max-width: 767px)",
    "(min-width: 768px) and (max-width: 991px)",
    "(min-width: 992px) and (max-width: 1279px)",
    "(min-width: 1280px) and (max-width: 1535px)",
    "min-width: 1536px",
  ]);
  return {
    sm,
    md,
    lg,
    xl,
    xxl,
  };
};

export default useMedia;
// sm: '30em',
//   md: '48em',
//   lg: '62em',
//   xl: '80em',
//   '2xl': '96em',
