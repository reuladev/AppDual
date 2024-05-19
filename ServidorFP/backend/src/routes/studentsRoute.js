const { Router } = require('express');
const router = Router();

const StudentsService = require('../services/studentsService');

router.post('/getStudentDataById', StudentsService.getStudentDataById);
router.post('/getStudentDataByName', StudentsService.getStudentDataByName);
router.post('/addStudent', StudentsService.addStudent);
router.get('/getAllStudents', StudentsService.getAllStudents);
router.post('/addStudent_Idiom', StudentsService.addStudent_Idiom);
router.post('/addStudent_Doc', StudentsService.addStudent_Doc);
router.post('/addStudent_Calification', StudentsService.addStudent_Calification);

router.post('/getIdiomIdByIdiom', StudentsService.getIdiomIdByIdiom);
router.post('/getStudentDocs', StudentsService.getStudentDocs);
router.post('/getStudentCalification', StudentsService.getStudentCalification);
router.post('/getStudentIdioms', StudentsService.getStudentIdioms);
router.post('/getStudentPreference1', StudentsService.getStudentPreference1);
router.post('/getStudentPreference2', StudentsService.getStudentPreference2);
router.post('/getStudentPreference3', StudentsService.getStudentPreference3);

router.post('/studentDeletionRequest', StudentsService.studentDeletionRequest);

router.post('/studentPreferences1Requests', StudentsService.studentPreferences1Request);
router.post('/studentPreferences2Requests', StudentsService.studentPreferences2Request);
router.post('/studentPreferences3Requests', StudentsService.studentPreferences3Request);
router.post('/getStudentDates', StudentsService.getStudentDates);
router.post('/updateStudent', StudentsService.updateStudent);
router.post('/updateStudent_Idiom', StudentsService.updateStudent_Idiom);
router.post('/updateStudent_Doc', StudentsService.updateStudent_Doc);
router.post('/updateStudent_Calification', StudentsService.updateStudent_Calification);

module.exports = router;
