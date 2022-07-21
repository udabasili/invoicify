import express, { Application } from "express";
import routes from "@/api";
import { ErrorHandler, ErrorHandlerProps } from "@/api/middlewares/errorHandler";
import { isCelebrateError } from 'celebrate';
import cookieParse from 'cookie-parser';
import cors, { CorsRequest } from 'cors'

var whitelist = ['https://invoicify-app.netlify.app', 'https://6234c83505d4461696da523e--invoicify-app.netlify.app']
var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


export default (app: Application) => {
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(cors({
    origin: 'https://invoicify-app.netlify.app',
    credentials: true
  }))
  app.use(express.json())
  app.use(cookieParse())
  app.disable('x-powered-by')
  app.enable('trust proxy');
  app.get("/status", (req, res) => {
    res.status(200).end();
  })
  app.head("/status", (req, res) => {
    res.status(200).end();
  })
  app.use("/api", routes());

  const path = require('path')

  if (process.env.NODE_ENV === "production") {
    // Serve static files from the React frontend app
    app.use(express.static(__dirname));
    app.use(express.static(path.join(__dirname, '../public/build')))

    // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, '../public/build/index.html'))
    })

  }



  app.use((req, res, next) => {
    const error = new ErrorHandler('Not Found', 404)
    return next(error);
  })

  app.use((err: ErrorHandlerProps, req: any, res: any, next: any) => {
    if (isCelebrateError(err)) {

      const errorBody = err.details.get('body')?.message; // 'details' is a Map()
      err.message = errorBody || ''
    }
    res.status(err.status || 500);
    return res.json({
      message: err.message,

    })
  })
  return app;
};
