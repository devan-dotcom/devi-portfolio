"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const EMAIL = "devanandriyan@gmail.com";
const PHONE_DISPLAY = "081229722175";
const WHATSAPP_URL = "https://wa.me/6281229722175";
const LINKEDIN_URL = "https://www.linkedin.com/";

const overviewStats = [
  { value: "2+", label: "Years HR Experience" },
  { value: "193", label: "Assessment Participants" },
  { value: "3", label: "HR Digital Projects" },
  { value: "ISO", label: "9001:2015 Documentation" },
];

const compactProfile = [
  "HR Professional with Psychology background",
  "Talent Acquisition, HR Operations, People Development",
  "SOP HR, ISO 9001:2015 documentation, employee administration",
  "Building AI-assisted HR systems, dashboards, and people analytics tools",
];

const experiences = [
  {
    company: "Politeknik Sinar Mas Berau Coal",
    location: "Berau, Kalimantan Timur",
    role: "Staf HR",
    period: "Jan 2024 — Present",
    summary:
      "Mengelola proses HR operasional, recruitment, onboarding, administrasi karyawan, SOP HR berbasis ISO 9001:2015, dan pengembangan SDM di lingkungan pendidikan vokasi.",
    highlights: [
      "Talent acquisition & onboarding end-to-end",
      "SOP HR berbasis ISO 9001:2015",
      "Administrasi cuti, absensi, lembur, PHL, data karyawan, dan klaim kesehatan",
      "Project Manager implementasi mesin absensi fingerprint di 2 lokasi",
      "Project Manager TNA dan program induksi karyawan baru",
    ],
  },
  {
    company: "Affexia / XPSYCARE",
    location: "Kalimantan Utara",
    role: "Founder & Advisor",
    period: "Nov 2024 — Present",
    summary:
      "Membangun inisiatif layanan psikologi berbasis asesmen, konseling, mental health awareness, dan pengembangan program berbasis evidence-based practice.",
    highlights: [
      "Founder & Lead Developer XPSYCARE",
      "Pengembangan program kesehatan mental berbasis digital",
      "Evidence-based assessment and intervention workflow",
      "Supervisi dan arahan strategis untuk psikolog/konselor junior",
      "Kolaborasi lintas institusi untuk layanan psikologi berkelanjutan",
    ],
  },
];

const projects = [
  {
    id: "reimbursement",
    title: "Medical Reimbursement System",
    fullTitle: "Medical Reimbursement Management System",
    category: "HR Operations Automation",
    status: "Built",
    year: "2026",
    oneLiner: "Dashboard reimbursement kesehatan untuk employee, HR, dan Finance.",
    problem:
      "Proses klaim kesehatan manual membuat status pengajuan, verifikasi, bukti kuitansi, approval, dan pembayaran sulit dipantau secara real-time.",
    solution:
      "Membangun dashboard berbasis role untuk pengajuan klaim, upload bukti, verifikasi HR, approval Finance, tracking pembayaran, dan riwayat klaim.",
    impact:
      "Membantu proses klaim menjadi lebih transparan, terdokumentasi, mudah dipantau, dan mengurangi pekerjaan administratif manual.",
    features: [
      "Employee submission",
      "HR verification",
      "Finance approval",
      "Receipt upload",
      "Payment tracking",
      "Claim history",
    ],
  },
  {
    id: "attendance",
    title: "HARMONY Attendance HRIS",
    fullTitle: "HARMONY Attendance, Leave & PHL System",
    category: "HRIS Workflow Design",
    status: "Built / Iterated",
    year: "2026",
    oneLiner:
      "Sistem absensi, cuti, izin, PHL, approval atasan, dan final report HR.",
    problem:
      "Data absensi, cuti, izin, PHL, dan approval sering tersebar di banyak file, sehingga rawan salah rekap dan tidak efisien untuk monitoring HR.",
    solution:
      "Mendesain sistem HRIS terintegrasi untuk upload data mesin absensi, konfirmasi employee, approval atasan, pengajuan cuti/PHL, kalender libur, lock periode, dan export laporan final.",
    impact:
      "Meningkatkan akurasi data, memperjelas alur approval, mengurangi rekap manual, dan membuat HR lebih mudah memantau periode absensi.",
    features: [
      "Attendance import",
      "Employee confirmation",
      "Supervisor approval",
      "Leave & PHL workflow",
      "Holiday calendar",
      "Final export",
    ],
  },
  {
    id: "analytics",
    title: "HARMONY Analytics",
    fullTitle: "HARMONY Analytics & People Intelligence Platform",
    category: "People Analytics",
    status: "In Development",
    year: "2026",
    oneLiner: "Dashboard analytics berbasis data karyawan untuk HR dan leadership.",
    problem:
      "Data karyawan punya nilai strategis, tapi sulit menjadi insight jika masih tersebar dan belum divisualisasikan dalam bentuk dashboard yang mudah dibaca.",
    solution:
      "Membangun platform analytics berbasis web untuk visualisasi data karyawan, workforce profile, training analysis, struktur organisasi, dan leadership dashboard.",
    impact:
      "Mendorong HR menjadi lebih data-driven dan membantu pimpinan membaca kondisi organisasi melalui visual yang lebih ringkas dan actionable.",
    features: [
      "Employee analytics",
      "Training dashboard",
      "Workforce insight",
      "Leadership view",
      "Role-based access",
      "Decision visuals",
    ],
  },
];

