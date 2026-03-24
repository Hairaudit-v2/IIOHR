export const academyBuildOrder = [
  {
    step: 1,
    title: "Stabilise academy contracts",
    detail:
      "Finalize TypeScript entities and JSON schemas before any module, lesson, or assessment page consumes the records."
  },
  {
    step: 2,
    title: "Seed Volume 1 content records",
    detail:
      "Create the ingestion-ready placeholders for modules, lessons, quizzes, case prompts, references, and downloadable resources."
  },
  {
    step: 3,
    title: "Map records to view models",
    detail:
      "Translate raw JSON into page-ready structures for module, lesson, and assessment surfaces."
  },
  {
    step: 4,
    title: "Build premium doctors-facing UI",
    detail:
      "Implement the page components only after the contract and view models are stable enough to avoid UI-driven schema drift."
  },
  {
    step: 5,
    title: "Add progress and moderation layers",
    detail:
      "Introduce progress tracking, scoring, faculty review, and certificate logic only after the academic content layer is proven."
  }
] as const;
