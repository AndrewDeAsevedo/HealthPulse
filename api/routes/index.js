var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectId;

const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DATABASE_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getAllExams(res) {
  try {
    await client.connect();
    const examsDB = client.db("Patient");
    const examColl = examsDB.collection("covidExams");
    const cursor = examColl.find({});
    const allExams = await cursor.toArray();
    res.status(200).json(allExams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/* GET home page. */
//router.get('/', function(req, res, next) {
//  getAllExams(res)
//});

module.exports = router;
