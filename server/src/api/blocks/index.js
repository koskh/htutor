// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

const { getBlocks, getBlock} = require('../../services/blocks');

router.get('/', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};

    respond.data = getBlocks();
    res.json(respond);
});


router.get('/:blockId?', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};
    const blockId = Number.parseInt(req.params.blockId, 10);

    if (Number.isNaN(blockId)) {
        res.status(400);
        respond.error = 'Неверные входные данные';
        res.json(respond);
        return;
    }

    respond.data = getBlock(blockId);
    res.json(respond);
});


module.exports = router;
