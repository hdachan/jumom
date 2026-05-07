"use client";

import { useState, useRef, useEffect } from "react";

const photos = [
  { id: 1, url: "/1.jpg", caption: "함께한 소중한 순간" },
  { id: 2, url: "/2.jpg", caption: "가족 나들이" },
  { id: 3, url: "/3.jpg", caption: "사랑하는 엄마아빠의 딸 아들" },
  { id: 4, url: "/4.jpg", caption: "행복한 하루" },
  { id: 5, url: "/5.jpg", caption: "사랑스러운 추억" },
  { id: 6, url: "/6.jpg", caption: "영원히 간직할 기억" },
  { id: 8, url: "/8.jpg", caption: "행복했던 날" },
  { id: 9, url: "/9.jpg", caption: "함께여서 좋았던 날" },
  { id: 10, url: "/10.jpg", caption: "사랑스러운 순간" },
];

const letters = [
  {
    id: 1,
    from: "예쁜 딸 희수",
    greeting: "To.사랑하는 엄마 & 아빠",
    content: `엄마 아빠, 어버이날이네 ㅎㅎ 오늘 같은 날 가족이 다같이 모여서 도란도란 밥 먹을 수 있으면 좋을텐데 🥹 떨어져있는 아쉬움도 크지만 늘 각자의 자리에서 최선을 다 한다는 의미니까 너무 슬퍼하진 말자 🥹🥹

어느덧 내가 서른을 앞두고 결혼 준비를 하고 있으니 신기하고 괜히 뭉클하네 🥹🥹 엄마 아빠가 아침마다 머리 묶어주고, 학교 배식 도와주고, 학원 픽업해줬을 때가 엊그제 처럼 생생한데 시간이 너무 빠른 것 같아. 지나온 세월보다 앞으로의 시간은 더 빨리 흘러갈테니까 우리 가족 소중한 추억 더 많이 많이 만들자. 행복하고 웃기만 해도 짧은 인생이라잖아. 

주영이도 나도 이제 어엿한 성인이니까, 엄마 아빠가 살아오면서 보여준 삶의 태도를 나침반 삼아서 후회없이 멋지게 살아갈게! 그 길이 쉬운 길이 아닐지라도 엄마 아빠의 자랑스러운 희수, 주영이가 될 수 있도록 늘 최선의 선택을 하며 살게. 늘 사랑으로 키워주시고 든든한 버팀목이 되어주셔서 감사합니다 !!

가끔은 속상하게 할 때도 있겠지만, 이것 또한 성장의 과정이라 생각하고 이해해주시면 감사하겠어요 ~~! 어버이날, 좋은 하루 보내길 ❤️ 사랑해용 ❤️
`,
    closing: "언제나 건강하시길 바라며",
  },
  {
    id: 2,
    from: "사랑하는 아들이",
    greeting: "To. 사랑하는 엄마, 아빠",
    content: `엄마 아빠, 어버이날이에요.
매년 돌아오는 날인데도 이상하게 올해는 더 많은 생각이 드는 것 같아요.
시간이 지나면서 자연스럽게 알게 되는 것들이 있더라고요.
예전엔 당연하다고 생각했던 것들이 사실은 엄마 아빠의 노력이었다는 걸요.

어릴 때는 그냥 묵묵히 해주는 줄만 알았는데,
이제 와서 생각해보면 그 모든 순간마다 얼마나 많은 고민과 책임감이 있었을지 조금은 알 것 같아요.
그래서 요즘은 부모님이 참 대단한 사람들이라는 생각을 자주 해요.

살아가다 보면 좋은 날도 있고 마음처럼 안 되는 날도 있지만,
그럴 때마다 결국 제 안에 남아있는 건 엄마 아빠가 보여준 삶의 모습인 것 같아요.
사람을 대하는 태도, 버티는 힘, 책임감 같은 것들이 자연스럽게 제 기준이 되었더라고요.

아직 부족한 것도 많고 걱정 끼칠 때도 있겠지만,
점점 더 믿음직한 아들이 되어가려고 노력하고 있어요.
앞으로는 엄마 아빠가 저를 걱정하기보다,
편안한 마음으로 웃는 시간이 더 많아졌으면 좋겠어요.

늘 한결같이 제 편이 되어주고,
어떤 순간에도 든든하게 자리 지켜줘서 정말 감사합니다.
아직은 부족해보이고, 표현은 자주 못해도 항상 감사한 마음 가지고 있어요.

엄마 아빠, 오래오래 건강하고
우리 가족 앞으로도 지금처럼 따뜻하게 지냈으면 좋겠어요.

사랑합니다 ❤️
`,
    closing: "사랑을 담아",
  },
];

