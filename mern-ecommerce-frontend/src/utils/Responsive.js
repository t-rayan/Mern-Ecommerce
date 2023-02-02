export const widthAdjuster = (currentDevice, isSidebar) => {
  if (currentDevice === "large" && isSidebar) {
    return {
      navbar: "calc(100vw - 16rem)",
      sidebar: "16rem",
    };
  } else if (currentDevice === "large" && !isSidebar) {
    return {
      navbar: "100%",
      sidebar: "16rem",
    };
  } else if (currentDevice === "tablet" || currentDevice === "mobile") {
    return {
      navbar: "100%",
      sidebar: "16rem",
    };
  }
};
