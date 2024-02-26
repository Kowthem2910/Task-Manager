const express = require('express');
const appRoute = require('./router/route.js');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(express.json());

app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Sever running on http://localhost: ${PORT}`);
})