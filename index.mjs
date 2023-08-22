import express from 'express';
import fetch from 'node-fetch';
import path from  'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';


import {
    FingerprintJsServerApiClient,
    Region,
  } from '@fingerprintjs/fingerprintjs-pro-server-api'

  const app = express()
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config();

  app.use(cors())
  app.use(express.static(path.join(__dirname, 'public'))); // To Share CSS, Images file
  app.use(bodyParser.json()); // Bodyparser to grab the values from the form along with the visitor ID
  app.use(bodyParser.urlencoded({ extended: true }))

  const API_Key = process.env.FINGERPRINT_PRIVATE_KEY

  const client = new FingerprintJsServerApiClient({
    apiKey: API_Key,
    region: Region.EU,
  })

  
  app.listen(3000, (req, res)=> {
    console.log("Server running on PORT 3000 \n");
  })

  // GET method
  app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/index.html"))
  })

  // POST method
  app.post("/",(req, res)=>{

    console.log(req.body.visitorID);
    var visitorID = req.body.visitorID;

    // Get visit history of a specific visitor
    client.getVisitorHistory(visitorID).then((visitorHistory) => {
      console.log(visitorHistory)
    })

  })

