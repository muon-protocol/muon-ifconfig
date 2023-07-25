import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`ifconfig app listening on port ${port}`)
});

app.get('/', async (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip.includes(','))
        ip = ip.substring(0, ip.indexOf(','));
    res.send({success: true, ip_addr: ip});
});


