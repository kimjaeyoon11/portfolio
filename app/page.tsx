"use client";

import { useState, useEffect } from "react";

const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "CSS/HTML"], icon: "💻" },
  { category: "AI & Cloud", items: ["Azure AI Services (AI-900)", "RAG 파이프라인", "MCP 기술"], icon: "🤖" },
  { category: "Hardware/Embedded", items: ["Raspberry Pi Pico", "I2S 오디오 인터페이스", "하드웨어 인터페이싱"], icon: "🔧" },
  { category: "Frontend", items: ["Web Front-end", "UI/UX 설계", "데이터 시각화"], icon: "🎨" },
];

const projects = [
  {
    title: "Azure AI-900 학습 플랫폼",
    description:
      "Azure AI-900 자격증 취득을 목표로 하는 학습자들을 위한 웹 기반 인터랙티브 학습 사이트를 직접 기획하고 구현했습니다. JavaScript를 활용한 동적 UI, 용어 사전 툴팁 기능, 10문항 퀴즈 시스템을 설계하여 학습자 경험을 최우선으로 고려한 UI/UX를 구현했습니다.",
    tags: ["JavaScript", "CSS", "Web Front-end", "UI/UX"],
    icon: "☁️",
    color: "from-blue-500 to-green-500",
    highlight: "학습자 경험 중심의 인터랙티브 UI 설계",
  },
  {
    title: "Raspberry Pi Pico 오디오 시스템",
    description:
      "임베디드 환경에서 오디오 앰프 및 마이크 모듈을 Raspberry Pi Pico와 연동하여 오디오 입출력 시스템을 구축했습니다. I2S 핀 공유 최적화 문제를 해결하며 하드웨어 제약 속에서 창의적인 해결책을 도출했습니다.",
    tags: ["Raspberry Pi Pico", "I2S 프로그래밍", "하드웨어 인터페이싱"],
    icon: "🎵",
    color: "from-green-500 to-teal-500",
    highlight: "I2S 핀 공유 최적화로 하드웨어 문제 해결",
  },
  {
    title: "오타니 쇼헤이 데이터 시각화",
    description:
      "야구 선수 오타니 쇼헤이의 투타 겸업(이도류) 기록 데이터를 직관적으로 비교·분석할 수 있는 웹 서비스를 기획부터 구현까지 주도했습니다. 복잡한 통계 데이터를 인터랙티브 대시보드 형태로 시각화하여 스토리를 전달하는 데이터 비주얼라이제이션을 구현했습니다.",
    tags: ["JavaScript", "CSS", "데이터 시각화", "UI/UX 디자인"],
    icon: "⚾",
    color: "from-teal-500 to-emerald-500",
    highlight: "복잡한 데이터를 직관적 스토리로 시각화",
  },
];

