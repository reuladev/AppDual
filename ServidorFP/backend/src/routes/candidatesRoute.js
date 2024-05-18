const { Router } = require('express');
const router = Router();

const CandidatesService = require('../services/candidatesService');

router.post('/getCandidateDataByIdPlusAtributtes', CandidatesService.getCandidateDataByIdPlusAtributtes); 
router.post('/getCandidateDataById', CandidatesService.getCandidateDataById); 
router.post('/getCandidateDataByName', CandidatesService.getCandidateDataByName); 
router.get('/getAllCandidates', CandidatesService.getAllCandidates);

router.post('/getCandidatesData', CandidatesService.getCandidatesData); 
router.post('/getCandidatesIdData', CandidatesService.getCandidatesIdData); 
router.post('/getCandidatesIdFromData', CandidatesService.getCandidatesIdFromData);
router.post('/updateCandidate', CandidatesService.updateCandidate); 

router.post('/addCandidate', CandidatesService.addCandidate); 
router.post('/deleteCandidate', CandidatesService.deleteCandidate); 


router.post('/getStudentName', CandidatesService.getStudentName); 

module.exports = router;