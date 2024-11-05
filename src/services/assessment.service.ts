import Db from "../database/db";
import Assessment from "../entities/assessment.entity";
import Question from "../entities/question.entity";

/**
 * Retrieves an assessment based on either categoryId or assessmentId
 * @param options Object containing optional categoryId or assessmentId
 * @returns Assessment object or undefined if not found
 */
export function getAssessment(options: {
  categoryId?: number;
  assessmentId?: number;
}): Assessment | undefined {
  const { categoryId, assessmentId } = options;
  if (!categoryId || !assessmentId) {
    return undefined;
  }
  let assessment = null;
  switch (true) {
    // Find assessment by category ID
    case categoryId !== undefined:
      assessment = Db.assessments.find(
        (assessment) => assessment.categoryId === categoryId
      );
      break;
    // Find assessment by assessment ID
    case assessmentId !== undefined:
      assessment = Db.assessments.find(
        (assessment) => assessment.id === assessmentId
      );
      break;
  }
  return assessment;
}

/**
 * Gets all questions associated with a specific assessment
 * @param assessmentId The ID of the assessment
 * @returns Array of Question objects
 */
export function getQuestions(assessmentId: number): Question[] {
  return Db.questions.filter(
    (question) => question.assessmentId === assessmentId
  );
}

/**
 * Calculates and updates the score for a user's response to an assessment question
 * @param assessmentId The ID of the assessment
 * @param response Object containing questionId, user's answer, and userId
 * @returns Score for the current question (0 or 1)
 */
export function calculateScore(
  assessmentId: number,
  response: { questionId: number; answer: number; userId: number }
): number {
  // Get or create a result record for the user
  const userCurrentResult = getOrCreateResult(
    response.userId,
    assessmentId
  );
  let score = 0;
  
  // Find the question being answered
  const referencedQueston = Db.questions.find(
    (question) =>
      question.id === response.questionId &&
      question.assessmentId === assessmentId
  );
  
  // Check if answer is correct and assign score
  if (referencedQueston) {
    if (referencedQueston.correctOption === response.answer) {
      score = 1;
    }
  }

  // Update user's total score
  userCurrentResult.score += score;
  return score;
}

/**
 * Gets existing result or creates new result record for user's assessment
 * @param userId The ID of the user
 * @param assessmentId The ID of the assessment
 * @returns Result object containing user's assessment progress
 */
function getOrCreateResult(userId: number, assessmentId: number) {
  // Try to find existing result
  const result = Db.results.find(
    (result) => result.userId === userId && result.assessmentId === assessmentId
  );
  if (result) {
    return result;
  }
  
  // Create new result if none exists
  const newResult = {
    id: Db.results.length + 1,
    userId: userId,
    assessmentId: assessmentId,
    score: 0,
    dateTaken: new Date(),
  };
  Db.results.push(newResult);
  return newResult;
}