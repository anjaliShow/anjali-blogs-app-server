exports.searchQuery = async (Model, searchParams, options) => {
  const orCluses = [];
  let result;
  console.log("orCluses", orCluses);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      orCluses.push({ [key]: { $regex: new RegExp(value, "i") } });
    }
  });

  const searchQuery = { $or: orCluses };

  result = await Model.find(searchQuery, null, options);

  return result;
};
