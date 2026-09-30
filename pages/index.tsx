import { useEffect, useState } from "react";
import { ValidationError, useForm } from "@formspree/react";

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

function LeadForm({ course, onSuccess }: { course: string; onSuccess: () => void }) {
  const [state, handleSubmit] = useForm("mqpajlwg");

  useEffect(() => {
    if (state.succeeded) onSuccess();
  }, [state.succeeded, onSuccess]);

  return (
    <form onSubmit={handleSubmit} className="leadForm">
      <div className="leadIntro">
        <div className="leadEmoji">🎉</div>
        <h1>Your match is ready!</h1>
        <p>Tell us where to reach you, then we&apos;ll reveal your result.</p>
      </div>
      <input type="hidden" name="matchedCourse" value={course} />
      <div className="nameFields">
        <div><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" required /><ValidationError prefix="First name" field="firstName" errors={state.errors} /></div>
        <div><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" required /><ValidationError prefix="Last name" field="lastName" errors={state.errors} /></div>
      </div>
      <div className="formField"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" pattern="[89][0-9]{3} ?[0-9]{4}" placeholder="e.g. 9123 4567" required /><ValidationError prefix="Phone" field="phone" errors={state.errors} /></div>
      <div className="formField"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /><ValidationError prefix="Email" field="email" errors={state.errors} /></div>
      <label className="consent"><input name="consent" type="checkbox" required /> <span>By continuing, you agree that Breakthrough AI may contact you about this course.</span></label>
      <ValidationError prefix="Consent" field="consent" errors={state.errors} />
      <ValidationError errors={state.errors} />
      <button className="primary" type="submit" disabled={state.submitting}>{state.submitting ? "Sending…" : "Reveal My Result"}</button>
    </form>
  );
}

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<CourseKey, number>>({ B: 0, P: 0, F: 0 });
  const [complete, setComplete] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

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
            ) : complete && !leadSubmitted ? (
              <LeadForm course={match.course} onSuccess={() => setLeadSubmitted(true)} />
            ) : complete ? (
              <>
                <p className="eyebrow">YOUR MATCH</p>
                <div className="resultEmoji">{match.emoji}</div>
                <h1>{match.name}</h1>
                <p className="course">{match.course}</p>
                <p>{match.blurb}</p>
                <a className="primary link" href={match.href} target="_blank" rel="noreferrer">Read Course Details</a>
                <button className="secondary" onClick={() => { setStarted(false); setComplete(false); setLeadSubmitted(false); setIndex(0); setScores({ B: 0, P: 0, F: 0 }); }}>Take the quiz again</button>
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
      <style jsx>{`
        main { min-height: 100vh; display:flex; justify-content:center; align-items:center; padding:32px 16px; background:radial-gradient(circle at 20% 0%,#1f1c3d,#15132b 60%); color:#fff7ea; font-family:Inter,system-ui,sans-serif; }
        .stage { width:100%; max-width:920px; }.brand,.footer{text-align:center;font-size:13px}.brand{color:#f5b324;font-weight:700;letter-spacing:.04em}.footer{color:#bbb5cb;margin-top:18px}.card{overflow:hidden;border-radius:32px;background:#fff7ea;color:#241f3d;box-shadow:0 30px 60px -20px #000}.awning{height:28px;background:repeating-linear-gradient(115deg,#ff6b5b 0 38px,#f5b324 38px 76px,#7c5cfc 76px 114px)}.panel{padding:52px 56px}.emoji,.resultEmoji{font-size:46px}.resultEmoji{margin:8px 0}h1,h2{font-family:"Trebuchet MS",sans-serif;line-height:1.2}h1{font-size:28px;margin:8px 0 12px}h2{font-size:22px;margin:0 0 20px}p{color:#5b5478;line-height:1.55}.course{font-weight:700;color:#5f43d1}.chips{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0}.chips span{font-size:12px;font-weight:700;padding:7px 10px;border-radius:999px;background:#f2e9d8}.primary,.secondary,.options button{width:100%;border-radius:18px;padding:17px;border:0;font-size:18px;font-weight:700;cursor:pointer}.primary{background:linear-gradient(135deg,#7c5cfc,#5f43d1);color:white;box-shadow:0 12px 24px -12px #5f43d1}.link{display:block;text-align:center;text-decoration:none;box-sizing:border-box}.secondary{margin-top:10px;color:#241f3d;background:transparent;border:2px solid #ddd4c5}.meta{display:flex;justify-content:space-between;margin-bottom:18px;color:#5b5478;font-size:13px;font-weight:700}.meta i{display:inline-block;width:7px;height:7px;margin-left:6px;border-radius:50%;background:#ddd4c5}.meta i.done{background:#7c5cfc}.meta i.current{background:#ff6b5b}.options{display:grid;gap:10px}.options button{text-align:left;background:#fff;color:#241f3d;border:2px solid #e3dcd2;font-weight:500}.options button:hover{border-color:#7c5cfc;background:#fbf9ff}.eyebrow{font-size:12px;font-weight:800;margin:0;color:#5b5478}.leadForm{display:grid;gap:24px}.leadIntro{margin-bottom:12px}.leadEmoji{font-size:56px;line-height:1}.leadIntro h1{font-size:36px;margin:18px 0 18px}.leadIntro p{font-size:19px;margin:0}.leadForm label{display:block;margin-bottom:10px;font-size:17px;font-weight:700;color:#5b5478}.leadForm input{box-sizing:border-box;width:100%;border:4px solid #ff6b5b;border-radius:22px;padding:20px;font:inherit;font-size:20px;color:#241f3d;background:#fff}.nameFields{display:grid;grid-template-columns:1fr 1fr;gap:20px}.leadForm .consent{display:flex;align-items:flex-start;gap:10px;font-size:16px;font-weight:500;line-height:1.5}.leadForm .consent input{width:20px;height:20px;margin:3px 0 0;accent-color:#7c5cfc}.leadForm .form-error{font-size:14px;color:#b42318;margin-top:6px}@media(max-width:600px){main{padding:20px 12px}.stage{max-width:100%}.panel{padding:34px 26px}.awning{height:18px}.leadIntro h1{font-size:29px}.leadIntro p{font-size:17px}.nameFields{grid-template-columns:1fr;gap:18px}.leadForm{gap:18px}.leadForm input{padding:16px;font-size:18px}}
      `}</style>
    </main>
  );
}
