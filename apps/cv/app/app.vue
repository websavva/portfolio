<template>
  <div class="cv-container">
    <!-- CV Content -->
    <div class="cv-content">
      <!-- 1. Personal Info Header -->
      <header class="cv-header">
        <div class="header-main">
          <div class="header-info">
            <h1 class="cv-name">{{ personalInfo.fullName }}</h1>
            <h2 class="cv-position">{{ personalInfo.position }}</h2>
            <p class="cv-occupation">{{ personalInfo.occupation }}</p>
          </div>
          <div class="header-photo">
            <img
              :src="personalInfo.photo"
              :alt="personalInfo.fullName"
              class="photo"
            />
          </div>
        </div>
        <div class="header-contacts">
          <div class="contact-item">
            <NuxtIcon name="codicon:mail" />
            <a :href="`mailto:${personalInfo.email}`">{{ personalInfo.email }}</a>
          </div>
          <div class="contact-item">
            <NuxtIcon name="codicon:github" />
            <a :href="`https://github.com/${personalInfo.github}`" target="_blank">{{ personalInfo.github }}</a>
          </div>
          <div class="contact-item">
            <NuxtIcon name="codicon:globe" />
            <a :href="personalInfo.website" target="_blank">{{ personalInfo.website }}</a>
          </div>
          <div class="contact-item">
            <NuxtIcon name="codicon:calendar" />
            <span>{{ personalInfo.age }} years old</span>
          </div>
          <div class="contact-item">
            <NuxtIcon name="codicon:briefcase" />
            <span>{{ personalInfo.experience }} of experience</span>
          </div>
        </div>
      </header>

      <!-- 2. Brief Intro -->
      <section class="cv-section intro-section">
        <h2 class="section-title">About</h2>
        <p class="intro-text">{{ intro }}</p>
      </section>

      <!-- 3. Core Skills -->
      <section class="cv-section skills-section">
        <h2 class="section-title">Core Skills</h2>
        <div class="skills-grid">
          <div
            v-for="skill in skills"
            :key="skill.category"
            class="skill-category"
          >
            <h3 class="skill-category-title">{{ skill.category }}</h3>
            <div class="skill-items">
              <span
                v-for="item in skill.items"
                :key="item"
                class="skill-item"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Education & Career Timeline -->
      <section class="cv-section timeline-section">
        <h2 class="section-title">Education & Career</h2>
        <div class="timeline">
          <div
            v-for="(item, index) in timeline"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-marker" />
            <div class="timeline-content">
              <div class="timeline-header">
                <h3 class="timeline-title">{{ item.title }}</h3>
                <span class="timeline-date">{{ item.date }}</span>
              </div>
              <p class="timeline-organization">{{ item.organization }}</p>
              <p
                v-if="item.description"
                class="timeline-description"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const personalInfo = {
  fullName: 'Savva Prokofiev',
  position: 'Middle/Senior Frontend Developer',
  occupation: 'Frontend Engineer',
  email: 'contact@websavva.dev',
  github: 'websavva',
  website: 'websavva.dev',
  age: 27,
  experience: '4+ years',
  photo: '/me.webp',
};

const intro = 'B.S. in Business Informatics with solid frontend experience. Passionate about building fast, accessible, and user-friendly web applications using modern technologies.';

const skills = [
  {
    category: 'Frontend',
    items: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Nitro', 'Express', 'RESTful APIs'],
  },
  {
    category: 'Tools & Others',
    items: ['Git', 'Docker', 'Nginx', 'CI/CD', 'ESLint', 'Prettier'],
  },
];

const timeline = [
  {
    title: 'Middle Frontend Developer',
    organization: 'Work24',
    date: '2023 - Present',
    description: 'Developing and maintaining frontend applications using Vue.js and modern web technologies.',
  },
  {
    title: 'B.S. in Business Informatics',
    organization: 'Saint Petersburg State University',
    date: '2016 - 2021',
    description: 'Specialized in software development, database management, and information systems.',
  },
];

const handlePrint = () => {
  window.print();
};
</script>

<style scoped>
.cv-container {
  min-height: 100vh;
  background: #ffffff;
  padding: 2rem;
  max-width: 210mm;
  margin: 0 auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1a1a1a;
  line-height: 1.6;
}

.print-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  z-index: 1000;
}

.print-button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.cv-content {
  background: white;
}

/* Header Section */
.cv-header {
  border-bottom: 3px solid #2563eb;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.header-main {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: start;
  margin-bottom: 1.5rem;
}

.header-info {
  flex: 1;
}

.cv-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.cv-position {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 0.25rem 0;
}

.cv-occupation {
  font-size: 1.125rem;
  color: #666;
  margin: 0;
}

.header-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #2563eb;
  flex-shrink: 0;
}

.photo {
  width: 100%;
  height: auto;
  transform: scale(1) translateY(-2px)
}

.header-contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.contact-item a {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-item a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

/* Section Styles */
.cv-section {
  margin-bottom: 2.5rem;
  page-break-inside: avoid;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

/* Intro Section */
.intro-text {
  font-size: 1rem;
  color: #374151;
  line-height: 1.8;
  margin: 0;
}

/* Skills Section */
.skills-grid {
  display: grid;
  gap: 1.5rem;
}

.skill-category {
  page-break-inside: avoid;
}

.skill-category-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 0.75rem 0;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  padding: 0.375rem 0.75rem;
  background: #eff6ff;
  color: #1e40af;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #dbeafe;
}

/* Timeline Section */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e5e7eb;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  page-break-inside: avoid;
}

.timeline-marker {
  position: absolute;
  left: -1.75rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #2563eb;
  border: 3px solid white;
  box-shadow: 0 0 0 3px #e5e7eb;
}

.timeline-content {
  background: #f9fafb;
  padding: 1.25rem;
  border-radius: 0.5rem;
  border-left: 3px solid #2563eb;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.timeline-date {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
}

.timeline-organization {
  font-size: 1rem;
  color: #2563eb;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
}

.timeline-description {
  font-size: 0.9375rem;
  color: #4b5563;
  margin: 0.5rem 0 0 0;
  line-height: 1.6;
}
</style>
