import { useState } from "react";
import Script from "next/script";

type CourseKey = "B" | "P" | "F";

type Result = { emoji: string; name: string; course: string; href: string; blurb: string };

const questions: { question: string; options: { text: string; type: CourseKey }[] }[] = [
  { question: "When you hear the word ‘AI’, your first reaction is…", options: [{ text: "I already use ChatGPT — what else is out there?", type: "B" }, { text: "Can it stop me doing the same boring tasks every day?", type: "P" }, { text: "Can it actually help me close more sales?", type: "F" }] },
  { question: "Your calendar next month looks like…", options: [{ text: "I use AI daily, but know I am using only a fraction of what it can do.", type: "B" }, { text: "Packed with repetitive admin — data entry, FAQs, and scheduling.", type: "P" }, { text: "Full of sales calls, but too many leads still slip through the cracks.", type: "F" }] },
  { question: "Your team’s biggest headache right now:", options: [{ text: "Nobody knows which AI tools to use beyond the chat box.", type: "B" }, { text: "We are burning hours every week on repetitive manual work.", type: "P" }, { text: "Leads come in, but our follow-up process is all over the place.", type: "F" }] },
  { question: "If I handed you ChatGPT right now, you would…", options: [{ text: "Try prompts, then wonder what else I could be using.", type: "B" }, { text: "Use it for quick drafts, but wish it did more of the grunt work.", type: "P" }, { text: "Want it wired into my whole funnel, from first click to closed deal.", type: "F" }] },
  { question: "Your dream outcome after the course:", options: [{ text: "Know which AI tools to use for which job — beyond just chat.", type: "B" }, { text: "Get back at least 5 hours a week from admin work.", type: "P" }, { text: "A sales funnel that nurtures leads even while I am asleep.", type: "F" }] },
  { question: "How much time can you commit?", options: [{ text: "1 day — want to pick up more tools, hands-on.", type: "B" }, { text: "1 day — need fast, usable systems.", type: "P" }, { text: "3 days — I am ready to build something real.", type: "F" }] },
];

const results: Record<CourseKey, Result> = {
  B: { emoji: "🧰", name: "The Tool Explorer", course: "1-Day Gen AI — Go Beyond the Chat Box", href: "https://breakthroughacademy.sg/genai", blurb: "Go beyond the chat box and learn which Gen AI tool fits each part of your real work." },
  P: { emoji: "⚡", name: "The Time Reclaimer", course: "1-Day Productivity — Remove Repetitive, Mundane Tasks", href: "https://ai.theqdacademy.com/aiproductivity", blurb: "Build practical AI workflows that take repetitive admin off your plate." },
  F: { emoji: "🎯", name: "The Funnel Boss", course: "3-Day Customer Journey Mapping — Full Sales Funnel Automation", href: "https://ai.theqdacademy.com/cjm", blurb: "Map your customer journey and build AI automation from lead capture to close." },
};

function LeadForm({ match }: { match: CourseKey }) {
  if (typeof window !== "undefined") window.localStorage.setItem("ai-course-quiz-match", match);
  return <div className="embeddedLeadForm">
    <iframe src="https://link.salesprocess.com/widget/form/rTA9UNAFs4mOMkzdpNdq" style={{ width: "100%", height: "600px", border: "none", borderRadius: "3px" }} id="inline-rTA9UNAFs4mOMkzdpNdq" data-layout='{"id":"INLINE"}' data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="AI Quiz" data-height="600" data-layout-iframe-id="inline-rTA9UNAFs4mOMkzdpNdq" data-form-id="rTA9UNAFs4mOMkzdpNdq" data-cookie-consent="true" data-cookie-consent-provider="auto" title="AI Quiz" />
    <Script src="https://link.salesprocess.com/js/form_embed.js" strategy="afterInteractive" />
  </div>;
}