export default function ParentsDay() {
  const [screen, setScreen] = useState<"onboarding" | "main">("onboarding");
  const [activeSection, setActiveSection] = useState<
    "home" | "photos" | "letters"
  >("home");
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(
    null,
  );
  const [selectedLetter, setSelectedLetter] = useState<
    (typeof letters)[0] | null
  >(null);
  const [volume, setVolume] = useState(0.4);
  const [petals, setPetals] = useState<
    {
      id: number;
      x: number;
      delay: number;
      duration: number;
      size: number;
      rotation: number;
      emoji: string;
    }[]
  >([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 7 + Math.random() * 7,
      size: 10 + Math.random() * 12,
      rotation: Math.random() * 360,
      emoji: ["🌸", "🌷", "🌺", "✿", "❀"][Math.floor(Math.random() * 5)],
    }));
    setPetals(generated);

    audioRef.current = new Audio("/bgm.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const enterMain = () => {
    setScreen("main");
    audioRef.current?.play().catch(() => {});
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Nanum+Myeongjo:wght@400;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes fall {
      0% { transform: translateY(-60px) rotate(0deg) scale(1); opacity: 1; }
      80% { opacity: 0.6; }
      100% { transform: translateY(110vh) rotate(540deg) scale(0.6); opacity: 0; }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes glow {
      0%, 100% { text-shadow: 0 0 20px rgba(200,120,80,0.3); }
      50% { text-shadow: 0 0 40px rgba(200,120,80,0.6), 0 0 80px rgba(200,120,80,0.2); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.04); opacity: 1; }
    }
    @keyframes unfold {
      0% { opacity: 0; transform: scaleY(0.92) translateY(16px); }
      100% { opacity: 1; transform: scaleY(1) translateY(0); }
    }

    .petal {
      position: fixed;
      top: -60px;
      pointer-events: none;
      z-index: 0;
      animation: fall linear infinite;
    }

    .onboarding-bg {
      background: radial-gradient(ellipse at 30% 40%, #ffe8e0 0%, #fff4f8 35%, #f0eeff 65%, #e8f4ff 100%);
    }

    .main-bg {
      background: linear-gradient(155deg, #fff9f5 0%, #fdf5f8 40%, #f5f0fd 70%, #f0f5ff 100%);
    }

    .onboard-enter-btn {
      font-family: 'Noto Serif KR', serif;
      background: none;
      border: none;
      cursor: pointer;
      position: relative;
      padding: 16px 52px;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.15em;
      color: #7a4030;
      transition: all 0.4s ease;
    }
    .onboard-enter-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 40px;
      border: 1px solid rgba(200,130,100,0.5);
      transition: all 0.4s ease;
    }
    .onboard-enter-btn::after {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 38px;
      background: linear-gradient(135deg, rgba(255,220,200,0.4), rgba(255,200,220,0.3));
      transition: all 0.4s ease;
    }
    .onboard-enter-btn:hover::before {
      border-color: rgba(200,100,70,0.8);
      box-shadow: 0 0 30px rgba(200,120,80,0.2);
    }
    .onboard-enter-btn:hover {
      color: #5a2015;
      transform: translateY(-2px);
    }
    .onboard-enter-btn span { position: relative; z-index: 1; }

    .nav-btn {
      background: none;
      border: 1px solid rgba(180,120,100,0.3);
      border-radius: 28px;
      padding: 9px 24px;
      font-family: 'Noto Serif KR', serif;
      font-size: 13px;
      letter-spacing: 0.05em;
      color: #8a5a4a;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .nav-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,200,170,0.3), rgba(255,180,190,0.2));
      opacity: 0;
      transition: opacity 0.3s;
    }
    .nav-btn:hover::before, .nav-btn.active::before { opacity: 1; }
    .nav-btn.active {
      border-color: rgba(180,90,60,0.5);
      color: #6a3020;
    }

    .photo-card {
      cursor: pointer;
      border-radius: 14px;
      overflow: hidden;
      transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
      box-shadow: 0 2px 20px rgba(0,0,0,0.07);
    }
    .photo-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 50px rgba(0,0,0,0.13);
    }

    .letter-wrapper {
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .letter-wrapper:hover { transform: translateY(-3px); }

    .letter-card {
      border-radius: 2px 16px 16px 16px;
      padding: 36px 40px;
      position: relative;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
    }
    .letter-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      right: 0; height: 3px;
      border-radius: 0 16px 0 0;
      background: linear-gradient(90deg, var(--accent-color), transparent);
      opacity: 0.6;
    }
    .letter-lines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      border-radius: inherit;
    }

    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(20,8,5,0.6);
      backdrop-filter: blur(12px);
      z-index: 100;
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn 0.3s ease;
    }
    .modal-letter {
      max-width: 480px; width: 90%;
      border-radius: 3px 20px 20px 20px;
      padding: 48px 44px 40px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.25);
      animation: unfold 0.4s cubic-bezier(0.22,1,0.36,1);
      position: relative;
      max-height: 85vh;
      overflow-y: auto;
    }
    .modal-letter::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 3px;
      border-radius: 0 20px 0 0;
      background: linear-gradient(90deg, var(--accent-color), transparent);
    }

    .modal-photo {
      background: #fffdf8;
      border-radius: 20px;
      max-width: 520px; width: 90%;
      box-shadow: 0 24px 80px rgba(0,0,0,0.22);
      animation: fadeUp 0.3s ease;
      overflow: hidden;
    }

    .section-anim { animation: fadeUp 0.5s ease; }

    .music-control {
      position: fixed; top: 20px; right: 20px; z-index: 50;
      display: flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,0.7);
      border-radius: 32px; padding: 8px 16px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(200,150,120,0.25);
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    }
    .volume-slider { width: 60px; accent-color: #b07060; }

    .divider-ornament {
      text-align: center;
      margin: 10px 0 18px;
      color: var(--accent-color);
      opacity: 0.5;
      font-size: 13px;
      letter-spacing: 6px;
    }
  `;

  if (screen === "onboarding") {
    return (
      <div
        className="onboarding-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Noto Serif KR', 'Nanum Myeongjo', serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{css}</style>

        {petals.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: `${p.x}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              fontSize: `${p.size}px`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            {p.emoji}
          </div>
        ))}

        <div
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            animation: "fadeUp 1.2s ease",
          }}
        >
          {/* Decorative ring */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: "1px solid rgba(200,130,100,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 36px",
              position: "relative",
              animation: "breathe 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                border: "1px solid rgba(200,130,100,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,240,230,0.4)",
              }}
            >
              <span style={{ fontSize: 44 }}>🌷</span>
            </div>
          </div>

          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.35em",
              color: "#b08070",
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            May 8th
          </p>

          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 54px)",
              fontWeight: 600,
              color: "#4a2010",
              letterSpacing: "0.08em",
              lineHeight: 1.25,
              marginBottom: 12,
              animation: "glow 4s ease-in-out infinite",
            }}
          >
            어버이날
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "#9a6a55",
              fontWeight: 300,
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            감사합니다
          </p>

          <p
            style={{
              fontSize: 13,
              color: "#b89080",
              fontWeight: 300,
              letterSpacing: "0.08em",
              lineHeight: 1.8,
              maxWidth: 280,
              margin: "0 auto 52px",
            }}
          >
            사랑하는 부모님께
            <br />
            마음을 담아 전합니다
          </p>

          <button className="onboard-enter-btn" onClick={enterMain}>
            <span>열어보기</span>
          </button>

          <p
            style={{
              marginTop: 28,
              fontSize: 11,
              color: "#c0a090",
              letterSpacing: "0.1em",
              opacity: 0.7,
            }}
          >
            ✦ 배경음악이 함께 시작됩니다 ✦
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="main-bg"
      style={{
        minHeight: "100vh",
        fontFamily: "'Noto Serif KR', 'Nanum Myeongjo', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{css}</style>

      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Music Controls */}
      <div className="music-control">
        <span style={{ fontSize: 14 }}>♪</span>
        <span style={{ fontSize: 11, color: "#a07060", whiteSpace: "nowrap" }}>
          BGM
        </span>
        <input
          type="range"
          className="volume-slider"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>

      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 20px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            padding: "64px 0 40px",
            animation: "fadeUp 0.8s ease",
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.4em",
              color: "#b09080",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Parents' Day · May 8th
          </p>
          <h1
            style={{
              fontSize: "clamp(26px, 4.5vw, 42px)",
              fontWeight: 600,
              color: "#4a2010",
              letterSpacing: "0.06em",
              lineHeight: 1.3,
              margin: "0 0 8px",
            }}
          >
            어버이날, 감사합니다
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              margin: "16px 0 0",
            }}
          >
            <span
              style={{
                width: 24,
                height: 1,
                background: "rgba(180,110,80,0.4)",
                display: "inline-block",
                marginTop: 10,
              }}
            />
            <span style={{ fontSize: 14, color: "#c09070" }}>🌷</span>
            <span
              style={{
                width: 24,
                height: 1,
                background: "rgba(180,110,80,0.4)",
                display: "inline-block",
                marginTop: 10,
              }}
            />
          </div>

          <nav
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { key: "home", label: "메인" },
              { key: "photos", label: "사진첩" },
              { key: "letters", label: "편지" },
            ].map((item) => (
              <button
                key={item.key}
                className={`nav-btn ${activeSection === item.key ? "active" : ""}`}
                onClick={() =>
                  setActiveSection(item.key as typeof activeSection)
                }
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* HOME */}
        {activeSection === "home" && (
          <div className="section-anim">
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                borderRadius: 20,
                padding: "48px 52px",
                textAlign: "center",
                marginBottom: 28,
                border: "1px solid rgba(200,150,120,0.15)",
                boxShadow: "0 4px 40px rgba(180,120,80,0.06)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(15px, 2.2vw, 20px)",
                  lineHeight: 2.1,
                  color: "#5a3520",
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                  wordBreak: "keep-all",
                }}
              >
                "부모님의 손길 하나하나가
                <br />
                우리의 오늘을 만들어 주셨습니다.
                <br />그 사랑에 깊이 감사드립니다."
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                {
                  key: "photos",
                  icon: "📷",
                  title: "사진첩 보기",
                  desc: "함께한 소중한 순간들",
                  bg: "rgba(255,248,242,0.85)",
                  border: "rgba(220,170,130,0.25)",
                  color: "#6a3a20",
                  descColor: "#a07858",
                },
                {
                  key: "letters",
                  icon: "✉️",
                  title: "편지 읽기",
                  desc: "마음을 담아 쓴 편지",
                  bg: "rgba(242,246,255,0.85)",
                  border: "rgba(150,180,220,0.25)",
                  color: "#2a4a6a",
                  descColor: "#6080a0",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  style={{
                    background: item.bg,
                    borderRadius: 16,
                    padding: "28px 24px",
                    border: `1px solid ${item.border}`,
                    cursor: "pointer",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onClick={() =>
                    setActiveSection(item.key as typeof activeSection)
                  }
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 32px rgba(0,0,0,0.09)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  <div style={{ fontSize: 34, marginBottom: 12 }}>
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      color: item.color,
                      margin: "0 0 6px",
                      fontSize: 17,
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: item.descColor,
                      fontSize: 13,
                      margin: 0,
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 52, opacity: 0.4 }}>
              <span style={{ fontSize: 20, letterSpacing: 16 }}>🌹 🌷 🌸</span>
            </div>
          </div>
        )}

        {/* PHOTOS */}
        {activeSection === "photos" && (
          <div className="section-anim">
            <h2
              style={{
                textAlign: "center",
                color: "#5a3520",
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 32,
                letterSpacing: "0.08em",
              }}
            >
              가족 사진첩
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 18,
              }}
            >
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="photo-card"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      background: "rgba(255,252,248,0.97)",
                      padding: "12px 16px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "#5a3520",
                        fontWeight: 400,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LETTERS */}
        {activeSection === "letters" && (
          <div className="section-anim">
            <h2
              style={{
                textAlign: "center",
                color: "#5a3520",
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 10,
                letterSpacing: "0.08em",
              }}
            >
              마음을 담은 편지
            </h2>
            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#b09080",
                letterSpacing: "0.12em",
                marginBottom: 36,
              }}
            >
              편지를 클릭하면 전문을 읽을 수 있습니다
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {letters.map((letter, idx) => {
                const themes = [
                  {
                    bg: "#fdf6ef",
                    accent: "#b87a50",
                    lineColor: "rgba(184,122,80,0.08)",
                  },
                  {
                    bg: "#f0f4fa",
                    accent: "#5a7ab0",
                    lineColor: "rgba(90,122,176,0.08)",
                  },
                ];
                const theme = themes[idx % 2];
                return (
                  <div
                    key={letter.id}
                    className="letter-wrapper"
                    onClick={() =>
                      setSelectedLetter({ ...letter, ...theme } as any)
                    }
                  >
                    <div
                      className="letter-card"
                      style={{
                        background: theme.bg,
                        ["--accent-color" as any]: theme.accent,
                      }}
                    >
                      {/* Subtle ruled lines */}
                      <div className="letter-lines">
                        {Array.from({ length: 12 }, (_, i) => (
                          <div
                            key={i}
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              top: 60 + i * 28,
                              height: 1,
                              background: theme.lineColor,
                            }}
                          />
                        ))}
                      </div>

                      {/* Header */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          marginBottom: 20,
                          position: "relative",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.25em",
                              color: theme.accent,
                              opacity: 0.7,
                              marginBottom: 6,
                            }}
                          >
                            LETTER FROM
                          </p>
                          <p
                            style={{
                              fontSize: 17,
                              fontWeight: 500,
                              color: "#3a2010",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {letter.from}
                          </p>
                        </div>
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            border: `1.5px solid ${theme.accent}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0.5,
                            fontSize: 18,
                          }}
                        >
                          ✉
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: 13,
                          color: "#7a5a48",
                          fontStyle: "italic",
                          letterSpacing: "0.05em",
                          marginBottom: 14,
                          fontWeight: 300,
                          position: "relative",
                        }}
                      >
                        {letter.greeting}
                      </p>

                      <p
                        style={{
                          color: "#4a3020",
                          fontSize: 14,
                          lineHeight: 2,
                          position: "relative",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          fontWeight: 300,
                          letterSpacing: "0.02em",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {letter.content}
                      </p>

                      <div
                        style={{
                          marginTop: 18,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          opacity: 0.6,
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: 1,
                            background: `linear-gradient(90deg, ${theme.accent}, transparent)`,
                            opacity: 0.3,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 11,
                            color: theme.accent,
                            letterSpacing: "0.15em",
                          }}
                        >
                          전문 읽기
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-photo" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              style={{
                width: "100%",
                maxHeight: 360,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div style={{ padding: "22px 28px 28px" }}>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: "#5a3520",
                  margin: "0 0 20px",
                  letterSpacing: "0.03em",
                }}
              >
                {selectedPhoto.caption}
              </p>
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  background: "none",
                  border: "1px solid #c09080",
                  borderRadius: 20,
                  padding: "8px 24px",
                  color: "#8a5040",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Letter Modal */}
      {selectedLetter && (
        <div className="modal-overlay" onClick={() => setSelectedLetter(null)}>
          <div
            className="modal-letter"
            style={{
              background: (selectedLetter as any).bg || "#fdf6ef",
              ["--accent-color" as any]:
                (selectedLetter as any).accent || "#b87a50",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ruled lines in modal */}
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 70 + i * 32,
                  height: 1,
                  background:
                    (selectedLetter as any).lineColor ||
                    "rgba(184,122,80,0.07)",
                  pointerEvents: "none",
                }}
              />
            ))}

            <div style={{ position: "relative" }}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  color: (selectedLetter as any).accent || "#b87a50",
                  opacity: 0.65,
                  marginBottom: 24,
                  textTransform: "uppercase",
                }}
              >
                A Letter From {selectedLetter.from}
              </p>

              <p
                style={{
                  fontSize: 15,
                  fontStyle: "italic",
                  color: "#7a5a48",
                  marginBottom: 24,
                  letterSpacing: "0.05em",
                  fontWeight: 300,
                }}
              >
                {selectedLetter.greeting}
              </p>

              <div
                className="divider-ornament"
                style={{
                  ["--accent-color" as any]: (selectedLetter as any).accent,
                }}
              >
                · · ·
              </div>

              <p
                style={{
                  color: "#3a2010",
                  fontSize: 15,
                  lineHeight: 2.2,
                  fontWeight: 300,
                  letterSpacing: "0.03em",
                  whiteSpace: "pre-line",
                  wordBreak: "keep-all",
                  marginBottom: 28,
                }}
              >
                {selectedLetter.content}
              </p>

              <div
                className="divider-ornament"
                style={{
                  ["--accent-color" as any]: (selectedLetter as any).accent,
                }}
              >
                · · ·
              </div>

              <p
                style={{
                  textAlign: "right",
                  fontSize: 13,
                  color: (selectedLetter as any).accent || "#b87a50",
                  fontStyle: "italic",
                  marginBottom: 28,
                  letterSpacing: "0.05em",
                  opacity: 0.85,
                }}
              >
                {selectedLetter.closing}
                <br />
                <span style={{ fontWeight: 500 }}>
                  {selectedLetter.from} 올림
                </span>
              </p>

              <button
                onClick={() => setSelectedLetter(null)}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: `1px solid ${(selectedLetter as any).accent || "#b87a50"}`,
                  borderRadius: 24,
                  padding: "11px",
                  color: (selectedLetter as any).accent || "#b87a50",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  transition: "all 0.3s",
                  opacity: 0.8,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.background =
                    `rgba(0,0,0,0.04)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.8";
                  (e.currentTarget as HTMLElement).style.background = "none";
                }}
              >
                편지 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
