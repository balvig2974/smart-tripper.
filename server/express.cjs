require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT||5000;

app.use(cors());
app.use(bodyParser.json());
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'project', 'dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'project', 'dist', 'index.html'));
// });

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI);
  }
};

// Define schemas and models
const pzemSchema = new mongoose.Schema({
  voltage: String,
  current: String,
  date: String,
  location: String,
  time: String,
  tripper: String,
  frequency: String,
  power: String,
});

const tripSchema = new mongoose.Schema({
  time: String,
  date: String,
  location: String,
  status: String,
  tripper: String,
});

const Trip = mongoose.model('Trip', tripSchema);
const PzemData = mongoose.model('PzemData', pzemSchema);


app.get('/response', (req, res) => {
  res.json({ message: "bala", show: false });
});
app.get('/tripdetails/data', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving trip details' });
  }
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../my-app/dist')));

// Handle all requests by returning the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/dist/index.html'));
});

app.post('/alert', async (req, res) => {
  const { location } = req.body;
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();
  const status="null";
   const entries = await PzemData.find({ tripper: location });
   const uniqueSockets = [...new Set(entries.map(entry => entry.location))];
  
const filteredData = await Promise.all(uniqueSockets.map(async (socket) => {
  const allEntries = await PzemData.find({ location: socket }).exec();
  return allEntries[allEntries.length - 1]; // Get the last entry
})); 
  let maxCurrent = -Infinity;
  let socketValue = null;
  console.log(filteredData);

  for (const entry of filteredData) {
    if (parseFloat(entry.current) > maxCurrent) {
      maxCurrent = parseFloat(entry.current);
      socketValue = entry.location;
    }
  }
  console.log(maxCurrent);
  const newTrip = new Trip({ time, date, location: socketValue, tripper: location, status });
  try {
    await newTrip.save();
    return res.status(201).json(newTrip);
  } catch (error) {
    console.error('Error saving trip details:', error);
    return res.status(500).json({ error: 'Error saving trip details' });
  }
});



app.post('/disp_pzem-data', async (req, res) => {
  const { socket, tripper } = req.body;
console.log(socket,tripper)
  try {
    // Fetch all entries for the specified socket and tripper
    const allData = await PzemData.find({ location: socket, tripper }).exec();

    // Get the last 10 entries, or all if there are fewer than 10
    const latestData = allData.slice(-10);
    const voltageArray = latestData.map(entry => ({
      time: entry.time, // Assuming entry has a time property
      voltage: parseFloat(entry.voltage)//////////s
    }));
    
    const currentArray = latestData.map(entry => ({
      time: entry.time, // Assuming entry has a time property
      current: parseFloat(entry.current)
    }));
    
    // Get the last voltage and current values
    const lastVoltage = voltageArray.length > 0 ? voltageArray[voltageArray.length - 1].voltage : null;
    const lastCurrent = currentArray.length > 0 ? currentArray[currentArray.length - 1].current : null;
    
    // Combine them into a dictionary
    const combinedData = {
      voltages: voltageArray,
      currents: currentArray,
      current: lastCurrent,
      voltage: lastVoltage
    };
    
    console.log(combinedData);
    // Respond with the combined data
    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/pzem-data', async (req, res) => {
  const { voltage, current, power, location, tripper, frequency } = req.body;
  console.log(req.body);
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  const pzemData = new PzemData({ time, date, voltage, current, power, location, tripper, frequency });
  
  try {
    const result = await pzemData.save();
    res.status(201).json(result);
  } catch (error) {
    console.error('Error storing Pzem data:', error);
    res.status(500).send('Error storing data');
  }
});


app.post('/update-status', async (req, res) => {
  const { val, tripkey } = req.body; 
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: tripkey },
      { status: val },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/dates', async (req, res) => {
  const { date, location } = req.body;

  try {
    const data = await PzemData.find({ date, location });
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No data found for this date and location' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching trips by date:', error);
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT,'0.0.0.0',() => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

startServer();
