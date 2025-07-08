module.exports = (status) => {
  const listButtonStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
    },
  ];

  if (status) {
    const index = listButtonStatus.findIndex((item) => item.status == status);
    listButtonStatus[index]["class"] = "active";
  } else {
    listButtonStatus[0]["class"] = "active";
  }

  return listButtonStatus;
};
