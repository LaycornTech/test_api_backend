import Db from "../database/db";
import Assessment from "../entities/assessment.entity";
import Question from "../entities/question.entity";

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
    case categoryId !== undefined:
      assessment = Db.assessments.find(
        (assessment) => assessment.categoryId === categoryId
      );
      break;
    case assessmentId !== undefined:
      assessment = Db.assessments.find(
        (assessment) => assessment.id === assessmentId
      );
      break;
  }
  return assessment;
}

export function getQuestions(assessmentId: number): Question[] {
  return Db.questions.filter(
    (question) => question.assessmentId === assessmentId
  );
}

export function calculateScore(
  assessmentId: number,
  response: { questionId: number; answer: number; userId: number }
): number {
//   const questions = getQuestions(assessmentId);
  const userCurrentResult = getOrCreateResult(
    response.userId,
    assessmentId
  );
  let score = 0;
  const referencedQueston = Db.questions.find(
    (question) =>
      question.id === response.questionId &&
      question.assessmentId === assessmentId
  );
  
  if (referencedQueston) {
    if (referencedQueston.correctOption === response.answer) {
      score = 1;
    }
  }

  userCurrentResult.score += score;
  return score;
}

function getOrCreateResult(userId: number, assessmentId: number) {
  const result = Db.results.find(
    (result) => result.userId === userId && result.assessmentId === assessmentId
  );
  if (result) {
    return result;
  }
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
