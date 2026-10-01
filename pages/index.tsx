import Head from "next/head";
import { useState } from "react";

type CourseKey = "B" | "P" | "F";

const questions: { question: string; options: { text: string; type: CourseKey }[] }[] = [
  {
    question: "When you hear the word ‘AI’, your first reaction is…",
    options: [
      { text: "I already use ChatGPT — what else is out there?", type: "B" },
      { text: "Can it stop me doing the same boring tasks every day?", type: "P" },
      { text: "Can it actually help me close more sales?", type: "F" },
    ],
  },
  {
    question: "Your calendar next month looks like…",
    options: [
      { text: "I use AI daily, but know I am using only a fraction of what it can do.", type: "B" },
      { text: "Packed with repetitive admin — data entry, FAQs, and scheduling.", type: "P" },
      { text: "Full of sales calls, but too many leads still slip through the cracks.", type: "F" },
    ],
  },
  {
    question: "Your team’s biggest headache right now:",
    options: [
      { text: "Nobody knows which AI tools to use beyond the chat box.", type: "B" },
      { text: "We are burning hours every week on repetitive manual work.", type: "P" },
      { text: "Leads come in, but our follow-up process is all over the place.", type: "F" },
    ],
  },
  {
    question: "If I handed you ChatGPT right now, you would…",
    options: [
      { text: "Try prompts, then wonder what else I could be using.", type: "B" },
      { text: "Use it for quick drafts, but wish it did more of the grunt work.", type: "P" },
      { text: "Want it wired into my whole funnel, from first click to closed deal.", type: "F" },
    ],
  },
  {
    question: "Your dream outcome after the course:",
    options: [
      { text: "Know which AI tools to use for which job — beyond just chat.", type: "B" },
      { text: "Get back at least 5 hours a week from admin work.", type: "P" },
      { text: "A sales funnel that nurtures leads even while I am asleep.", type: "F" },
    ],
  },
  {
    question: "How much time can you commit?",
    options: [
      { text: "1 day — want to pick up more tools, hands-on.", type: "B" },
      { text: "1 day — need fast, usable systems.", type: "P" },
      { text: "3 days — I am ready to build something real.", type: "F" },
    ],
  },
];

