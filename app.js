require("./config/boot")
const { middleware }  = require("./config/middleware")

const { routes } = require("./app/routes.js")
const app = middleware(routes);
app.set('view engine', 'pug');

// server
const PORT = process.env.PORT || 3000
const BIND_IP = process.env.IP_ADDRESS || '0.0.0.0'
app.listen(PORT, BIND_IP, () => {
  console.log(`The app is running on ${PORT}.`)
});