const timeline = [
  {
    year: "학습 중",
    title: "Azure AI-900 자격증 수준 학습",
    description: "Azure AI Services 핵심 개념 및 실습 수준 지식 보유",
    icon: "🎓",
  },
  {
    year: "경험",
    title: "프랑스 파리 현지 탐방",
    description: "Place de Dublin 및 예술 전시회 참관으로 인문학적 인사이트 보유",
    icon: "🗼",
  },
  {
    year: "경험",
    title: "중국 전통 예술 및 문화 활동",
    description: "다양한 문화적 감수성과 글로벌 역량 함양",
    icon: "🎋",
  },
  {
    year: "수강",
    title: "네트워크 프로그래밍 · 디자인 씽킹",
    description: "사용자 중심 문제 정의 및 솔루션 도출 방법론 체화",
    icon: "💡",
  },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-lg border-b border-green-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-xl font-black text-green-700 tracking-tight hover:text-green-600 transition-colors"
        >
          KJY<span className="text-green-400">.</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "소개", id: "about" },
            { label: "기술", id: "skills" },
            { label: "프로젝트", id: "projects" },
            { label: "활동", id: "activities" },
            { label: "연락", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link text-sm font-medium transition-colors ${
                scrolled ? "text-gray-700 hover:text-green-600" : "text-green-100 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("contact")}
          className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-500 transition-colors"
        >
          연락하기
        </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Avatar */}
        <div className="animate-fade-in mb-10 flex justify-center">
          <div className="animate-pulse-green w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-5xl shadow-2xl border-4 border-green-400/30">
            🧑‍💻
          </div>
        </div>

        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/20 border border-green-400/30 text-green-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AI & Software Developer
          </div>
        </div>

        <h1 className="animate-fade-in-up delay-100 text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
          김재윤
        </h1>
        <p className="animate-fade-in-up delay-200 text-2xl md:text-3xl text-green-300 font-light mb-8">
          Kim Jae Yoon
        </p>

        <p className="animate-fade-in-up delay-300 text-lg md:text-xl text-green-100/80 max-w-2xl mx-auto leading-relaxed mb-12">
          기술과 문화, 두 세계를 아우르는 개발자.<br />
          <span className="text-green-300 font-semibold">사람 중심의 AI 솔루션</span>으로
          세상을 연결합니다.
        </p>

        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:-translate-y-1"
          >
            프로젝트 보기
          </button>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-lg border border-white/30 transition-all duration-300 hover:-translate-y-1"
          >
            소개 보기
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="animate-float absolute bottom-10 left-1/2 -translate-x-1/2 text-green-400/60">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-green-400/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-green-600 font-bold text-sm tracking-widest uppercase mb-3">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            저를 소개합니다
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-green-50 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-800 mb-3">
                🌍 기술과 문화의 교차점
              </h3>
              <p className="text-gray-600 leading-relaxed">
                프랑스 파리의 예술 전시회와 중국 전통 문화 활동을 직접 경험하며,
                단순히 기술을 구현하는 것을 넘어 <strong className="text-green-700">사람 중심의 시각</strong>으로
                문제를 바라보는 관점을 형성했습니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                🎯 디자인 씽킹 실천가
              </h3>
              <p className="text-gray-600 leading-relaxed">
                기능 구현에 앞서 <strong>&quot;사용자가 무엇을 필요로 하는가&quot;</strong>를 먼저 묻는 습관.
                Design Thinking 방법론을 통해 사용자 중심의 문제 정의와
                솔루션 도출 방식을 체화하였습니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                ⚡ 빠른 학습 능력
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Azure AI Services, RAG, MCP 등 빠르게 변화하는 AI 분야의 핵심 기술들을
                자기 주도적으로 학습. Raspberry Pi Pico 임베디드 프로젝트까지 경험하며
                소프트웨어와 하드웨어 경계를 넘나드는 유연한 역량을 보유하고 있습니다.
              </p>
            </div>
          </div>

          {/* Right - Stats & Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-black mb-6">핵심 역량</h3>
              <div className="space-y-5">
                {[
                  { label: "Frontend / Web 개발", value: 80 },
                  { label: "AI & Cloud 기술", value: 70 },
                  { label: "임베디드 / 하드웨어", value: 60 },
                  { label: "데이터 시각화", value: 75 },
                  { label: "UI/UX 설계", value: 72 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-200">{item.label}</span>
                      <span className="text-green-400 font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-green-900/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full skill-bar"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-100">
                <div className="text-4xl mb-2">3</div>
                <div className="text-sm text-gray-600 font-medium">프로젝트 완성</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-100">
                <div className="text-4xl mb-2">4+</div>
                <div className="text-sm text-gray-600 font-medium">기술 분야</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-100">
                <div className="text-4xl mb-2">🌍</div>
                <div className="text-sm text-gray-600 font-medium">글로벌 경험</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-100">
                <div className="text-4xl mb-2">AI</div>
                <div className="text-sm text-gray-600 font-medium">전문 분야</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-green-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-green-400 font-bold text-sm tracking-widest uppercase mb-3">
            Technical Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            기술 스택
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className={`card-hover bg-green-900/50 border border-green-800 rounded-2xl p-6 delay-${index * 100}`}
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-lg font-bold text-green-300 mb-4">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-green-100/80 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech tags cloud */}
        <div className="mt-16 text-center">
          <h3 className="text-green-400 font-semibold mb-6 text-lg">전체 기술 목록</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Python", "JavaScript", "CSS/HTML",
              "Azure AI Services", "AI-900", "RAG", "MCP",
              "Raspberry Pi Pico", "I2S 오디오", "하드웨어 인터페이싱",
              "Web Front-end", "UI/UX", "데이터 시각화",
              "디자인 씽킹", "네트워크 프로그래밍",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-green-400/10 border border-green-400/30 text-green-300 text-sm font-medium hover:bg-green-400/20 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-green-600 font-bold text-sm tracking-widest uppercase mb-3">
            Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            프로젝트 경험
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`card-hover bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Icon panel */}
              <div
                className={`md:w-64 flex-shrink-0 bg-gradient-to-br ${project.color} flex items-center justify-center text-7xl p-12 min-h-48`}
              >
                {project.icon}
              </div>

              {/* Content */}
              <div className="flex-1 p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">{project.title}</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-4">
                  <span>✨</span>
                  {project.highlight}
                </div>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  return (
    <section id="activities" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-green-600 font-bold text-sm tracking-widest uppercase mb-3">
            Activities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            주요 활동 및 경험
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-green-200 -translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div
                    className={`card-hover bg-white border border-green-100 rounded-2xl p-6 shadow-sm ml-16 md:ml-0`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-green-500 border-4 border-white shadow-lg flex items-center justify-center text-lg z-10">
                  {item.icon}
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Goal section */}
        <div className="mt-20 bg-gradient-to-br from-green-900 to-green-700 rounded-3xl p-10 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">🚀</div>
            <h3 className="text-3xl font-black mb-6">향후 목표 및 포부</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 rounded-2xl p-5">
                <h4 className="text-green-300 font-bold mb-2">단기 목표</h4>
                <p className="text-green-100/80 text-sm leading-relaxed">
                  Python과 JavaScript 역량을 심화하고, Azure AI 서비스와 RAG 파이프라인을
                  실제 프로덕트에 적용하는 경험을 쌓겠습니다.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-5">
                <h4 className="text-green-300 font-bold mb-2">중장기 목표</h4>
                <p className="text-green-100/80 text-sm leading-relaxed">
                  사용자 경험을 최우선으로 고려하는 AI 애플리케이션 아키텍처를
                  설계할 수 있는 개발자가 되는 것을 목표로 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelfIntroSection() {
  const strengths = [
    {
      icon: "👁️",
      title: "사용자 관점 문제 해결",
      desc: "디자인 씽킹 방법론으로 '사용자가 무엇을 필요로 하는가'를 먼저 묻는 습관",
    },
    {
      icon: "⚡",
      title: "빠른 기술 습득",
      desc: "Azure AI, RAG, MCP에서 임베디드 하드웨어까지 자기 주도 학습으로 빠르게 확장",
    },
    {
      icon: "🌐",
      title: "글로벌 문화 감수성",
      desc: "파리, 중국 문화 직접 체험을 통한 다양한 관점과 인문학적 인사이트 보유",
    },
  ];

  return (
    <section className="py-24 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-green-600 font-bold text-sm tracking-widest uppercase mb-3">
            My Strengths
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            나의 강점
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {strengths.map((s) => (
            <div
              key={s.title}
              className="card-hover bg-white rounded-2xl p-8 border border-green-100 text-center shadow-sm"
            >
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="bg-white rounded-3xl p-10 border border-green-100 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl text-green-200 mb-4 font-serif">&ldquo;</div>
            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium mb-6">
              AI 기술이 빠르게 발전하면서 기술 그 자체보다{" "}
              <span className="text-green-600 font-bold">&quot;기술로 무엇을 할 수 있는가&quot;</span>가
              더 중요해지는 시대가 되었습니다. 저는 기술과 사람을 연결하는
              AI 소프트웨어 개발자로 성장하고 싶습니다.
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                K
              </div>
              <div>
                <div className="font-bold text-gray-900">김재윤</div>
                <div className="text-sm text-gray-500">AI & Software Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-green-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block text-green-400 font-bold text-sm tracking-widest uppercase mb-3">
          Contact
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          함께 만들어가요
        </h2>
        <div className="section-divider w-24 mx-auto mb-8" />
        <p className="text-green-100/70 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          새로운 기회, 협업 제안, 또는 단순한 안부 인사도 환영합니다.
          언제든지 연락 주세요.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <a
            href="mailto:kimjeayoon1@naver.com"
            className="card-hover bg-green-900/50 border border-green-800 rounded-2xl p-6 text-center group"
          >
            <div className="text-3xl mb-3">📧</div>
            <div className="text-green-400 font-semibold mb-1 text-sm">이메일</div>
            <div className="text-white text-sm break-all">kimjeayoon1@naver.com</div>
          </a>

          <div className="card-hover bg-green-900/50 border border-green-800 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">💼</div>
            <div className="text-green-400 font-semibold mb-1 text-sm">지원 분야</div>
            <div className="text-white text-sm">AI / 소프트웨어 개발</div>
          </div>

          <div className="card-hover bg-green-900/50 border border-green-800 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">📍</div>
            <div className="text-green-400 font-semibold mb-1 text-sm">현황</div>
            <div className="text-white text-sm">대학교 재학 중</div>
          </div>
        </div>

        <a
          href="mailto:kimjeayoon1@naver.com"
          className="inline-flex items-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:-translate-y-1"
        >
          <span>📬</span>
          이메일 보내기
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black py-8 text-center">
      <p className="text-gray-600 text-sm">
        © 2026 김재윤 (Kim Jae Yoon). Built with{" "}
        <span className="text-green-500">Next.js</span> &{" "}
        <span className="text-green-500">Tailwind CSS</span>.
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <SelfIntroSection />
      <ActivitiesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
