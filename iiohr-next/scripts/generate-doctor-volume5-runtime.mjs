/**
 * Generate Doctor Volume 5 runtime JSON (parity-complete).
 *
 * Run:
 *   node scripts/generate-doctor-volume5-runtime.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(
  __dirname,
  "..",
  "src",
  "content",
  "academy",
  "programs",
  "postgraduate-certificate-clinical-trichology-hair-restoration-medicine",
  "volume-5"
);

const volId = "volume_5_advanced_surgical_integration_professional_practice_research_certification";
const volSlug = "advanced-surgical-integration-professional-practice-research-and-certification";
const volTitle = "Advanced Surgical Integration, Professional Practice, Research, and Certification";
const citationBase = `Hair Longevity Institute; International Institute of Hair Restoration (IIIOHR). ${volTitle}`;
const access = "enrolled-only";
const pad2 = (n) => String(n).padStart(2, "0");

const modules = [
  {
    moduleNumber: 22,
    id: "module_vol5_long_hair_fue_unshaven_techniques",
    slug: "long-hair-fue-and-unshaven-techniques",
    title: "Long Hair FUE and Unshaven Techniques",
    shortTitle: "Long Hair FUE",
    lessons: [
      {
        lessonNumber: 1,
        slug: "why-long-hair-fue-matters",
        title: "Why Long Hair FUE Matters",
        lessonType: "core-lesson",
        sectionNote: "22.1",
        learningObjectives: [
          "Explain why concealment-oriented surgery is clinically relevant beyond cosmetic preference.",
          "Identify patient barriers where long-hair and unshaven approaches materially improve uptake and continuity.",
        ],
        body:
          "Long Hair FUE and unshaven approaches matter because they address real patient barriers: fear of shaving, inability to take visible downtime, professional image constraints, and gender-specific social factors. Their value is therefore pathway-level, not merely cosmetic.\n\nThis module teaches selection discipline: these approaches should be chosen when concealment and immediate visual continuity improve treatment adherence and patient confidence, not because the technique appears impressive.\n\nClinicians must preserve design logic and donor governance while operating in a more demanding visual field. In that sense, Long Hair FUE is an advanced operational method requiring structured decision-making.",
        keyTakeaways: [
          "Long Hair FUE addresses real pathway barriers (privacy, downtime, social identity), not just aesthetics.",
          "Technique selection must be indication-driven and governance-aware.",
          "Advanced visual-field complexity requires deliberate planning and team coordination.",
        ],
        redFlags: [
          "Offering long-hair approaches for marketing optics without clinical indication.",
          "Underestimating workflow complexity and compromising donor/recipient discipline.",
        ],
        reasoningPrompt:
          "A patient wants unshaven surgery because they fear workplace visibility. What factors help you decide if this is an appropriate indication rather than a default promise?",
        teachingPoint:
          "Confirm indication, donor/recipient feasibility, realistic yield, and team workflow capacity. Select long-hair methods when concealment materially improves pathway adherence and outcome quality.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "indications-and-patient-selection",
        title: "Indications and Patient Selection for Unshaven Approaches",
        lessonType: "core-lesson",
        sectionNote: "22.2",
        learningObjectives: [
          "Select patient groups most likely to benefit from concealment-oriented approaches.",
          "Differentiate high-value limited-zone work from cases better suited to standard shaved workflows.",
        ],
        body:
          "Indications include female hairline and temple refinement, diffuse pattern camouflage-sensitive work, eyebrow restoration planning, selected male public-facing professions, and repair pathways where incremental visible change is preferable to a complete shaved reset.\n\nPatient selection must still include diagnosis quality, donor economics, and realistic yield expectations. The doctor should avoid promising that unshaven methods are universally superior; they are indication-specific tools.\n\nFor women in particular, long-hair approaches can remove a major barrier to treatment uptake, but they should still be coupled to conservative design and miniaturisation-aware planning.",
        keyTakeaways: [
          "Strong indications include female concealment-sensitive pathways, eyebrow planning, and selected professional-recovery needs.",
          "Selection still depends on diagnosis quality, donor constraints, and realistic procedural goals.",
          "Unshaven methods are tools, not universal upgrades.",
        ],
        redFlags: [
          "Using indication language that ignores donor economics and realistic yield.",
          "Conflating patient preference with automatic technical suitability.",
        ],
        reasoningPrompt:
          "A patient requests full unshaven transformation in one session, but donor constraints suggest limited-zone benefit only. How do you frame the decision?",
        teachingPoint:
          "Align method to feasible zones and long-term donor strategy; counsel that concealment benefit can be achieved incrementally without overpromising immediate global change.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 3,
        slug: "workflow-challenges-and-female-eyebrow-applications",
        title: "Workflow Challenges, Female Pathways, and Eyebrow Applications",
        lessonType: "clinical-application",
        sectionNote: "22.3-22.5",
        learningObjectives: [
          "Manage visibility, orientation, and implantation workflow challenges unique to long-hair fields.",
          "Apply design-sensitive principles to female and eyebrow restoration contexts.",
        ],
        body:
          "Long Hair FUE is operationally demanding. Hair length alters orientation visibility, extraction rhythm, graft separation, and implantation control. Team choreography and field management become central quality determinants.\n\nFemale applications are often high-value indications: frontal softening, temple rounding, local density support, and selected scar-concealment scenarios where shaving barriers are substantial. Conservative design remains mandatory because diffuse miniaturisation risk can be underestimated in female pathways.\n\nEyebrow restoration is highly design-sensitive. Curl direction, orientation, and immediate preview matter psychologically and technically, requiring disciplined aesthetic planning and communication.",
        keyTakeaways: [
          "Long-hair workflows require advanced field management and team coordination.",
          "Female pathways are strong indications but still require conservative, miniaturisation-aware design.",
          "Eyebrow work is orientation-sensitive and psychologically important; design precision matters.",
        ],
        redFlags: [
          "Treating eyebrow/facial work as routine graft placement without orientation planning.",
          "Ignoring diffuse donor risk in female pathways because shaving is avoided.",
        ],
        reasoningPrompt:
          "In eyebrow restoration planning, what design and communication elements are critical before procedural commitment?",
        teachingPoint:
          "Prioritise orientation/curl realism, conservative density, and expectation alignment; small design errors are highly visible and emotionally significant in facial units.",
        evidenceOverall: "B",
        evidenceNotes: [
          {
            label: "Design sensitivity",
            tier: "B",
            note: "Concealment-oriented surgery should preserve aesthetic governance; female/eyebrow pathways require explicit orientation and conservative design logic.",
          },
        ],
      },
      {
        lessonNumber: 4,
        slug: "long-hair-fue-governance-and-case-selection",
        title: "Long Hair FUE Governance and Case Selection Discipline",
        lessonType: "clinical-application",
        sectionNote: "22 integration",
        learningObjectives: [
          "Integrate indication logic, workflow constraints, and ethical communication into final case selection.",
          "Build a realistic staged plan when concealment goals exceed safe single-session scope.",
        ],
        body:
          "The module closes with case-selection governance. Advanced techniques should not dilute core surgical prudence: candidacy logic, donor protection, realistic design, and longitudinal planning remain non-negotiable.\n\nDoctors should document why a long-hair pathway is selected, what trade-offs are accepted, and what staged alternatives are proposed when desired coverage exceeds safe immediate scope.\n\nA strong long-hair plan links concealment benefits with procedural realism, avoiding both underdelivery and overharvest risk.",
        keyTakeaways: [
          "Concealment gains must be balanced against donor safety and procedural realism.",
          "Case selection should be documented with trade-off clarity and staged options.",
          "Advanced technique does not replace foundational surgical governance.",
        ],
        redFlags: [
          "Committing to high-coverage goals in one session despite clear donor or workflow constraints.",
          "Using advanced-technique framing to bypass informed trade-off discussion.",
        ],
        reasoningPrompt:
          "A patient insists on one-session unshaven global correction. What staged plan logic keeps you ethically and surgically sound?",
        teachingPoint:
          "Convert request into phased strategy: prioritise highest-value zones, preserve donor reserve, and document rationale and alternatives clearly.",
        evidenceOverall: "B",
        evidenceNotes: [],
        quizId: "quiz_vol5_mod22",
        casePromptId: "case_vol5_mod22_a",
      },
    ],
    quiz: {
      id: "quiz_vol5_mod22",
      slug: "long-hair-fue-unshaven-knowledge-check",
      title: "Module Knowledge Check: Long Hair FUE and Unshaven Techniques",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol5_mod22_item_01",
          type: "mcq",
          stem: "Which statement best reflects disciplined use of Long Hair FUE?",
          options: [
            { id: "a", label: "Select it when concealment and social recovery materially improve the treatment pathway, while preserving donor and design governance." },
            { id: "b", label: "Offer it as a universal upgrade because it avoids shaving and is always technically superior." },
            { id: "c", label: "Use it to maximize graft count regardless of field-visibility limitations." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale:
            "Module 22 frames Long Hair FUE as indication-driven and governance-aware; it is not a universal replacement for all shaved workflows.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol5_mod22_item_02",
          type: "short-answer",
          stem: "A female patient requests unshaven frontal and temple restoration with minimal downtime. Outline your case-selection logic, key workflow cautions, and what you document before proceeding.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Confirm diagnosis and miniaturisation risk, donor reserve, realistic zone priorities, and team workflow capacity in a long-hair field. Counsel on trade-offs: visibility constraints, staged planning, and expected recovery. Document indication for concealment-oriented method, design rationale, donor strategy, and alternatives if full coverage is unsafe in one session.",
          },
          rationale: "Module 22 requires applied case-selection discipline in female concealment-sensitive pathways.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol5_mod22_a",
      slug: "vol5-mod22-case",
      title: "Case Discussion: Concealment-Driven Surgical Planning",
      clinicalScenario:
        "A 39-year-old media professional wants unshaven frontal refinement and temple restoration with no visible donor change before an on-camera schedule in four weeks. She has diffuse calibre variability and high anxiety about shaving. She requests maximum coverage in a single session.",
      discussionPrompts: [
        "How do you determine whether long-hair/unshaven strategy is appropriate and which zones to prioritise?",
        "What donor and miniaturisation checks are essential before accepting an accelerated concealment request?",
        "How do you present a staged plan while maintaining trust and expectation realism?",
      ],
      moderatorNotes:
        "Faculty: emphasise indication-driven long-hair planning, female miniaturisation risk, and staged governance rather than promise-led design.",
      evidenceTier: "B",
      redFlags: [
        "Accepting one-session maximal coverage despite donor and visibility constraints.",
        "Ignoring diffuse miniaturisation risk because shaving is avoided.",
        "Overpromising downtime concealment outcomes without staged alternatives.",
      ],
      linkedCompetencies: ["doctors_vol5_comp_long_hair_fue_unshaven"],
    },
  },
  {
    moduleNumber: 23,
    id: "module_vol5_partial_transection_regenerative_donor_concepts",
    slug: "partial-transection-and-regenerative-donor-concepts",
    title: "Partial Transection and Regenerative Donor Concepts",
    shortTitle: "Partial transection",
    lessons: [
      {
        lessonNumber: 1,
        slug: "conceptual-basis-and-evidence-tier",
        title: "Conceptual Basis and Evidence-Tier Positioning",
        lessonType: "core-lesson",
        sectionNote: "23.1",
        learningObjectives: [
          "Explain partial-transection and donor-preservation concepts as structured innovation hypotheses.",
          "Position the technique correctly in evidence tiers as advanced and emerging.",
        ],
        body:
          "Partial transection and regenerative donor thinking are academy-signature advanced concepts that must be taught with scientific ambition and academic restraint. The core proposition is donor-preservation-oriented extraction strategy, potentially leaving biologically meaningful follicular elements that may support improved donor healing response.\n\nThis concept is best framed as an advanced donor-management hypothesis, not as settled universal fact. Teaching should emphasize what is plausible, what is promising, and what remains uncertain.\n\nEvidence-tier discipline is essential: this sits in advanced-emerging space, not mainstream guideline-level routine care.",
        keyTakeaways: [
          "Teach partial transection as structured innovation, not settled universal fact.",
          "Anchor claims to evidence tier and uncertainty transparency.",
          "Donor-preservation rationale must be biologically reasoned and audit-ready.",
        ],
        redFlags: [
          "Presenting academy-signature concepts as established universal standards.",
          "Using promotional certainty language where comparative evidence remains limited.",
        ],
        reasoningPrompt:
          "How do you explain partial transection to a patient without either overpromising or dismissing its biologic rationale?",
        teachingPoint:
          "Use balanced language: biologically plausible, clinically promising, emerging evidence, and explicit uncertainty boundaries with governance requirements.",
        evidenceOverall: "B",
        evidenceNotes: [
          {
            label: "Emerging status",
            tier: "B",
            note: "Partial transection should be taught as advanced-emerging, with explicit limits and audit discipline.",
          },
        ],
      },
      {
        lessonNumber: 2,
        slug: "dermal-papilla-and-stem-cell-rationale",
        title: "Dermal Papilla and Stem-Cell Rationale",
        lessonType: "core-lesson",
        sectionNote: "23.2",
        learningObjectives: [
          "Relate partial-transection rationale to dermal papilla signaling and epithelial-mesenchymal biology.",
          "Connect Volume 1 follicular science to advanced donor-preservation discussion.",
        ],
        body:
          "Biological plausibility for partial transection is linked to dermal papilla signaling, epithelial-mesenchymal interaction, and regenerative behavior in key follicular cell populations. This requires revisiting foundational follicular biology from early volumes.\n\nDoctors should understand the concept through biologic reasoning rather than procedural enthusiasm. That improves defensibility and helps avoid overclaiming outcomes unsupported by robust comparative data.\n\nThis lesson trains translational reasoning: how foundational biology informs innovation while preserving skepticism and methodological rigor.",
        keyTakeaways: [
          "Partial-transection rationale is anchored in follicular biology, not procedural hype.",
          "Foundational science supports plausibility but does not guarantee universal effect.",
          "Translational reasoning improves academic defensibility.",
        ],
        redFlags: [
          "Using biological plausibility as proof of routine clinical superiority.",
          "Teaching advanced concepts without reconnecting to foundational follicular science.",
        ],
        reasoningPrompt:
          "A colleague says biologic plausibility alone justifies routine adoption. What is missing from that argument in a doctor-level framework?",
        teachingPoint:
          "Plausibility supports hypothesis generation, but routine adoption requires transparent outcomes, comparative evidence, and governance-based replication.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 3,
        slug: "integration-with-prp-and-donor-support",
        title: "Integration with PRP and Donor Support Strategies",
        lessonType: "clinical-application",
        sectionNote: "23.3-23.4",
        learningObjectives: [
          "Integrate partial-transection concepts with donor support strategies such as PRP within regulatory/evidence boundaries.",
          "Define procedural positioning requirements: advanced pathway only, careful selection, documentation, and audit.",
        ],
        body:
          "Within the academy framework, partial transection is not viewed in isolation. It is paired conceptually with donor-support strategies, including PRP where appropriate, to support recovery-focused donor philosophy.\n\nThis integration requires strict positioning: advanced training pathways, deliberate case selection, protocol clarity, and longitudinal tracking. It should not be embedded casually into beginner transplant pathways.\n\nDoctors should learn to connect innovation with donor ethics and finite donor economics, not novelty-driven procedural expansion.",
        keyTakeaways: [
          "Integration with donor-support strategies must remain evidence-aware and regulated.",
          "This is an advanced-pathway concept requiring case selection and documentation discipline.",
          "Donor ethics and finite economics remain central to positioning.",
        ],
        redFlags: [
          "Embedding partial-transection workflows in beginner pathways without governance infrastructure.",
          "Combining procedures without protocol transparency and longitudinal outcome tracking.",
        ],
        reasoningPrompt:
          "A center wants to market partial transection plus regenerative donor support as default for all FUE patients. What governance objections do you raise?",
        teachingPoint:
          "Default use is unjustified in emerging domains; require advanced-pathway selection, evidence-tier counselling, protocol clarity, and auditable outcomes.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 4,
        slug: "academic-defensibility-and-responsible-innovation",
        title: "Academic Defensibility and Responsible Innovation",
        lessonType: "clinical-application",
        sectionNote: "23.5",
        learningObjectives: [
          "Use disciplined language for advanced innovation in doctor-level and university-aligned teaching contexts.",
          "Demonstrate how to document uncertainty, limitations, and refinement pathways without abandoning innovation.",
        ],
        body:
          "For postgraduate and university-aligned sign-off, the tone must stay disciplined: biologically reasoned, clinically promising, rigorously documented, and open to refinement as evidence grows.\n\nResponsible innovation is a teachable skill. Doctors should know how to evaluate and apply emerging techniques without outrunning evidence and without collapsing into dismissal.\n\nThis final lesson operationalises that balance in communication, consent, and outcomes documentation.",
        keyTakeaways: [
          "Responsible innovation requires both ambition and restraint.",
          "Explicit limitations and uncertainty improve credibility, not weakness.",
          "Documentation and iterative refinement are part of the method, not add-ons.",
        ],
        redFlags: [
          "Promotional certainty replacing evidence-tier transparency.",
          "Using innovation claims without clearly documented limitations and outcomes.",
        ],
        reasoningPrompt:
          "How would you defend using an emerging donor concept in a viva when asked about evidence limitations and patient counselling?",
        teachingPoint:
          "State rationale, limits, and governance clearly: emerging status, careful selection, explicit consent language, and tracked outcomes with willingness to refine or stop.",
        evidenceOverall: "B",
        evidenceNotes: [
          {
            label: "Responsible innovation",
            tier: "B",
            note: "High-level training should explicitly separate promising innovation from guideline-level standard practice.",
          },
        ],
        quizId: "quiz_vol5_mod23",
        casePromptId: "case_vol5_mod23_a",
      },
    ],
    quiz: {
      id: "quiz_vol5_mod23",
      slug: "partial-transection-regenerative-donor-knowledge-check",
      title: "Module Knowledge Check: Partial Transection and Regenerative Donor Concepts",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol5_mod23_item_01",
          type: "mcq",
          stem: "Which statement best reflects academically defensible positioning of partial transection?",
          options: [
            { id: "a", label: "Teach it as advanced-emerging with biologic rationale, explicit uncertainty, and protocol-level outcome tracking." },
            { id: "b", label: "Treat it as universal guideline-standard in all donor management pathways now." },
            { id: "c", label: "Avoid any discussion of limits so patient confidence remains high." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale:
            "Module 23 positions partial transection as academy-signature emerging innovation with explicit limits and governance expectations.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol5_mod23_item_02",
          type: "short-answer",
          stem: "Describe how you would counsel a candidate for partial-transection strategy regarding biologic rationale, uncertainty, selection criteria, and audit documentation.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Explain biologic plausibility (follicular signaling and donor-preservation hypothesis) while stating emerging evidence status and unresolved comparative questions. Confirm advanced-pathway selection criteria and alternatives. Document protocol specifics, expected benefits and limits, uncertainty language, and planned longitudinal outcomes tracking. Ensure consent reflects structured innovation rather than settled-standard claims.",
          },
          rationale: "Tests Module 23 communication discipline and governance in emerging innovation contexts.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol5_mod23_a",
      slug: "vol5-mod23-case",
      title: "Case Discussion: Emerging Donor Concept Counselling",
      clinicalScenario:
        "A 41-year-old repeat-transplant patient asks for partial-transection donor strategy after reading online claims of donor regeneration. He is highly motivated and accepts innovation, but expects near-certain donor replenishment and less visible depletion. Your clinic has internal protocol experience but limited long-term comparative publication data.",
      discussionPrompts: [
        "How do you set evidence-tier expectations while preserving patient engagement?",
        "What selection criteria and contraindication domains would you apply before offering this pathway?",
        "What protocol, consent, and outcomes tracking elements are non-negotiable for academic defensibility?",
      ],
      moderatorNotes:
        "Faculty: emphasise disciplined emerging-technique counselling, donor ethics, and auditable innovation framework.",
      evidenceTier: "B",
      redFlags: [
        "Allowing patient assumptions of guaranteed donor regeneration.",
        "Proceeding without protocol transparency and longitudinal audit fields.",
        "Framing innovation as routine standard without evidence-tier qualification.",
      ],
      linkedCompetencies: ["doctors_vol5_comp_partial_transection_regenerative_donor"],
    },
  },
  {
    moduleNumber: 24,
    id: "module_vol5_surgical_recovery_optimisation_complication_management",
    slug: "surgical-recovery-optimisation-and-complication-management",
    title: "Surgical Recovery, Optimisation, and Complication Management",
    shortTitle: "Recovery & complications",
    lessons: [
      {
        lessonNumber: 1,
        slug: "recovery-biology-and-timeline",
        title: "Recovery Biology and Timeline Literacy",
        lessonType: "core-lesson",
        sectionNote: "24.1",
        learningObjectives: [
          "Describe donor and recipient healing stages from inflammation and crusting through maturation.",
          "Counsel expected telogen shedding and delayed visible density maturation realistically.",
        ],
        body:
          "Post-operative care is under-taught relative to surgery itself, yet long-term outcomes depend heavily on recovery biology. Doctors should understand donor and recipient healing stages: inflammation, crusting, re-epithelialisation, expected post-procedural shedding, anagen re-entry, and prolonged maturation of calibre and visual density.\n\nTimeline literacy prevents unnecessary panic and inappropriate interventions. It also improves communication quality and continuation of maintenance strategies during vulnerable early phases.\n\nThis lesson anchors complication recognition in biologic context rather than reactive symptom-only management.",
        keyTakeaways: [
          "Recovery biology drives outcomes as much as intraoperative technique.",
          "Timeline literacy prevents misinterpretation of expected post-op changes.",
          "Clear counselling reduces panic-driven nonadherence.",
        ],
        redFlags: [
          "Labelling expected shedding as failure without timeline context.",
          "Ignoring prolonged maturation windows and overpromising early density.",
        ],
        reasoningPrompt:
          "A patient reports apparent loss at six weeks and fears graft failure. How do you interpret the timeline before escalating intervention?",
        teachingPoint:
          "Place findings in recovery stage context; distinguish expected shedding/maturation from true complication signals and set objective follow-up checkpoints.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "donor-optimisation-and-early-warning-signs",
        title: "Donor Recovery Optimisation and Early Warning Signs",
        lessonType: "core-lesson",
        sectionNote: "24.2",
        learningObjectives: [
          "Identify donor recovery domains (erythema, shock, textural change, visible depletion) and response pathways.",
          "Detect early warning signs requiring escalation rather than routine reassurance.",
        ],
        body:
          "Donor recovery has aesthetic and psychological consequences. Teaching should cover donor shock, persistent erythema, overharvest visibility, folliculitis, and textural change, with practical support strategies for perception and confidence.\n\nDoctors should structure follow-up to detect warning signs early and differentiate expected recovery from developing complications. This improves salvage opportunities and trust.\n\nDonor recovery optimisation belongs in the treatment plan from day one, not as a late reaction to dissatisfaction.",
        keyTakeaways: [
          "Donor recovery quality affects both outcome perception and psychological confidence.",
          "Early warning detection improves correction opportunities.",
          "Structured follow-up is part of procedural governance.",
        ],
        redFlags: [
          "Routine reassurance despite evolving donor patchiness or persistent inflammatory signs.",
          "No documented donor follow-up checkpoints after complex extraction sessions.",
        ],
        reasoningPrompt:
          "At two months, a donor area appears patchy with persistent erythema. What findings determine reassurance versus escalation?",
        teachingPoint:
          "Assess distribution pattern, inflammatory persistence, and extraction history; escalate when changes exceed expected trajectory or suggest overharvest/infection pathway.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 3,
        slug: "complications-and-repair-forensic-logic",
        title: "Complications and Repair Forensic Logic",
        lessonType: "clinical-application",
        sectionNote: "24.3-24.4",
        learningObjectives: [
          "Classify common complications and map likely contributing factors.",
          "Approach repair as a forensic diagnostic process, not merely a second procedure.",
        ],
        body:
          "Common complications include donor depletion/patchiness, poor growth, shock loss in native hair, folliculitis/infection, persistent crusting, pitting/cobblestoning, and dissatisfaction despite technically adequate surgery.\n\nRepair logic should be forensic: identify whether failure reflects design, donor planning, graft handling, progressive loss, expectation mismatch, or mixed causes. Repair is a new diagnostic process.\n\nClinicians should integrate red-flag escalation triggers such as scarring change, severe donor depletion, persistent inflammation, or unexpectedly low survival.",
        keyTakeaways: [
          "Complication handling starts with classification and causal mapping.",
          "Repair is diagnostic-forensic work, not automatic re-surgery.",
          "Escalation triggers should be explicit and documented.",
        ],
        redFlags: [
          "Offering immediate repeat surgery without failure-cause analysis.",
          "Ignoring persistent inflammation, scarring change, or severe donor depletion signals.",
        ],
        reasoningPrompt:
          "A patient has low growth and visible donor depletion after prior surgery. What forensic domains do you evaluate before proposing repair?",
        teachingPoint:
          "Separate design, donor economics, graft survival workflow, disease progression, and expectation mismatch to build a defensible repair strategy.",
        evidenceOverall: "B",
        evidenceNotes: [
          {
            label: "Repair strategy",
            tier: "B",
            note: "Repair decisions should follow documented forensic diagnosis and risk stratification, not reflex repeat intervention.",
          },
        ],
      },
      {
        lessonNumber: 4,
        slug: "post-op-governance-and-complication-escalation",
        title: "Post-Op Governance and Complication Escalation Discipline",
        lessonType: "clinical-application",
        sectionNote: "24 integration",
        learningObjectives: [
          "Build a governance-based post-op pathway including surveillance, escalation, and documentation.",
          "Apply risk/benefit communication when outcomes are partial or complications occur.",
        ],
        body:
          "Post-op governance requires scheduled surveillance, objective documentation, escalation rules, and transparent communication when outcomes diverge from expectation.\n\nDoctors should avoid both denial and overreaction: document findings, triage risk domains, and define whether to monitor, medically optimise, or move toward repair planning.\n\nThis final lesson integrates biology, complications, and ethics into a practical escalation framework for advanced surgical practice.",
        keyTakeaways: [
          "Governance-based post-op pathways improve safety and trust.",
          "Escalation rules should be explicit, not improvised.",
          "Transparent communication is essential when outcomes are partial.",
        ],
        redFlags: [
          "No structured escalation criteria for persistent recovery concerns.",
          "Minimising complications to avoid difficult conversations.",
        ],
        reasoningPrompt:
          "A patient is dissatisfied at eight months with mixed objective findings. How do you communicate uncertainty while maintaining clinical direction?",
        teachingPoint:
          "Use objective evidence and staged plan logic: clarify what is known, what remains uncertain, and what monitored/repair pathways are justified next.",
        evidenceOverall: "B",
        evidenceNotes: [],
        quizId: "quiz_vol5_mod24",
        casePromptId: "case_vol5_mod24_a",
      },
    ],
    quiz: {
      id: "quiz_vol5_mod24",
      slug: "surgical-recovery-complication-management-knowledge-check",
      title: "Module Knowledge Check: Surgical Recovery, Optimisation, and Complication Management",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol5_mod24_item_01",
          type: "mcq",
          stem: "Which approach best reflects postgraduate complication-management discipline?",
          options: [
            { id: "a", label: "Treat repair as forensic diagnosis: classify failure domains first, then define escalation or re-intervention." },
            { id: "b", label: "Repeat surgery quickly whenever growth feels disappointing to reassure patient confidence." },
            { id: "c", label: "Assume all low-density outcomes are expected timeline variation until one year regardless of warning signs." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 24 frames repair as forensic and risk-stratified, with explicit red-flag escalation rather than reflex re-surgery or blanket reassurance.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol5_mod24_item_02",
          type: "short-answer",
          stem: "A patient has persistent donor patchiness and lower-than-expected recipient growth. Outline your escalation framework and what you document before deciding on repair.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Document objective donor/recipient findings, timeline stage, and possible contributors: donor distribution strategy, graft handling/survival factors, disease progression, and expectation mismatch. Define red flags (persistent inflammation/scarring, severe depletion, unexpectedly low survival) and triage to monitoring, medical optimisation, or repair planning. Communicate uncertainty transparently and record consent-level discussion before intervention decisions.",
          },
          rationale: "Applies Module 24 governance and forensic logic to a realistic complication scenario.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol5_mod24_a",
      slug: "vol5-mod24-case",
      title: "Case Discussion: Recovery Surveillance and Repair Decision",
      clinicalScenario:
        "A 35-year-old patient presents at month 9 after prior FUE with persistent donor patchiness, intermittent folliculitis, and lower-than-expected recipient density. They request immediate corrective surgery and report high distress. Your records include incomplete early follow-up photography.",
      discussionPrompts: [
        "How do you classify likely contributors (design, donor planning, graft stewardship, progression, expectation mismatch) before any repair commitment?",
        "Which red flags in this case mandate escalation beyond reassurance?",
        "How do you structure communication and documentation when outcomes are mixed and uncertainty remains?",
      ],
      moderatorNotes:
        "Faculty: emphasise forensic-repair logic, escalation governance, and communication quality under patient distress.",
      evidenceTier: "B",
      redFlags: [
        "Committing to immediate repair without causal analysis.",
        "Under-documenting donor/recipient objective findings and timeline.",
        "Neglecting inflammatory warning signs during follow-up.",
      ],
      linkedCompetencies: ["doctors_vol5_comp_recovery_optimisation_complications"],
    },
  },
  {
    moduleNumber: 25,
    id: "module_vol5_consultation_mastery_ethics_psychological_care",
    slug: "consultation-mastery-ethics-and-psychological-care",
    title: "Consultation Mastery, Ethics, and Psychological Care",
    shortTitle: "Consultation ethics",
    lessons: [
      {
        lessonNumber: 1,
        slug: "emotional-reality-and-clinical-listening",
        title: "Emotional Reality of Hair Loss and Clinical Listening",
        lessonType: "core-lesson",
        sectionNote: "25.1",
        learningObjectives: [
          "Recognise psychological meaning domains of hair loss without pathologising every patient.",
          "Use listening-first consultation structure to uncover the true presenting problem beyond visible pattern.",
        ],
        body:
          "Hair loss can affect self-image, age identity, perceived attractiveness, social confidence, and wellbeing. This does not mean every patient is fragile; it means consultations should respect meaning depth.\n\nDoctors should listen for the true problem, not only the visible pattern. Effective consultation begins with timeline, prior treatments, fears, and expectation drivers before moving to recommendation.\n\nThis approach improves consent quality and reduces conflict between technical success and perceived failure.",
        keyTakeaways: [
          "Psychological relevance is common and should be respected without overpathologising.",
          "Listening-first consultation uncovers hidden decision pressures and expectation drivers.",
          "Communication quality is a clinical skill, not a soft add-on.",
        ],
        redFlags: [
          "Reducing consultation to pattern labelling while ignoring patient fears and pressures.",
          "Dismissing emotional concerns as cosmetic-only complaints.",
        ],
        reasoningPrompt:
          "A technically straightforward case carries strong emotional urgency. What information do you gather before proposing intervention?",
        teachingPoint:
          "Clarify timeline, prior failures, fears, and expectation pressures; then layer diagnosis and options in a way that preserves trust and informed decisions.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "consultation-structure-and-layered-explanation",
        title: "Consultation Structure and Layered Explanation",
        lessonType: "core-lesson",
        sectionNote: "25.2",
        learningObjectives: [
          "Apply a structured pathway: define what is happening, why, what is modifiable, and what is not.",
          "Move from education to recommendation rather than sales-led persuasion.",
        ],
        body:
          "Consultation mastery requires structure. Doctors should clarify what is happening, why it is happening, what can be changed, and what cannot, then move into recommendation based on evidence-tier logic.\n\nLayered explanation improves informed choice and reduces downstream dissatisfaction rooted in misunderstood goals.\n\nThis lesson trains recommendation discipline and protects against persuasive urgency models that undermine ethical standards.",
        keyTakeaways: [
          "Layered explanation improves patient understanding and decision quality.",
          "Recommendation should follow education and diagnosis clarity.",
          "Sales-led persuasion is incompatible with postgraduate professional standards.",
        ],
        redFlags: [
          "Jumping to intervention packages before diagnosis and mechanism explanation.",
          "Using urgency pressure instead of shared decision-making.",
        ],
        reasoningPrompt:
          "How do you respond when a patient asks for immediate treatment before hearing diagnosis and alternatives?",
        teachingPoint:
          "Maintain structure: educate first, outline options/limits, then recommend based on diagnosis and risk-benefit fit.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 3,
        slug: "ethical-boundaries-and-consent-standards",
        title: "Ethical Boundaries and Consent Standards",
        lessonType: "clinical-application",
        sectionNote: "25.3-25.4",
        learningObjectives: [
          "Apply ethical boundaries against overpromising, premature surgery, and misrepresentation of emerging evidence.",
          "Deliver consent as a process including alternatives, uncertainty, maintenance burden, and future progression.",
        ],
        body:
          "Ethical boundaries protect patients and institutional credibility. Doctors must avoid overpromising, age-inappropriate design, premature surgery, exploitative urgency, and framing emerging modalities as settled science.\n\nConsent is a process, not a form. It includes diagnosis, alternatives, likely benefit, limitations, maintenance needs, uncertainty, progression risk, and the possibility that technically successful treatment may still not match emotional expectation.\n\nThis lesson requires practical consent language and documentation standards that remain robust under scrutiny.",
        keyTakeaways: [
          "Ethical boundaries are operational and measurable, not aspirational slogans.",
          "Consent quality depends on uncertainty and longitudinal burden being explicit.",
          "Emerging evidence must never be presented as settled certainty.",
        ],
        redFlags: [
          "Consent reduced to signature capture without layered risk/alternative discussion.",
          "Understating maintenance and future progression burden to secure uptake.",
        ],
        reasoningPrompt:
          "A patient demands surgery with a juvenile hairline design and refuses discussion of future progression. How do you proceed ethically?",
        teachingPoint:
          "Set non-negotiable boundaries: explain risks, alternatives, long-term consequences, and reserve the right to decline procedures that violate safe ethical standards.",
        evidenceOverall: "B",
        evidenceNotes: [
          {
            label: "Consent governance",
            tier: "B",
            note: "High-quality consent should document uncertainty, alternatives, and longitudinal maintenance burden, not only procedural risks.",
          },
        ],
      },
      {
        lessonNumber: 4,
        slug: "longitudinal-partnership-and-trust-repair",
        title: "Longitudinal Doctor-Patient Partnership and Trust Repair",
        lessonType: "clinical-application",
        sectionNote: "25.5",
        learningObjectives: [
          "Plan care in years rather than single-visit intervention logic.",
          "Maintain trust when results are partial or disease remains chronic.",
        ],
        body:
          "Hair restoration medicine is longitudinal. Strong clinicians track progression, adjust plans, support adherence, and preserve trust even when outcomes are partial.\n\nPartnership quality often determines whether patients continue evidence-aware care or drift to risky alternatives. Doctors should document evolving goals and update plans transparently.\n\nThis final lesson integrates communication, ethics, and long-term governance into a durable therapeutic alliance framework.",
        keyTakeaways: [
          "Longitudinal partnership is central to durable outcomes.",
          "Trust can be maintained through transparency when outcomes are partial.",
          "Plan adaptation and expectation updates are ongoing responsibilities.",
        ],
        redFlags: [
          "Treating follow-up as optional after procedural completion.",
          "Avoiding difficult expectation conversations when progress is incomplete.",
        ],
        reasoningPrompt:
          "A patient says, 'This did not change my life like I expected,' despite measurable improvement. What is your communication and plan-adjustment response?",
        teachingPoint:
          "Acknowledge emotional mismatch, reframe objective progress honestly, adjust goals collaboratively, and sustain structured follow-up rather than defensive reassurance.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
        quizId: "quiz_vol5_mod25",
        casePromptId: "case_vol5_mod25_a",
      },
    ],
    quiz: {
      id: "quiz_vol5_mod25",
      slug: "consultation-ethics-psychological-care-knowledge-check",
      title: "Module Knowledge Check: Consultation Mastery, Ethics, and Psychological Care",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol5_mod25_item_01",
          type: "mcq",
          stem: "Which statement best reflects postgraduate consultation ethics in hair medicine?",
          options: [
            { id: "a", label: "Consent is a process including alternatives, uncertainty, maintenance burden, and progression—not just procedural signatures." },
            { id: "b", label: "If the technical plan is strong, detailed expectation discussion can be abbreviated to reduce anxiety." },
            { id: "c", label: "Emerging interventions can be framed as settled science if the patient is enthusiastic." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 25 emphasises process-based consent, ethical boundaries, and non-promotional evidence communication.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol5_mod25_item_02",
          type: "short-answer",
          stem: "Outline how you would handle a consultation where a patient requests urgent surgery with unrealistic goals and declines discussion of alternatives.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Maintain consultation structure: clarify diagnosis, progression risk, alternatives, and realistic limits. Use explicit ethical boundaries against unsafe or age-inappropriate design and document that refusal to discuss alternatives undermines valid consent. Offer staged or non-surgical pathways where appropriate and reserve the right to decline unsafe intervention while preserving respectful communication.",
          },
          rationale: "Assesses applied ethics and consent governance under pressure scenarios.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol5_mod25_a",
      slug: "vol5-mod25-case",
      title: "Case Discussion: Ethical Boundaries Under Demand Pressure",
      clinicalScenario:
        "A 27-year-old patient with early patterned loss requests an aggressive low juvenile hairline and same-week surgery. They state they will seek another clinic if delayed. Their history reveals prior dissatisfaction with multiple cosmetic treatments and high social-media pressure. They reject non-surgical options and ask you to skip 'long explanation'.",
      discussionPrompts: [
        "How do you maintain consultation structure and informed consent standards under urgency pressure?",
        "Which ethical boundaries in this case are non-negotiable, and how do you communicate them without escalation?",
        "How do you document the discussion if you decline or stage intervention?",
      ],
      moderatorNotes:
        "Faculty: evaluate practical ethical communication, refusal-to-proceed language, and trust-preserving boundary setting.",
      evidenceTier: "B",
      redFlags: [
        "Allowing urgency pressure to bypass informed consent depth.",
        "Accepting age-inappropriate design without progression counselling.",
        "Failing to document refusal of alternatives and safety rationale.",
      ],
      linkedCompetencies: ["doctors_vol5_comp_consultation_ethics_psychological_care"],
    },
  },
  {
    moduleNumber: 26,
    id: "module_vol5_research_literacy_evidence_appraisal",
    slug: "research-literacy-and-evidence-appraisal",
    title: "Research Literacy and Evidence Appraisal",
    shortTitle: "Research literacy",
    lessons: [
      {
        lessonNumber: 1,
        slug: "levels-of-evidence-and-procedure-reality",
        title: "Levels of Evidence and Procedure-Based Reality",
        lessonType: "core-lesson",
        sectionNote: "26.1",
        learningObjectives: [
          "Interpret evidence hierarchies while recognising realities of procedure-based disciplines.",
          "Differentiate expert opinion, observational data, and higher-level comparative evidence in hair medicine contexts.",
        ],
        body:
          "A modern hair doctor must read literature critically because the field includes strong data, weak data, commercial bias, and rapidly evolving claims. Research literacy is therefore a patient-safety skill.\n\nThis lesson reviews evidence hierarchies while acknowledging procedural realities where high-quality randomized data may be limited. Doctors should avoid two extremes: dismissing non-RCT procedural knowledge entirely, or accepting low-quality claims as equivalent to robust comparative evidence.\n\nThe goal is disciplined interpretation that protects patient care and professional credibility.",
        keyTakeaways: [
          "Evidence hierarchy matters, but procedural disciplines require nuanced interpretation.",
          "Avoid both RCT absolutism and uncritical acceptance of weak data.",
          "Research literacy is a safety and governance competency.",
        ],
        redFlags: [
          "Treating low-level evidence as equivalent to controlled comparative data.",
          "Ignoring practice heterogeneity when extrapolating claims.",
        ],
        reasoningPrompt:
          "How do you evaluate a promising small procedural series when no large trial exists?",
        teachingPoint:
          "Assess design quality, bias risks, protocol clarity, and applicability; position findings as provisional where evidence depth remains limited.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "bias-patterns-in-hair-literature",
        title: "Bias Patterns in Hair Literature",
        lessonType: "core-lesson",
        sectionNote: "26.2",
        learningObjectives: [
          "Identify common bias sources in hair literature and commercialized reporting.",
          "Flag protocol heterogeneity and sponsorship effects in regenerative and procedural claims.",
        ],
        body:
          "Common bias patterns include small sample size, uncontrolled visual comparison, short follow-up in slowly changing disorders, selection and publication bias, protocol heterogeneity (especially in regenerative medicine), and sponsorship-driven language.\n\nDoctors should treat these biases as practical interpretation filters, not abstract methodology trivia. This allows safer translation of evidence into treatment recommendations.\n\nThe module encourages explicit note-taking of bias domains when presenting research in clinical settings.",
        keyTakeaways: [
          "Bias detection is essential for credible evidence translation.",
          "Regenerative and procedural heterogeneity requires extra interpretation caution.",
          "Commercial language can obscure methodological weakness.",
        ],
        redFlags: [
          "Accepting positive conclusions without checking sample size, control quality, and follow-up adequacy.",
          "Ignoring sponsorship language and protocol heterogeneity in modality comparisons.",
        ],
        reasoningPrompt:
          "A study shows dramatic hair gains with short follow-up and variable photos. What interpretation cautions should you document before counselling patients?",
        teachingPoint:
          "Document methodological limits explicitly—visual standardization, follow-up length, heterogeneity, and external validity—before translating claims into recommendations.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 3,
        slug: "reading-before-after-data-critically",
        title: "Reading Before-and-After Data Critically",
        lessonType: "clinical-application",
        sectionNote: "26.3",
        learningObjectives: [
          "Audit before-and-after data for angle, lighting, styling, and timescale manipulation risks.",
          "Distinguish meaningful outcomes from photographic artefact.",
        ],
        body:
          "Before-and-after evidence is highly influential and highly vulnerable to distortion. Doctors should audit angle, lighting, styling, hair length, part-line manipulation, concealment techniques, and timescale.\n\nVisual change without methodological discipline can mislead both clinicians and patients. This lesson trains practical appraisal habits to resist persuasive but weak evidence presentation.\n\nCritique should remain constructive and documented, supporting transparent discussion with patients and teams.",
        keyTakeaways: [
          "Before-and-after appraisal requires method checks, not visual intuition alone.",
          "Small technical photo differences can create false efficacy impressions.",
          "Documented critique improves clinical decision quality and communication.",
        ],
        redFlags: [
          "Using unstandardized visual comparisons as primary efficacy proof.",
          "Failing to verify timescale and image conditions before drawing conclusions.",
        ],
        reasoningPrompt:
          "What checklist would you run before accepting an online before-and-after claim into your counselling language?",
        teachingPoint:
          "Standardize critique: image conditions, timeline adequacy, protocol transparency, comparator quality, and whether objective measures support visual claims.",
        evidenceOverall: "B",
        evidenceNotes: [
          {
            label: "Visual-evidence caution",
            tier: "B",
            note: "Before-and-after interpretation should be supported by methodological controls and objective tracking where possible.",
          },
        ],
      },
      {
        lessonNumber: 4,
        slug: "registry-thinking-and-outcome-governance",
        title: "Registry Thinking and Outcome Governance",
        lessonType: "clinical-application",
        sectionNote: "26.4",
        learningObjectives: [
          "Build registry-style outcome documentation using photography, trichoscopy, donor mapping, and protocol logs.",
          "Connect evidence appraisal to quality improvement and publication-ready audit discipline.",
        ],
        body:
          "The academy should train doctors to document outcomes consistently: photography, trichoscopy where applicable, donor mapping, treatment protocol logging, and longitudinal notes.\n\nRegistry thinking transforms isolated cases into quality improvement and stronger future evidence. It also supports digital quality systems and publication readiness.\n\nThis final lesson links appraisal skill to operational governance and measurable standards in clinical practice.",
        keyTakeaways: [
          "Registry-style documentation strengthens evidence translation and quality improvement.",
          "Outcome governance is essential for advanced procedural and regenerative domains.",
          "Audit discipline supports academic credibility and future publication.",
        ],
        redFlags: [
          "No consistent protocol/outcome logging for advanced modalities.",
          "Relying on anecdotal recall instead of structured longitudinal data.",
        ],
        reasoningPrompt:
          "Your clinic uses multiple regenerative protocols but outcome recording is inconsistent. How do you design a minimal governance framework that is immediately usable?",
        teachingPoint:
          "Define a core dataset (baseline imaging, protocol details, interval outcomes, adverse events, follow-up cadence) and make completion mandatory for modality-level comparison.",
        evidenceOverall: "B",
        evidenceNotes: [],
        quizId: "quiz_vol5_mod26",
        casePromptId: "case_vol5_mod26_a",
      },
    ],
    quiz: {
      id: "quiz_vol5_mod26",
      slug: "research-literacy-evidence-appraisal-knowledge-check",
      title: "Module Knowledge Check: Research Literacy and Evidence Appraisal",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol5_mod26_item_01",
          type: "mcq",
          stem: "Which interpretation is most defensible for a small uncontrolled before-and-after procedural series with short follow-up?",
          options: [
            { id: "a", label: "Potentially hypothesis-generating but limited for strong efficacy claims due to design, bias, and follow-up constraints." },
            { id: "b", label: "Equivalent to high-quality comparative evidence if visual improvement appears obvious." },
            { id: "c", label: "Sufficient to establish universal standard of care in routine practice." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 26 trains cautious interpretation and bias-aware appraisal in procedure-heavy literature.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol5_mod26_item_02",
          type: "short-answer",
          stem: "Outline a practical checklist for critiquing before-and-after evidence and explain how registry-style tracking can improve decision quality.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Check image standardization (angle, lighting, styling, length, concealment), timescale adequacy, protocol transparency, and comparability. Flag bias domains and sponsorship language. Integrate registry-style tracking with baseline/interval imaging, protocol logs, donor mapping where relevant, and adverse-event fields so outcomes are auditable and comparable over time.",
          },
          rationale: "Tests applied appraisal and governance linkage rather than theoretical recall.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol5_mod26_a",
      slug: "vol5-mod26-case",
      title: "Case Discussion: Evidence Appraisal Under Commercial Pressure",
      clinicalScenario:
        "A vendor presents a regenerative protocol claiming superior outcomes based on short-term before-and-after photos from a small series. Your team wants to adopt it rapidly. The protocol details are partially disclosed and follow-up beyond 4 months is unavailable.",
      discussionPrompts: [
        "How do you appraise this evidence using bias and visual-data quality checks?",
        "What minimum governance requirements should be met before pilot adoption in a clinical setting?",
        "How would you communicate provisional status to patients without dismissing potential innovation?",
      ],
      moderatorNotes:
        "Faculty: require evidence-tier language, bias analysis, and practical governance plan before adoption decisions.",
      evidenceTier: "B",
      redFlags: [
        "Adopting protocols on short-term visuals without methodological controls.",
        "Insufficient protocol transparency and follow-up depth.",
        "Patient-facing certainty language unsupported by evidence quality.",
      ],
      linkedCompetencies: ["doctors_vol5_comp_research_literacy_evidence_appraisal"],
    },
  },
  {
    moduleNumber: 27,
    id: "module_vol5_capstone_case_review_clinical_integration",
    slug: "capstone-case-review-and-clinical-integration",
    title: "Capstone Case Review and Clinical Integration",
    shortTitle: "Capstone integration",
    lessons: [
      {
        lessonNumber: 1,
        slug: "case-domains-and-integration-framework",
        title: "Case Domains and Integration Framework",
        lessonType: "core-lesson",
        sectionNote: "27.1",
        learningObjectives: [
          "Integrate diagnosis, differential logic, and longitudinal planning across core case domains.",
          "Map how modules from Volumes 1-5 feed complete case reasoning.",
        ],
        body:
          "The capstone module converts isolated knowledge into integrated competence. Case domains include pattern loss with progression forecasting, female endocrine-overlap pathways, diffuse shedding/mixed phenotypes, AA differentials, cicatricial biopsy/escalation logic, transplant candidacy under donor limits, repair strategy, and evidence-aware regenerative planning.\n\nLearners should demonstrate cross-volume integration: foundational biology, diagnostic discipline, therapeutic sequencing, surgical governance, and communication quality.\n\nThis lesson establishes the integration framework used in viva and capstone assessments.",
        keyTakeaways: [
          "Capstone cases test integrated clinical reasoning, not module-by-module recall.",
          "Cross-volume linkage is required for competent final decisions.",
          "Longitudinal planning is central to high-quality answers.",
        ],
        redFlags: [
          "Isolated diagnosis without sequencing, governance, or follow-up planning.",
          "Treating capstone as memory recitation rather than reasoning demonstration.",
        ],
        reasoningPrompt:
          "A mixed TE + patterned-loss case also has inflammatory symptoms. How do you structure integration instead of binary diagnosis?",
        teachingPoint:
          "Use layered differential + activity assessment + staged sequencing; integrate overlap mechanisms with clear escalation and monitoring pathways.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "demonstrating-clinical-competence",
        title: "What the Learner Must Demonstrate",
        lessonType: "core-lesson",
        sectionNote: "27.2",
        learningObjectives: [
          "Demonstrate disease classification, investigation logic, safe sequencing, contraindication recognition, and ethical communication.",
          "Show one-year+ planning rather than one-off intervention thinking.",
        ],
        body:
          "Capstone standards require more than diagnosis labels. Learners must demonstrate: accurate classification, differential exclusion logic, proportionate investigations, biopsy/referral thresholds, treatment sequencing by evidence/risk, contraindication handling, and ethical expectation management.\n\nAnswers should include longitudinal plans that account for progression, adherence, monitoring, and likely adaptation points.\n\nThis lesson sets explicit performance expectations for final case integration.",
        keyTakeaways: [
          "Competence = diagnosis + sequencing + governance + communication.",
          "Contraindication and referral thresholds are mandatory, not optional details.",
          "One-off intervention thinking is insufficient for capstone pass standards.",
        ],
        redFlags: [
          "High-confidence plans without risk boundaries or referral logic.",
          "No explicit follow-up and plan-adaptation timeline.",
        ],
        reasoningPrompt:
          "How would you demonstrate contraindication awareness in a transplant-eligible patient with unresolved inflammatory clues?",
        teachingPoint:
          "State candidacy uncertainty, prioritize disease clarification/escalation first, and articulate re-entry criteria before procedural planning.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 3,
        slug: "viva-defense-and-argument-quality",
        title: "Viva Preparation: Defending Clinical Reasoning",
        lessonType: "clinical-application",
        sectionNote: "27.3",
        learningObjectives: [
          "Defend diagnostic preference and alternative exclusion using explicit evidence and risk logic.",
          "Articulate treatment goals, evidence tier, and counselling approach under faculty challenge.",
        ],
        body:
          "A strong viva tests reasoning under pressure. Learners should defend why a diagnosis was favored, why alternatives were deprioritized, what evidence tier supports each intervention, and how patient counselling handles uncertainty.\n\nHigh-quality viva responses are structured, explicit about limitations, and aligned to ethical and safety boundaries.\n\nThis lesson trains argument quality: clarity, consistency, and defensibility across complex mixed-phenotype cases.",
        keyTakeaways: [
          "Viva excellence is reasoning clarity under challenge, not memorized scripts.",
          "Evidence-tier and uncertainty language should be explicit.",
          "Alternative diagnosis exclusion must be justified, not implied.",
        ],
        redFlags: [
          "Overconfident answers without limitation statements.",
          "Failure to defend why alternatives were excluded.",
        ],
        reasoningPrompt:
          "In viva, you're challenged on why you did not biopsy immediately. How do you defend your decision while showing safety awareness?",
        teachingPoint:
          "Defend with risk stratification, objective findings, escalation triggers, and documented re-evaluation plan rather than vague reassurance.",
        evidenceOverall: "B",
        evidenceNotes: [
          {
            label: "Defense quality",
            tier: "B",
            note: "Capstone-level reasoning should explicitly include uncertainty handling, alternative exclusion logic, and escalation thresholds.",
          },
        ],
      },
      {
        lessonNumber: 4,
        slug: "capstone-simulation-and-final-readiness",
        title: "Capstone Simulation and Final Readiness",
        lessonType: "clinical-application",
        sectionNote: "27 integration",
        learningObjectives: [
          "Synthesize complete-case reasoning into faculty-reviewable outputs.",
          "Demonstrate readiness for final assessment architecture in Module 28.",
        ],
        body:
          "This final capstone lesson simulates complete-case integration: history, examination, differential, investigation pathway, sequencing, consent framing, and long-term monitoring plan.\n\nLearners should produce auditable reasoning artifacts suitable for faculty review and viva preparation.\n\nThe lesson prepares direct transition to Module 28 final assessment and certification standards.",
        keyTakeaways: [
          "Final readiness requires complete-case integration artifacts, not isolated module competency.",
          "Faculty-reviewable structure improves reliability of summative decisions.",
          "Transition to final assessment should be explicit and criteria-aligned.",
        ],
        redFlags: [
          "Narrative-heavy answers lacking explicit decision points and contingencies.",
          "No linkage between diagnosis confidence and escalation/referral pathways.",
        ],
        reasoningPrompt:
          "You must submit one integrated case summary for faculty review. What sections and decision checkpoints make it defensible?",
        teachingPoint:
          "Include diagnosis confidence, differential exclusions, investigation rationale, sequencing, risk boundaries, consent points, and monitoring/escalation checkpoints.",
        evidenceOverall: "B",
        evidenceNotes: [],
        quizId: "quiz_vol5_mod27",
        casePromptId: "case_vol5_mod27_a",
      },
    ],
    quiz: {
      id: "quiz_vol5_mod27",
      slug: "capstone-case-integration-knowledge-check",
      title: "Module Knowledge Check: Capstone Case Review and Clinical Integration",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol5_mod27_item_01",
          type: "mcq",
          stem: "Which response best reflects capstone-level integrated reasoning?",
          options: [
            { id: "a", label: "Classify disease, justify differential exclusions, sequence treatment by evidence/risk, define escalation boundaries, and plan longitudinal follow-up." },
            { id: "b", label: "Provide a likely diagnosis and immediate treatment without discussing alternatives or uncertainty." },
            { id: "c", label: "Focus on procedural options first and defer investigation logic to later visits." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 27 evaluates integrated cross-domain reasoning with explicit safety and longitudinal structure.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol5_mod27_item_02",
          type: "case-reasoning",
          stem: "A patient has diffuse shedding, central miniaturisation, intermittent scalp burning, and high urgency for surgery. Outline your integrated plan across differential, investigations, treatment sequencing, ethical communication, and follow-up.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Frame mixed-phenotype differential (TE + pattern overlap; inflammatory/scarring possibilities). Perform directed exam/trichoscopy and proportionate investigations; escalate biopsy/referral if scarring signals persist. Sequence non-surgical stabilisation first, explain surgery timing constraints and risk boundaries, and use ethical consent language including uncertainty and maintenance burden. Define objective monitoring intervals and explicit escalation triggers before any procedural commitment.",
          },
          rationale: "Applies full capstone integration under high-pressure mixed-presentation conditions.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol5_mod27_a",
      slug: "vol5-mod27-case",
      title: "Case Discussion: Integrated Mixed-Phenotype Decision Making",
      clinicalScenario:
        "A 38-year-old physician presents with chronic diffuse shedding, background miniaturisation, and intermittent scalp burning. They are highly informed, request immediate transplant booking, and report prior partial response to minoxidil. Examination suggests mixed pathology with unresolved inflammatory risk and uncertain candidacy timing.",
      discussionPrompts: [
        "How do you structure differential and investigation logic to avoid premature procedural anchoring?",
        "What sequencing would you defend for stabilisation versus surgery readiness?",
        "How do you communicate uncertainty, risk boundaries, and timeline to a medically literate but urgency-driven patient?",
      ],
      moderatorNotes:
        "Faculty: assess full integration quality—diagnostic layering, sequencing, ethics, and longitudinal planning under pressure.",
      evidenceTier: "B",
      redFlags: [
        "Procedural anchoring before unresolved inflammatory/candidacy clarification.",
        "No explicit timeline for reassessment and surgery re-entry criteria.",
        "Defensive communication with high-literacy patients instead of structured transparency.",
      ],
      linkedCompetencies: ["doctors_vol5_comp_capstone_clinical_integration"],
    },
  },
  {
    moduleNumber: 28,
    id: "module_vol5_final_assessment_and_certification",
    slug: "final-assessment-and-certification",
    title: "Final Assessment and Certification",
    shortTitle: "Final certification",
    lessons: [
      {
        lessonNumber: 1,
        slug: "assessment-architecture-and-domains",
        title: "Assessment Architecture and Domains",
        lessonType: "core-lesson",
        sectionNote: "28.1",
        learningObjectives: [
          "Describe final assessment components across knowledge, interpretation, case reasoning, portfolio, and faculty review.",
          "Explain why multi-domain architecture improves certification credibility.",
        ],
        body:
          "The final module defines completion standards and certification meaning. Credible certification should represent demonstrable competence, not passive content consumption.\n\nAssessment architecture includes written knowledge examination, image/trichoscopy interpretation, case-based reasoning, treatment-planning portfolio, and faculty-reviewed capstone submission.\n\nA multi-domain structure prevents overreliance on narrow test formats and strengthens external credibility.",
        keyTakeaways: [
          "Certification credibility depends on multi-domain assessment architecture.",
          "Knowledge-only assessment is insufficient for advanced clinical programs.",
          "Faculty-reviewed integration is central to final standards.",
        ],
        redFlags: [
          "Reducing final assessment to MCQ completion alone.",
          "Missing portfolio/case domains that test applied reasoning.",
        ],
        reasoningPrompt:
          "Why is a written pass score alone insufficient for postgraduate certification credibility in this stream?",
        teachingPoint:
          "Because competence requires integrated diagnosis, reasoning, communication, and longitudinal planning—not only recall under fixed-choice formats.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "pass-criteria-and-competency-thresholds",
        title: "Pass Criteria and Competency Thresholds",
        lessonType: "core-lesson",
        sectionNote: "28.2",
        learningObjectives: [
          "Apply pass logic that requires satisfactory performance across knowledge, reasoning, and case integration domains.",
          "Differentiate minimum pass standards from distinction/honours pathways.",
        ],
        body:
          "Pass criteria should require satisfactory performance across knowledge, reasoning, and integrated case domains. This avoids weakness seen in programs that rely on single-domain completion.\n\nCertification pathways may include distinction/honours tracks for high performers, but baseline competence standards must remain clear, transparent, and reproducible.\n\nThis lesson emphasizes threshold clarity and moderation fairness.",
        keyTakeaways: [
          "Cross-domain thresholding improves reliability of pass decisions.",
          "Distinction pathways should build on, not dilute, baseline competence standards.",
          "Moderation clarity supports fairness and credibility.",
        ],
        redFlags: [
          "Allowing weak clinical reasoning to pass based on strong recall-only scores.",
          "Unclear threshold language that invites inconsistent faculty judgement.",
        ],
        reasoningPrompt:
          "A learner scores well on knowledge items but is weak in case integration. How should pass logic handle this?",
        teachingPoint:
          "Use domain-based thresholds: high recall cannot compensate for unsafe/weak integration in final certification decisions.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 3,
        slug: "certification-meaning-and-university-signoff",
        title: "Certification Meaning and University/Doctor Sign-off Standards",
        lessonType: "clinical-application",
        sectionNote: "28.3-28.4",
        learningObjectives: [
          "Define certification meaning in scope-safe, evidence-aware postgraduate language.",
          "Outline sign-off requirements for university alignment: outcomes mapping, moderation, version control, and faculty oversight.",
        ],
        body:
          "Certification should represent completion of structured postgraduate training with demonstrated competence in diagnostic and therapeutic reasoning and ethical evidence-aware practice.\n\nFor university alignment and doctor-level sign-off, frameworks require formal outcomes mapping, moderation logic, version control, faculty oversight, and explicit distinction between established evidence, consensus practice, and emerging innovation.\n\nThis lesson ensures certification language remains academically defensible and externally credible.",
        keyTakeaways: [
          "Certification meaning must be scope-safe and competency-based.",
          "University alignment requires moderation, versioning, and formal outcome architecture.",
          "Evidence-tier differentiation should remain explicit in award standards.",
        ],
        redFlags: [
          "Certificate language implying unrestricted specialty authority beyond training scope.",
          "No moderation/version control in high-stakes summative architecture.",
        ],
        reasoningPrompt:
          "How would you defend this certification framework to an external academic reviewer asking about standards integrity?",
        teachingPoint:
          "Demonstrate structured outcomes, cross-domain thresholds, moderation controls, faculty oversight, and evidence-tier governance embedded in assessment design.",
        evidenceOverall: "B",
        evidenceNotes: [
          {
            label: "Standards integrity",
            tier: "B",
            note: "High-stakes sign-off must include moderation/version control and explicit evidence-tier governance language.",
          },
        ],
      },
      {
        lessonNumber: 4,
        slug: "completion-readiness-and-certification-governance",
        title: "Completion Readiness and Certification Governance",
        lessonType: "clinical-application",
        sectionNote: "28 integration",
        learningObjectives: [
          "Integrate final readiness evidence across all required assessment domains.",
          "Apply certification governance principles to ensure defensible completion decisions.",
        ],
        body:
          "The final lesson consolidates readiness evidence across written assessment, image interpretation, case reasoning, treatment planning portfolio, and faculty capstone review.\n\nCertification credibility increases with robust architecture: transparent criteria, domain thresholds, moderation logic, and clear governance records.\n\nThis lesson prepares transition from learner status to certified completion with documented standards integrity.",
        keyTakeaways: [
          "Completion decisions must be evidence-based across domains, not single-score shortcuts.",
          "Certification governance quality directly affects institutional credibility.",
          "Final readiness should be auditable and faculty-defensible.",
        ],
        redFlags: [
          "Passing candidates without complete domain evidence.",
          "Inconsistent final decisions due to undocumented moderation logic.",
        ],
        reasoningPrompt:
          "A borderline learner has strong written scores but mixed capstone quality. What governance-based decision process should you follow?",
        teachingPoint:
          "Apply documented domain thresholds, moderation review, and explicit rationale for pass/remediation decisions rather than relying on impressionistic judgement.",
        evidenceOverall: "B",
        evidenceNotes: [],
        quizId: "quiz_vol5_mod28",
        casePromptId: "case_vol5_mod28_a",
      },
    ],
    quiz: {
      id: "quiz_vol5_mod28",
      slug: "final-assessment-certification-knowledge-check",
      title: "Module Knowledge Check: Final Assessment and Certification",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol5_mod28_item_01",
          type: "mcq",
          stem: "Which certification principle best supports credibility in this postgraduate doctor stream?",
          options: [
            { id: "a", label: "Require satisfactory performance across knowledge, reasoning, and integrated case domains with moderation governance." },
            { id: "b", label: "Award certification based on completion of content pages and attendance only." },
            { id: "c", label: "Use one high-stakes MCQ score as sole determinant of competence." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale:
            "Module 28 emphasizes multi-domain assessment architecture, moderation, and standards governance for credible certification.",
          evidenceTier: "consensus",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol5_mod28_item_02",
          type: "case-reasoning",
          stem: "A learner performs strongly in written tests but is inconsistent in capstone case integration and ethics communication. Outline a defensible pass/remediation decision pathway.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Use domain-based thresholds: written strength cannot compensate for unsafe integration/communication deficits. Trigger moderation review with documented evidence across domains, define specific remediation targets (case integration, ethical communication, escalation boundaries), and require reassessment in deficient domains before certification. Record rationale for transparency and standards integrity.",
          },
          rationale: "Tests applied certification-governance reasoning under borderline decisions.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol5_mod28_a",
      slug: "vol5-mod28-case",
      title: "Case Discussion: Borderline Certification Decision",
      clinicalScenario:
        "At final board review, a candidate has excellent written performance and acceptable image interpretation but repeated weaknesses in integrated case sequencing, referral-threshold reasoning, and consent communication. Faculty are split between pass and remediation because the candidate is technically strong.",
      discussionPrompts: [
        "What domain-based decision framework should guide pass vs remediation for standards integrity?",
        "How do you document and communicate a remediation pathway that is fair, specific, and defensible?",
        "Which governance controls (moderation/versioning/faculty oversight) are essential in this borderline decision?",
      ],
      moderatorNotes:
        "Faculty: use Module 28 standards governance. Evaluate fairness, transparency, and patient-safety implications of certification decisions.",
      evidenceTier: "B",
      redFlags: [
        "Passing on technical strength while unresolved clinical-reasoning/ethics deficits persist.",
        "Undocumented moderation rationale in high-stakes decisions.",
        "Vague remediation plans without measurable reassessment criteria.",
      ],
      linkedCompetencies: ["doctors_vol5_comp_final_assessment_certification"],
    },
  },
];

const overviewByModule = {
  22: {
    summary:
      "Long Hair FUE and unshaven approaches address real barriers around privacy, social recovery, and aesthetic continuity, especially in concealment-sensitive pathways.",
    clinicalContext:
      "Select long-hair strategies by indication, donor economics, and workflow capability; treat as advanced operational methods rather than marketing labels.",
    learningObjectives: [
      "Define indications and limits of Long Hair FUE and unshaven approaches.",
      "Select high-value patient groups, including female and concealment-sensitive pathways.",
      "Manage workflow, orientation, and team coordination differences from shaved FUE.",
      "Integrate long-hair strategy into eyebrow and facial-design sensitive work safely.",
    ],
    keyTakeaways: [
      "Concealment value is clinically meaningful in selected pathways.",
      "Long-hair workflows require advanced operational discipline.",
      "Female/eyebrow applications demand conservative design governance.",
    ],
    redFlags: [
      "Technique-first marketing without indication logic.",
      "Compromising donor or design quality in pursuit of concealment promises.",
    ],
    evidenceTierNotes: [{ label: "Applied indication", tier: "B", note: "Use Long Hair FUE when pathway barriers and concealment priorities justify advanced workflow complexity." }],
  },
  23: {
    summary:
      "Partial transection and regenerative donor concepts are academy-signature advanced ideas requiring scientific ambition and explicit academic restraint.",
    clinicalContext:
      "Teach biologic plausibility with evidence-tier honesty, selective advanced-pathway positioning, and audit-ready governance rather than routine-standard claims.",
    learningObjectives: [
      "Explain conceptual and biologic rationale for donor-preservation hypotheses.",
      "Position partial transection correctly as advanced-emerging practice.",
      "Integrate donor-support strategies with protocol transparency and regulation-aware boundaries.",
      "Demonstrate responsible-innovation communication and defensibility.",
    ],
    keyTakeaways: [
      "Emerging innovation demands transparent uncertainty language.",
      "Biologic rationale informs but does not finalize clinical standards.",
      "Audit and protocol governance are essential to defensible adoption.",
    ],
    redFlags: [
      "Promotional certainty outrunning evidence.",
      "Routine deployment without advanced-pathway safeguards.",
    ],
  },
  24: {
    summary:
      "Surgical outcomes depend on post-operative biology, donor/recipient recovery quality, complication recognition, and forensic repair reasoning.",
    clinicalContext:
      "Teach structured surveillance, escalation criteria, and evidence-based communication under mixed or disappointing outcomes.",
    learningObjectives: [
      "Interpret recovery stages and expected timeline patterns.",
      "Optimise donor recovery and identify early warning signs.",
      "Classify complications and perform forensic cause analysis before repair.",
      "Apply governance-based escalation and documentation pathways.",
    ],
    keyTakeaways: [
      "Post-op governance is as critical as surgical technique.",
      "Repair is a diagnostic process, not automatic repeat surgery.",
      "Structured escalation preserves safety and trust.",
    ],
    redFlags: [
      "Reassurance without objective reassessment in red-flag scenarios.",
      "Immediate re-surgery without causal mapping.",
    ],
    evidenceTierNotes: [{ label: "Forensic repair", tier: "B", note: "Repair planning should follow documented root-cause analysis and escalation governance." }],
  },
  25: {
    summary:
      "Technical expertise without communication, consent, and ethics can still produce poor outcomes; this module anchors professional identity and trust governance.",
    clinicalContext:
      "Use listening-first structure, explicit ethical boundaries, and longitudinal partnership logic in psychologically charged consultations.",
    learningObjectives: [
      "Address emotional meaning of hair loss without overpathologising.",
      "Apply layered consultation structure from diagnosis to recommendation.",
      "Deliver process-based consent with uncertainty and future progression framing.",
      "Maintain trust through longitudinal plan adaptation.",
    ],
    keyTakeaways: [
      "Consultation quality is a patient-safety and outcomes skill.",
      "Consent is a process with uncertainty, alternatives, and maintenance burden.",
      "Ethical boundaries protect both patient and institutional credibility.",
    ],
    redFlags: [
      "Sales-led urgency replacing informed recommendation.",
      "Ignoring long-term relationship dynamics when outcomes are partial.",
    ],
  },
  26: {
    summary:
      "Research literacy is a clinical safety skill in a field containing strong evidence, weak studies, commercial bias, and rapidly evolving claims.",
    clinicalContext:
      "Train critical appraisal of bias, visual data quality, and protocol heterogeneity; connect appraisal to registry-grade outcomes governance.",
    learningObjectives: [
      "Interpret evidence levels in procedure-heavy contexts.",
      "Detect common bias sources in hair literature and regenerative claims.",
      "Critically evaluate before-and-after evidence quality.",
      "Apply registry-style documentation for quality improvement and publication readiness.",
    ],
    keyTakeaways: [
      "Evidence quality must be interpreted, not assumed.",
      "Visual claims require methodological checks.",
      "Registry thinking improves reliability and accountability.",
    ],
    redFlags: [
      "Adopting interventions based on uncontrolled visual narratives.",
      "No structured outcomes dataset for advanced modalities.",
    ],
  },
  27: {
    summary:
      "Capstone integration tests whether knowledge can be executed as full clinical competence across diagnosis, sequencing, ethics, and longitudinal planning.",
    clinicalContext:
      "Use complex multi-domain cases to assess integrated reasoning under uncertainty and pressure.",
    learningObjectives: [
      "Integrate cross-volume reasoning for mixed and high-risk case domains.",
      "Demonstrate safe sequencing, contraindication logic, and referral thresholds.",
      "Defend decisions in viva-style argument structure.",
      "Produce faculty-reviewable integrated case outputs.",
    ],
    keyTakeaways: [
      "Capstone pass requires integration, not isolated module recall.",
      "Viva quality depends on explicit alternative exclusion and uncertainty handling.",
      "Longitudinal planning is mandatory in final-case decisions.",
    ],
    redFlags: [
      "Binary diagnosis with no sequencing or governance boundaries.",
      "Argument-by-confidence without defensible structure.",
    ],
  },
  28: {
    summary:
      "Final assessment and certification standards determine whether completion represents demonstrable competence rather than passive participation.",
    clinicalContext:
      "Use multi-domain architecture, threshold logic, moderation, and standards governance to protect certification credibility.",
    learningObjectives: [
      "Describe final assessment domains and why architecture matters.",
      "Apply pass criteria across knowledge, reasoning, and integration thresholds.",
      "Define certification meaning in academically defensible scope-safe language.",
      "Implement governance and moderation in borderline decisions.",
    ],
    keyTakeaways: [
      "Certification credibility is architecture-dependent.",
      "Domain thresholds prevent unsafe compensation by single strengths.",
      "Moderation and version control are standards-integrity tools.",
    ],
    redFlags: [
      "High-stakes sign-off without documented moderation rationale.",
      "Certification based on recall-only performance despite integration deficits.",
    ],
    evidenceTierNotes: [{ label: "Standards governance", tier: "B", note: "Final sign-off should include documented domain thresholds, moderation logic, and evidence-tier differentiation." }],
  },
};

const moduleCompetencies = {
  module_vol5_long_hair_fue_unshaven_techniques: ["doctors_vol5_comp_long_hair_fue_unshaven"],
  module_vol5_partial_transection_regenerative_donor_concepts: ["doctors_vol5_comp_partial_transection_regenerative_donor"],
  module_vol5_surgical_recovery_optimisation_complication_management: ["doctors_vol5_comp_recovery_optimisation_complications"],
  module_vol5_consultation_mastery_ethics_psychological_care: ["doctors_vol5_comp_consultation_ethics_psychological_care"],
  module_vol5_research_literacy_evidence_appraisal: ["doctors_vol5_comp_research_literacy_evidence_appraisal"],
  module_vol5_capstone_case_review_clinical_integration: ["doctors_vol5_comp_capstone_clinical_integration"],
  module_vol5_final_assessment_and_certification: ["doctors_vol5_comp_final_assessment_certification"],
};

fs.mkdirSync(root, { recursive: true });
for (const sub of ["modules", "lessons", "quizzes", "case-prompts", "references", "resources"]) {
  fs.mkdirSync(path.join(root, sub), { recursive: true });
}

const volumeIndex = {
  id: volId,
  programSlug: "postgraduate-certificate-clinical-trichology-hair-restoration-medicine",
  volumeNumber: 5,
  slug: volSlug,
  title: volTitle,
  subtitle: "Volume 5",
  status: "draft",
  brandProfiles: ["iiohr", "hli", "iiiohr"],
  audience: ["doctors", "surgeons", "physicians"],
  moduleOrder: modules.map((m) => m.id),
};
fs.writeFileSync(path.join(root, "index.json"), JSON.stringify(volumeIndex, null, 2));

const runtimeModules = modules.map((m) => {
  const ov = overviewByModule[m.moduleNumber];
  return {
    id: m.id,
    volumeId: volId,
    moduleNumber: m.moduleNumber,
    slug: m.slug,
    title: m.title,
    shortTitle: m.shortTitle,
    status: "draft",
    estimatedStudyMinutes: 220,
    academicLevel: "postgraduate-certificate",
    stream: "core",
    overview: ov,
    lessonIds: m.lessons.map((l) => `lesson_vol5_mod${m.moduleNumber}_${pad2(l.lessonNumber)}`),
    quizIds: [m.quiz.id],
    casePromptIds: [m.case.id],
    downloadableResourceIds: [`resource_module_vol5_mod${m.moduleNumber}_summary`],
    referenceIds: [`reference_module_vol5_mod${m.moduleNumber}_01`],
  };
});

const lessons = [];
const quizzes = [];
const cases = [];
const references = [];
const resources = [];

for (const m of modules) {
  for (const l of m.lessons) {
    const lessonId = `lesson_vol5_mod${m.moduleNumber}_${pad2(l.lessonNumber)}`;
    const refId = `reference_lesson_vol5_mod${m.moduleNumber}_${pad2(l.lessonNumber)}`;
    const resId = `resource_lesson_vol5_mod${m.moduleNumber}_${pad2(l.lessonNumber)}_summary`;
    lessons.push({
      id: lessonId,
      moduleId: m.id,
      lessonNumber: l.lessonNumber,
      slug: l.slug,
      title: l.title,
      status: "draft",
      estimatedStudyMinutes: 45,
      lessonType: l.lessonType,
      learningObjectives: l.learningObjectives,
      body: { format: "richText", content: l.body },
      keyTakeaways: l.keyTakeaways,
      redFlags: l.redFlags,
      evidenceTier: {
        overall: l.evidenceOverall,
        summaryNote: `Volume 5 Module ${m.moduleNumber}, section ${l.sectionNote}: ${l.title}.`,
        ...(l.evidenceNotes?.length ? { notes: l.evidenceNotes } : {}),
      },
      clinicalReasoningBoxes: [
        {
          id: `reasoning_${lessonId}`,
          title: "Clinical reasoning",
          prompt: l.reasoningPrompt,
          teachingPoint: l.teachingPoint,
        },
      ],
      downloadableResourceIds: [resId],
      quizId: l.quizId ?? null,
      casePromptIds: l.casePromptId ? [l.casePromptId] : [],
      referenceIds: [refId],
      displayFlags: {
        showEvidencePanel: true,
        showRedFlagsPanel: true,
        showClinicalReasoning: true,
      },
    });

    references.push({
      id: refId,
      moduleId: m.id,
      parentType: "lesson",
      parentId: lessonId,
      citation: `${citationBase} — Module ${m.moduleNumber}, section ${l.sectionNote} (${l.title}). Postgraduate teaching manual (doctor education platform).`,
      sourceType: "consensus",
      year: 2026,
      url: "",
      notes: `Primary lesson alignment for "${l.title}".`,
      evidenceTier: "consensus",
    });

    resources.push({
      id: resId,
      moduleId: m.id,
      parentType: "lesson",
      parentId: lessonId,
      title: `Lesson Summary: ${l.title}`,
      resourceType: "pdf-summary",
      fileName: `lesson-vol5-mod${m.moduleNumber}-${pad2(l.lessonNumber)}-summary.pdf`,
      fileUrl: "",
      version: "v1",
      access,
      description: `Lesson digest aligned to Volume 5 manual (Module ${m.moduleNumber}, section ${l.sectionNote}). PDF distributed when released.`,
    });
  }

  quizzes.push({
    id: m.quiz.id,
    slug: m.quiz.slug,
    moduleId: m.id,
    parentType: "module",
    parentId: m.id,
    title: m.quiz.title,
    status: "draft",
    passMark: m.quiz.passMark,
    retries: m.quiz.retries,
    items: m.quiz.items,
  });

  cases.push({
    id: m.case.id,
    slug: m.case.slug,
    moduleId: m.id,
    parentType: "module",
    parentId: m.id,
    title: m.case.title,
    status: "draft",
    clinicalScenario: m.case.clinicalScenario,
    discussionPrompts: m.case.discussionPrompts,
    moderatorNotes: m.case.moderatorNotes,
    linkedCompetencies: m.case.linkedCompetencies,
    evidenceTier: m.case.evidenceTier,
    redFlags: m.case.redFlags,
  });

  references.push({
    id: `reference_module_vol5_mod${m.moduleNumber}_01`,
    moduleId: m.id,
    parentType: "module",
    parentId: m.id,
    citation: `${citationBase} — Module ${m.moduleNumber}. Postgraduate teaching manual (doctor education platform).`,
    sourceType: "consensus",
    year: 2026,
    url: "",
    notes: `Primary module source for ${m.id}.`,
    evidenceTier: "consensus",
  });

  resources.push({
    id: `resource_module_vol5_mod${m.moduleNumber}_summary`,
    moduleId: m.id,
    parentType: "module",
    parentId: m.id,
    title: `Module Summary: ${m.title}`,
    resourceType: "pdf-summary",
    fileName: `volume-5-module-${m.moduleNumber}-summary.pdf`,
    fileUrl: "",
    version: "v1",
    access,
    description: `Condensed module summary from Volume 5 manual Module ${m.moduleNumber}. PDF distributed when released.`,
  });
}

fs.writeFileSync(path.join(root, "modules", "index.json"), JSON.stringify(runtimeModules, null, 2));
fs.writeFileSync(path.join(root, "lessons", "index.json"), JSON.stringify(lessons, null, 2));
fs.writeFileSync(path.join(root, "quizzes", "index.json"), JSON.stringify(quizzes, null, 2));
fs.writeFileSync(path.join(root, "case-prompts", "index.json"), JSON.stringify(cases, null, 2));
fs.writeFileSync(path.join(root, "references", "index.json"), JSON.stringify(references, null, 2));
fs.writeFileSync(path.join(root, "resources", "index.json"), JSON.stringify(resources, null, 2));

console.log("Generated Doctor Volume 5 runtime JSON:", root);

