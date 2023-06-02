
//reference code from UDEMY course - Ecommerece application starter code to get express app up and running on Heroku

import express from 'express'
import path from 'path'
import cors from 'cors'


const app = express()
app.use(cors())

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(new URL("./frontend/build", import.meta.url).pathname)));
   app.get("*", (req, res) =>
     res.sendFile(
       path.resolve(
         new URL("./frontend/build/index.html", import.meta.url).pathname
       )
     )
   );
 } else {
   app.get("/", (req, res) => {
     res.json({ message: "API running..." });
   });
 }


//allows front and back end to communicate with cross origin resource sharing between diff domains
// app.use(cors())

 // parses incoming JSON requests and puts the parsed data in req.
app.use(express.json()) 


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));