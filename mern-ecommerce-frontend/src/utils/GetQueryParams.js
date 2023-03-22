export const GetQueryParams = () => {
  const currentUrl = new URL(window.location.href);

  const queryParams = new URLSearchParams(currentUrl.search);

  return queryParams;
};
