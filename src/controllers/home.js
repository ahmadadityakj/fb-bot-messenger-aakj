let showHome = (req, res) => {
  return res.render("home.ejs");
};

module.exports = {
  showHome: showHome
};