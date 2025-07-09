module.exports = (objectPagination, query, count) => {
  
  if (!parseInt(query.page)) {
    query.page = objectPagination["currentPage"];
  }
  objectPagination["currentPage"] = parseInt(query.page);

  if (parseInt(query.page) > 0) {
    objectPagination["skip"] =
      (objectPagination["currentPage"] - 1) * objectPagination.limitItem;
  }

  objectPagination["numberPage"] = Math.ceil(
    count / objectPagination.limitItem
  );

  return objectPagination;
};
