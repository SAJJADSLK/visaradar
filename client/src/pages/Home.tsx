/* =============================================================
   Home Page — SpinPick Clone
   Design: Playful Precision — white bg, purple accent, clean typography
   SEO Optimized with AdSense placements
   ============================================================= */

import Header from "@/components/Header";
import SpinWheel from "@/components/SpinWheel";
import { Link } from "wouter";
import { ArrowRight, Zap, Users, Grid3x3 } from "lucide-react";
import { useEffect } from "react";

const USE_CASES = [
  { emoji: "🏫", title: "Classrooms", desc: "Random student picks, subject prompts" },
  { emoji: "🎉", title: "Party Games", desc: "Truth or Dare, dares, challenges" },
  { emoji: "🍽️", title: "Lunch Picker", desc: 'End the "where should we eat?" debate' },
  { emoji: "🎁", title: "Prize Draws", desc: "Fair raffle for events & giveaways" },
  { emoji: "💼", title: "Team Meetings", desc: "Who presents next? Who leads?" },
  { emoji: "🎮", title: "Gaming", desc: "Random game modes, challenge pickers" },
];

const FEATURES = [
  {
    title: "Weighted Entries",
    desc: "Give some options a higher probability with custom weight values.",
    icon: "⚖️",
  },
  {
    title: "Save Your Wheels",
    desc: "Create and save unlimited wheels for classrooms, events & more.",
    icon: "💾",
  },
  {
    title: "Ready-made Templates",
    desc: "Start instantly with Yes/No, Party Games, Lunch Picker & more.",
    icon: "📋",
  },
  {
    title: "Import & Export",
    desc: "Upload a CSV, paste a list, or export your results instantly.",
    icon: "📤",
  },
  {
    title: "Satisfying Sounds",
    desc: "Real ticking sounds during spin and a fanfare when the winner lands.",
    icon: "🔊",
  },
  {
    title: "Team Division",
    desc: "Automatically split entries into balanced teams or groups.",
    icon: "👥",
  },
];

const MAIN_FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    desc: "Create and spin wheels instantly with zero loading time",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Perfect for Teams",
    desc: "Divide groups, pick presenters, and make fair decisions",
  },
  {
    icon: <Grid3x3 className="w-6 h-6" />,
    title: "Fully Customizable",
    desc: "Add unlimited entries, change colors, and save your wheels",
  },
];

export default function Home() {
  useEffect(() => {
    // Push AdSense ads when component mounts
    const w = window as any;
    if (w.adsbygoogle) {
      try {
        (w.adsbygoogle = w.adsbygoogle || []).push({});
      } catch (e) {
        console.log("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f5ff] to-white pt-20 pb-16 px-4">
        {/* Decorative blobs */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide mb-8 border border-purple-200">
            <span className="text-purple-500">✦</span>
            FREE &amp; NO SIGN-UP REQUIRED
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up animate-fade-up-delay-1 text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Random Decisions,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              }}
            >
              Made Beautiful
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up animate-fade-up-delay-2 text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            SpinPick is a fast, elegant wheel spinner for names, tasks, prizes, and decisions.
            Weighted draws, multi-winner raffles, sound effects — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link href="/wheel/new">
              <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-300 transition-all duration-200 active:scale-95">
                Create a Wheel
                <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/wheels">
              <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-gray-700 bg-white border border-gray-200 hover:border-purple-300 hover:text-purple-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95">
                My Saved Wheels
              </button>
            </Link>
          </div>

          {/* Wheel illustration */}
          <div className="animate-fade-up animate-fade-up-delay-4 flex justify-center">
            <div className="animate-float">
              <SpinWheel size={260} interactive={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ── AdSense Banner 1 ── */}
      <section className="py-6 px-4 bg-white border-y border-gray-100 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
          data-ad-slot="1234567890"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </section>

      {/* ── Main Features ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MAIN_FEATURES.map((feature, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 hover:shadow-md transition-all"
              >
                <div className="flex justify-center mb-4 text-purple-600">
                  {feature.icon}
                </div>
                <h3
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use-Case Cards ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-extrabold text-gray-900 text-center mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Perfect for Every Situation
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Whether you're in a classroom, hosting a party, running a meeting, or organizing an event, SpinPick makes random selection easy and fun.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {USE_CASES.map((uc) => (
              <div
                key={uc.title}
                className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-1 transition-all duration-200 cursor-default"
              >
                <span className="text-3xl mb-3">{uc.emoji}</span>
                <h3
                  className="text-sm font-bold text-gray-800 mb-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {uc.title}
                </h3>
                <p className="text-xs text-gray-500 leading-snug">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AdSense Banner 2 ── */}
      <section className="py-6 px-4 bg-gray-50 border-y border-gray-100 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
          data-ad-slot="9876543210"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </section>

      {/* ── Features Grid ── */}
      <section className="py-20 px-4 bg-[#f9f7ff]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Everything you need, nothing you don't
            </h2>
            <p className="text-gray-500 text-base">Built for power users and casual spinners alike.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                    {feat.icon}
                  </div>
                  <div>
                    <h3
                      className="text-sm font-bold text-gray-900 mb-1.5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {feat.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-extrabold text-gray-900 text-center mb-12"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is SpinPick really free?",
                a: "Yes! SpinPick is completely free with no hidden charges, no ads interrupting your spin, and no sign-up required.",
              },
              {
                q: "Can I save my wheels?",
                a: "Absolutely. Your wheels are saved locally in your browser, so you can access them anytime without creating an account.",
              },
              {
                q: "How many entries can I add?",
                a: "You can add unlimited entries to your wheel. The more entries, the more options for random selection.",
              },
              {
                q: "Can I share my wheels with others?",
                a: "Yes! You can generate a shareable link for any wheel and send it to friends, classmates, or team members.",
              },
              {
                q: "Does it work on mobile?",
                a: "Perfectly! SpinPick is fully responsive and works seamlessly on phones, tablets, and desktops.",
              },
              {
                q: "Can I export my data?",
                a: "Yes, you can export your wheel entries as CSV and import them into other tools or share them easily.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {item.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-center relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2
            className="text-4xl font-extrabold mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Ready to spin?
          </h2>
          <p className="text-purple-200 text-lg mb-8">No sign-up. No ads. Just spin.</p>
          <Link href="/wheel/new">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-purple-700 bg-white hover:bg-purple-50 shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95">
              Start Spinning Free
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="3" fill="white" />
                    <path d="M8 1 A7 7 0 0 1 15 8" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
                <span
                  className="text-sm font-bold text-gray-900"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  SpinPick
                </span>
              </div>
              <p className="text-xs text-gray-500">Free forever. No account required.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><Link href="/wheel/new">Create Wheel</Link></li>
                <li><Link href="/wheels">My Wheels</Link></li>
                <li><Link href="/teams">Teams</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Use Cases</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li>Classroom Picker</li>
                <li>Party Games</li>
                <li>Prize Draws</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-600">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 text-center text-xs text-gray-500">
            <p>&copy; 2026 SpinPick. All rights reserved. Made with ❤️ for decision makers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
