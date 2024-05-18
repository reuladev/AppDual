const { Router } = require('express');
const router = Router();

const PreferencesService = require('../services/preferencesService');

router.get('/getAllPreferences', PreferencesService.getAllPreferences);

router.post('/addPreferences', PreferencesService.addPreferences);

router.post('/deletePreferences', PreferencesService.deletePreferences);


module.exports = router;