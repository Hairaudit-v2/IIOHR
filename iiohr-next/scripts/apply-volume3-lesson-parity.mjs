/**
 * One-shot: lesson-specific metadata + final-lesson quiz/case linkage for Doctor Volume 3.
 * Run: node scripts/apply-volume3-lesson-parity.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lessonsPath = path.join(
  __dirname,
  "..",
  "src",
  "content",
  "academy",
  "programs",
  "postgraduate-certificate-clinical-trichology-hair-restoration-medicine",
  "volume-3",
  "lessons",
  "index.json"
);

/** @type {Record<string, { keyTakeaways: string[]; redFlags: string[]; prompt: string; teachingPoint: string; quizId?: string | null; casePromptIds?: string[] }>} */
const patches = {
  lesson_vol3_mod10_01: {
    keyTakeaways: [
      "Visible shedding lags behind the follicular telogen shift—timeline questions are diagnostic, not filler.",
      "Club-shed telogen hairs and abrupt broken or dystrophic hairs suggest different mechanisms (TE shift vs anagen insult).",
      "Label ‘TE’ only after pattern, symptoms, and trichoscopy argue against mimics.",
    ],
    redFlags: [
      "Explaining away patchy loss, inflammatory signs, or rapid progression as ‘just stress shedding’.",
      "Skipping medication, chemotherapy, or acute illness history when shedding is abrupt and severe.",
    ],
    prompt:
      "A woman describes heavy shedding 3 months after childbirth. What pattern of hair loss and history features would make you broaden the diagnosis beyond uncomplicated postpartum telogen effluvium?",
    teachingPoint:
      "Postpartum TE is common, but persistent atypical patterns, patchy loss, or inflammatory symptoms should trigger reconsideration of iron deficiency, thyroid disease, alopecia areata, or patterned loss overlap.",
  },
  lesson_vol3_mod10_02: {
    keyTakeaways: [
      "Map triggers (illness, surgery, stress, diet, drugs) onto shedding onset—not the day the patient first noticed hair on the pillow.",
      "Chronic TE is a diagnosis of exclusion after mixed AGA, diffuse AA, and subclinical endocrine issues are considered.",
      "Broadening the differential early prevents months of inappropriate reassurance.",
    ],
    redFlags: [
      "Accepting ‘chronic TE’ for years without repeat examination, trichoscopy, or targeted labs when the picture evolves.",
      "Ignoring scalp pain, burning, or visible inflammation in a ‘shedding’ consultation.",
    ],
    prompt:
      "Shedding continues 12 months after a plausible acute trigger. What categories of overlap diagnosis do you revisit before reaffirming chronic telogen effluvium?",
    teachingPoint:
      "Revisit female pattern hair loss, diffuse alopecia areata, thyroid and iron status, medication changes, and evolving inflammatory or scarring disease—often with comparative trichoscopy.",
  },
  lesson_vol3_mod10_03: {
    keyTakeaways: [
      "Miniaturisation and shedding can coexist; trichoscopy compares affected zones to a control area.",
      "Mixed AGA and TE changes counselling: stabilisation of pattern loss may need different follow-up than self-limited effluvium alone.",
      "Uniform calibre without miniaturisation pushes toward primary effluvium or non-pattern differentials.",
    ],
    redFlags: [
      "Attributing all diffuse thinning to TE when part-line widening and calibre diversity suggest patterned loss.",
      "Ordering extensive panels instead of correlating trichoscopy with a focused history.",
    ],
    prompt:
      "A patient reports dramatic shedding but trichoscopy shows prominent diameter variability in the vertex compared with the occiput. How do you phrase the working diagnosis and next steps?",
    teachingPoint:
      "Frame as possible mixed telogen effluvium and androgenetic-pattern miniaturisation; document comparator findings, set expectations for recovery timelines, and plan follow-up to see whether pattern dominates as shedding settles.",
  },
  lesson_vol3_mod10_04: {
    keyTakeaways: [
      "Investigations follow phenotype: ferritin and TSH are common starting points in reproductive-age women with diffuse shedding—not reflex ‘full hair panels’.",
      "Ferritin and thyroid results need clinical context (inflammation, comorbidity, symptoms).",
      "Refer when scarring, patchy immune-mediated, or fungal patterns are suspected; document the offer.",
    ],
    redFlags: [
      "Repeating identical blood tests instead of re-examining when the clinical picture changes.",
      "Deferring dermatology referral while cosmeceuticals are trialled in a patient with scarring or patchy inflammatory clues.",
    ],
    prompt:
      "After basic labs are normal, shedding persists and the patient refuses trichoscopy. What risks do you document and what follow-up structure do you propose?",
    teachingPoint:
      "Document shared decision-making, limitations of assessment without examination aids, and a time-bound review with clear triggers to escalate (patchy loss, symptoms, worsening pattern).",
    quizId: "quiz_vol3_mod10",
    casePromptIds: ["case_vol3_mod10_a"],
  },
  lesson_vol3_mod11_01: {
    keyTakeaways: [
      "Accurate phenotype (patchy, ophiasis, diffuse, totalis) drives prognosis discussion and treatment access.",
      "Eyebrow, lash, and nail changes may signal broader autoimmune context and higher burden.",
      "Therapy narratives must stay jurisdiction- and evidence-tier honest.",
    ],
    redFlags: [
      "Treating extensive or rapidly progressive AA as purely cosmetic without follow-up intensity or mental health awareness.",
      "Starting potent systemic therapy outside appropriate specialist governance.",
    ],
    prompt:
      "A patient has band-like loss along the occipital margin. How does ophiasis influence your counselling compared with small patchy AA?",
    teachingPoint:
      "Ophiasis often behaves more stubbornly; set expectations carefully, prioritise specialist pathways for advanced options, and document extent and site for longitudinal comparison.",
  },
  lesson_vol3_mod11_02: {
    keyTakeaways: [
      "Yellow dots, black dots, and exclamation-mark hairs support AA at active margins but require clinical context.",
      "Diffuse AA can mimic TE until broken hairs, patchy structural clues, or course clarify the picture.",
      "Trichoscopy supports monitoring but does not replace whole-patient decisions.",
    ],
    redFlags: [
      "Diagnosing AA on trichoscopy alone when tinea, traction, or trichotillomania remains plausible.",
      "Missing fungal testing when scale, lymph nodes, or endemic exposure suggests tinea capitis.",
    ],
    prompt:
      "Trichoscopy shows broken hairs and black dots in a child with patchy alopecia. What must you rule in before confirming alopecia areata?",
    teachingPoint:
      "Tinea capitis (including inflammatory kerion) can mimic AA; consider exposure, cervical nodes, and testing per local practice before immune-only framing.",
  },
  lesson_vol3_mod11_03: {
    keyTakeaways: [
      "Tinea, traction, trichotillomania, and early cicatricial disease sit in the differential for patchy non-scarring-looking loss.",
      "Pattern of breakage and history of styling or pulling distinguish traction and trichotillomania from AA.",
      "Symptoms and loss of ostia redirect toward scarring alopecia, not AA.",
    ],
    redFlags: [
      "Prescribing intralesional steroid for patchy loss without excluding fungal infection where scarring risk exists.",
      "Dismissing trichotillomania as ‘bad habit’ without sensitive referral pathways.",
    ],
    prompt:
      "Patches have irregular borders and hairs of multiple lengths; the patient admits stress but denies pulling. What examination and history steps refine the diagnosis?",
    teachingPoint:
      "Look for traction patterns, examine for broken hairs of varying length, consider trichoscopy and, when appropriate, gentle exploration of compulsive hair pulling with referral options.",
  },
  lesson_vol3_mod11_04: {
    keyTakeaways: [
      "Limited disease often starts with topical or intralesional approaches; extensive disease belongs in specialist-led systemic pathways.",
      "JAK inhibitors are a major advance in some settings but require risk, monitoring, and access counselling—not marketing language.",
      "Relapse is common; long-term expectations and psychosocial support matter.",
    ],
    redFlags: [
      "Promising cure or guaranteed regrowth with any single agent.",
      "Substituting cosmeceutical stacks for diagnosis, follow-up, and evidence-based medical care.",
    ],
    prompt:
      "A patient asks for ‘the newest tablet they saw online’ for alopecia areata. How do you respond without dismissing them or overclaiming?",
    teachingPoint:
      "Acknowledge evolving therapies, explain that eligibility, safety, and monitoring depend on phenotype and local regulation, and offer referral or co-management with dermatology when appropriate.",
    quizId: "quiz_vol3_mod11",
    casePromptIds: ["case_vol3_mod11_a"],
  },
  lesson_vol3_mod12_01: {
    keyTakeaways: [
      "Patients say ‘thinning’ for true density loss, reduced length from breakage, or both.",
      "Club telogen hairs versus short fractured shafts split shedding from mechanical or chemical injury.",
      "Misclassification drives wrong investigations and missed traction or behavioural diagnoses.",
    ],
    redFlags: [
      "Ordering endocrine panels for obvious weathering or traction without addressing shaft and grooming factors.",
      "Missing compulsive hair pulling when pattern and shaft lengths suggest it.",
    ],
    prompt:
      "The patient brings a bag of hairs that are mostly full-length with white bulbs. What diagnostic category are you leaning toward and what changes if hairs are short and frayed without bulbs?",
    teachingPoint:
      "Club roots support telogen shedding; short fractured shafts without bulbs support breakage, traction, or trichotillomania—shift examination toward styling, scalp surface, and pulling patterns.",
  },
  lesson_vol3_mod12_02: {
    keyTakeaways: [
      "Congenital shaft disorders are rare but structurally distinctive; refer when lifelong severe fragility suggests syndromic disease.",
      "Acquired weathering localises to distal shaft after chemical, thermal, and environmental stress.",
      "Management removes insult and sets realistic regrowth timelines.",
    ],
    redFlags: [
      "Labelling all distal breakage as ‘vitamin deficiency’ without exposure history.",
      "Missing occult inflammation contributing to fragility.",
    ],
    prompt:
      "A teenager has severe distal breakage after repeated bleaching. What is your first-line management message before any supplement discussion?",
    teachingPoint:
      "Stop or reduce the damaging process, repair-focused hair care, and review in weeks to months; supplements are secondary unless history suggests deficiency.",
  },
  lesson_vol3_mod12_03: {
    keyTakeaways: [
      "Traction alopecia maps to tension lines—margins, parts, and extension zones.",
      "Early traction may be reversible; chronic traction can scar—early behaviour change matters.",
      "Overlap with CCCA requires careful assessment, not blame.",
    ],
    redFlags: [
      "Dismissing vertex or crown symptoms in women of African descent as ‘only traction’ without considering CCCA.",
      "Shaming patients about cultural styling instead of collaborative planning.",
    ],
    prompt:
      "Loss is worst along the frontal hairline under tight styling. What features on exam would raise concern for irreversible follicular loss?",
    teachingPoint:
      "Loss of follicular ostia, smooth shiny skin, or symptoms of inflammation suggest progression toward scarring—urgent behaviour change and often specialist referral.",
  },
  lesson_vol3_mod12_04: {
    keyTakeaways: [
      "Trichotillomania produces irregular patches and variable-length broken hairs; approach without stigma.",
      "Dermatology and behavioural health pathways may both be needed.",
      "Chronic picking can cause permanent damage in some cases.",
    ],
    redFlags: [
      "Confrontational or dismissive language that closes disclosure.",
      "Ignoring coexisting scalp disease that needs treatment in its own right.",
    ],
    prompt:
      "A parent brings a child with irregular patches and broken hairs; the child denies pulling. What is your balanced next step?",
    teachingPoint:
      "Examine for inflammatory mimics, consider gentle private discussion with child and parent, and involve paediatric dermatology or mental health support pathways as appropriate.",
    quizId: "quiz_vol3_mod12",
    casePromptIds: ["case_vol3_mod12_a"],
  },
  lesson_vol3_mod13_01: {
    keyTakeaways: [
      "Cicatricial alopecia destroys follicular stem niches; delay means permanent loss.",
      "Lymphocytic, neutrophilic, and mixed categories orient biopsy and therapy families.",
      "Cosmeceuticals do not replace anti-inflammatory treatment when scarring is active.",
    ],
    redFlags: [
      "Months of hair-serum trials while symptoms and ostia loss progress.",
      "Assuming ‘female pattern’ without examining for scarring in a symptomatic patient.",
    ],
    prompt:
      "Why is ‘watch and wait’ a higher-stakes decision in suspected cicatricial alopecia than in uncomplicated androgenetic alopecia?",
    teachingPoint:
      "Inflammatory scarring can burn through follicle reserves quickly; early biopsy and treatment preserve what cannot be replaced medically later.",
  },
  lesson_vol3_mod13_02: {
    keyTakeaways: [
      "Pain, burning, scale, pustules, and tufting are not features of uncomplicated pattern loss.",
      "Trichoscopy may show lost ostia, white scar-like areas, and irregular patterns at active margins.",
      "In darker skin tones, erythema may be subtle—weight symptoms and scale type heavily.",
    ],
    redFlags: [
      "Relying on patient-reported ‘no rash’ when you have not parted hair or used magnification.",
      "Biopsying only end-stage bare skin without attempting an active edge.",
    ],
    prompt:
      "A patient describes burning in the crown with mild scale; the part looks slightly wider. What examination priority competes with a default FPHL label?",
    teachingPoint:
      "Actively search for perifollicular scale, ostia loss, and inflammatory signs that suggest cicatricial or mixed disease before anchoring on pattern alopecia alone.",
  },
  lesson_vol3_mod13_03: {
    keyTakeaways: [
      "Biopsy targets symptomatic or trichoscopically active margin, not only the silent scarred centre.",
      "Clear clinical information to pathology improves concordance.",
      "Horizontal vs vertical sectioning preferences are lab-dependent—communicate.",
    ],
    redFlags: [
      "Delayed biopsy while empiric cosmetic care continues in a high-risk inflammatory pattern.",
      "Sending specimens with no clinical summary or differential list.",
    ],
    prompt:
      "You can biopsy only one 4 mm site. Where do you place it in a slowly expanding scarring patch and why?",
    teachingPoint:
      "Choose the active edge with symptoms or trichoscopic activity to capture diagnostic inflammation rather than end-stage fibrosis alone.",
  },
  lesson_vol3_mod13_04: {
    keyTakeaways: [
      "First goal is halt inflammation; density restoration is secondary and often incomplete.",
      "Transplant in active disease is contraindicated; even in quiescence, recurrence risk must be discussed.",
      "Document referral and biopsy offers for medico-legal clarity.",
    ],
    redFlags: [
      "Offering surgery or aggressive cosmetic camouflage without disease control.",
      "Failing to document patient refusal of recommended escalation.",
    ],
    prompt:
      "A patient with active marginal inflammation requests hair transplant for a bare patch. How do you frame the sequence of care?",
    teachingPoint:
      "Explain that surgery during activity risks poor graft take and worsening inflammation; prioritise specialist-led anti-inflammatory control, stability assessment, then reconsider restorative options.",
    quizId: "quiz_vol3_mod13",
    casePromptIds: ["case_vol3_mod13_a"],
  },
  lesson_vol3_mod14_01: {
    keyTakeaways: [
      "LPP phenotype shows perifollicular scale and inflammation around follicles—treat as scarring urgency.",
      "Variant presentations belong in specialist diagnostic pathways.",
      "Overlap concepts with FFA exist; still phenotype each patient individually.",
    ],
    redFlags: [
      "Steroid cream on presumed ‘dandruff’ when perifollicular violaceous change suggests lichenoid follicular inflammation.",
      "Delaying referral while cosmeceutical anti-inflammatory products are trialled.",
    ],
    prompt:
      "What distinguishes lichen planopilaris-phenotype inflammation from simple seborrhoeic scale on examination?",
    teachingPoint:
      "Perifollicular accentuation, symptoms, and follicular-centric inflammation with possible ostia loss point toward cicatricial follicular disease—not generic scale alone.",
  },
  lesson_vol3_mod14_02: {
    keyTakeaways: [
      "FFA produces band-like frontal recession often with eyebrow involvement—do not mislabel as benign FPHL.",
      "Trichoscopy and biopsy help when the hairline quality is ambiguous.",
      "Discuss potential cofactors without overstating causality in individuals.",
    ],
    redFlags: [
      "Planning hairline lowering surgery without confirming non-scarring stable diagnosis.",
      "Missing eyebrow loss as a clue to FFA spectrum.",
    ],
    prompt:
      "A postmenopausal woman has slowly receding frontal hairline and thinning eyebrows. What working diagnosis competes with ordinary female pattern loss?",
    teachingPoint:
      "Frontal fibrosing alopecia enters the lead differential; compare hairline morphology, symptoms, and trichoscopy to patterned miniaturisation without band recession.",
  },
  lesson_vol3_mod14_03: {
    keyTakeaways: [
      "Discoid lesions on the scalp scar and may destroy follicles permanently.",
      "Dyspigmentation and morphology may prompt biopsy and broader lupus review when indicated.",
      "Restorative surgery only after specialist-led control and stability.",
    ],
    redFlags: [
      "Treating thick scarring plaques as ‘eczema’ without biopsy when lupus is plausible.",
      "Ignoring systemic symptoms that warrant rheumatology coordination.",
    ],
    prompt:
      "A plaque shows scarring, dyspigmentation, and follicular plugging in a photosensitive distribution. What is your biopsy and systemic review stance?",
    teachingPoint:
      "Biopsy supports diagnosis of cutaneous lupus; systemic review and rheumatology referral follow clinical clues and local pathways.",
  },
  lesson_vol3_mod14_04: {
    keyTakeaways: [
      "CCCA begins crown-centred and expands centrifugally; tenderness and symptoms are common.",
      "Traction and chemical practices may coexist—address collaboratively, not punitively.",
      "Early anti-inflammatory treatment with dermatology reduces irreversible loss.",
    ],
    redFlags: [
      "Blaming traction alone for progressive crown scarring without inflammatory assessment.",
      "Dismissing symptoms as cosmetic concern only.",
    ],
    prompt:
      "How do you discuss grooming practices when CCCA is suspected without alienating the patient?",
    teachingPoint:
      "Frame practices as modifiable risk factors alongside medical therapy, emphasise partnership, and prioritise early specialist care for active disease.",
    quizId: "quiz_vol3_mod14",
    casePromptIds: ["case_vol3_mod14_a"],
  },
  lesson_vol3_mod15_01: {
    keyTakeaways: [
      "Folliculitis decalvans combines pustules, crusting, and tufting—this is destructive scarring folliculitis.",
      "Repeated antibiotics without anti-inflammatory assessment may allow progression.",
      "Serial photography documents activity beyond subjective improvement.",
    ],
    redFlags: [
      "Treating as superficial bacterial folliculitis only when tufting and scarring are present.",
      "Stopping follow-up at symptom relief without examining for ongoing ostia loss.",
    ],
    prompt:
      "What does tufting tell you about the level of follicular injury compared with simple papules?",
    teachingPoint:
      "Tufting reflects advanced follicular disruption and grouping—typical of chronic neutrophilic scarring processes, not benign self-limited folliculitis.",
  },
  lesson_vol3_mod15_02: {
    keyTakeaways: [
      "Dissecting cellulitis presents with nodules, sinuses, drainage, and malodour—high psychosocial burden.",
      "Management is longitudinal and often multimodal under specialist care.",
      "Overlap with hidradenitis spectrum may matter for systemic therapy selection.",
    ],
    redFlags: [
      "Underestimating pain, infection risk, and quality-of-life impact.",
      "Offering hair-only cosmetic fixes without disease control.",
    ],
    prompt:
      "A young man has recurrent painful scalp nodules and draining tracts. Why is early dermatology referral prioritised over salon-based deep cleaning?",
    teachingPoint:
      "This disease destroys follicles and requires medical anti-inflammatory and sometimes surgical adjuncts; cosmetic scalp treatments do not control the inflammatory process.",
  },
  lesson_vol3_mod15_03: {
    keyTakeaways: [
      "Occlusion and follicular rupture can contribute to neutrophilic patterns—history of products and practices matters.",
      "Culture or biopsy may be needed when standard care fails or diagnosis is uncertain.",
      "Mixed patterns may evolve—labels should update with new findings.",
    ],
    redFlags: [
      "Assuming all pustules are sterile or purely ‘acneiform’ without clinical correlation.",
      "Missing tinea or bacterial superinfection when morphology is atypical.",
    ],
    prompt:
      "Pustules persist despite topical antibiotics. What categories of reassessment do you consider?",
    teachingPoint:
      "Reconsider diagnosis (neutrophilic scarring vs infectious vs mixed), review culture or biopsy pathways, and escalate to specialist management rather than cycling empiric creams alone.",
  },
  lesson_vol3_mod15_04: {
    keyTakeaways: [
      "Neutrophilic scarring diseases relapse; patients need flare recognition plans.",
      "Surgical adjuncts apply to selected stable cases, not active uncontrolled disease.",
      "Evidence regimens vary—teach principles, defer specifics to specialists.",
    ],
    redFlags: [
      "Promising cure from a single short antibiotic course.",
      "Transplant or cosmetic coverage during active drainage and inflammation.",
    ],
    prompt:
      "The patient feels better but trichoscopy still shows tufting at the margin. How do you interpret ‘clinical improvement’?",
    teachingPoint:
      "Subjective improvement can coexist with ongoing structural damage; examination and mapping should guide continuation or escalation of therapy, not symptoms alone.",
    quizId: "quiz_vol3_mod15",
    casePromptIds: ["case_vol3_mod15_a"],
  },
  lesson_vol3_mod16_01: {
    keyTakeaways: [
      "Seborrhoeic and psoriatic scale differ in colour, adherence, and distribution clues.",
      "Scalp inflammation drives itch, scratching, and secondary breakage—treat the surface to see the hair diagnosis.",
      "Vehicle choice affects adherence across hair types.",
    ],
    redFlags: [
      "Starting potent steroids without a clear duration plan or follow-up for steroid-induced issues.",
      "Ignoring psoriasis elsewhere when scalp looks ‘only dandruff’.",
    ],
    prompt:
      "Itchy scalp with silvery scale extends slightly beyond the hairline and the patient has scaly plaques on elbows. How does that change management emphasis?",
    teachingPoint:
      "Raise psoriasis in the differential, align topical choice and potency with inflammatory burden, and consider broader disease review and specialist input when systemic therapy might be needed.",
  },
  lesson_vol3_mod16_02: {
    keyTakeaways: [
      "Dyes, preservatives, and leave-on products cause contact dermatitis in hair practice—audit all topicals and salon procedures.",
      "Irritant reactions accumulate with damaged barrier or overlapping chemical services.",
      "Patch testing referral follows persistent or severe contact suspicion.",
    ],
    redFlags: [
      "Repeated full-head colour without patch testing after a prior reaction.",
      "Treating all inflamed scalps as fungal without exposure history.",
    ],
    prompt:
      "Symptoms flare 48 hours after each root touch-up. What pattern are you considering and what is your immediate advice?",
    teachingPoint:
      "Suspect contact allergic or irritant dermatitis to dye or additive; advise cessation of the trigger, acute soothing care, and arrange patch testing or dermatology review per severity.",
  },
  lesson_vol3_mod16_03: {
    keyTakeaways: [
      "Tinea capitis requires oral antifungal therapy in classic endothrix patterns—topicals alone often fail.",
      "Kerion mimics inflammatory AA; fungal testing and treatment prevent scarring.",
      "Adults can have tinea—maintain suspicion with patchy inflammatory scalp disease.",
    ],
    redFlags: [
      "Steroid-only treatment of a kerion without antifungal coverage.",
      "Dismissing fungal infection in adults with patchy alopecia.",
    ],
    prompt:
      "A child has tender boggy plaque with hair loss and regional lymphadenopathy. What is the urgency of your diagnostic and treatment approach?",
    teachingPoint:
      "Treat as inflammatory tinea capitis until proven otherwise; delay risks scarring alopecia—initiate appropriate systemic antifungal per guideline and local practice, with follow-up.",
  },
  lesson_vol3_mod16_04: {
    keyTakeaways: [
      "After scalp inflammation is controlled, reassess whether ‘alopecia’ was primary or secondary to dermatitis.",
      "Volume 3 closes with integration: hair medicine sits at the interface of dermatology and longitudinal counselling.",
      "Emerging systemic therapies remain in specialist governance—graduates escalate and communicate limits clearly.",
    ],
    redFlags: [
      "Locking a diagnosis during active untreated seborrhoeic or psoriatic inflammation.",
      "Promising cure from over-the-counter stacks for complex scalp disease.",
    ],
    prompt:
      "Six weeks after antiseborrhoeic treatment the patient notes less itch but density still worries them. What is your next reasoning step?",
    teachingPoint:
      "Re-examine for underlying pattern loss, persistent inflammation, or other alopecia now visible once the surface disease is calmer; adjust the working diagnosis and investigations accordingly.",
    quizId: "quiz_vol3_mod16",
    casePromptIds: ["case_vol3_mod16_a"],
  },
};

const lessons = JSON.parse(fs.readFileSync(lessonsPath, "utf8"));
for (const lesson of lessons) {
  const p = patches[lesson.id];
  if (!p) {
    console.warn("No patch for", lesson.id);
    continue;
  }
  lesson.keyTakeaways = p.keyTakeaways;
  lesson.redFlags = p.redFlags;
  if (lesson.clinicalReasoningBoxes?.[0]) {
    lesson.clinicalReasoningBoxes[0].prompt = p.prompt;
    lesson.clinicalReasoningBoxes[0].teachingPoint = p.teachingPoint;
  }
  if (p.quizId !== undefined) lesson.quizId = p.quizId;
  if (p.casePromptIds !== undefined) lesson.casePromptIds = p.casePromptIds;
}

fs.writeFileSync(lessonsPath, JSON.stringify(lessons, null, 2) + "\n");
console.log("Patched", lessons.length, "lessons at", lessonsPath);
