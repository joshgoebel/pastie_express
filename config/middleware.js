const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressStaticGzip = require("express-static-gzip");
const addRequestId = require('express-request-id')({setHeader: false})
const morgan = require('morgan')

morgan.token('id', (req) => req.id.split('-')[0])

function buildStack(routes) {
  const middleware = express();

  middleware.use(addRequestId)

  // middleware
  if (process.env.NODE_ENV === 'production') {
    middleware.use(expressStaticGzip('public', {index: false, enableBrotli: true}));
  } else {
    middleware.use(express.static('public'));
  }

  // logging
  middleware.use(morgan(
    "[:date[iso] #:id] Started :method :url for :remote-addr",
    {immediate: true}))
  middleware.use(morgan("[:date[iso] #:id] Completed :status :res[content-length] in :response-time ms"))

  middleware.use(bodyParser.urlencoded({extended: false}));
  middleware.use(cookieParser());
  const shouldCompress = (req, res) => { return req.path.slice(0,3) === '/p/' }
  middleware.use(compression({ filter: shouldCompress }))

  middleware.use(routes)


  // errors
  middleware.use(function (err, _req, res, next) {
    if (res.headersSent) {
      return next(err)
    }

    console.error(err.stack)
    res
      .status(500)
      .render("500")
  })

  // not found
  middleware.use((_req,resp) => {
    resp.status(404)
    resp.render("404")
  })

  return middleware
}


module.exports =  { middleware: buildStack }