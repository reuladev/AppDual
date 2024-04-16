const { Router } = require('express');
const router = Router();

const StudentsService = require('../services/studentsService');

router.post('/addStudent', StudentsService.addStudent);
router.get('/getAllStudents', StudentsService.getAllStudents);
router.post('/addStudent_Idiom',StudentsService.addStudent_Idiom);

module.exports = router;