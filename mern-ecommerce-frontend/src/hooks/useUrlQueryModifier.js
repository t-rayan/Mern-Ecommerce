const useUrlQueryModifier = () => {
  const currentUrl = new URL(window.location.href);

  const queryParams = new URLSearchParams(currentUrl.search);

  return {
    queryParams,
  };
};
export default useUrlQueryModifier;
