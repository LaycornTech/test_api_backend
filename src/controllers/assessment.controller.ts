
import { Request, Response } from "express";
import { calculateScore, getAssessment, getQuestions } from "../services/assessment.service";

/**
 * Retrieves all assessment categories
 * @param req Express Request object
 * @param res Express Response object
 */
export function getAssessmentCategories(req: Request, res: Response) {
    const categories = [];
    res.send(categories);
}

/**
 * Fetches an assessment by its category ID
 * @param req Express Request object containing categoryId parameter
 * @param res Express Response object
 * @returns Assessment data or 404 if not found
 */
export function getAssessmentByCategoryId(req: Request, res: Response) {
    const categoryId = req.params.categoryId;
    const requestedAssessment = getAssessment({categoryId: Number(categoryId)});
    if (!requestedAssessment) {
        res.status(404).send("Assessment not found");
        return;
    }
    res.send(requestedAssessment);
}

/**
 * Retrieves all questions for a specific assessment
 * @param req Express Request object containing assessmentId parameter
 * @param res Express Response object
 */
export function getQuestionsByAssessmentId(req: Request, res: Response) {
    const assessmentId = req.params.assessmentId;
    const questions = getQuestions(Number(assessmentId));
    res.send(questions);
}
export function submitResponse(req: Request, res: Response) {
    const assessmentId = req.params.assessmentId;
    const response = req.body as { questionId: number, answer: number; userId: number };
    calculateScore(Number(assessmentId), response);
    res.send(response);
}