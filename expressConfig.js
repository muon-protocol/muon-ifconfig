import express from 'express'
import ipaddr from 'ipaddr.js'
import * as dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = process.env.PORT;

app.listen({
    port,
    host: '0.0.0.0',
}, () => {
    console.log(`ifconfig app listening on port ${port}`)
});

app.get('/', async (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress.split(":").slice(-1).pop();
    if (ip.includes(','))
        ip = ip.substring(0, ip.indexOf(','));

    ip = ipaddr.process(ip).toString();
    res.send({success: true, ip_addr: ip});
});