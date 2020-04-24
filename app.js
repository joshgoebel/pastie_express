require("./config/boot")
const { middleware }  = require("./config/middleware")

const { routes } = require("./app/routes.js")
const app = middleware(routes);
app.set('view engine', 'pug');

// server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`The app is running on ${PORT}.`)
});

