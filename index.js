import express from "express";

// use the SQL methods in the API routes below
import {joinQueue,taxiDepart,joinTaxiQueue,leaveQueue,queueLength,taxiQueueLength} from './taxi.sql.js';

const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());

const PORT = process.env.PORT || 4015;


// return the number of people in the queue
app.get('/api/passenger/queue', (req, res) => {
    //  return test the API call
    res.json({
        queueCount : 7
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', (req, res) => {
    res.json({
        queueCount : 1
    })
});
////////////////////////////////////////////////*css*/`
    // Passenger joins the queue
app.post('/api/passenger/join', async (req, res) => {
    try {
        await joinQueue();
        const queueCount = await queueLength();
        
        res.json({
            message: 'Passenger joined the queue',
            queueCount: queueCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while joining the queue' });
    }
});
// Passenger leaves the queue
app.post('/api/passenger/leave', async (req, res) => {
    try {
        await leaveQueue();
        const queueCount = await queueLength();
    
        res.json({
            message: 'Passenger left the queue',
            queueCount: queueCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while leaving the queue' });
    }
});

// Taxi joins the queue
app.post('/api/taxi/join', async (req, res) => {
    try {
        await joinTaxiQueue();
        const taxiQueueCount = await taxiQueueLength();
    
        res.json({
            message: 'Taxi joined the queue',
            taxiQueueCount: taxiQueueCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while a taxi joined the queue' });
    }
});
// Taxi departs from the queue
app.post('/api/taxi/depart', async (req, res) => {
    try {
        const taxiCount = await taxiQueueLength();
        const passengerCount = await queueLength();

        if (taxiCount > 0 && passengerCount >= 12) {
            await taxiDepart();
            
            res.json({
                message: 'Taxi departed from the queue'
            });
        } else {
            res.json({
                message: 'Taxi cannot depart, not enough passengers'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while handling taxi departure' });
    }
});
// Return the number of people in the passenger queue
app.get('/api/passenger/queue', async (req, res) => {
    try {
        const queueCount = await queueLength();

        res.json({
            queueCount: queueCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching passenger queue length' });
    }
});

// Return the number of taxis in the taxi queue
app.get('/api/taxi/queue', async (req, res) => {
    try {
        const taxiQueueCount = await taxiQueueLength();

        res.json({
            taxiQueueCount: taxiQueueCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching taxi queue length' });
    }
});
app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))