const results = {
  B: {
    emoji: "🧰",
    name: "The Tool Explorer",
    course: "1-Day Gen AI — Go Beyond the Chat Box",
    href: "https://breakthroughacademy.sg/genai",
    blurb: "Go beyond the chat box and learn which Gen AI tool fits each part of your real work.",
  },
  P: {
    emoji: "⚡",
    name: "The Time Reclaimer",
    course: "1-Day Productivity — Remove Repetitive, Mundane Tasks",
    href: "https://ai.theqdacademy.com/aiproductivity",
    blurb: "Build practical AI workflows that take repetitive admin off your plate.",
  },
  F: {
    emoji: "🎯",
    name: "The Funnel Boss",
    course: "3-Day Customer Journey Mapping — Full Sales Funnel Automation",
    href: "https://ai.theqdacademy.com/cjm",
    blurb: "Map your customer journey and build AI automation from lead capture to close.",
  },
};

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<CourseKey, number>>({ B: 0, P: 0, F: 0 });
  const [complete, setComplete] = useState(false);

  const answer = (type: CourseKey) => {
    const nextScores = { ...scores, [type]: scores[type] + (index === questions.length - 1 ? 2 : 1) };
    setScores(nextScores);
    if (index === questions.length - 1) setComplete(true);
    else setIndex(index + 1);
  };

  const result = (Object.keys(scores) as CourseKey[]).reduce((best, key) =>
    scores[key] > scores[best] ? key : best, "B");
  const match = results[result];

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <main>
      <div className="stage">
        <p className="brand">🤖 BREAKTHROUGH AI</p>
        <section className="card">
          <div className="awning" />
          <div className="panel">
            {!started ? (
              <>
                <div className="emoji">☕🤖</div>
                <h1>Which AI Course Are You, Leh?</h1>
                <p>6 quick questions. Zero jargon. Find the Breakthrough AI course that fits where you are right now.</p>
                <div className="chips"><span>🌱 1-Day Gen AI</span><span>⚡ 1-Day Productivity</span><span>🎯 3-Day Sales</span></div>
                <button className="primary" onClick={() => setStarted(true)}>Start the Quiz</button>
              </>
            ) : complete ? (
              <>
                <p className="eyebrow">YOUR MATCH</p>
                <div className="resultEmoji">{match.emoji}</div>
                <h1>{match.name}</h1>
                <p className="course">{match.course}</p>
                <p>{match.blurb}</p>
                <a className="primary link" href={match.href} target="_blank" rel="noreferrer">Read Course Details</a>
                <button className="secondary" onClick={() => { setStarted(false); setComplete(false); setIndex(0); setScores({ B: 0, P: 0, F: 0 }); }}>Take the quiz again</button>
              </>
            ) : (
              <>
                <div className="meta"><span>Question {index + 1} of {questions.length}</span><span>{questions.map((_, i) => <i key={i} className={i === index ? "current" : i < index ? "done" : ""} />)}</span></div>
                <h2>{questions[index].question}</h2>
                <div className="options">
                  {questions[index].options.map((option, optionIndex) => <button key={option.type} onClick={() => answer(option.type)}>{optionIndex + 1}. {option.text}</button>)}
                </div>
              </>
            )}
          </div>
        </section>
        <p className="footer">A fun (but real) way to find your best-fit AI course.</p>
      </div>
      </main>
      <style jsx>{`
        main { min-height: 100vh; display:flex; justify-content:center; align-items:center; padding:32px 16px; background:radial-gradient(circle at 20% 0%,#1f1c3d,#15132b 60%); color:#fff7ea; font-family:Inter,system-ui,sans-serif; }
        .stage { width:100%; max-width:460px; }.brand,.footer{text-align:center;font-size:13px}.brand{color:#f5b324;font-weight:700;letter-spacing:.04em}.footer{color:#bbb5cb;margin-top:18px}.card{overflow:hidden;border-radius:24px;background:#fff7ea;color:#241f3d;box-shadow:0 30px 60px -20px #000}.awning{height:14px;background:repeating-linear-gradient(115deg,#ff6b5b 0 26px,#f5b324 26px 52px,#7c5cfc 52px 78px)}.panel{padding:34px 28px 30px}.emoji,.resultEmoji{font-size:46px}.resultEmoji{margin:8px 0}h1,h2{font-family:"Trebuchet MS",sans-serif;line-height:1.2}h1{font-size:28px;margin:8px 0 12px}h2{font-size:22px;margin:0 0 20px}p{color:#5b5478;line-height:1.55}.course{font-weight:700;color:#5f43d1}.chips{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0}.chips span{font-size:12px;font-weight:700;padding:7px 10px;border-radius:999px;background:#f2e9d8}.primary,.secondary,.options button{width:100%;border-radius:14px;padding:15px;border:0;font-size:15px;font-weight:700;cursor:pointer}.primary{background:linear-gradient(135deg,#7c5cfc,#5f43d1);color:white}.link{display:block;text-align:center;text-decoration:none;box-sizing:border-box}.secondary{margin-top:10px;color:#241f3d;background:transparent;border:2px solid #ddd4c5}.meta{display:flex;justify-content:space-between;margin-bottom:18px;color:#5b5478;font-size:13px;font-weight:700}.meta i{display:inline-block;width:7px;height:7px;margin-left:6px;border-radius:50%;background:#ddd4c5}.meta i.done{background:#7c5cfc}.meta i.current{background:#ff6b5b}.options{display:grid;gap:10px}.options button{font-family:"Baloo 2",cursive;text-align:left;background:#fff;color:#241f3d;border:2px solid #e3dcd2;font-weight:600}.options button:hover{border-color:#7c5cfc;background:#fbf9ff}.eyebrow{font-size:12px;font-weight:800;margin:0;color:#5b5478}@media(max-width:380px){.panel{padding:28px 20px 24px}}
      `}</style>
    </>
  );
}
