import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});

app.use((req, res) => {
    res.status(404).send('Not found');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});