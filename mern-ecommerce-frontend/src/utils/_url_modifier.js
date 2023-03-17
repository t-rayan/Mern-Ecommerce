const UrlModifier = (query) => {
  const { name, value } = query;

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const isExist = params.has(name);
  isExist ? params.set(name, value) : params.append(name, value);

  window.history.replaceState({}, "", `${url.pathname}?${params}`);
};
export default UrlModifier;
