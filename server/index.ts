const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.get('/api/users', cors(), (req, res) => {
    res.send(
        require('./data.json')
    )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
