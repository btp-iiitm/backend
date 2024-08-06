const Student = require("../models/student");
const StudentAssignment = require("../models/studentAssignment");
const StudentSubject = require("../models/studentSubject");
const StudentQuiz = require("../models/studentQuiz");
const StudentExam = require("../models/studentExam");
const Subject = require("../models/subject");
const Quiz = require("../models/quiz");
const Assignment = require("../models/assignment");
const Exam = require("../models/exam");
const AppError = require("../utils/appError");
const { genAiClient, modelAiClient } = require("../../restClient");

const getStudentAttendencePercentage = async (studentId) => {
  try {
    const studentSubjects = await StudentSubject.find({ studentId }).select(
      "-__v -studentId -createdAt -_id",
    );

    const subjects = studentSubjects.map((subject) => subject.subjectId);

    const subjectAggregator = await Subject.aggregate([
      {
        $match: {
          _id: { $in: subjects },
        },
      },
      {
        $group: {
          _id: null,
          totalAttendence: { $sum: "$totalClasses" },
        },
      },
    ]);

    const totalAttendence = subjectAggregator[0].totalAttendence;

    const studentTotalAttendence = studentSubjects.reduce(
      (total, subject) => total + subject.totalClassesAttended,
      0,
    );

    const attendencePercentage =
      (studentTotalAttendence / totalAttendence) * 100;

    return Math.round(attendencePercentage);
  } catch (error) {
    throw new AppError(error, 500);
  }
};

const getStudentAssignmentsPercentage = async (studentId) => {
  try {
    const studentAssignments = await StudentAssignment.find({
      studentId,
    }).select("-__v -studentId -createdAt -_id");

    const assignments = studentAssignments.map(
      (assignment) => assignment.assignmentId,
    );

    const assignmentAggregator = await Assignment.aggregate([
      {
        $match: {
          _id: { $in: assignments },
        },
      },
      {
        $group: {
          _id: null,
          totalMarks: { $sum: "$maximumMarks" },
        },
      },
    ]);

    const totalMarks = assignmentAggregator[0].totalMarks;

    const marksObtained = studentAssignments.reduce(
      (total, assignment) => total + assignment.marksObtained,
      0,
    );

    const assignmentPercentage = (marksObtained / totalMarks) * 100;

    return Math.round(assignmentPercentage);
  } catch (error) {
    throw new AppError(error, 500);
  }
};

const getStudentQuizPercentage = async (studentId) => {
  try {
    const studentQuizzes = await StudentQuiz.find({
      studentId,
    }).select("-__v -studentId -createdAt -_id");

    const quizzes = studentQuizzes.map((quiz) => quiz.quizId);

    const quizAggregator = await Quiz.aggregate([
      {
        $match: {
          _id: { $in: quizzes },
        },
      },
      {
        $group: {
          _id: null,
          totalMarks: { $sum: "$maximumMarks" },
        },
      },
    ]);

    const totalMarks = quizAggregator[0].totalMarks;

    const marksObtained = studentQuizzes.reduce(
      (total, quiz) => total + quiz.marksObtained,
      0,
    );

    const assignmentPercentage = (marksObtained / totalMarks) * 100;

    return Math.round(assignmentPercentage);
  } catch (error) {
    throw new AppError(error, 500);
  }
};

const getExamPercentage = async (studentId) => {
  try {
    const studentExams = await StudentExam.find({ studentId }).select(
      "-__v -studentId -createdAt -_id",
    );

    const exams = studentExams.map((exam) => exam.examId);

    const examAggregator = await Exam.aggregate([
      {
        $match: {
          _id: { $in: exams },
        },
      },
      {
        $group: {
          _id: null,
          totalMarks: { $sum: "$maximumMarks" },
        },
      },
    ]);

    const totalMarks = examAggregator[0].totalMarks;

    const marksObtained = studentExams.reduce(
      (total, exam) => total + exam.marksObtained,
      0,
    );

    const examPercentage = (marksObtained / totalMarks) * 100;

    return Math.round(examPercentage);
  } catch (error) {
    throw new AppError(error, 500);
  }
};

const getInsights = async (studentData) => {
  try {
    const { data } = await genAiClient({
      method: "post",
      url: "/conversationgpt35",
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": process.env.RAPID_API_HOST,
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          {
            role: "user",
            content: `Here is a student's performance: - Total Attendance: ${studentData.attendencePercentage}% - Quiz Average: ${studentData.quizPercentage}% - Assignment Average: ${studentData.assignmentPercentage}% - Exam Average: ${studentData.examPercentage}% - Overall Grade: ${studentData.grade}. Please provide detailed advice to help the student improve their performance in each specific area based on their current performance.  Respond with a JSON object that contains following keys: 'message': General advice about the student's overall grade and general areas for improvement. 'attendance': Specific advice on how to improve attendance and the benefits of doing so. 'quizzes': Tips on how to enhance quiz performance, including study strategies and resources. 'assignments': Suggestions for improving assignment scores, including time management and additional resources. 'exams': Recommendations for boosting exam performance, such as preparation techniques and study habits. Ensure that each piece of advice is actionable and relevant to the student's current performance levels.`,
          },
        ],
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 1000,
      },
    });

    return data;
  } catch (error) {
    throw new AppError(error, 500);
  }
};

const getGrade = async (studentData) => {
  try {
    const totalAttendance = studentData.attendencePercentage;
    const quizAverage = studentData.quizPercentage;
    const assignmentAverage = studentData.assignmentPercentage;
    const examAverage = studentData.examPercentage;

    const { data } = await modelAiClient({
      method: "post",
      url: "/predict",
      data: {
        totalAttendance,
        quizAverage,
        assignmentAverage,
        examAverage,
      },
    });

    return data;
  } catch (error) {
    throw new AppError(error, 500);
  }
};

const getGradePercentage = (grade) => {
  switch (grade) {
    case "A":
      return 90;

    case "B":
      return 70;

    case "C":
      return 50;

    case "D":
      return 40;

    case "E":
      return 20;

    case "F":
      return 10;
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const studentId = student._id;

    const attendencePercentage = await getStudentAttendencePercentage(
      studentId,
    );
    const assignmentPercentage = await getStudentAssignmentsPercentage(
      studentId,
    );
    const quizPercentage = await getStudentQuizPercentage(studentId);
    const examPercentage = await getExamPercentage(studentId);

    const studentData = {
      attendencePercentage,
      assignmentPercentage,
      quizPercentage,
      examPercentage,
    };

    const studentGrade = await getGrade(studentData);
    const insightData = await getInsights(studentData);

    studentData.grade = studentGrade;
    studentData.gradePercentage = getGradePercentage(studentGrade);

    res.status(200).json({
      status: "success",
      precentageData: studentData,
      insightData: JSON.parse(insightData.result),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalytics };
