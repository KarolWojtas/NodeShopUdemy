
const fs = require('fs');

const requestHandler = (req, res) => {

    const routing = {
        '/': (req, res) => {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html><body>');
            res.write('<form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Submit</button></form>');
            res.write('</body><html>');
            return res.end();
        },
        '/message': (req, res) => {
            const body = [];
            req.on('data', (chunk) => {
                console.log(chunk)
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString('utf-8');
                const message = parsedBody.split('=')[1];
                return new Promise((resolve, reject) => {
                    resolve(message);
                }).then((message) => {
                    fs.writeFile('message.txt', message, (err) => {
                        res.statusCode = 302;
                        res.setHeader('Location', '/');
                        return res.end();
                    });
                })

            });
        }
    }
    if (req.url in routing) {
        return routing[req.url](req, res);
    } else {
        return res.end();
    }
}
module.exports = requestHandler;