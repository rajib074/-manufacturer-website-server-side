const express = require("express");
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yxgqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    await client.connect();
    const productCollection = client.db("data").collection("product");



    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    app.get("/product", async (req, res) => {
      const email = req.query.email;
      const query = {email: email};
      const cursor = await productCollection.find(query).toArray();
      res.send(cursor);
    });




  })
  } finally {
  }
}


run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello all DJ!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
