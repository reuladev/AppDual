const { Router } = require('express');
const router = Router();

const IdiomsService = require('../services/idiomsService');

router.get('/getAllIdioms', IdiomsService.getAllIdioms);

router.post('/addIdioms', IdiomsService.addIdioms);

router.post('/deleteIdioms', IdiomsService.deleteIdioms);

router.post('/updateIdioms', IdiomsService.updateIdioms);


module.exports = router;