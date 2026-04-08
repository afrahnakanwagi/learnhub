import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, CheckCircle, XCircle, Trophy, ArrowRight, RotateCcw, Home } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { courses, quizQuestions } from "../data/mockData";

export default function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);

  const [phase, setPhase] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleTimeout = useCallback(() => {
    if (selected === null) {
      const newAnswers = [...answers, { questionId: quizQuestions[current].id, selected: -1, correct: false }];
      setAnswers(newAnswers);
      if (current + 1 < quizQuestions.length) {
        setCurrent(c => c + 1);
        setSelected(null);
        setShowExplanation(false);
        setTimeLeft(30);
      } else {
        setPhase("result");
      }
    }
  }, [selected, answers, current]);

  useEffect(() => {
    if (phase !== "quiz") return;
    if (timeLeft === 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, handleTimeout]);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const q = quizQuestions[current];
    setAnswers(prev => [...prev, { questionId: q.id, selected: idx, correct: idx === q.correct }]);
  };

  const handleNext = () => {
    if (current + 1 < quizQuestions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setPhase("result");
    }
  };

  const score = answers.filter(a => a.correct).length;
  const pct = Math.round((score / quizQuestions.length) * 100);
  const passed = pct >= 70;

  const timerColor = timeLeft > 15 ? "text-green-500" : timeLeft > 7 ? "text-yellow-500" : "text-red-500";
  const timerBg = timeLeft > 15 ? "bg-green-50" : timeLeft > 7 ? "bg-yellow-50" : "bg-red-50";

  if (phase === "intro") return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-pop p-10 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={40} className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Course Quiz</h1>
          <p className="text-gray-500 mb-2">{course?.title}</p>
          <div className="grid grid-cols-3 gap-4 my-8">
            {[
              { label: "Questions", value: quizQuestions.length },
              { label: "Time/Question", value: "30s" },
              { label: "Pass Score", value: "70%" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <ul className="text-left space-y-2 mb-8 bg-orange-50 rounded-2xl p-5">
            {["Read each question carefully before answering", "You have 30 seconds per question", "Score 70% or above to earn your certificate", "Explanations are shown after each answer"].map(rule => (
              <li key={rule} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={15} className="text-orange-500 shrink-0" />{rule}
              </li>
            ))}
          </ul>
          <button onClick={() => setPhase("quiz")} className="btn-primary px-10 py-3 text-base">
            Start Quiz <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );

  if (phase === "result") return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-pop p-10 text-center">
          <div className={`w-24 h-24 ${passed ? "bg-green-100" : "bg-red-100"} rounded-full flex items-center justify-center mx-auto mb-6`}>
            {passed ? <Trophy size={44} className="text-green-500" /> : <XCircle size={44} className="text-red-500" />}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{passed ? "🎉 You Passed!" : "Almost There!"}</h2>
          <p className="text-gray-500 mb-8">{passed ? "Excellent work! You've demonstrated strong understanding." : "Don't give up — review the material and try again!"}</p>

          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-8 ${passed ? "border-green-400 text-green-600" : "border-red-300 text-red-500"} mb-6`}>
            <span className="text-4xl font-extrabold">{pct}%</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold text-green-600">{score}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold text-red-500">{quizQuestions.length - score}</p>
              <p className="text-xs text-gray-500">Wrong</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold text-orange-500">{quizQuestions.length}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>

          {/* Review */}
          <div className="text-left space-y-3 mb-8">
            <h3 className="font-bold text-gray-900">Question Review</h3>
            {quizQuestions.map((q, i) => {
              const ans = answers[i];
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${ans?.correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <div className="flex items-start gap-2">
                    {ans?.correct ? <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" /> : <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />}
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{q.question}</p>
                      <p className="text-xs text-gray-500 mt-1">Correct: <span className="font-semibold text-green-700">{q.options[q.correct]}</span></p>
                      {!ans?.correct && ans?.selected >= 0 && (
                        <p className="text-xs text-red-500 mt-0.5">Your answer: {q.options[ans.selected]}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setTimeLeft(30); setPhase("quiz"); }}
              className="btn-secondary flex-1 justify-center" style={{ display: "flex", justifyContent: "center" }}>
              <RotateCcw size={15} /> Retake
            </button>
            {passed && <button className="btn-green flex-1 justify-center" style={{ display: "flex", justifyContent: "center" }}><Trophy size={15} /> Get Certificate</button>}
            <button onClick={() => navigate("/dashboard")} className="btn-primary flex-1 justify-center" style={{ display: "flex", justifyContent: "center" }}>
              <Home size={15} /> Dashboard
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  const q = quizQuestions[current];

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 flex gap-1">
            {quizQuestions.map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < current ? "bg-green-400" : i === current ? "bg-orange-500" : "bg-gray-200"}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-500 shrink-0">{current + 1}/{quizQuestions.length}</span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-pop overflow-hidden">
          {/* Timer */}
          <div className={`flex items-center justify-between px-8 py-4 border-b border-gray-100 ${timerBg}`}>
            <span className="text-sm font-semibold text-gray-600">Question {current + 1}</span>
            <div className={`flex items-center gap-2 font-extrabold text-xl ${timerColor}`}>
              <Clock size={20} />
              {String(timeLeft).padStart(2, "0")}s
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-8">{q.question}</h2>

            <div className="space-y-3 mb-6">
              {q.options.map((opt, i) => {
                let style = "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50";
                if (selected !== null) {
                  if (i === q.correct) style = "border-green-400 bg-green-50";
                  else if (i === selected && i !== q.correct) style = "border-red-400 bg-red-50";
                  else style = "border-gray-100 bg-gray-50 opacity-60";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all font-medium ${style} ${selected === null ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0 ${selected !== null && i === q.correct ? "bg-green-500 text-white" : selected !== null && i === selected ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {["A","B","C","D"][i]}
                    </span>
                    <span className="text-gray-800">{opt}</span>
                    {selected !== null && i === q.correct && <CheckCircle size={18} className="text-green-500 ml-auto" />}
                    {selected !== null && i === selected && i !== q.correct && <XCircle size={18} className="text-red-500 ml-auto" />}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className={`p-4 rounded-2xl mb-6 ${selected === q.correct ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className={`text-sm font-bold mb-1 ${selected === q.correct ? "text-green-700" : "text-red-700"}`}>
                  {selected === q.correct ? "✅ Correct!" : "❌ Incorrect"}
                </p>
                <p className="text-sm text-gray-700">{q.explanation}</p>
              </div>
            )}

            {selected !== null && (
              <button onClick={handleNext} className="btn-primary w-full justify-center py-3" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                {current + 1 < quizQuestions.length ? "Next Question" : "See Results"}
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}