const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appoinmentsRouter = require('./routes/appointments')
const app = express();
const PORT = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();
// const uri = "process.env.MONGOKEY";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function connectToDatabase() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Ping the database to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to MongoDB Atlas!");

//     // Now that we're connected, you can set up your routes
//     app.use('/patients', patientsRouter);
//     app.use('/doctors', doctorsRouter);
//     app.use('/appointments', appointmentsRouter);

//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });

//   } catch (err) {
//     console.error('Failed to connect to MongoDB Atlas:', err);
//   }
// }

// connectToDatabase();

// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);



mongoose.connect(process.env.MONGOKEY,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appoinmentsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});