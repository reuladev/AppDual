const { Router } = require('express');
const router = Router();

const StudentsService = require('../services/studentsService');

router.post('/addStudent', StudentsService.addStudent);
router.get('/getAllStudents', StudentsService.getAllStudents);
router.post('/addStudent_Idiom', StudentsService.addStudent_Idiom);
router.post('/addStudent_Doc', StudentsService.addStudent_Doc);
router.post('/addStudent_Calification', StudentsService.addStudent_Calification);

module.exports = router;