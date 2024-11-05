import { Router } from 'express';
import { getAssessmentCategories, getAssessmentByCategoryId, getQuestionsByAssessmentId, submitResponse } from '../controllers/assessment.controller';

const router = Router();

router.get("/assessment-categories", getAssessmentCategories);

// get assessments by category
router.get("/assessments/:categoryId", getAssessmentByCategoryId);

// get questionss by assessment id
router.get("/assessments/:assessmentId/questions", getQuestionsByAssessmentId);

// post result
router.post("/assessments/:assessmentId/response", submitResponse);

export default router;