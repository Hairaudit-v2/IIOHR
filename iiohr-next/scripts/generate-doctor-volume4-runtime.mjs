/**
 * Generate Doctor Volume 4 runtime JSON (parity-complete).
 *
 * Run:
 *   node scripts/generate-doctor-volume4-runtime.mjs
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
  "volume-4"
);

const volId = "volume_4_therapeutics_regenerative_surgery_foundations";
const volSlug = "therapeutics-regenerative-medicine-and-foundations-of-hair-restoration-surgery";
const volTitle = "Therapeutics, Regenerative Medicine, and Foundations of Hair Restoration Surgery";

const citationBase = `Hair Longevity Institute; International Institute of Hair Restoration (IIIOHR). ${volTitle}`;
const access = "enrolled-only";

const pad2 = (n) => String(n).padStart(2, "0");

const modules = [
  {
    moduleNumber: 17,
    id: "module_vol4_medical_management_of_hair_loss",
    slug: "medical-management-of-hair-loss",
    title: "Medical Management of Hair Loss",
    shortTitle: "Medical management",
    lessons: [
      {
        lessonNumber: 1,
        slug: "treatment-philosophy-goals-and-activity",
        title: "Treatment Philosophy: Goals, Activity, and Evidence Positioning",
        lessonType: "core-lesson",
        sectionNote: "17.1",
        learningObjectives: [
          "Select medical therapy by clarifying disease process, activity, and progression speed.",
          "Match treatment goals to therapy design (arrest shedding, slow miniaturisation, disease control, surgical support, and long-term maintenance).",
        ],
        body:
          "The first question in medical management is not 'which product should I use?' but 'what is the disease process, how active is it, and what is the realistic treatment goal?'. A sophisticated therapeutic plan begins with diagnosis quality, tempo, and an explicit goal (for example: arresting shedding, slowing miniaturisation pressure, thickening existing hairs, controlling inflammatory activity, supporting surgical planning, or long-term maintenance).\n\nPatients improve when therapy aligns to the mechanism. Doctors should learn to position each intervention within a therapeutic ladder and adjust that ladder when the clinical picture evolves, rather than layering treatments indiscriminately.\n\nEvidence tier thinking is the academic backbone of this module: topical minoxidil and finasteride occupy routine-practice positions, while low-dose oral minoxidil sits in an off-label teaching space that requires deliberate counselling and monitoring.",
        keyTakeaways: [
          "Therapy selection starts with disease process, activity, and an explicit treatment goal.",
          "Goals can be diagnostic, stabilising, disease-control, surgical-support, or long-term maintenance.",
          "Evidence-tier positioning reduces overmedicalising and prevents marketing-driven choices.",
        ],
        redFlags: [
          "Picking therapies without reassessing disease activity or patient goals.",
          "Intensifying treatment because progress 'feels slow' without checking adherence, side effects, and diagnostic fit.",
        ],
        reasoningPrompt:
          "A patient is sure they need oral therapy because they have 'male pattern thinning', but your assessment suggests diagnosis uncertainty and slow tempo. What questions should you ask before choosing a treatment ladder?",
        teachingPoint:
          "Reconstruct diagnosis quality and tempo, then define the treatment goal (stabilise, disease control, surgical support, or maintenance) before choosing and sequencing interventions.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "topical-and-low-dose-oral-minoxidil",
        title: "Topical Minoxidil and Low-Dose Oral Minoxidil",
        lessonType: "core-lesson",
        sectionNote: "17.2-17.3",
        learningObjectives: [
          "Explain how topical minoxidil supports calibre maintenance and why early shedding can occur.",
          "Counsel on low-dose oral minoxidil as off-label therapy, including selection, adverse effects, and monitoring priorities.",
        ],
        body:
          "Topical minoxidil remains a core treatment for male and female patterned hair loss, with a strong evidence base in daily practice. Its practical value is prolonging anagen signalling and reducing miniaturisation pressure over time. Limitations are clinically real: irritation, residue, altered hair texture, inconvenience, and long-term adherence challenges.\n\nDoctors should set expectations about gradual onset and the possibility of early shedding that may occur as follicles cycle. Treating the barrier (vehicle intolerance and irritant symptoms) and simplifying application supports continuation.\n\nLow-dose oral minoxidil is increasingly discussed because it can improve adherence and bypass topical intolerance. It must be taught as off-label: deliberate counselling, cardiovascular and fluid-retention screening, and safety-focused monitoring. Oral minoxidil is often a patient-centered choice as much as a pharmacologic one; it is not automatically 'stronger' for every individual.",
        keyTakeaways: [
          "Topical minoxidil works in routine practice, but adherence and irritation determine success.",
          "Early shedding can happen with minoxidil cycling changes; expectation-setting prevents premature discontinuation.",
          "Oral low-dose minoxidil is off-label and requires deliberate risk counselling and screening.",
        ],
        redFlags: [
          "Continuing therapy changes without addressing topical barrier irritation or adherence barriers.",
          "Prescribing off-label oral minoxidil without reviewing cardiovascular history, oedema tendency, and counselling for side effects.",
        ],
        reasoningPrompt:
          "A woman stops topical minoxidil because her scalp is irritated and she forgets doses. She asks about switching to oral minoxidil. What is your decision logic?",
        teachingPoint:
          "Treat oral minoxidil as an off-label, risk-assessed adherence strategy: screen safety, counsel realistically, and set monitoring expectations rather than assuming 'more is better'.",
        evidenceOverall: "B",
        evidenceNotes: [
          { label: "Safety framing", tier: "B", note: "Oral low-dose minoxidil is off-label; teach selection, monitoring, and counselling rather than protocol-heavy prescribing." },
        ],
      },
      {
        lessonNumber: 3,
        slug: "finasteride-dutasteride-and-anti-androgen-strategies",
        title: "Finasteride, Dutasteride, and Anti-Androgen Strategies in Women",
        lessonType: "core-lesson",
        sectionNote: "17.4-17.5",
        learningObjectives: [
          "Use 5-alpha reductase inhibitors appropriately for male pattern hair loss and selected female patients.",
          "Frame anti-androgen strategies for women with reproductive, endocrine, and medico-legal caution.",
        ],
        body:
          "5-alpha reductase inhibition remains central to medical management of male pattern hair loss because it addresses the androgen-driven component of miniaturisation directly. Finasteride is the best-established routine option. Dutasteride may be considered in selected patients where stronger DHT suppression is clinically appropriate and jurisdictional prescribing norms allow.\n\nCounselling must include benefits and limitations, the ongoing need for treatment, and potential adverse effects. Failure analysis should test practical factors (dose adherence), disease context (duration and severity), expectation calibration, and the coexistence of non-AGA drivers.\n\nIn women, anti-androgen strategies require additional caution: reproductive safety, contraindication clarity, and careful monitoring expectations. The goal is evidence-aware therapy, not risky 'trial and see' prescribing.",
        keyTakeaways: [
          "5-alpha reductase inhibitors target the androgen-driven mechanism in male pattern loss.",
          "Failure analysis should separate non-response from non-adherence and incorrect diagnosis.",
          "Anti-androgen therapy in women demands reproductive and medico-legal framing.",
        ],
        redFlags: [
          "Anti-androgen prescribing without reproductive counselling and contraindication checks.",
          "Ignoring non-AGA drivers (for example, diffuse AA, inflammatory scalp disease, or thyroid/iron issues) when response disappoints.",
        ],
        reasoningPrompt:
          "A man requests escalation to a stronger DHT blocker after three months because 'hair is still falling'. How do you decide whether to change the ladder?",
        teachingPoint:
          "Check adherence, expected timelines, and diagnosis fit first; change therapy based on clinically meaningful progress and tolerability rather than calendar frustration.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 4,
        slug: "combination-logic-and-monitoring-failure-analysis",
        title: "Combination Therapy Logic and Monitoring / Failure Analysis",
        lessonType: "clinical-application",
        sectionNote: "17.6-17.7",
        learningObjectives: [
          "Sequence combination therapy by aligning each intervention to a specific therapeutic goal.",
          "Use clinical monitoring to distinguish lack of improvement from non-adherence, overlapping disease, or unrealistic density expectations.",
        ],
        body:
          "Most high-level hair practice is combination medicine. A patient may need one intervention to control miniaturisation, another to support calibre, another to treat scalp health, and another to support long-term maintenance. The discipline is in combining intelligently and sequencing therapies based on disease activity and patient tolerance.\n\nDoctors should learn red flags for mis-titration: do not intensify because progress feels slow until the diagnosis quality is confirmed, adherence is checked, side effects are reviewed, and overlapping disease is considered.\n\nMonitoring is clinical and governance-focused. Standardised photography and, where appropriate, trichoscopy help assess calibre change and shedding patterns. Reassess diagnosis if shedding worsens, inflammation appears, or density drops unexpectedly. Failure analysis should separate non-response from insufficient adherence and from expectations that exceed realistic timelines.",
        keyTakeaways: [
          "Combine therapies only when each has a clear purpose and is sequenced for a specific goal.",
          "Before escalating, check diagnosis fit, adherence, side effects, and overlapping disease.",
          "Use objective monitoring (photography/trichoscopy) and realistic timelines to guide decisions.",
        ],
        redFlags: [
          "Intensifying treatment while ignoring adherence or side effect problems.",
          "Letting symptom-based improvement replace objective monitoring of structural change.",
        ],
        reasoningPrompt:
          "At six months, a patient 'feels better' but photography suggests continued density decline. What are your next reasoning steps for failure analysis?",
        teachingPoint:
          "Triangulate: assess adherence, revisit diagnosis and overlap, interpret side effects, and use photography/trichoscopy trends to guide whether to refine, de-escalate, or refer.",
        evidenceOverall: "B",
        evidenceNotes: [
          { label: "Monitoring discipline", tier: "B", note: "Teach governance: objective monitoring prevents arbitrary ladder changes and improves academic defensibility." },
        ],
        quizId: "quiz_vol4_mod17",
        casePromptId: "case_vol4_mod17_a",
      },
    ],
    quiz: {
      id: "quiz_vol4_mod17",
      slug: "medical-management-knowledge-check",
      title: "Module Knowledge Check: Medical Management of Hair Loss",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol4_mod17_item_01",
          type: "mcq",
          stem: "Which statement best reflects postgraduate diagnostic discipline in medical management of hair loss?",
          options: [
            { id: "a", label: "Define disease process and activity first, then select and sequence therapies to match the treatment goal and evidence tier." },
            { id: "b", label: "Choose the most aggressive medication immediately because 'earlier is always better' for density recovery." },
            { id: "c", label: "Escalate therapy whenever shedding continues for two months, regardless of adherence or diagnosis certainty." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 17 emphasises activity-driven treatment goals and disciplined evidence positioning; escalation must follow diagnosis quality, adherence, and objective monitoring.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol4_mod17_item_02",
          type: "short-answer",
          stem: "A patient wants to switch from topical minoxidil to low-dose oral minoxidil. Outline the safety screening, counselling topics, and monitoring approach you would expect from the doctor.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Screen cardiovascular history, fluid retention and oedema tendency, and interacting clinical factors. Counsel on off-label status, potential side effects (for example, cardiovascular effects and hypertrichosis), and realistic timelines (gradual improvement and possible early shedding). Plan safety-focused monitoring rather than assuming a single universal protocol; document decision-making and review adherence and tolerability.",
          },
          rationale:
            "Module 17 teaches that oral minoxidil is off-label and must be handled with selection, counselling, and safety-governed monitoring.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol4_mod17_a",
      slug: "vol4-mod17-case",
      title: "Case Discussion: Treatment Ladder Discipline",
      clinicalScenario:
        "A 36-year-old man with progressive bitemporal thinning requests a 'transplant plan now' because he wants results this year. He has been inconsistent with topical minoxidil due to scalp irritation and has started an online 'supplement stack'. His history includes a recent change in medication and he reports no scalp pain. You have not yet used trichoscopy or standardised photography.",
      discussionPrompts: [
        "What diagnostic and activity questions should you resolve before designing the medical ladder and giving any surgical timing advice?",
        "How would you sequence topical/oral minoxidil and DHT inhibition with clear expectation-setting for shedding and timelines?",
        "What monitoring and failure-analysis steps would you implement before escalating therapy or considering surgery?",
      ],
      moderatorNotes:
        "Faculty: emphasise Module 17 goals/activity discipline, adherence and side-effect checks, and evidence-tier honest counselling. Avoid turning 'want transplant now' into rushed decision-making.",
      evidenceTier: "B",
      redFlags: [
        "Proceeding to surgical planning without securing diagnosis quality, tempo, and adherence strategy.",
        "Escalating treatment while ignoring minoxidil intolerance and behavioural adherence barriers.",
        "Using marketing-driven supplementation as a substitute for evidence-tier therapy and monitoring.",
      ],
      linkedCompetencies: ["doctors_vol4_comp_medical_management"],
    },
  },
  {
    moduleNumber: 18,
    id: "module_vol4_nutritional_lifestyle_and_systemic_support",
    slug: "nutritional-lifestyle-and-systemic-support",
    title: "Nutritional, Lifestyle, and Systemic Support",
    shortTitle: "Systemic support",
    lessons: [
      {
        lessonNumber: 1,
        slug: "the-systemic-lens",
        title: "The Systemic Lens: Correctable Internal Drivers",
        lessonType: "core-lesson",
        sectionNote: "18.1",
        learningObjectives: [
          "Apply a systematic lens to decide whether hair disorder is being accelerated, amplified, or perpetuated by correctable internal factors.",
          "Translate internal contributors into patient-specific management emphasis without collapsing into indiscriminate supplement marketing.",
        ],
        body:
          "Hair medicine is weakened when systemic contributors are treated as peripheral. Module 18 teaches a doctor-level question: is the hair disorder being accelerated, amplified, or perpetuated by a correctable internal factor? The internal drivers may involve iron depletion, thyroid dysfunction, dietary restriction or protein insufficiency, menstrual blood loss context, insulin resistance, chronic inflammation, sleep disruption, and psychophysiological stress.\n\nThis module is intentionally not a supplement lecture. It focuses on clinical prioritisation, proportional investigation, and translating 'systemic' into mechanism-aware counselling.\n\nThe academic goal is to create treatment emphasis plans that strengthen outcomes without overmedicalising every case or promising hair growth from unproven stacks.",
        keyTakeaways: [
          "Start with a doctor-level question: which correctable internal factors are accelerating the hair disorder?",
          "Investigate and counsel proportionately based on symptoms, context, and evidence tier.",
          "Avoid substituting supplement marketing for coherent clinical reasoning.",
        ],
        redFlags: [
          "Treating systemic issues as optional when the history suggests acceleration or perpetuation.",
          "Ordering broad panels reflexively without clinical cues and translating results into meaningless supplement advice.",
        ],
        reasoningPrompt:
          "A patient with diffuse shedding wants 'full bloods and every vitamin'. Their symptoms suggest recent fatigue and dietary restriction. What is your structured approach before choosing investigations and supplements?",
        teachingPoint:
          "Use the systemic lens to prioritise likely drivers, interpret labs with clinical context, and only correct proven deficiencies; then reframe adherence and timelines realistically.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "iron-ferritin-and-haematologic-logic",
        title: "Iron, Ferritin, and Haematologic Logic",
        lessonType: "core-lesson",
        sectionNote: "18.2",
        learningObjectives: [
          "Interpret iron status beyond isolated ferritin values in the context of symptoms, inflammation, and pattern/tempo.",
          "Recognise common real-world iron contributors (menstrual blood loss, restrictive diets, malabsorption patterns).",
        ],
        body:
          "Iron depletion remains a common contributor to shedding and chronic poor hair quality, particularly in menstruating women and in patients with restrictive diets or malabsorptive tendencies. A doctor-level approach looks beyond a single ferritin number.\n\nDoctors should interpret iron status alongside symptoms, haemoglobin context, inflammatory background, and the hair-loss phenotype. The aim is to identify whether a correctable iron driver is plausible, then address it with clinically appropriate care rather than generic supplement stacking.\n\nThis lesson should train you to connect systemic correction to plausible mechanisms for shedding improvement and hair-quality resilience.",
        keyTakeaways: [
          "Ferritin must be interpreted clinically; inflammation can confound isolated numbers.",
          "Match iron considerations to phenotype, symptoms, and patient context.",
          "Correct proven deficiency rather than escalating supplements without a coherent rationale.",
        ],
        redFlags: [
          "Treating ferritin like a stand-alone target and ignoring clinical context.",
          "Missing systemic symptoms or comorbidities that warrant broader medical coordination.",
        ],
        reasoningPrompt:
          "A patient has a borderline ferritin with inflammatory symptoms and diffuse shedding. What do you do with the information instead of jumping to supplementation?",
        teachingPoint:
          "Reconcile ferritin with inflammatory context and clinical picture, consider whether deficiency is plausible, and prioritise a coherent deficiency-correction plan with follow-up.",
        evidenceOverall: "B",
        evidenceNotes: [
          { label: "Interpretation discipline", tier: "B", note: "Teach clinical context: ferritin values require interpretation with inflammation and symptoms, not numeric fixation." },
        ],
      },
      {
        lessonNumber: 3,
        slug: "micronutrients-stress-sleep-and-micronutrient-fairness",
        title: "Micronutrients, Stress, and Neuroendocrine Burden",
        lessonType: "clinical-application",
        sectionNote: "18.3-18.4",
        learningObjectives: [
          "Decide when to investigate micronutrients and when to focus on nutritional adequacy.",
          "Translate stress and sleep disruption into mechanism-aware counselling rather than vague blame.",
        ],
        body:
          "Not every patient needs extensive micronutrient testing. Selected deficiencies or suboptimal intake may influence shedding, fragility, and response to therapy, but protein adequacy and nutritional diversity often matter more than expensive supplement stacks with weak evidence.\n\nStress is also frequently overused as a generic explanation. In serious practice, stress must be translated into concrete mechanisms: sleep disruption, neuroendocrine stress load, diet change, cortisol-linked behavioural patterns, inflammatory worsening, and sometimes compulsive hair/scalp manipulation. This makes management specific and credible.\n\nThe doctor teaches a balanced, evidence-aware approach: correct genuine deficiencies, address modifiable behaviours, and avoid dismissive or unsubstantiated statements.",
        keyTakeaways: [
          "Correct proven deficiencies and prioritise protein/nutritional diversity over generic stacking.",
          "Translate stress into mechanisms (sleep, diet, neuroendocrine burden, inflammatory influence).",
          "Maintain evidence-tier honesty in counselling and investigation decisions.",
        ],
        redFlags: [
          "Buying into 'more supplements equals better hair' without clinical rationale.",
          "Using stress as a vague explanation without checking modifiable drivers.",
        ],
        reasoningPrompt:
          "A patient is convinced their shedding is due to stress and asks for a large micronutrient list. What do you do with their request in a doctor framework?",
        teachingPoint:
          "Assess plausible mechanisms, focus on adherence to nutritional basics and proven deficiency correction, and counsel with specificity rather than dismissing symptoms or promising hair growth from unproven stacks.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 4,
        slug: "adherence-behavioural-medicine-and-longitudinal-support",
        title: "Adherence, Behavioural Medicine, and Longitudinal Support",
        lessonType: "clinical-application",
        sectionNote: "18.5",
        learningObjectives: [
          "Use behavioural and adherence principles to strengthen longitudinal follow-through in hair medicine.",
          "Support patients through latency periods when improvement is not immediate.",
        ],
        body:
          "Some of the best results in hair medicine come not from adding more medications but from improving follow-through. Patients need simplified, realistic regimens, clear timelines, and support through the period when improvement is not yet obvious.\n\nThis module teaches a doctor-level approach to adherence: reduce complexity where possible, align therapy intensity with patient capacity, and document barriers and solutions.\n\nThe academic output is a longitudinal support framework that strengthens continuation and reduces unnecessary switching driven by anxiety or calendar-based expectations.",
        keyTakeaways: [
          "Adherence is often the strongest determinant of real-world success.",
          "Simplify regimens and set realistic timelines for improvement latency.",
          "Use longitudinal support and documentation to reduce anxiety-driven changes.",
        ],
        redFlags: [
          "Escalating therapy without addressing adherence barriers and misunderstanding of timelines.",
          "Treating patient follow-through as optional rather than a clinical governance responsibility.",
        ],
        reasoningPrompt:
          "A patient reports no response at three months but admits missing applications and inconsistent supplements. How do you frame next steps and avoid unnecessary therapy escalation?",
        teachingPoint:
          "Separate 'no response' into adherence, expectations, and phenotype fit; then adjust the regimen complexity and monitoring plan before escalating therapy.",
        evidenceOverall: "consensus",
        evidenceNotes: [],
        quizId: "quiz_vol4_mod18",
        casePromptId: "case_vol4_mod18_a",
      },
    ],
    quiz: {
      id: "quiz_vol4_mod18",
      slug: "systemic-support-knowledge-check",
      title: "Module Knowledge Check: Nutritional, Lifestyle, and Systemic Support",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol4_mod18_item_01",
          type: "mcq",
          stem: "Which approach best matches doctor-level systemic support for diffuse shedding?",
          options: [
            { id: "a", label: "Use a systemic lens: identify likely correctable drivers, interpret labs with clinical context, and correct proven deficiencies proportionately." },
            { id: "b", label: "Order extensive micronutrient panels for every diffuse shedding patient and treat results with broad supplement stacks." },
            { id: "c", label: "Assume stress is the cause in all cases and focus only on reassurance." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 18 teaches evidence-aware clinical prioritisation, correct deficiency correction, and mechanism-specific counselling rather than reflex panels or generic reassurance.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol4_mod18_item_02",
          type: "short-answer",
          stem: "Outline how you interpret ferritin in context and how you would decide whether to treat iron deficiency rather than escalating supplements blindly.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Interpret ferritin alongside inflammatory context, symptoms, and related haemotologic information (including haemoglobin and clinical background). Decide whether deficiency is plausible based on phenotype and patient drivers such as menstrual blood loss, diet, or malabsorption. If deficiency is supported, coordinate deficiency correction with appropriate medical pathways and reassess response. Avoid numeric fixation; document rationale and expectations for timelines.",
          },
          rationale: "Module 18 emphasises ferritin interpretation with clinical context and disciplined deficiency correction rather than isolated numeric targets.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol4_mod18_a",
      slug: "vol4-mod18-case",
      title: "Case Discussion: Systemic Drivers and Proportional Care",
      clinicalScenario:
        "A 29-year-old woman presents with 5 months of progressive diffuse shedding and fatigue. She reports reduced protein intake after a recent weight-loss plan, heavy menstrual bleeding, and poor sleep. She wants 'a complete vitamin pack' and insists her ferritin must be low because her hair is falling. You have not yet documented a timeline with triggers or done a focused inflammatory and haematologic interpretation.",
      discussionPrompts: [
        "How do you apply the systemic lens to decide which internal drivers are most plausible in this vignette?",
        "What would you prioritise in investigations and interpretation before recommending supplements?",
        "How do you build a longitudinal adherence plan that sets expectations for latency in improvement?",
      ],
      moderatorNotes:
        "Faculty: emphasise Module 18 mechanism-aware systemic support, proportional investigation, and evidence-tier honesty in supplement counselling.",
      evidenceTier: "B",
      redFlags: [
        "Treating ferritin as an isolated numeric target without inflammatory/symptom context.",
        "Overmedicalising with indiscriminate supplement stacks without a coherent driver rationale.",
        "Escalating hair treatments while ignoring sleep, diet, and follow-through barriers.",
      ],
      linkedCompetencies: ["doctors_vol4_comp_nutritional_lifestyle_support"],
    },
  },
  {
    moduleNumber: 19,
    id: "module_vol4_regenerative_medicine_in_trichology",
    slug: "regenerative-medicine-in-trichology",
    title: "Regenerative Medicine in Trichology",
    shortTitle: "Regenerative medicine",
    lessons: [
      {
        lessonNumber: 1,
        slug: "regenerative-medicine-as-concept",
        title: "Regenerative Medicine as a Concept: Rationale vs Effect",
        lessonType: "core-lesson",
        sectionNote: "19.1",
        learningObjectives: [
          "Distinguish biological rationale for regeneration from proven clinical effect.",
          "Position regenerative strategies as adjunct/optimisation tools unless evidence justifies otherwise.",
        ],
        body:
          "Regenerative medicine occupies one of the most exciting yet most easily overstated spaces in hair restoration. Doctors need a framework that is both open to innovation and disciplined by evidence.\n\nThis module distinguishes biological rationale from proven effect, and supportive evidence from marketing excess. The doctor learns to present regenerative strategies as adjunctive or optimisation tools within broader therapeutic plans, because the academic defensibility of the treatment pathway matters as much as the procedure itself.\n\nThe teaching discipline is evidence-tier clarity: established therapies and routine-practice modalities are not the same category as evolving consensus or investigational techniques. That clarity protects patients from unrealistic expectations and protects clinical credibility from shifting narratives.",
        keyTakeaways: [
          "Regenerative strategies are taught as adjuncts unless evidence for stand-alone use is sufficiently robust.",
          "Always separate rationale (why it might work) from effect (what consistently happens).",
          "Evidence-tier clarity prevents marketing-driven overclaiming.",
        ],
        redFlags: [
          "Presenting emerging regenerative modalities as evidence-equivalent to long-established therapies.",
          "Treating regenerative medicine as the primary therapy without aligning to disease control and stabilisation.",
        ],
        reasoningPrompt:
          "A patient asks you to replace evidence-based medical therapy with an emerging regenerative modality. How do you respond academically and clinically?",
        teachingPoint:
          "Explain evidence tier differences, define the likely role as adjunct/optimisation, and re-anchor the plan to disease activity and goals before adding regenerative treatments.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "platelet-rich-plasma-and-expectations",
        title: "Platelet-Rich Plasma (PRP): Expectations and Standardisation",
        lessonType: "core-lesson",
        sectionNote: "19.2",
        learningObjectives: [
          "Explain why PRP outcomes vary and why protocol standardisation remains imperfect.",
          "Position PRP as an adjunct/bridge/optimisation modality with evidence-aware expectations.",
        ],
        body:
          "PRP remains the most established regenerative procedure in routine hair practice. It has supportive evidence in androgenetic alopecia, but outcomes vary by preparation method, platelet concentration, activation approach, injection technique, treatment interval, and patient selection.\n\nPRP should therefore be taught as useful and increasingly evidence-supported, but not as perfectly standardised therapy. The clinical expectations should focus on calibre support, shedding reduction, and density support rather than miraculous reversal of advanced loss.\n\nBecause PRP standardisation differs across systems and clinics, credible practice requires photographic and trichoscopic tracking and the ability to audit what was done and what changed.",
        keyTakeaways: [
          "PRP is established but variably standardised; outcomes depend on protocol and selection.",
          "Set realistic expectations: calibre support and density support, not guaranteed reversal.",
          "Use baseline and tracking to support clinical auditability.",
        ],
        redFlags: [
          "Overpromising outcomes without clarifying protocol variability.",
          "Using PRP as a substitute for medical disease control or stabilisation.",
        ],
        reasoningPrompt:
          "A clinic offers PRP as a guaranteed density restoration service. What academic corrections should you make to counsel the patient safely?",
        teachingPoint:
          "Clarify PRP variability, set evidence-tier realistic expectations, and align PRP role to adjunct/optimisation within the broader treatment plan.",
        evidenceOverall: "B",
        evidenceNotes: [
          { label: "Outcome governance", tier: "B", note: "Teach that PRP is not perfectly standardised; expect variability and track outcomes using photos/trichoscopy." },
        ],
      },
      {
        lessonNumber: 3,
        slug: "microneedling-and-exosomes-positioning",
        title: "Microneedling and Exosome Therapies: Emerging vs Adjunct",
        lessonType: "clinical-application",
        sectionNote: "19.3-19.4",
        learningObjectives: [
          "Position microneedling as stand-alone or combination therapy by mechanism and practice reality.",
          "Teach cautious positioning of exosomes as emerging regenerative medicine, not universal standard of care.",
        ],
        body:
          "Microneedling may act as both a stand-alone stimulus and a facilitator of combination treatment. Academically, it matters because it sits at the interface between procedural stimulation and biological signalling. Clinically, microneedling is often best positioned as a combination modality rather than a high-impact stand-alone intervention.\n\nExosome-based therapies are promising but still belong in the category of emerging regenerative medicine. Product heterogeneity, source variability, manufacturing quality, regulatory status, and limited long-term comparative evidence justify a cautious and academically transparent approach.\n\nDoctors should avoid presenting exosomes as evidence-equivalent to long-established therapies. Evidence-tier teaching currently positions PRP above exosomes in routine clinical establishment, while still acknowledging that exosomes may be highly promising.",
        keyTakeaways: [
          "Microneedling is often best taught as a combination modality, not a guaranteed standalone replacement.",
          "Exosomes are emerging: teach governance and avoid evidence-equivalent marketing language.",
          "Cautious positioning protects both patients and clinical credibility.",
        ],
        redFlags: [
          "Presenting exosomes as universal standard of care.",
          "Skipping evidence-tier counselling and outcome tracking for variably standardised modalities.",
        ],
        reasoningPrompt:
          "A patient wants exosome injections because they were told they are equivalent to PRP. How do you counsel the evidence difference and likely role in a therapy ladder?",
        teachingPoint:
          "Explain evidence-tier positioning and variability, and present exosomes as emerging with careful selection, documentation, and expectations that align to evidence tier.",
        evidenceOverall: "B",
        evidenceNotes: [
          { label: "Evidence-tier honesty", tier: "B", note: "Teach emerging modalities cautiously; exosomes remain investigational/emerging and should not be presented as evidence-equivalent to PRP." },
        ],
      },
      {
        lessonNumber: 4,
        slug: "integration-and-governance-tracking",
        title: "Signature Integration and Governance / Outcome Tracking",
        lessonType: "clinical-application",
        sectionNote: "19.5-19.6",
        learningObjectives: [
          "Integrate regenerative medicine into a longitudinal therapeutic framework (recipient optimisation, donor support, peri-operative and recovery support).",
          "Teach governance: documentation, baseline tracking, protocol transparency, and audit-ready reporting.",
        ],
        body:
          "Within the HLI/IIIOHR teaching model, regenerative medicine is integrated into follicular longevity strategy: pre-treatment recipient optimisation, donor support, peri-operative enhancement, and post-procedural recovery support.\n\nBecause regenerative therapies are variably standardised, serious practice requires stronger documentation than anecdotal practice. Doctors should track baseline density and calibre, shedding patterns, the treatment protocol used, and interval outcomes consistently.\n\nThe end-of-module governance message is that high-quality outcomes depend on both biological rationale and the reliability of clinical execution and documentation. This is how doctors maintain academic defensibility and reduce the risk of repeating misleading narratives.",
        keyTakeaways: [
          "Regenerative medicine integrates into a longitudinal plan, not isolated 'procedure shopping'.",
          "Governance and documentation are essential because protocols vary.",
          "Track outcomes consistently with baseline and interval assessment.",
        ],
        redFlags: [
          "Accepting anecdotal outcome stories without protocol transparency or tracking.",
          "Failing to document baseline and interval findings for auditability.",
        ],
        reasoningPrompt:
          "A patient reports 'PRP worked' because shedding decreased for two weeks, but you have no photos or protocol details. How do you frame next steps?",
        teachingPoint:
          "Re-anchor to governance: confirm protocol and baseline, track objective changes (calibre/density), and discuss evidence-tier expectations and variability before continuing or escalating regenerative plans.",
        evidenceOverall: "B",
        evidenceNotes: [],
        quizId: "quiz_vol4_mod19",
        casePromptId: "case_vol4_mod19_a",
      },
    ],
    quiz: {
      id: "quiz_vol4_mod19",
      slug: "regenerative-medicine-knowledge-check",
      title: "Module Knowledge Check: Regenerative Medicine in Trichology",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol4_mod19_item_01",
          type: "mcq",
          stem: "Which statement best reflects evidence-aware positioning of regenerative therapies?",
          options: [
            { id: "a", label: "PRP has supportive evidence but is variably standardised; present it as an adjunct with realistic expectations and track outcomes." },
            { id: "b", label: "Exosomes should be treated as evidence-equivalent to established therapies in routine practice today." },
            { id: "c", label: "Regenerative procedures should replace disease control because evidence tier differences do not matter for counselling." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 19 teaches PRP as the most established regenerative procedure with variability and adjunct positioning; exosomes remain emerging with cautious evidence-tier framing.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol4_mod19_item_02",
          type: "short-answer",
          stem: "Outline the governance steps you would require before and after a patient chooses a regenerative modality (including what to document and how to track outcomes).",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Document baseline density and calibre, shedding patterns, and relevant symptoms; capture standardised clinical photography and trichoscopic findings where available. Record the regenerative protocol used (preparation method, activation approach, injection/technique details, intervals). Set evidence-tier expectations (adjunct/optimisation role) and track outcomes at planned intervals to assess calibre/density changes rather than short-lived symptom relief. Use documentation for auditability and counsel within the correct evidence tier.",
          },
          rationale: "Module 19 emphasises documentation and audit-ready tracking because regenerative protocols are variably standardised.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol4_mod19_a",
      slug: "vol4-mod19-case",
      title: "Case Discussion: Regenerative Therapy Positioning",
      clinicalScenario:
        "A 44-year-old man with early-moderate androgenetic alopecia is interested in 'exosome injections' because social media claims they are more advanced than PRP. He has been inconsistent with medical therapy. He asks for a stand-alone regenerative plan to avoid tablets. You have not yet documented baseline photos or trichoscopic findings.",
      discussionPrompts: [
        "How do you counsel the evidence-tier difference between PRP and exosomes without dismissing the patient?",
        "Where does regenerative medicine sit in the therapy ladder for this case, and what must be secured first (diagnosis, disease control, expectations)?",
        "What governance steps would you require so outcomes are auditable and comparable across sessions?",
      ],
      moderatorNotes:
        "Faculty: emphasise Module 19 evidence-tier positioning, adjunction rather than replacement of disease control, and governance/documentation discipline.",
      evidenceTier: "B",
      redFlags: [
        "Presenting exosomes as evidence-equivalent to established therapy.",
        "Replacing disease control with regenerative procedures alone when medical adherence is inconsistent.",
        "Continuing regenerative sessions without baseline tracking and protocol transparency.",
      ],
      linkedCompetencies: ["doctors_vol4_comp_regenerative_medicine"],
    },
  },
  {
    moduleNumber: 20,
    id: "module_vol4_principles_of_hair_transplantation",
    slug: "principles-of-hair-transplantation",
    title: "Principles of Hair Transplantation",
    shortTitle: "Transplant foundations",
    lessons: [
      {
        lessonNumber: 1,
        slug: "surgical-candidacy-and-risk-scoping",
        title: "Surgical Candidacy: Diagnosis Security and Future-Loss Planning",
        lessonType: "core-lesson",
        sectionNote: "20.1",
        learningObjectives: [
          "Decide when surgery is appropriate based on diagnosis certainty, disease stability, expectations, and donor quality.",
          "Identify key cautions: unstable loss, active inflammatory disease, unrealistic hairline goals, and poor donor reserve.",
        ],
        body:
          "Hair transplantation must be taught as part of hair medicine, not as a separate cosmetic trade. The best surgical outcomes begin with correct diagnosis, realistic forecasting of future loss, donor preservation, recipient planning, and ethical patient selection.\n\nNot every patient with hair loss is a transplant candidate. Major cautions include unstable loss, active inflammatory disease, unrealistic age-appropriate hairline goals, and poor donor reserve. Women require especially thoughtful selection because diffuse thinning may affect donor safety and aesthetic payoff.\n\nScarring alopecia requires sustained quiescence before restorative surgery is even considered. The doctor must frame surgery within long-term disease management, not as a quick stand-alone fix.",
        keyTakeaways: [
          "Surgical decision-making starts with diagnosis security, stability, donor reserve, and future-loss forecasting.",
          "Active inflammatory disease and unstable loss are major contraindication domains.",
          "Scarring alopecia requires sustained quiescence before restorative surgery.",
        ],
        redFlags: [
          "Planning transplant during active marginal inflammation or plausible scarring activity.",
          "Agreeing to unrealistic hairline lowering goals without stabilisation and long-term counselling.",
        ],
        reasoningPrompt:
          "A patient with suspected scarring activity asks for a transplant now because they feel they look worse. How do you structure the candidacy decision?",
        teachingPoint:
          "Re-anchor to stability and risk: prioritise disease control and sustained quiescence before restorative decisions; document offers of referral and decline-to-proceed rationale when needed.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "donor-assessment-as-finite-resource",
        title: "Donor Assessment as a Finite Biologic Resource",
        lessonType: "core-lesson",
        sectionNote: "20.2",
        learningObjectives: [
          "Assess donor characteristics beyond graft counts (density, calibre, miniaturisation, follicular unit composition, and distribution).",
          "Plan extraction and future work to avoid simplistic 'immediate graft maximise' traps.",
        ],
        body:
          "The donor area should be treated as a finite biologic resource. Density, calibre, follicular-unit composition, miniaturisation status, and relevant scalp properties all matter. Curl and contrast also influence design and expectations. Future extraction needs must be factored into planning.\n\nSerious planning avoids the simplistic trap of focusing only on immediate graft count. Overharvesting is both a technical and an ethical failure because it can compromise future restoration options.\n\nDoctors trained in this module assess donor quality for both current and future therapeutic sessions, aligning design to plausible long-term progression.",
        keyTakeaways: [
          "Treat donor tissue as finite: density, calibre, composition, and miniaturisation matter.",
          "Avoid planning based only on immediate graft count.",
          "Reserve donor boundaries for future sessions to protect long-term options.",
        ],
        redFlags: [
          "Counselling that ignores future extraction and donor economics.",
          "A plan that leaves the patient with no realistic future restorative pathway.",
        ],
        reasoningPrompt:
          "A patient wants very high yield extraction in their first session. What donor information would you check before accepting or declining?",
        teachingPoint:
          "Check density, calibre, miniaturisation, and distribution; build a conservative long-term reserve plan rather than aiming solely for maximal immediate yield.",
        evidenceOverall: "B",
        evidenceNotes: [
          { label: "Ethics and economics", tier: "B", note: "Teach donor preservation as a long-term ethical decision, not just a technical calculation." },
        ],
      },
      {
        lessonNumber: 3,
        slug: "recipient-design-and-technique-tradeoffs",
        title: "Recipient Planning and FUT vs FUE Trade-offs",
        lessonType: "clinical-application",
        sectionNote: "20.3-20.4",
        learningObjectives: [
          "Design recipients as a medical-aesthetic decision shaped by progression, face structure, and patient psychology.",
          "Explain FUT vs FUE trade-offs by candidate suitability, recovery, and donor management rather than technique ideology.",
        ],
        body:
          "Recipient design is a medical-aesthetic decision. It is shaped by age, ethnicity, facial structure, likely future loss, donor limitations, and patient psychology. Naturalness requires restraint: hairline lowering that ignores progression can create long-term surgical debt.\n\nBoth FUT and FUE remain legitimate surgical methods. The educational goal is not ideological loyalty to one technique, but understanding trade-offs in scarring patterns, extraction dynamics, donor management, total yield strategy, recovery, and candidate suitability.\n\nDoctors must counsel patients using honest trade-off language. Technique selection should serve the patient and the long-term plan, not an extraction narrative alone.",
        keyTakeaways: [
          "Recipient design must account for future progression and naturalness restraint.",
          "FUT vs FUE selection is about trade-offs and candidate suitability, not ideology.",
          "Medical-aesthetic counselling reduces long-term discord and disappointment.",
        ],
        redFlags: [
          "Designing hairlines without explicitly planning for progression.",
          "Selecting a technique without discussing donor management and candidate suitability.",
        ],
        reasoningPrompt:
          "A young patient wants an aggressive hairline lowering plan. What counselling and design constraints do you apply before proceeding?",
        teachingPoint:
          "Reconcile design with likely progression and donor reserve; use honest restraint language and long-term forecasting to set expectations and protect future outcomes.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 4,
        slug: "shock-loss-timing-and-long-term-planning",
        title: "Shock Loss, Timing, and Long-Term Surgical Planning",
        lessonType: "clinical-application",
        sectionNote: "20.5",
        learningObjectives: [
          "Counsel that transplanted hair is one component of a lifelong plan.",
          "Explain shock loss, the risk of continued miniaturisation, and how timing affects long-term results.",
        ],
        body:
          "Patients must be counselled that transplanted hair is only one part of a lifelong plan. Native hair may continue to miniaturise. Shock loss can occur. Future sessions may be limited by donor economics.\n\nThe mature transplant thinker plans for the next decade, not just the next six months. Doctors should use long-view counselling that frames surgery as a component of broader medical and maintenance planning.\n\nThis lesson includes a clinical pearl: a hair transplant is not the treatment for androgenetic alopecia; it is one component of a broader management strategy.",
        keyTakeaways: [
          "Transplant outcomes depend on the lifelong plan: ongoing native miniaturisation and shock loss risk.",
          "Planning horizon is years, not months.",
          "Surgery is a component, not a standalone cure.",
        ],
        redFlags: [
          "Counselling that frames transplant as a cure or ignores shock loss risk.",
          "Failing to plan for potential future sessions based on donor economics and progression.",
        ],
        reasoningPrompt:
          "At three months post-op, a patient experiences increased shedding. What explanation and next steps do you frame?",
        teachingPoint:
          "Discuss shock loss as a known timeline phenomenon, connect it to ongoing disease control and monitoring, and avoid promising recovery guarantees without reassessing objective findings and adherence.",
        evidenceOverall: "B",
        evidenceNotes: [],
        quizId: "quiz_vol4_mod20",
        casePromptId: "case_vol4_mod20_a",
      },
    ],
    quiz: {
      id: "quiz_vol4_mod20",
      slug: "hair-transplantation-knowledge-check",
      title: "Module Knowledge Check: Principles of Hair Transplantation",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol4_mod20_item_01",
          type: "mcq",
          stem: "Which choice best reflects postgraduate surgical candidacy discipline?",
          options: [
            { id: "a", label: "Proceed only when diagnosis is secure, expected future loss is factored, expectations are realistic, donor reserve is acceptable, and inflammatory disease is quiescent where relevant." },
            { id: "b", label: "Offer transplant whenever the patient requests it, because surgical planning can compensate for unstable loss." },
            { id: "c", label: "Proceed with transplant during active scarring alopecia to achieve faster density restoration." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 20 stresses candidacy discipline, quiescence in scarring disease, and future-loss forecasting before surgery.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol4_mod20_item_02",
          type: "short-answer",
          stem: "Outline what you would counsel a patient about long-term planning (including shock loss and ongoing disease progression) before consenting to surgery.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Counsel that transplant is one component of lifelong management: native hair can continue to miniaturise, shock loss can occur, and future sessions may depend on donor economics. Explain that results are influenced by disease control, adherence to maintenance, and long-term planning rather than a single procedure outcome. Use realistic expectation language and connect next steps to monitoring and potential future sessions.",
          },
          rationale: "Module 20 includes long-view counselling and warns against treating transplant as a cure, including shock loss and ongoing progression.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol4_mod20_a",
      slug: "vol4-mod20-case",
      title: "Case Discussion: Candidacy and Long-Term Forecasting",
      clinicalScenario:
        "A 52-year-old woman requests hair transplantation for progressive crown thinning. She reports burning when styling and intermittent scalp tenderness. She has seen a clinician for 'pattern loss' and was offered minoxidil, but she has not had structured inflammatory assessment or objective documentation. She wants surgery in the next two months and is not open to further diagnostic workup.",
      discussionPrompts: [
        "Which candidacy features and risk domains require careful assessment before any transplant planning in this case?",
        "How would you frame the biopsy/quiescence requirement if inflammatory or scarring causes are plausible?",
        "What long-term planning elements must be included to set realistic expectations and protect donor and recipient outcomes?",
      ],
      moderatorNotes:
        "Faculty: stress Module 20 candidacy discipline and long-view counselling, especially around active inflammation and scarring risk. Teach refusal-to-proceed documentation when appropriate.",
      evidenceTier: "B",
      redFlags: [
        "Proceeding to transplant while inflammatory risk is plausible or diagnosis is not secured.",
        "Ignoring symptoms that compete with a simple pattern-loss label.",
        "Treating surgery as a cure rather than a component of ongoing management.",
      ],
      linkedCompetencies: ["doctors_vol4_comp_hair_transplantation"],
    },
  },
  {
    moduleNumber: 21,
    id: "module_vol4_advanced_fue_science",
    slug: "advanced-fue-science",
    title: "Advanced FUE Science",
    shortTitle: "Advanced FUE science",
    lessons: [
      {
        lessonNumber: 1,
        slug: "punch-dynamics-and-transection-mechanics",
        title: "Punch Dynamics and Transection Mechanics",
        lessonType: "core-lesson",
        sectionNote: "21.1",
        learningObjectives: [
          "Explain why transection risk varies (curl pattern, skin thickness, exit angle, punch diameter, sharpness profile, and depth control).",
          "Teach decision-making changes by hair type and scalp type rather than a single mechanical recipe.",
        ],
        body:
          "Advanced FUE science sits at the intersection of surgical anatomy, instrumentation, skin biomechanics, graft preservation, and aesthetic planning. It should be taught to doctors as a precision tissue-handling discipline rather than a purely mechanical extraction exercise.\n\nTransection risk is influenced by curl pattern, skin thickness, fibrosis, exit angle, punch diameter, sharpness profile, and operator technique. Teaching therefore focuses on why transection happens and how clinical decisions change by hair type and scalp type.\n\nThe doctor-level message is that technical competence improves outcomes, but governance of decision-making matters: a single punch choice cannot be universal across different scalp types and follicular morphologies.",
        keyTakeaways: [
          "Transection risk is multifactorial: hair curl, scalp thickness, fibrosis, exit angle, and instrument profile.",
          "Decision-making must be adapted to hair type and scalp type.",
          "Precision tissue handling is a disciplined reasoning practice.",
        ],
        redFlags: [
          "Using identical punch depth/angle settings across different scalp types without adaptation.",
          "Ignoring factors that predict transection risk and then attributing poor outcomes to 'bad luck'.",
        ],
        reasoningPrompt:
          "A patient has very tight curls and a thick, fibrotic donor scalp. How would you adapt your transection risk thinking before extraction?",
        teachingPoint:
          "Reassess predicted transection risks based on curl/scalp variables, adjust technique decisions accordingly, and document your rationale for governance.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 2,
        slug: "donor-distribution-and-overharvesting-prevention",
        title: "Donor Distribution and Overharvesting Prevention",
        lessonType: "core-lesson",
        sectionNote: "21.2",
        learningObjectives: [
          "Manage donor distribution with safe extraction boundaries and realistic future work.",
          "Prevent visible moth-eaten depletion through distributed extraction and an honest approach to donor economics.",
        ],
        body:
          "Good donor management depends on distributed extraction and avoidance of visible moth-eaten depletion. Respect for safe donor boundaries is non-negotiable. Overharvesting is both technical and ethical: it can be avoided when planning reserves enough tissue for future work and when extraction is distributed rather than concentrated.\n\nDoctors should learn donor boundaries as a governance concept. It is not simply about extraction efficiency today; it is about protecting biologic resource for later sessions.\n\nThis lesson trains you to see donor planning as long-view surgical responsibility.",
        keyTakeaways: [
          "Distribute extraction to respect safe donor boundaries and preserve future options.",
          "Overharvesting is an ethical failure that harms long-term outcomes.",
          "Donor management is governance, not just efficiency.",
        ],
        redFlags: [
          "Extraction that prioritises immediate yield over future donor reserve.",
          "Design decisions that ignore patient economics and realistic future session constraints.",
        ],
        reasoningPrompt:
          "A patient wants maximum yield in session one. What donor management principles do you apply to protect against future depletion?",
        teachingPoint:
          "Prioritise distributed extraction and reserve safe donor boundaries for future sessions; counsel realistically about what can and cannot be achieved long-term.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 3,
        slug: "graft-handling-and-survival-logic",
        title: "Graft Handling and Survival Logic",
        lessonType: "core-lesson",
        sectionNote: "21.3",
        learningObjectives: [
          "Explain graft survival determinants: dehydration avoidance, holding solution quality, out-of-body time, temperature control, and atraumatic implantation.",
          "Teach the limitation that implantation cannot rescue earlier poor graft stewardship.",
        ],
        body:
          "Graft survival is influenced by workflow details. Dehydration avoidance, holding solution quality, out-of-body time, temperature control, and atraumatic implantation are core determinants.\n\nDoctors should learn a governance discipline: excellent implantation cannot rescue poor graft stewardship earlier in the workflow. Teaching must connect actions to likely biological outcomes and train surgeons to protect graft viability from the moment of extraction.\n\nThe aim is a consistent tissue-handling chain that reduces variability and improves outcomes for each patient.",
        keyTakeaways: [
          "Protect graft viability across the whole workflow: dehydration avoidance, holding quality, out-of-body time, temperature control.",
          "Atraumatic implantation matters, but earlier stewardship cannot be 'fixed later'.",
          "Workflow governance reduces variability.",
        ],
        redFlags: [
          "Attributing graft failure to implantation technique when extraction and holding steps were poor.",
          "Poor temperature/out-of-body control without documenting workflow constraints.",
        ],
        reasoningPrompt:
          "If out-of-body time increases due to staffing, what is your responsibility as a doctor before proceeding with implantation?",
        teachingPoint:
          "Reassess readiness and workflow conditions, protect graft stewardship, and document how staffing/constraints impact viability so you can adjust planning safely.",
        evidenceOverall: "B",
        evidenceNotes: [],
      },
      {
        lessonNumber: 4,
        slug: "density-strategy-and-bridge-to-advanced-techniques",
        title: "Density Strategy, Naturalness, and Bridge to Advanced Techniques",
        lessonType: "clinical-application",
        sectionNote: "21.4-21.5",
        learningObjectives: [
          "Allocate density strategically: hairline density, frontal framing, mid-scalp blending, and crown economy.",
          "Explain why advanced academy techniques should follow foundational understanding.",
        ],
        body:
          "Density planning must be anatomically and aesthetically intelligent. Hairline density, frontal framing, mid-scalp blending, and crown economy require allocation logic rather than simple 'maximum density' ideology.\n\nThis module also bridges into later advanced academy topics such as long hair FUE, unshaven strategies, regenerative donor optimisation, and partial transection concepts. Those advanced topics should be taught after you already understand extraction mechanics, donor economics, and graft biology.\n\nBy the end of Volume 4, the learner should be able to position therapeutic and surgical decisions within a disciplined evidence-aware framework and understand why technical precision and governance matter.",
        keyTakeaways: [
          "Density strategy is allocation logic, not maximum density ideology.",
          "Naturalness requires restraint and future progression awareness.",
          "Advanced academy techniques should be taught only after foundational tissue-handling and donor economics are understood.",
        ],
        redFlags: [
          "Designing a transplant plan solely for short-term maximum density.",
          "Skipping foundational understanding and jumping to advanced techniques without governance discipline.",
        ],
        reasoningPrompt:
          "A patient requests a very dense hairline immediately. How do you frame density allocation and naturalness restraint using a surgical reasoning lens?",
        teachingPoint:
          "Use anatomical allocation logic and long-term progression framing; counsel realistically about naturalness, donor economics, and future session constraints.",
        evidenceOverall: "B",
        evidenceNotes: [],
        quizId: "quiz_vol4_mod21",
        casePromptId: "case_vol4_mod21_a",
      },
    ],
    quiz: {
      id: "quiz_vol4_mod21",
      slug: "advanced-fue-science-knowledge-check",
      title: "Module Knowledge Check: Advanced FUE Science",
      passMark: 70,
      retries: 2,
      items: [
        {
          id: "quiz_vol4_mod21_item_01",
          type: "mcq",
          stem: "Which statement best reflects doctor-level understanding of transection risk in advanced FUE?",
          options: [
            { id: "a", label: "Transection risk depends on multiple variables (curl pattern, scalp thickness, fibrosis, exit angle, punch diameter, sharpness, and depth control), so technique decisions must adapt to patient anatomy." },
            { id: "b", label: "Transection risk is fixed when the punch diameter is chosen; other biomechanical variables do not meaningfully change outcomes." },
            { id: "c", label: "If implantation is excellent, transection risk before extraction does not matter for graft survival." },
          ],
          correctAnswer: { optionIds: ["a"] },
          rationale: "Module 21 emphasises multifactor transection risk and adaptive decisions based on hair/scalp variables; graft viability depends on workflow stewardship rather than a single step.",
          evidenceTier: "B",
          facultyReviewRequired: false,
        },
        {
          id: "quiz_vol4_mod21_item_02",
          type: "short-answer",
          stem: "Describe how you would explain density strategy and naturalness restraint to a patient requesting maximum immediate density, and what you would document for governance.",
          options: [],
          correctAnswer: {
            freeTextSample:
              "Explain density allocation by anatomy: hairline density/frontal framing, mid-scalp blending, and crown economy, emphasising restraint and naturalness rather than maximum density ideology. Tie counselling to future progression and donor economics, clarify realistic session planning, and document the design rationale and governance items (e.g., donor reserve considerations and expected long-term constraints).",
          },
          rationale: "Module 21 teaches allocation logic and governance in density strategy, bridging to advanced techniques only after foundational understanding.",
          evidenceTier: "B",
          facultyReviewRequired: true,
        },
      ],
    },
    case: {
      id: "case_vol4_mod21_a",
      slug: "vol4-mod21-case",
      title: "Case Discussion: Donor Governance and Naturalness Strategy",
      clinicalScenario:
        "A 33-year-old man has tight curls and a thick donor scalp. He requests a very dense hairline in a single session. During consultation, he insists that transection risk can be 'fixed in implantation' and he wants maximum immediate yield despite limited donor reserve assessment. You have not yet documented donor distribution reasoning or workflow governance details.",
      discussionPrompts: [
        "How do you educate the patient on multifactor transection risk and why earlier tissue handling cannot be rescued later?",
        "What donor governance principles do you apply to prevent visible depletion and protect future sessions?",
        "How do you frame density strategy and naturalness restraint as an allocation decision tied to long-term planning?",
      ],
      moderatorNotes:
        "Faculty: emphasise Module 21 precision tissue handling, donor distribution/overharvesting prevention, and density allocation logic with candid long-view counselling.",
      evidenceTier: "B",
      redFlags: [
        "Counselling that ignores donor economics and future depletion risk.",
        "Belief that implantation quality can compensate for earlier workflow stewardship errors.",
        "Design decisions driven by maximum density requests rather than allocation logic and naturalness restraint.",
      ],
      linkedCompetencies: ["doctors_vol4_comp_advanced_fue_science"],
    },
  },
];

// Competency IDs and module->competency mapping used for quiz/case linkage.
const moduleCompetencies = {
  "module_vol4_medical_management_of_hair_loss": ["doctors_vol4_comp_medical_management"],
  "module_vol4_nutritional_lifestyle_and_systemic_support": ["doctors_vol4_comp_nutritional_lifestyle_support"],
  "module_vol4_regenerative_medicine_in_trichology": ["doctors_vol4_comp_regenerative_medicine"],
  "module_vol4_principles_of_hair_transplantation": ["doctors_vol4_comp_hair_transplantation"],
  "module_vol4_advanced_fue_science": ["doctors_vol4_comp_advanced_fue_science"],
};

fs.mkdirSync(root, { recursive: true });
for (const sub of ["modules", "lessons", "quizzes", "case-prompts", "references", "resources"]) {
  fs.mkdirSync(path.join(root, sub), { recursive: true });
}

const volumeIndex = {
  id: volId,
  programSlug: "postgraduate-certificate-clinical-trichology-hair-restoration-medicine",
  volumeNumber: 4,
  slug: volSlug,
  title: volTitle,
  subtitle: "Volume 4",
  status: "draft",
  brandProfiles: ["iiohr", "hli", "iiiohr"],
  audience: ["doctors", "surgeons", "physicians"],
  moduleOrder: modules.map((m) => m.id),
};
fs.writeFileSync(path.join(root, "index.json"), JSON.stringify(volumeIndex, null, 2));

// Build modules/lessons/quizzes/cases/references/resources
const moduleRefByModuleId = new Map();
const moduleResourceByModuleId = new Map();

const legacyModules = modules.map((m) => {
  const lessonIds = m.lessons.map((l) => `lesson_vol4_mod${m.moduleNumber}_${pad2(l.lessonNumber)}`);
  const quizId = m.quiz.id;
  const casePromptId = m.case.id;
  const moduleRefId = `reference_module_vol4_mod${m.moduleNumber}_01`;
  const moduleResourceId = `resource_module_vol4_mod${m.moduleNumber}_summary`;
  moduleRefByModuleId.set(m.id, moduleRefId);
  moduleResourceByModuleId.set(m.id, moduleResourceId);

  // Lightweight module overview derived from extracted module text.
  const overviewByModuleNumber = {
    17: {
      summary:
        "Medical management is the backbone of most hair-loss pathways. Even when surgery is possible later, medical therapy often determines stability, donor protection, recipient optimisation, and long-term maintenance.",
      clinicalContext:
        "Doctors must tailor therapy to phenotype, sex, age, comorbidity, reproductive context, adherence likelihood, and risk tolerance. Teach evidence-tier positioning and safe monitoring rather than protocol-only prescribing.",
      learningObjectives: [
        "Use topical and oral minoxidil appropriately with expectation-setting and safety monitoring.",
        "Apply 5-alpha reductase inhibitors appropriately and counsel on adverse effects and limitations.",
        "Frame anti-androgen strategies in women with reproductive, endocrine, and medico-legal caution.",
        "Sequence combination therapy logically and perform failure analysis using objective monitoring.",
      ],
      keyTakeaways: ["Treatment goal and activity guide therapy selection.", "Oral minoxidil is off-label and safety-governed.", "DHT inhibition is core in male pattern loss; women need careful framing.", "Combination therapy requires disciplined sequencing and monitoring."],
      redFlags: ["Escalating treatment without checking adherence, side effects, and diagnosis fit.", "Replacing evidence-tier disease control with off-label or emerging options without governance."],
      evidenceTierNotes: [{ label: "Core routine vs off-label", tier: "B", note: "Teach established routine options separately from off-label strategies; counselling and monitoring are part of academic defensibility." }],
    },
    18: {
      summary:
        "Hair medicine is weakened when systemic contributors are treated as peripheral. This module teaches how to address internal drivers without collapsing into supplement marketing or indiscriminate testing.",
      clinicalContext:
        "Adopt a systemic lens: identify whether the hair disorder is being accelerated, amplified, or perpetuated by correctable internal factors, then translate that into proportionate investigation and longitudinal counselling.",
      learningObjectives: [
        "Apply the systemic lens to identify plausible correctable drivers in diffuse shedding and poor hair quality.",
        "Interpret iron status in context (ferritin, inflammation, and symptoms) to decide on deficiency correction.",
        "Address micronutrient adequacy and translate stress/sleep into mechanism-aware counselling.",
        "Strengthen adherence and behavioural follow-through with simplified regimens and realistic timelines.",
      ],
      keyTakeaways: ["Correct proven deficiency and address modifiable drivers.", "Translate stress into mechanisms rather than vague blame.", "Avoid expensive testing and marketing-driven supplement stacking.", "Adherence support often outperforms additional medications."],
      redFlags: ["Overmedicalising with reflexive broad testing.", "Fixating on numeric targets (e.g., ferritin) without clinical context.", "Escalating therapy without addressing follow-through barriers."],
    },
    19: {
      summary:
        "Regenerative medicine is exciting but easily overstated. Doctors learn to distinguish biological rationale from proven effect and to position supportive evidence without marketing excess.",
      clinicalContext:
        "Teach evidence-tier thinking: established routine-practice options like PRP (with protocol variability) vs emerging modalities like exosomes. Require governance through documentation and outcome tracking.",
      learningObjectives: [
        "Position regenerative therapies as adjuncts and explain evidence-tier differences safely.",
        "Counsel on PRP variability and set realistic expectations.",
        "Teach cautious positioning for exosomes and other emerging therapies.",
        "Integrate regenerative medicine into a longitudinal plan with governance and documentation.",
      ],
      keyTakeaways: ["Evidence-tier clarity prevents overclaiming.", "PRP is variably standardised and should be audited.", "Exosomes are emerging; governance and realistic expectations matter.", "Integrate regenerative medicine into recipient and peri-operative planning."],
      redFlags: ["Presenting emerging modalities as evidence-equivalent.", "Proceeding without baseline tracking and protocol transparency."],
      evidenceTierNotes: [{ label: "PRP above exosomes", tier: "B", note: "Current teaching positions PRP above exosomes in routine establishment; exosomes remain emerging with heterogeneous evidence." }],
    },
    20: {
      summary:
        "Hair transplantation should be taught as part of hair medicine. The educational focus is realistic forecasting, donor preservation, recipient planning, and ethical patient selection.",
      clinicalContext:
        "Decide candidacy by diagnosis security, disease pattern understanding, expectations, and donor reserve. In scarring alopecia, surgery requires sustained quiescence and specialist-led stability assessment.",
      learningObjectives: [
        "Apply surgical candidacy discipline based on stability, diagnosis, and future loss forecasting.",
        "Assess donor reserves as finite biologic resources rather than graft-only calculations.",
        "Plan recipient design for naturalness restraint and progression awareness.",
        "Counsel on FUT vs FUE trade-offs without technique ideology and plan for shock loss and long-term sessions.",
      ],
      keyTakeaways: ["Surgery is not a cure: it is a component of lifelong management.", "Donor assessment protects future options.", "Recipient design needs restraint and naturalness.", "Shock loss and ongoing progression must be counselled."],
      redFlags: ["Planning surgery in active inflammatory or plausible scarring disease.", "Overpromising density results without long-view forecasting."],
    },
    21: {
      summary:
        "Advanced FUE science is a tissue-handling discipline across transection mechanics, graft survival logic, donor distribution governance, and aesthetic allocation strategy.",
      clinicalContext:
        "Teach advanced FUE reasoning as adaptive precision: punch dynamics depend on patient anatomy, graft survival depends on workflow governance, and density strategy is allocation-based rather than maximum-density ideology.",
      learningObjectives: [
        "Explain transection risk determinants and how decisions adapt by hair/scalp variables.",
        "Manage donor distribution and prevent overharvesting / visible depletion.",
        "Apply graft handling survival logic across extraction, holding, and implantation workflow.",
        "Plan density strategy and frame naturalness restraint and advanced-technique bridge safely.",
      ],
      keyTakeaways: ["Transection risk is multifactorial and technique must adapt.", "Donor governance prevents ethical and technical failure.", "Workflow stewardship cannot be rescued by later implantation.", "Density allocation requires naturalness restraint."],
      redFlags: ["Assuming implantation can fix earlier workflow errors.", "Overharvesting donor for immediate yield without future planning.", "Ignoring density allocation and progression restraint."],
    },
  };

  const overview = overviewByModuleNumber[m.moduleNumber];
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
    overview,
    lessonIds: lessonIds,
    quizIds: [quizId],
    casePromptIds: [casePromptId],
    downloadableResourceIds: [moduleResourceId],
    referenceIds: [moduleRefId],
  };
});

const legacyLessons = [];
const legacyQuizzes = [];
const legacyCases = [];
const references = [];
const resources = [];

for (const m of modules) {
  for (const lesson of m.lessons) {
    const lessonId = `lesson_vol4_mod${m.moduleNumber}_${pad2(lesson.lessonNumber)}`;
    const lessonRefId = `reference_lesson_vol4_mod${m.moduleNumber}_${pad2(lesson.lessonNumber)}`;
    const lessonResourceId = `resource_lesson_vol4_mod${m.moduleNumber}_${pad2(lesson.lessonNumber)}_summary`;
    const reasoningId = `reasoning_${lessonId}`;
    const quizId = lesson.quizId ?? null;
    const caseIds = lesson.casePromptId ? [lesson.casePromptId] : [];

    legacyLessons.push({
      id: lessonId,
      moduleId: m.id,
      lessonNumber: lesson.lessonNumber,
      slug: lesson.slug,
      title: lesson.title,
      status: "draft",
      estimatedStudyMinutes: 45,
      lessonType: lesson.lessonType,
      learningObjectives: lesson.learningObjectives,
      body: { format: "richText", content: lesson.body },
      keyTakeaways: lesson.keyTakeaways,
      redFlags: lesson.redFlags,
      evidenceTier: {
        overall: lesson.evidenceOverall,
        summaryNote: `Volume 4 Module ${m.moduleNumber}, section ${lesson.sectionNote}: ${lesson.title}.`,
        ...(lesson.evidenceNotes && lesson.evidenceNotes.length ? { notes: lesson.evidenceNotes } : {}),
      },
      clinicalReasoningBoxes: [
        {
          id: reasoningId,
          title: "Clinical reasoning",
          prompt: lesson.reasoningPrompt,
          teachingPoint: lesson.teachingPoint,
        },
      ],
      downloadableResourceIds: [lessonResourceId],
      quizId,
      casePromptIds: caseIds,
      referenceIds: [lessonRefId],
      displayFlags: {
        showEvidencePanel: true,
        showRedFlagsPanel: true,
        showClinicalReasoning: true,
      },
    });

    references.push({
      id: lessonRefId,
      moduleId: m.id,
      parentType: "lesson",
      parentId: lessonId,
      citation: `${citationBase} — Module ${m.moduleNumber}, section ${lesson.sectionNote} (${lesson.title}). Postgraduate teaching manual (doctor education platform).`,
      sourceType: "consensus",
      year: 2026,
      url: "",
      notes: `Primary lesson alignment for "${lesson.title}".`,
      evidenceTier: "consensus",
    });

    resources.push({
      id: lessonResourceId,
      moduleId: m.id,
      parentType: "lesson",
      parentId: lessonId,
      title: `Lesson Summary: ${lesson.title}`,
      resourceType: "pdf-summary",
      fileName: `lesson-vol4-mod${m.moduleNumber}-${pad2(lesson.lessonNumber)}-summary.pdf`,
      fileUrl: "",
      version: "v1",
      access,
      description: `Lesson digest aligned to Volume 4 manual (Module ${m.moduleNumber}, section ${lesson.sectionNote}). PDF distributed when released.`,
    });
  }

  legacyQuizzes.push({
    id: m.quiz.id,
    slug: m.quiz.slug,
    moduleId: m.id,
    parentType: "module",
    parentId: m.id,
    title: m.quiz.title,
    status: "draft",
    passMark: m.quiz.passMark,
    retries: m.quiz.retries,
    items: m.quiz.items.map((item) => ({
      id: item.id,
      type: item.type,
      stem: item.stem,
      options: item.options ?? [],
      correctAnswer: item.correctAnswer,
      rationale: item.rationale,
      evidenceTier: item.evidenceTier,
      facultyReviewRequired: item.facultyReviewRequired,
    })),
  });

  legacyCases.push({
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

  // Module reference + resource
  const moduleRefId = `reference_module_vol4_mod${m.moduleNumber}_01`;
  const moduleResourceId = `resource_module_vol4_mod${m.moduleNumber}_summary`;
  references.push({
    id: moduleRefId,
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
    id: moduleResourceId,
    moduleId: m.id,
    parentType: "module",
    parentId: m.id,
    title: `Module Summary: ${m.title}`,
    resourceType: "pdf-summary",
    fileName: `volume-4-module-${m.moduleNumber}-summary.pdf`,
    fileUrl: "",
    version: "v1",
    access,
    description: `Condensed module summary from Volume 4 manual Module ${m.moduleNumber}. PDF distributed when released.`,
  });
}

fs.writeFileSync(path.join(root, "modules", "index.json"), JSON.stringify(legacyModules, null, 2));
fs.writeFileSync(path.join(root, "lessons", "index.json"), JSON.stringify(legacyLessons, null, 2));
fs.writeFileSync(path.join(root, "quizzes", "index.json"), JSON.stringify(legacyQuizzes, null, 2));
fs.writeFileSync(path.join(root, "case-prompts", "index.json"), JSON.stringify(legacyCases, null, 2));
fs.writeFileSync(path.join(root, "references", "index.json"), JSON.stringify(references, null, 2));
fs.writeFileSync(path.join(root, "resources", "index.json"), JSON.stringify(resources, null, 2));

console.log("Generated Doctor Volume 4 runtime JSON:", root);