const skillGroups = [
  {
    title: "HR Core",
    skills: [
      "Talent Acquisition",
      "Onboarding",
      "HR Administration",
      "Employee Data",
      "Compensation & Benefit",
      "Labor Law",
      "Job Description",
      "SOP ISO 9001:2015",
    ],
  },
  {
    title: "People Development",
    skills: [
      "Training Needs Analysis",
      "ADDIE Method",
      "Balanced Scorecard KPI",
      "BEI Interview",
      "Psychological Test Admin",
      "Scoring & Reporting",
      "Assessment",
      "Induction Program",
    ],
  },
  {
    title: "Digital HR",
    skills: [
      "HR Digital Transformation",
      "AI-Assisted Web Development",
      "HRIS Workflow Design",
      "People Analytics",
      "Dashboard Design",
      "Data Visualization",
      "Workflow Automation",
      "Role-Based System",
    ],
  },
];

const achievements = [
  "Project Manager implementasi mesin absensi fingerprint di 2 lokasi kerja.",
  "Project Manager penyusunan Job Description lintas departemen.",
  "Project Manager pengembangan alat ukur psikologis untuk mahasiswa vokasi.",
  "Project Manager mass assessment psikologi bagi 193 mahasiswa.",
  "Project Manager penyusunan TNA dan implementasi program induksi karyawan baru.",
];