export default function QuizPage() {
  const [started, setStarted] = useState(false); const [index, setIndex] = useState(0); const [scores, setScores] = useState<Record<CourseKey, number>>({ B: 0, P: 0, F: 0 });
  const answer = (type: CourseKey) => { setScores((current) => ({ ...current, [type]: current[type] + (index === questions.length - 1 ? 2 : 1) })); if (index === questions.length - 1) setIndex(questions.length); else setIndex(index + 1); };
  const match = (Object.keys(scores) as CourseKey[]).reduce((best, key) => scores[key] > scores[best] ? key : best, "B"); const result = results[match];
  return <main><div className="stage"><p className="brand">🤖 BREAKTHROUGH AI</p><section className="card"><div className="awning" /><div className="panel">
    {!started ? <><div className="emoji">☕🤖</div><h1>Which AI Course Are You, Leh?</h1><p>6 quick questions. Zero jargon. Find the Breakthrough AI course that fits where you are right now.</p><button className="primary" onClick={() => setStarted(true)}>Start the Quiz</button></>
    : index < questions.length ? <><div className="meta">Question {index + 1} of {questions.length}</div><h2>{questions[index].question}</h2><div className="options">{questions[index].options.map((option, optionIndex) => <button key={option.type} onClick={() => answer(option.type)}>{optionIndex + 1}. {option.text}</button>)}</div></>
    : <LeadForm match={match} />}
  </div></section><p className="footer">A fun (but real) way to find your best-fit AI course.</p></div><style jsx>{`
  main{min-height:100vh;display:flex;justify-content:center;align-items:center;padding:32px 16px;background:radial-gradient(circle at 20% 0%,#1f1c3d,#15132b 60%);color:#fff7ea;font-family:Inter,system-ui,sans-serif}.stage{width:100%;max-width:700px}.brand,.footer{text-align:center;font-size:13px}.brand{color:#f5b324;font-weight:800;letter-spacing:.04em}.footer{color:#bbb5cb;margin-top:18px}.card{overflow:hidden;border-radius:36px;background:#fdf6ea;color:#14163a;box-shadow:0 24px 60px rgba(0,0,0,.35)}.awning{height:34px;background:repeating-linear-gradient(115deg,#ff6b5e 0 34px,#ffbc32 34px 68px,#6c4cf5 68px 102px)}.panel{padding:26px 52px 52px}h1,h2{font-family:"Trebuchet MS",sans-serif;line-height:1.15}h1{font-size:40px;margin:0 0 12px}h2{font-size:28px}.panel p{font-size:20px;line-height:1.5;color:#55598a}.emoji,.leadEmoji,.resultEmoji{font-size:54px;margin-bottom:14px}.primary,.options button{width:100%;border:0;border-radius:28px;padding:18px;font:800 22px "Trebuchet MS",sans-serif;cursor:pointer}.primary{background:#6c4cf5;color:#fff;box-shadow:0 14px 30px rgba(108,76,245,.35)}.link{display:block;text-align:center;text-decoration:none;box-sizing:border-box}.meta{font-weight:700;color:#55598a;margin-bottom:18px}.options{display:grid;gap:12px}.options button{background:#fff;color:#14163a;border:2px solid #ddd6ea;text-align:left;font:600 19px "Baloo 2",sans-serif}.leadForm{display:grid;gap:22px}.leadForm label{display:grid;gap:10px;font-size:18px;font-weight:700;color:#55598a}.leadForm input:not([type=checkbox]){height:60px;border:2px solid #ddd6ea;border-radius:20px;padding:0 22px;font:500 19px Inter}.nameFields{display:grid;grid-template-columns:1fr 1fr;gap:20px}.consent{display:flex!important;grid-template-columns:none!important;align-items:flex-start}.consent input{width:28px;height:28px;margin:0 14px 0 0;accent-color:#6c4cf5}.consent span{font-weight:500;line-height:1.5}.error{color:#e5322d!important;font-size:16px!important;margin:0}.course{font-weight:700;color:#5a3de0!important}.eyebrow{font-size:13px!important;font-weight:800}.footer{font-size:13px!important}@media(max-width:560px){.panel{padding:20px 22px 32px}h1{font-size:30px}.panel p{font-size:17px}.nameFields{grid-template-columns:1fr}.leadForm input:not([type=checkbox]){height:54px;font-size:17px}.primary{font-size:22px}}
  `}</style></main>;
}
