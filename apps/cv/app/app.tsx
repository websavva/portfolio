import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'CVApp',

  setup() {
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

    const intro =
      'B.S. in Business Informatics with solid frontend experience building modern, accessible web applications. Passionate about clean code, user experience, and performance optimization.';

    const skills = [
      {
        category: 'Frontend',
        items: [
          'Vue.js',
          'Nuxt.js',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'HTML5',
          'CSS3',
          'React',
        ],
      },
      {
        category: 'Backend',
        items: [
          'Node.js',
          'Nitro',
          'Express',
          'RESTful APIs',
          'PostgreSQL',
        ],
      },
      {
        category: 'Tools & DevOps',
        items: [
          'Git',
          'Docker',
          'Nginx',
          'CI/CD',
          'GitHub Actions',
          'Webpack',
          'Vite',
        ],
      },
    ];

    const timeline = [
      {
        title: 'Middle Frontend Developer',
        organization: 'Work24',
        date: '2023 - Present',
        description:
          'Developing and maintaining complex frontend applications using Vue.js, Nuxt.js, and modern web technologies. Focus on performance optimization and user experience.',
      },
      {
        title: 'Frontend Developer',
        organization: 'Previous Company',
        date: '2021 - 2023',
        description:
          'Built responsive web applications and collaborated with cross-functional teams.',
      },
      {
        title: 'B.S. in Business Informatics',
        organization: 'Saint Petersburg State University',
        date: '2016 - 2021',
        description:
          'Specialized in software development, database management, and information systems. Graduated with honors.',
      },
    ];

    return () => {
      return (
        <div class="min-h-screen bg-white">
          <div class="max-w-[210mm] mx-auto p-8 bg-white">
            {/* 1. Personal Info Header */}
            <header class="border-b-4 border-blue-600 pb-6 mb-8">
              <div class="grid grid-cols-[1fr_auto] gap-8 items-start mb-6">
                <div class="space-y-2">
                  <h1 class="text-5xl font-bold text-gray-900 leading-tight">
                    {personalInfo.fullName}
                  </h1>
                  <h2 class="text-2xl font-semibold text-blue-600">
                    {personalInfo.position}
                  </h2>
                  <p class="text-lg text-gray-600">
                    {personalInfo.occupation}
                  </p>
                </div>

                {/* 5. Personal Photo */}
                <div class="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-600 flex-shrink-0">
                  <img
                    src={personalInfo.photo}
                    alt={personalInfo.fullName}
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div class="flex flex-wrap gap-6 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <NuxtIcon
                    name="codicon:mail"
                    class="text-blue-600"
                  />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    class="text-blue-600 hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <NuxtIcon
                    name="codicon:github"
                    class="text-blue-600"
                  />
                  <a
                    href={`https://github.com/${personalInfo.github}`}
                    target="_blank"
                    class="text-blue-600 hover:underline"
                  >
                    {personalInfo.github}
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <NuxtIcon
                    name="codicon:globe"
                    class="text-blue-600"
                  />
                  <a
                    href={`https://${personalInfo.website}`}
                    target="_blank"
                    class="text-blue-600 hover:underline"
                  >
                    {personalInfo.website}
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <NuxtIcon
                    name="codicon:calendar"
                    class="text-blue-600"
                  />
                  <span>{personalInfo.age} years old</span>
                </div>
                <div class="flex items-center gap-2">
                  <NuxtIcon
                    name="codicon:briefcase"
                    class="text-blue-600"
                  />
                  <span>
                    {personalInfo.experience} of experience
                  </span>
                </div>
              </div>
            </header>

            {/* 2. Brief Intro */}
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                About
              </h2>
              <p class="text-base text-gray-700 leading-relaxed">
                {intro}
              </p>
            </section>

            {/* 3. Core Skills */}
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                Core Skills
              </h2>
              <div class="space-y-6">
                {skills.map((skill) => (
                  <div
                    key={skill.category}
                    class="space-y-3"
                  >
                    <h3 class="text-lg font-semibold text-blue-600">
                      {skill.category}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          class="px-3 py-1.5 bg-blue-50 text-blue-900 rounded-md text-sm font-medium border border-blue-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Education & Career Timeline */}
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                Education & Career
              </h2>
              <div class="relative pl-8 space-y-8">
                {/* Timeline line */}
                <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />

                {timeline.map((item, index) => (
                  <div
                    key={index}
                    class="relative"
                  >
                    {/* Timeline marker */}
                    <div class="absolute -left-7 top-2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow" />

                    {/* Timeline content */}
                    <div class="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-600">
                      <div class="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <h3 class="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <span class="text-sm text-gray-500 font-medium whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                      <p class="text-base text-blue-600 font-medium mb-2">
                        {item.organization}
                      </p>
                      {item.description && (
                        <p class="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      );
    };
  },
});
