
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';


import { FingerprintJsServerApiClient, Region } from '@fingerprintjs/fingerprintjs-pro-server-api';

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(__dirname, { extensions: ['html', 'htm']}));

  const client = new FingerprintJsServerApiClient({
    region: Region.EU,
    apiKey: "lwN7mXK3Nadb1HPDgNQk",
    fetch: fetch.bind(globalThis),
  });
  

  app.listen(3000, ()=>{
    console.log("Server running on port 3000");
  })

  app.use(express.static(__dirname))

  app.get("/", (req, res)=>{
    client.getVisitorHistory("<visitorId>")
    .then(visitorHistory => {
      console.log(visitorHistory);
    })
    .catch(error => {
      if (error.status === 403) {
        console.log(error.error);
      } else if (error.status === 429) {
        retryLater(error.retryAfter); // this function needs to be implemented on your side 
      }
    });
    res.sendFile(__dirname + "/index.html");
  })