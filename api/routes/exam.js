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

// Retrieve exam based on _id (row ID)
async function getRowData(req, res, next) {
  try {
    var id = new ObjectId(req.params.id);
    await client.connect();
    //await client.db("admin").command({ ping: 1 });
    const examsDB = client.db("Patient");
    const examColl = examsDB.collection("covidExams");
    const query = { _id: id };
    const row = await examColl.findOne(query);
    //res.send('API is working properly & connected to db!');
    res.status(200).json(row);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// Select exam based on exam ID
async function selectExam(req, res, next) {
  try {
    await client.connect();
    //await client.db("admin").command({ ping: 1 });
    const examsDB = client.db("Patient");
    const examColl = examsDB.collection("covidExams");
    const query = { examID: req.params.examID };
    const cursor = examColl.find(query);
    const allPatientExams = await cursor.toArray();
    //res.send('API is working properly & connected to db!');
    res.status(200).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getAllExams(req, res, next) {
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

/* GET all exams on home page. */
router.get("/exams", function (req, res, next) {
  getAllExams(req, res, next);
});

/* GET a specific exam based on exam ID. */
router.get("/exam/:exam", function (req, res, next) {
  selectExam(req, res, next);
});

/* GET specific exam row based on _id. */
router.get("/get/:id", function (req, res, next) {
  getRowData(req, res, next);
});

module.exports = router;
