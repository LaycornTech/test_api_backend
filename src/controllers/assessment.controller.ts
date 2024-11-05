
import { Request, Response } from "express";
import { calculateScore, getAssessment, getQuestions } from "../services/assessment.service";

export function getAssessmentCategories(req: Request, res: Response) {
    const categories = [];
    res.send(categories);
}

export function getAssessmentByCategoryId(req: Request, res: Response) {
    const categoryId = req.params.categoryId;
    const requestedAssessment = getAssessment({categoryId: Number(categoryId)});
    if (!requestedAssessment) {
        res.status(404).send("Assessment not found");
        return;
    }
    res.send(requestedAssessment);
}

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