import { useEffect, useState } from "react";

type Match = "B" | "P" | "F";
const results = {
  B: { emoji: "🧰", name: "The Tool Explorer", course: "1-Day Gen AI — Go Beyond the Chat Box", href: "https://breakthroughacademy.sg/genai", blurb: "Go beyond the chat box and learn which Gen AI tool fits each part of your real work." },
  P: { emoji: "⚡", name: "The Time Reclaimer", course: "1-Day Productivity — Remove Repetitive, Mundane Tasks", href: "https://ai.theqdacademy.com/aiproductivity", blurb: "Build practical AI workflows that take repetitive admin off your plate." },
  F: { emoji: "🎯", name: "The Funnel Boss", course: "3-Day Customer Journey Mapping — Full Sales Funnel Automation", href: "https://ai.theqdacademy.com/cjm", blurb: "Map your customer journey and build AI automation from lead capture to close." },
};
export default function ResultPage() {
  const [match, setMatch] = useState<Match | null>(null);
  useEffect(() => { const value = sessionStorage.getItem("ai-course-quiz-match"); if (value === "B" || value === "P" || value === "F") setMatch(value); }, []);
  const result = match ? results[match] : null;
  return <main><section>{result ? <><div>{result.emoji}</div><p>YOUR MATCH</p><h1>{result.name}</h1><strong>{result.course}</strong><p>{result.blurb}</p><a href={result.href}>Read Course Details</a></> : <><h1>Your result is ready</h1><p>Please return to the quiz and complete it first.</p><a href="/">Start the quiz</a></>}</section><style jsx>{`main{min-height:100vh;display:grid;place-items:center;padding:24px;background:#111427;font-family:Inter,system-ui;color:#14163a}section{max-width:600px;padding:48px;background:#fdf6ea;border-radius:32px}section div{font-size:56px}h1{font-size:40px;margin:12px 0}p{font-size:18px;line-height:1.5;color:#55598a}strong{color:#5a3de0}a{display:block;margin-top:24px;padding:18px;border-radius:24px;text-align:center;background:#6c4cf5;color:#fff;font-weight:800;text-decoration:none}`}</style></main>;
}
