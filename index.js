const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Wellcome to the API'
    });
});

app.post('/api/posts', (req, res) => {
    jwt.verify(req.token, 'secretKey', { expiresIn: '30s' }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
    res.json({
        message: 'Post created'
    });
});

app.post('/api/login', (req, res) => {
    //Dummy
    const user = {
        id: 1,
        name: 'Emeka',
        email: 'iamemekandulue@gmail.com'
    }

    jwt.sign(user, 'secretKey', (err, token) => {
        res.json({
            token
        });
    });
});

function verifyToken(req, res, next) {
    const bearer = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    }
}

app.listen(5000, () => console.log('Server started'));