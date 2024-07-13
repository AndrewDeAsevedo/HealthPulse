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

// Select a specific patient based on patient ID
async function selectPatient(req, res, next) {
  try {
    // = new ObjectId(req.params.id);
    await client.connect();
    const examsDB = client.db("Patient");
    const examColl = examsDB.collection("covidExams");
    const query = { patientID: req.params.patientID };
    const cursor = examColl.find(query);
    const allPatientExams = await cursor.toArray();
    //const exam = await examColl.find(allPatientExams)
    res.status(200).json(allPatientExams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

router.get("/:patientID", function (req, res, next) {
  selectPatient(req, res, next);
});

module.exports = router;
