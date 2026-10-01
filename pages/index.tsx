import { useState } from "react";
import Script from "next/script";

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

function LeadForm() {
  return (
    <div className="embeddedLeadForm">
      <iframe
        src="https://link.salesprocess.com/widget/form/rvbhfiB5qIAX6jM4tGW9"
        style={{ width: "100%", height: "727px", border: "none", borderRadius: "3px" }}
        id="inline-rvbhfiB5qIAX6jM4tGW9"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="QD AI Productivity - Self"
        data-height="727"
        data-layout-iframe-id="inline-rvbhfiB5qIAX6jM4tGW9"
        data-form-id="rvbhfiB5qIAX6jM4tGW9"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title="QD AI Productivity - Self"
      />
      <Script src="https://link.salesprocess.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}

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
            ) : complete ? (
              <LeadForm />
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
        main { min-height: 100vh; display:flex; justify-content:flex-start; align-items:center; padding:32px 16px 48px; background:radial-gradient(circle at 20% 0%,#1f1c3d,#15132b 60%); color:#fff7ea; font-family:Inter,system-ui,sans-serif; }
        .stage { width:100%; max-width:920px; }.brand,.footer{text-align:center;font-size:13px}.brand{color:#f5b324;font-weight:700;letter-spacing:.04em}.footer{color:#bbb5cb;margin-top:18px}.card{overflow:hidden;border-radius:36px;background:#fff7ea;color:#241f3d;box-shadow:0 30px 60px -20px #000}.awning{height:34px;background:repeating-linear-gradient(115deg,#ff6b5b 0 34px,#f5b324 34px 68px,#7c5cfc 68px 102px)}.panel{padding:26px 52px 52px}.emoji,.resultEmoji{font-size:46px}.resultEmoji{margin:8px 0}h1,h2{font-family:"Trebuchet MS",sans-serif;line-height:1.2}h1{font-size:28px;margin:8px 0 12px}h2{font-size:22px;margin:0 0 20px}p{color:#5b5478;line-height:1.55}.course{font-weight:700;color:#5f43d1}.chips{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0}.chips span{font-size:12px;font-weight:700;padding:7px 10px;border-radius:999px;background:#f2e9d8}.primary,.secondary,.options button{width:100%;border-radius:18px;padding:17px;border:0;font-size:18px;font-weight:700;cursor:pointer}.primary{background:linear-gradient(135deg,#7c5cfc,#5f43d1);color:white;box-shadow:0 12px 24px -12px #5f43d1}.link{display:block;text-align:center;text-decoration:none;box-sizing:border-box}.secondary{margin-top:10px;color:#241f3d;background:transparent;border:2px solid #ddd4c5}.meta{display:flex;justify-content:space-between;margin-bottom:18px;color:#5b5478;font-size:13px;font-weight:700}.meta i{display:inline-block;width:7px;height:7px;margin-left:6px;border-radius:50%;background:#ddd4c5}.meta i.done{background:#7c5cfc}.meta i.current{background:#ff6b5b}.options{display:grid;gap:10px}.options button{text-align:left;background:#fff;color:#241f3d;border:2px solid #e3dcd2;font-weight:500}.options button:hover{border-color:#7c5cfc;background:#fbf9ff}.eyebrow{font-size:12px;font-weight:800;margin:0;color:#5b5478}.leadForm{display:grid;gap:22px}.leadIntro{margin-bottom:4px}.leadEmoji{font-size:54px;line-height:1;margin-bottom:14px}.leadIntro h1{font-size:40px;margin:0 0 12px}.leadIntro p{font-size:20px;margin:0}.leadForm label{display:block;margin-bottom:10px;font-size:18px;font-weight:700;color:#55598a}.leadForm input:not([type=checkbox]){box-sizing:border-box;width:100%;height:60px;border:2px solid #ddd6ea;border-radius:20px;padding:0 22px;font:500 19px Inter,system-ui,sans-serif;color:#14163a;background:#fff}.leadForm input:focus{outline:none;border-color:#6c4cf5;box-shadow:0 0 0 4px rgba(108,76,245,.18)}.nameFields{display:grid;grid-template-columns:1fr 1fr;gap:20px}.field.invalid input,.leadForm .invalid input:not([type=checkbox]){border-color:#ff6b5e}.error{display:none;color:#e5322d;font-size:18px;margin-top:10px}.invalid .error,.consentError:not(:empty){display:block}.leadForm .consent{display:flex;align-items:flex-start;gap:16px;margin:4px 0 0}.leadForm .consent input{appearance:none;flex:none;width:34px;height:34px;margin:2px 0 0;border:3px solid #6c4cf5;border-radius:9px;background:transparent;cursor:pointer;display:grid;place-content:center}.leadForm .consent input:checked{background:#6c4cf5}.leadForm .consent input:checked::after{content:"✓";color:#fff;font-size:22px;font-weight:700}.leadForm .consent label{font-weight:500;font-size:18px;line-height:1.5;color:#2b2f7a;margin:0}.leadForm .consent.invalid input{border-color:#ff6b5e}.consentError{margin:-14px 0 0 50px}.honeypot{position:absolute;left:-9999px;height:0;width:0;opacity:0}.leadForm .primary{height:76px;margin-top:0;border-radius:28px;font-family:"Trebuchet MS",sans-serif;font-size:27px;box-shadow:0 14px 30px rgba(108,76,245,.35)}@media(max-width:600px){main{padding:20px 12px}.stage{max-width:100%}.panel{padding:34px 26px}.awning{height:18px}.leadIntro h1{font-size:30px}.leadIntro p{font-size:17px}.nameFields{grid-template-columns:1fr;gap:0}.leadForm{gap:18px}.leadForm input:not([type=checkbox]){height:54px;font-size:17px;border-radius:16px}.leadForm .consent label{font-size:15px}.leadForm .consent input{width:30px;height:30px}.leadForm .primary{height:64px;border-radius:22px;font-size:22px}.error{font-size:15px}}
      `}</style>
    </main>
  );
}
