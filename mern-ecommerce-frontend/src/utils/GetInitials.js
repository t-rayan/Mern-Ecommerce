const GetInitials = (name) => {
  if (name) {
    const fullname = name.split("");
    const initials = fullname.shift().charAt(0) + fullname.pop().charAt(0);
    return initials.toUpperCase();
  }
  return null;
};
export default GetInitials;