const trainings = [
  "CRSO BNSP — Certified Recruitment and Selection Officer",
  "Training HR Competency — AR Generasi Unggul",
  "Training Development — AR Generasi Unggul",
  "Workshop Recruitment Specialist — AR Generasi Unggul",
  "Administrasi Alat Tes Psikologi — Lembaga Psikologi Prima Solutions",
];

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId],
  );

  return (
    <main className="portfolio-shell">
      <div className="bg-grid" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <nav className="navbar">
        <a href="#top" className="brand" aria-label="Back to top">
          DA
        </a>

        <div className="nav-links">
          <a href="#summary">Summary</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="nav-cv" href="/cv-devi-andriyan-subakti.pdf" download>
          Download CV
        </a>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-card">
          <div className="hero-left">
            <span className="eyebrow">Interactive CV Portfolio</span>

            <h1>
              Devi Andriyan Subakti
              <small>HR Professional · Psychology · HR Tech</small>
            </h1>

            <p>
              Human Resources professional dengan latar belakang Psikologi yang
              menggabungkan HR operations, talent acquisition, people development,
              dan AI-assisted digital product development untuk membangun sistem HR
              yang lebih efisien, akurat, dan data-driven.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href={`mailto:${EMAIL}`} className="btn-secondary">
                Contact Me
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="photo-card">
              <div className="photo-frame">
                <Image
                  src="/profile-devi.png"
                  alt="Professional portrait of Devi Andriyan Subakti"
                  fill
                  priority
                  sizes="160px"
                  className="profile-photo"
                />
              </div>

              <div className="photo-caption">
                <strong>Devi Andriyan Subakti</strong>
                <span>HR Digital Transformation</span>
                <p>Human Resources · Psychology · People Analytics</p>
              </div>
            </div>

            <div className="quick-list">
              {compactProfile.map((item) => (
                <div key={item}>
                  <span />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="contact-strip">
              <span>Kalimantan Timur</span>
              <span>{PHONE_DISPLAY}</span>
              <span>{EMAIL}</span>
            </div>
          </div>
        </div>

        <div className="stats-row">
          {overviewStats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="summary" className="section compact-section">
        <div className="section-heading">
          <span>Executive Summary</span>
          <h2>HR profile with practical digital execution.</h2>
        </div>

        <div className="summary-grid">
          <article className="summary-card wide">
            <h3>Professional Positioning</h3>
            <p>
              Berpengalaman dalam rekrutmen, seleksi, administrasi kepegawaian,
              pengembangan SDM, SOP HR berbasis ISO, serta pengelolaan data karyawan.
              Saat ini memperkuat positioning sebagai HR yang mampu mendesain workflow,
              dashboard, dan sistem digital untuk mendukung operasional dan keputusan SDM.
            </p>
          </article>

          <article className="summary-card">
            <h3>Best Fit Roles</h3>
            <div className="pill-wrap">
              <span>HR Officer</span>
              <span>HR Operations</span>
              <span>People Development</span>
              <span>Talent Acquisition</span>
              <span>HRIS / People Analytics</span>
            </div>
          </article>
        </div>
      </section>

      <section id="projects" className="section project-section">
        <div className="section-heading row-heading">
          <div>
            <span>Digital HR Portfolio</span>
            <h2>Project visualization</h2>
          </div>
          <p>
            Project dibuat lebih visual agar recruiter langsung paham bentuk sistem,
            workflow, dan value yang dibangun.
          </p>
        </div>

        <div className="project-dashboard">
          <aside className="project-tabs">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className={activeProjectId === project.id ? "active" : ""}
              >
                <span>{project.category}</span>
                <strong>{project.title}</strong>
                <small>
                  {project.status} · {project.year}
                </small>
              </button>
            ))}
          </aside>

          <article className="project-main">
            <div className="project-copy">
              <div className="project-title">
                <span>{activeProject.category}</span>
                <h3>{activeProject.fullTitle}</h3>
                <p>{activeProject.oneLiner}</p>
              </div>

              <div className="case-columns">
                <div>
                  <strong>Problem</strong>
                  <p>{activeProject.problem}</p>
                </div>
                <div>
                  <strong>Solution</strong>
                  <p>{activeProject.solution}</p>
                </div>
                <div>
                  <strong>Impact</strong>
                  <p>{activeProject.impact}</p>
                </div>
              </div>

              <div className="feature-tags">
                {activeProject.features.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
            </div>

            <ProjectVisual projectId={activeProject.id} />
          </article>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="section-heading row-heading">
          <div>
            <span>Experience</span>
            <h2>Work experience</h2>
          </div>
          <p>
            Dibuat lebih ringkas supaya recruiter bisa scan pengalaman utama tanpa
            harus scroll terlalu panjang.
          </p>
        </div>

        <div className="experience-grid">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.company}>
              <div className="experience-top">
                <div>
                  <span>{experience.period}</span>
                  <h3>{experience.role}</h3>
                  <p>
                    {experience.company} · {experience.location}
                  </p>
                </div>
              </div>

              <p className="experience-summary">{experience.summary}</p>

              <ul>
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading row-heading">
          <div>
            <span>Selected Achievements</span>
            <h2>Key contributions</h2>
          </div>
          <p>
            Achievement dibuat padat agar value project ownership lebih cepat kebaca.
          </p>
        </div>

        <div className="achievement-list">
          {achievements.map((achievement, index) => (
            <article key={achievement}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <p>{achievement}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section-heading row-heading">
          <div>
            <span>Capability Map</span>
            <h2>Skills</h2>
          </div>
        </div>

        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div>
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section training-compact">
        <div className="section-heading">
          <span>Training & Certification</span>
          <h2>Learning record</h2>
        </div>

        <div className="training-list">
          {trainings.map((training) => (
            <div key={training}>
              <span />
              <p>{training}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-card">
          <div>
            <span>Let&apos;s Connect</span>
            <h2>
              Open for HR, People Development, HR Operations, and HR Digital
              Transformation opportunities.
            </h2>
          </div>

          <div className="contact-actions">
            <a href={`mailto:${EMAIL}`} className="btn-primary">
              Email
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-secondary dark">
              WhatsApp
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn-secondary dark">
              LinkedIn
            </a>
            <a href="/cv-devi-andriyan-subakti.pdf" download className="btn-secondary dark">
              Download CV
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} Devi Andriyan Subakti</span>
        <span>Interactive CV & HR Portfolio</span>
      </footer>
    </main>
  );
}

function ProjectVisual({ projectId }: { projectId: string }) {
  if (projectId === "reimbursement") {
    return (
      <div className="visual-card reimbursement-visual" aria-label="Reimbursement dashboard visualization">
        <div className="visual-topbar">
          <span />
          <strong>Reimbursement Dashboard</strong>
          <small>HR · Finance</small>
        </div>

        <div className="visual-stat-grid">
          <div>
            <strong>24</strong>
            <span>Claims</span>
          </div>
          <div>
            <strong>18</strong>
            <span>Verified</span>
          </div>
          <div>
            <strong>6</strong>
            <span>Pending</span>
          </div>
        </div>

        <div className="claim-flow">
          <div>
            <span>01</span>
            <p>Employee Submit</p>
          </div>
          <div>
            <span>02</span>
            <p>HR Verify</p>
          </div>
          <div>
            <span>03</span>
            <p>Finance Pay</p>
          </div>
        </div>

        <div className="mini-table">
          <div>
            <span>Claim ID</span>
            <span>Status</span>
            <span>Amount</span>
          </div>
          <div>
            <span>CLM-024</span>
            <b>Approved</b>
            <span>Rp 450K</span>
          </div>
          <div>
            <span>CLM-025</span>
            <b className="warning">Review</b>
            <span>Rp 275K</span>
          </div>
          <div>
            <span>CLM-026</span>
            <b>Paid</b>
            <span>Rp 610K</span>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === "attendance") {
    return (
      <div className="visual-card attendance-visual" aria-label="Attendance HRIS visualization">
        <div className="visual-topbar">
          <span />
          <strong>Attendance Period</strong>
          <small>11 May — 10 Jun</small>
        </div>

        <div className="attendance-layout">
          <div className="calendar-mini">
            {Array.from({ length: 30 }).map((_, index) => (
              <span
                key={index}
                className={
                  index % 7 === 5 || index % 7 === 6
                    ? "off"
                    : index % 9 === 0
                      ? "warning"
                      : "ok"
                }
              />
            ))}
          </div>

          <div className="approval-panel">
            <div>
              <strong>Employee Confirmation</strong>
              <span>92%</span>
            </div>
            <div>
              <strong>Supervisor Approval</strong>
              <span>76%</span>
            </div>
            <div>
              <strong>Final Report</strong>
              <span>Ready</span>
            </div>
          </div>
        </div>

        <div className="workflow-line">
          <span>Upload</span>
          <span>Confirm</span>
          <span>Approve</span>
          <span>Export</span>
        </div>
      </div>
    );
  }

  return (
    <div className="visual-card analytics-visual" aria-label="People analytics dashboard visualization">
      <div className="visual-topbar">
        <span />
        <strong>People Analytics</strong>
        <small>Leadership View</small>
      </div>

      <div className="analytics-grid">
        <div className="analytics-kpi">
          <strong>38</strong>
          <span>Total Employees</span>
        </div>
        <div className="analytics-kpi">
          <strong>34%</strong>
          <span>Training Fulfillment</span>
        </div>
      </div>

      <div className="bar-chart">
        <div style={{ height: "72%" }} />
        <div style={{ height: "48%" }} />
        <div style={{ height: "86%" }} />
        <div style={{ height: "60%" }} />
        <div style={{ height: "74%" }} />
        <div style={{ height: "42%" }} />
      </div>

      <div className="insight-list">
        <div>
          <span />
          <p>Training needs by unit</p>
        </div>
        <div>
          <span />
          <p>Workforce profile visualization</p>
        </div>
        <div>
          <span />
          <p>Leadership decision support</p>
        </div>
      </div>
    </div>
  );
}