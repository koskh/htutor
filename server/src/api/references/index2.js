// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();


router.get('/', (req: express$Request, res: express$Response) => {
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    setTimeout(() => {
        res.end();
    }, 3000);
});

router.get('/:id', (req: express$Request, res: express$Response) => {
    setTimeout(() => {
        res.json({ test4: ['test41', 'test42', 'test43'], test5: ['test51', 'test52', 'test53'], test6: ['test61', 'test62', 'test63'] });
    }, 3000);
});

router.post('/:id', (req: express$Request, res: express$Response) => {
    setTimeout(() => {
        res.json({ test4: ['test41', 'test42', 'test43'], test5: ['test51', 'test52', 'test53'], test6: ['test61', 'test62', 'test63'] });
    }, 3000);
});


module.exports = router;
