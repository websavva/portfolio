import {
  CvHeader,
  CvIntro,
  CvSkills,
  CvEducation,
  CvCareer,
} from '#components';

export default defineComponent({
  name: 'CV',

  setup() {
    return () => (
      <div class="min-h-screen bg-white">
        <div
          id="cv"
          class="max-w-[210mm] mx-auto p-8 bg-white space-y-8"
        >
          <CvHeader />
          <CvIntro />
          <CvCareer />
          <CvEducation />
          <CvSkills />
        </div>
      </div>
    );
  },
});
