import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { activities, getAssessmentWithQuestions, classes } from "@/data/mockData";
import { Question } from "@/types";

type QuizState = "intro" | "in-progress" | "completed";

const AssessmentPage = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();

  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const activity = activities.find((a) => a.id === activityId);
  const assessmentData = activityId ? getAssessmentWithQuestions(activityId) : undefined;
  const classItem = activity ? classes.find((c) => c.id === activity.class_id) : null;

  const assessment = assessmentData?.assessment;
  const questionsList = assessmentData?.questions || [];

  // Timer
  useEffect(() => {
    if (quizState !== "in-progress" || !assessment?.time_limit_minutes) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizState, assessment?.time_limit_minutes]);

  const handleSubmit = useCallback(() => {
    let totalScore = 0;
    let maxScore = 0;

    questionsList.forEach((question) => {
      maxScore += question.points;
      const userAnswer = answers[question.id];
      if (userAnswer?.toLowerCase() === question.correct_answer.toLowerCase()) {
        totalScore += question.points;
      }
    });

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    setScore(percentage);
    setQuizState("completed");
  }, [answers, questionsList]);

  const startQuiz = () => {
    if (assessment?.time_limit_minutes) {
      setTimeRemaining(assessment.time_limit_minutes * 60);
    }
    setQuizState("in-progress");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const currentQuestion = questionsList[currentQuestionIndex];
  const progress = questionsList.length > 0 
    ? ((currentQuestionIndex + 1) / questionsList.length) * 100 
    : 0;
  const answeredCount = Object.keys(answers).length;

  if (!activity || !assessment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Assessment not found
          </h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Intro screen
  if (quizState === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Class
          </Button>

          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {assessment.title}
              </h1>
              {classItem && (
                <p className="text-muted-foreground">{classItem.title}</p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Questions</span>
                <span className="font-medium">{questionsList.length}</span>
              </div>
              {assessment.time_limit_minutes && (
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Time Limit</span>
                  <span className="font-medium">{assessment.time_limit_minutes} minutes</span>
                </div>
              )}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Passing Score</span>
                <span className="font-medium">{assessment.passing_score}%</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-8">
              <h3 className="font-medium mb-2">Instructions</h3>
              <p className="text-sm text-muted-foreground">{assessment.instructions}</p>
            </div>

            <Button onClick={startQuiz} className="w-full" size="lg">
              Start Assessment
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Completed screen
  if (quizState === "completed") {
    const passed = score >= assessment.passing_score;

    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  passed ? "bg-live/10" : "bg-destructive/10"
                }`}
              >
                {passed ? (
                  <CheckCircle className="h-10 w-10 text-live" />
                ) : (
                  <XCircle className="h-10 w-10 text-destructive" />
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {passed ? "Congratulations!" : "Keep Learning"}
              </h1>
              <p className="text-muted-foreground">
                {passed
                  ? "You have successfully passed this assessment."
                  : "You didn't pass this time. Review the material and try again."}
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className={`text-4xl font-bold ${passed ? "text-live" : "text-destructive"}`}>
                  {score}%
                </div>
                <div className="text-sm text-muted-foreground">Your Score</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-muted-foreground">
                  {assessment.passing_score}%
                </div>
                <div className="text-sm text-muted-foreground">Passing Score</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Questions Answered</span>
                <span className="font-medium">{answeredCount} / {questionsList.length}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Correct Answers</span>
                <span className="font-medium">
                  {questionsList.filter(
                    (q) => answers[q.id]?.toLowerCase() === q.correct_answer.toLowerCase()
                  ).length} / {questionsList.length}
                </span>
              </div>
            </div>

            {/* Review section */}
            {showReview && (
              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg">Review Answers</h3>
                {questionsList.map((question, index) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer?.toLowerCase() === question.correct_answer.toLowerCase();
                  
                  return (
                    <div key={question.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          Q{index + 1}.
                        </span>
                        <p className="text-foreground flex-1">{question.question_text}</p>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-live flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                        )}
                      </div>
                      <div className="ml-7 space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Your answer: </span>
                          <span className={isCorrect ? "text-live" : "text-destructive"}>
                            {userAnswer || "Not answered"}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p>
                            <span className="text-muted-foreground">Correct answer: </span>
                            <span className="text-live">{question.correct_answer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReview(!showReview)}
                className="flex-1"
              >
                {showReview ? "Hide Review" : "Review Answers"}
              </Button>
              <Button onClick={() => navigate(-1)} className="flex-1">
                Back to Class
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // In-progress quiz
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questionsList.length}
            </span>
            {assessment.time_limit_minutes && (
              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  timeRemaining < 60 ? "text-destructive" : "text-foreground"
                }`}
              >
                <Clock className="h-4 w-4" />
                {formatTime(timeRemaining)}
              </div>
            )}
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Question */}
      <main className="container max-w-3xl mx-auto px-4 py-8">
        <Card className="p-6 md:p-8">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded mb-4">
              {currentQuestion.type === "multiple_choice" ? "Multiple Choice" : "True/False"}
            </span>
            <h2 className="text-xl font-semibold text-foreground leading-relaxed">
              {currentQuestion.question_text}
            </h2>
          </div>

          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.type === "multiple_choice" && currentQuestion.options ? (
              currentQuestion.options.map((option, index) => (
                <Label
                  key={index}
                  htmlFor={`option-${index}`}
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion.id] === option
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <span className="text-foreground">{option}</span>
                </Label>
              ))
            ) : (
              <>
                <Label
                  htmlFor="true"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion.id] === "true"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="true" id="true" />
                  <span className="text-foreground">True</span>
                </Label>
                <Label
                  htmlFor="false"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion.id] === "false"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="false" id="false" />
                  <span className="text-foreground">False</span>
                </Label>
              </>
            )}
          </RadioGroup>
        </Card>

        {/* Question navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {questionsList.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuestionIndex
                  ? "bg-primary"
                  : answers[q.id]
                  ? "bg-primary/40"
                  : "bg-border"
              }`}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>
      </main>

      {/* Footer navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            {answeredCount} of {questionsList.length} answered
          </span>

          {currentQuestionIndex === questionsList.length - 1 ? (
            <Button onClick={handleSubmit}>Submit Quiz</Button>
          ) : (
            <Button
              onClick={() =>
                setCurrentQuestionIndex((prev) =>
                  Math.min(questionsList.length - 1, prev + 1)
                )
              }
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
