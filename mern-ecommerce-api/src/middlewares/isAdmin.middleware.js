export const checkisAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ errMsg: "Access Denied" });
  }
};
