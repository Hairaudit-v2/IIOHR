/**
 * One-shot generator for doctor Volume 3 runtime JSON under
 * postgraduate-certificate-clinical-trichology-hair-restoration-medicine/volume-3/
 * Run: node scripts/generate-doctor-volume3-runtime.mjs
 *
 * After regenerating lessons, re-apply parity (final-lesson quiz/case links + lesson-specific metadata):
 *   node scripts/apply-volume3-lesson-parity.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "src", "content", "academy", "programs", "postgraduate-certificate-clinical-trichology-hair-restoration-medicine", "volume-3");

const volTitle = "Diffuse Shedding, Cicatricial Alopecia, and Scalp Disease";

const modules = [
  {
    num: 10,
    id: "module_vol3_telogen_effluvium_diffuse_shedding",
    slugBase: "telogen-effluvium",
    moduleSummaryTitle: "Telogen Effluvium and Diffuse Shedding Disorders",
    lessons: [
      {
        slug: "shedding-biology-and-cycle-shift",
        title: "Shedding Biology and Follicular Cycle Shift",
        type: "core-lesson",
        objectives: [
          "Explain how a telogen shift produces delayed clinical shedding after a trigger.",
          "Contrast telogen effluvium with anagen effluvium at a conceptual level.",
        ],
        body: "Telogen effluvium reflects a synchronous shift of follicles into telogen after a sufficient insult. Patients typically present weeks to months after the triggering event because visible shedding follows the cycle transition, not the day of stress. Understanding this timeline is essential for credible history-taking and for avoiding premature reassurance.\n\nAnagen effluvium implies damage to actively cycling matrix cells—classically with cytotoxic therapy but also with other severe insults—producing abrupt shedding of broken or dystrophic hairs rather than the classic club-shedding pattern of telogen shift. In practice, history anchors the mechanism: timing, medication exposure, illness severity, and whether hairs are full-length with club roots versus fractured shafts.\n\nVolume 3 frames diffuse shedding as a diagnostic category that must be reconciled with pattern, symptoms, and trichoscopy. The clinician resists anchoring on the label 'TE' when examination suggests patterned miniaturisation, patchy immune-mediated loss, or inflammatory scalp disease.",
        section: "10.1",
      },
      {
        slug: "acute-chronic-te-and-triggers",
        title: "Acute and Chronic Telogen Effluvium; Trigger Mapping",
        type: "core-lesson",
        objectives: [
          "Construct a trigger timeline covering illness, surgery, childbirth, stress, nutrition, and drugs.",
          "Recognise when 'chronic TE' is over-applied versus mixed or alternate diagnoses.",
        ],
        body: "Acute telogen effluvium classically follows definable triggers: febrile illness, major surgery, psychological stress, crash dieting, iron deficiency context, thyroid disturbance, and medication changes. The consultation should map onset of shedding against these events and clarify whether shedding is self-limited or persistent.\n\nChronic telogen effluvium is a diagnosis of patterned exclusion. When shedding persists beyond expected recovery windows, revisit female pattern hair loss overlap, early diffuse alopecia areata, subtle thyroid or iron issues, and medication lists. Patients referred with chronic TE often carry incomplete examinations or absent trichoscopy.\n\nRed flags that should broaden the differential include patchy loss, scalp pain or burning, visible inflammation, rapid progression, or eyebrow involvement. These features are not explained by uncomplicated telogen shift alone.",
        section: "10.2–10.3",
      },
      {
        slug: "overlap-with-pattern-loss-trichoscopy",
        title: "Overlap with Patterned Loss and Trichoscopy",
        type: "clinical-application",
        objectives: [
          "Integrate miniaturisation and shedding patterns using comparator trichoscopy.",
          "Explain why AGA or FPHL can coexist with telogen effluvium.",
        ],
        body: "Androgenetic alopecia and telogen effluvium frequently coexist. A patient may describe dramatic shedding while still demonstrating patterned miniaturisation on examination. Trichoscopy compares affected pattern zones with a suitable control area: diameter diversity, vellus-like hairs, and reduced hairs per follicular unit support pattern loss, while excessive empty follicles and uniform miniaturisation patterns may also be interpreted in context.\n\nShedding without miniaturisation supports a primary effluvium or alternate diagnosis; shedding with miniaturisation supports mixed physiology. This distinction changes counselling: stabilisation of pattern loss may require different long-term plans than reassurance for a self-limited effluvium alone.\n\nAvoid using trichoscopy as a single binary test. Integrate tempo, family history, pattern, and symptoms, and document uncertainty supportively when the picture is evolving.",
        section: "10.4",
      },
      {
        slug: "investigations-counselling-te",
        title: "Investigations, Counselling, and Referral Boundaries",
        type: "core-lesson",
        objectives: [
          "Select proportionate laboratories based on phenotype and history.",
          "Set realistic recovery timelines and identify when specialist referral is warranted.",
        ],
        body: "Investigation should follow clinical clues rather than reflex panels. Iron studies and thyroid function are common first-line considerations in reproductive-age women with diffuse shedding; broader testing follows endocrine, autoimmune, or nutritional suspicion. Ferritin interpretation requires context—acute phase response and inflammation can confound.\n\nCounselling emphasises natural history for acute triggers, expected timelines, and the possibility of overlap disorders. When diagnosis remains uncertain, serial photography and repeat examination are often more informative than repeating identical blood tests.\n\nReferral to dermatology or specialist trichology is appropriate when scarring is suspected, patches evolve, symptoms are inflammatory, or response to conservative care diverges from expectation. Document these discussions for medico-legal clarity.",
        section: "10.5–10.6",
      },
    ],
  },
  {
    num: 11,
    id: "module_vol3_alopecia_areata_immune_mediated",
    slugBase: "alopecia-areata",
    moduleSummaryTitle: "Alopecia Areata and Immune-Mediated Hair Loss",
    lessons: [
      {
        slug: "aa-spectrum-and-phenotypes",
        title: "Alopecia Areata: Spectrum and Clinical Phenotypes",
        type: "core-lesson",
        objectives: [
          "Describe patchy, ophiasis, diffuse, and totalis/universalis patterns.",
          "Recognise prognostic and psychosocial implications of extent and site.",
        ],
        body: "Alopecia areata is immune-mediated non-scarring hair loss with highly variable extent. Patchy disease is common; ophiasis band-like loss along occipital margins can behave more stubbornly. Diffuse alopecia areata can mimic telogen effluvium until trichoscopy, pull testing nuance, and disease course clarify the picture.\n\nEyebrow and eyelash involvement, nail pitting, and atopy associate with broader autoimmune context in some patients. Extensive disease carries higher psychological burden and may require multidisciplinary support.\n\nVolume 3 stresses accurate phenotype description before therapy discussions. Treatment access and evidence vary by jurisdiction; the physician’s role includes honest framing of remission potential and relapse.",
        section: "11.1",
      },
      {
        slug: "trichoscopy-in-alopecia-areata",
        title: "Trichoscopy in Alopecia Areata",
        type: "clinical-application",
        objectives: [
          "Identify supportive trichoscopic features and exclamation-mark hairs in context.",
          "Use trichoscopy to monitor disease activity where appropriate.",
        ],
        body: "Trichoscopy aids diagnosis when clinical examination is ambiguous. Yellow dots, black dots, and short dystrophic or exclamation-mark hairs can support alopecia areata, particularly at active margins. Interpretation remains contextual—traction, trichotillomania, and tinea can produce overlapping findings.\n\nComparative examination helps distinguish diffuse AA from telogen effluvium: look for patchy structural clues, broken hairs, and regional variation rather than uniform shedding alone.\n\nRepeat trichoscopy can complement clinical assessment during treatment, but should not replace whole-patient judgement or appropriate referral for advanced therapy decisions.",
        section: "11.2",
      },
      {
        slug: "aa-differential-diagnosis",
        title: "Differential Diagnosis: Tinea, Traction, Trichotillomania, Cicatricial Mimics",
        type: "clinical-application",
        objectives: [
          "Contrast AA with tinea capitis and request testing when fungal suspicion exists.",
          "Differentiate traction and compulsive hair pulling using pattern and history.",
        ],
        body: "Tinea capitis may present with patchy alopecia and scale; cervical lymphadenopathy and endemic exposure increase suspicion. Do not rely on clinical appearance alone when scarring risk exists—particularly in children. Fungal diagnosis changes management and prevents irreversible loss.\n\nTraction alopecia localises to margins of styling stress. Trichotillomania produces irregular broken hairs and may coexist with psychiatric comorbidity; approach with sensitivity and appropriate referral.\n\nEarly cicatricial disease can be patchy. Symptoms, inflammation, and loss of ostia should trigger escalation beyond a default AA label.",
        section: "11.3–11.4",
      },
      {
        slug: "aa-management-framework",
        title: "Management Framework and Evidence-Aware Counselling",
        type: "core-lesson",
        objectives: [
          "Outline topical, intralesional, and systemic options at a principle level.",
          "Position JAK inhibitors and emerging therapies without overclaiming efficacy or access.",
        ],
        body: "First-line approaches for limited disease often include potent topical corticosteroids and intralesional corticosteroid where appropriate. Extensive disease may require specialist-led systemic immunomodulation. Shared decision-making should cover relapse, side effects, monitoring, and realistic timelines.\n\nJAK inhibitors represent an important advance in some settings but are not universal first-line for all phenotypes; access, monitoring, contraindications, and long-term safety discussions belong in specialist pathways aligned to local regulation.\n\nCosmeceutical or unproven systemic cocktails should not substitute for diagnosis, counselling, and evidence-tiered medical care.",
        section: "11.5",
      },
    ],
  },
  {
    num: 12,
    id: "module_vol3_hair_shaft_breakage_syndromes",
    slugBase: "hair-shaft-breakage",
    moduleSummaryTitle: "Hair Shaft Disorders and Breakage Syndromes",
    lessons: [
      {
        slug: "shedding-versus-breakage",
        title: "Shedding Versus Breakage at the Bedside",
        type: "core-lesson",
        objectives: [
          "Differentiate club-shed telogen hairs from fractured shafts on history and exam.",
          "Explain why patients conflate thinning with breakage.",
        ],
        body: "Patients frequently describe 'thinning' when they mean reduced length or broken hairs. Shedding implies follicular release of telogen club hairs; breakage implies shaft fragility from mechanical, chemical, thermal, or inflammatory injury while follicles may remain anatomically present.\n\nMicroscopic inspection of collected hairs and targeted questioning about styling, heat, chemical processing, and traction clarify the category. Pull testing interpretation depends on whether extracted hairs are anagen or telogen and whether shafts are fractured.\n\nMisclassification drives mis-investigation: unnecessary endocrine panels for pure breakage, or cosmeceutical reassurance for inflammatory scarring masked as breakage.",
        section: "12.1",
      },
      {
        slug: "congenital-weathering-shaft-disorders",
        title: "Congenital Shaft Disorders and Acquired Weathering",
        type: "core-lesson",
        objectives: [
          "Recognise when to suspect monilethrix or other rare fragility syndromes.",
          "Counsel on weathering from environmental and chemical exposure.",
        ],
        body: "Congenital shaft disorders are uncommon but structurally distinctive—beaded shafts, twisting, or severe lifelong fragility. They require specialist diagnosis and genetic pathways when suspected.\n\nAcquired weathering affects the distal shaft: split ends, weathering scales, and variable breakage lengths after repeated chemical relaxer, bleaching, heat tools, and sun exposure. Management removes insult, optimises gentle care, and sets realistic regrowth timelines.\n\nVolume 3 positions these topics to prevent automatic funneling of all complaints into alopecia categories.",
        section: "12.2",
      },
      {
        slug: "traction-cosmetic-injury",
        title: "Traction, Braiding, Extensions, and Cosmetic Injury",
        type: "clinical-application",
        objectives: [
          "Map traction patterns to styling practice with cultural sensitivity.",
          "Identify when traction has progressed to follicular loss requiring early intervention.",
        ],
        body: "Traction alopecia begins as reversible hair loss along tension lines—margins, part lines, and zones of chronic pull. Early disease may regrow if traction stops; chronic traction can evolve toward permanent follicular loss resembling scarring patterns.\n\nDiscussion should be respectful and practical: explore braiding frequency, extensions, sew-ins, chemical overlap, and occupational helmet use. Photographic documentation supports behavioural change conversations.\n\nOverlap with central centrifugal cicatricial alopecia requires careful clinical distinction in some patients—do not blame traction alone without examining for inflammatory scarring phenotypes.",
        section: "12.3",
      },
      {
        slug: "trichotillomania-referral",
        title: "Trichotillomania and Appropriate Referral Pathways",
        type: "core-lesson",
        objectives: [
          "Recognise irregular broken hairs and pattern clues suggesting hair pulling.",
          "Coordinate dermatology and mental health referral without stigmatising language.",
        ],
        body: "Trichotillomania produces irregular patches with broken hairs of varying lengths. The diagnosis is clinical, supported by pattern and sometimes trichoscopy; it is a medical condition, not a moral failing.\n\nManagement combines dermatological safeguarding (rule out coexisting inflammation) with behavioural health support where available. For children, family-centred approaches are essential.\n\nAvoid dismissive reassurance; chronic picking can cause permanent damage in some cases.",
        section: "12.4–12.5",
      },
    ],
  },
  {
    num: 13,
    id: "module_vol3_principles_cicatricial_alopecia",
    slugBase: "cicatricial-principles",
    moduleSummaryTitle: "Principles of Cicatricial Alopecia",
    lessons: [
      {
        slug: "why-cicatricial-alopecia-urgency",
        title: "Why Cicatricial Alopecia Demands Urgency",
        type: "core-lesson",
        objectives: [
          "Explain permanent follicle loss as the endpoint of untreated inflammatory scarring.",
          "Outline lymphocytic, neutrophilic, and mixed categories at overview level.",
        ],
        body: "Cicatricial alopecias destroy stem-cell niches and replace follicular ostia with scar. Once end-stage, density cannot be medically restored; surgery is limited and context-dependent. Therefore early recognition and treatment of active disease are central professional duties in hair medicine.\n\nClassification by primary inflammatory pattern—lymphocytic, neutrophilic, mixed—guides differential diagnosis and treatment families even before biopsy returns.\n\nVolume 3 stresses that cosmeceutical hair serums do not replace anti-inflammatory therapy or specialist care when scarring is active.",
        section: "13.1",
      },
      {
        slug: "clinical-trichoscopic-scarring-clues",
        title: "Clinical and Trichoscopic Clues of Scarring",
        type: "clinical-application",
        objectives: [
          "Identify symptoms and signs that contradict pure non-scarring alopecia.",
          "Use loss of ostia, perifollicular scale, and colour change as trichoscopic anchors.",
        ],
        body: "Scarring alopecia may present with pain, burning, itch, scale, pustules, or be surprisingly asymptomatic early. Examination searches for loss of follicular openings, tufting, atrophy, and altered skin texture.\n\nTrichoscopy highlights white scar-like areas, irregular patterns, and structural loss at margins of activity. Comparator logic remains essential—do not compare an inflamed margin to end-stage scar without clinical context.\n\nIn skin of colour, erythema may be subtle; symptoms and scale types may carry more weight than pinkness alone.",
        section: "13.2–13.3",
      },
      {
        slug: "biopsy-timing-site-cicatricial",
        title: "Biopsy Timing, Site Selection, and Pathology Handoff",
        type: "clinical-application",
        objectives: [
          "Select active disease margin rather than end-stage scar when possible.",
          "Communicate clinical differentials and trichoscopy summary to pathology.",
        ],
        body: "Biopsy in cicatricial alopecia should target symptomatic or trichoscopically active edge when safe, not only the bare area. The goal is capture of inflammatory pattern directing therapy.\n\nHorizontal and vertical sectioning preferences vary by centre; the referring clinician should provide a concise letter with onset, symptoms, suspected categories, prior treatments, and examination findings.\n\nDelays in biopsy while empiric cosmetics are trialled can permit irreversible expansion—document patient counselling when biopsy is deferred.",
        section: "13.4",
      },
      {
        slug: "cicatricial-management-philosophy",
        title: "Management Philosophy, Stability, and Transplant Timing",
        type: "core-lesson",
        objectives: [
          "Prioritise disease control before density restoration discussions.",
          "State medico-legal prudence around referral and escalation offers.",
        ],
        body: "Treatment aims to halt inflammation and preserve remaining follicles. Cosmetic camouflage may help psychologically but does not replace medical therapy where indicated.\n\nHair transplantation in active inflammatory scarring is contraindicated; even in quiescent disease, candidacy requires specialist judgement and honest discussion of recurrence risk.\n\nPrimary care and hair physicians should document clear offers of referral, biopsy, and escalation when red flags appear—local standards govern timelines.",
        section: "13.5–13.6",
      },
    ],
  },
  {
    num: 14,
    id: "module_vol3_lymphocytic_cicatricial_alopecias",
    slugBase: "lymphocytic-cicatricial",
    moduleSummaryTitle: "Lymphocytic Cicatricial Alopecias",
    lessons: [
      {
        slug: "lpp-and-related-patterns",
        title: "Lichen Planopilaris and Related Patterns",
        type: "core-lesson",
        objectives: [
          "Recognise perifollicular scale and erythema in LPP-phenotype disease.",
          "Note Graham-Little syndrome as a variant context requiring specialist care.",
        ],
        body: "Lichen planopilaris manifests with perifollicular scale and inflammation around follicles, often with symptoms. It is a scarring process—early treatment reduces spread.\n\nGraham-Little syndrome and other variant presentations belong in specialist diagnostic and management pathways; the postgraduate learner focuses on recognition and timely referral rather than protocol substitution.\n\nOverlap with frontal fibrosing alopecia exists in conceptual family discussion; distinct phenotypes still require individualised plans.",
        section: "14.1",
      },
      {
        slug: "frontal-fibrosing-alopecia",
        title: "Frontal Fibrosing Alopecia: Phenotype and Differentials",
        type: "clinical-application",
        objectives: [
          "Differentiate FFA band recession from patterned hair loss using clinical clues.",
          "Assess eyebrow loss and body hair changes as supportive features.",
        ],
        body: "Frontal fibrosing alopecia classically produces band-like frontal hairline recession, often with eyebrow involvement. The process is inflammatory and scarring—mislabelling as benign female pattern loss delays care.\n\nDifferentials include traction, chronic styling practices in combination, and patterned loss; trichoscopy and biopsy help when examination is ambiguous.\n\nCosmetic procedures and topical products have been discussed in literature as potential cofactors; counselling stays evidence-aware without causal overstatement in individual cases.",
        section: "14.2",
      },
      {
        slug: "discoid-lupus-scalp",
        title: "Discoid Lupus Erythematosus and Scalp Involvement",
        type: "clinical-application",
        objectives: [
          "Identify scarring patches with dyspigmentation and follicular plugging context.",
          "Escalate systemic review when discoid lesions suggest broader lupus spectrum.",
        ],
        body: "Discoid lupus on the scalp produces scarring plaques that may scar permanently. Sun exposure, dyspigmentation, and morphology guide suspicion. Biopsy supports diagnosis.\n\nSome patients have limited cutaneous disease; others merit rheumatology involvement depending on systemic features and local pathways.\n\nHair restoration discussions occur only after specialist-led disease control and stability assessment.",
        section: "14.3",
      },
      {
        slug: "ccca-cultural-sensitivity",
        title: "Central Centrifugal Cicatricial Alopecia",
        type: "clinical-application",
        objectives: [
          "Recognise crown-centred scarring pattern and symptoms overlap with traction.",
          "Discuss grooming practices with respect while prioritising medical therapy.",
        ],
        body: "CCCA classically begins at the vertex or crown and expands centrifugally, more common in women of African descent. Symptoms may include tenderness, burning, and itching. Early stages can be subtle; progression leads to irreversible loss.\n\nTraction and chemical processing may coexist; the conversation should be collaborative, not blaming, while emphasising early anti-inflammatory treatment and specialist co-management.\n\nTrichoscopy and biopsy assist when diagnosis is uncertain or therapy response is poor.",
        section: "14.4–14.5",
      },
    ],
  },
  {
    num: 15,
    id: "module_vol3_neutrophilic_mixed_cicatricial",
    slugBase: "neutrophilic-cicatricial",
    moduleSummaryTitle: "Neutrophilic and Mixed Cicatricial Alopecias",
    lessons: [
      {
        slug: "folliculitis-decalvans",
        title: "Folliculitis Decalvans: Presentation and Course",
        type: "core-lesson",
        objectives: [
          "Recognise pustules, crusting, and tufting as destructive folliculitis signs.",
          "Avoid repeated antibiotic-only cycles without inflammatory control assessment.",
        ],
        body: "Folliculitis decalvans is a neutrophilic scarring folliculitis with pustules, crusting, and tufted follicular units. It is not a simple superficial infection—chronic inflammation drives scarring.\n\nManagement principles combine antimicrobial approaches with anti-inflammatory strategies per specialist protocols; superficial clearance without structural review risks silent progression.\n\nDocument examination findings serially; photography helps patients understand activity beyond subjective improvement.",
        section: "15.1",
      },
      {
        slug: "dissecting-cellulitis",
        title: "Dissecting Cellulitis of the Scalp",
        type: "clinical-application",
        objectives: [
          "Describe nodules, sinuses, drainage, and scarring potential.",
          "Identify need for specialist-led multimodal therapy.",
        ],
        body: "Dissecting cellulitis (perifolliculitis capitis abscedens et suffodiens) produces painful nodules, abscesses, sinus tracts, and malodorous drainage. Scarring alopecia results. It overlaps with hidradenitis suppurativa spectrum in some patients.\n\nTreatment is longitudinal and often multidisciplinary—dermatology, sometimes surgery, and psychosocial support. Primary hair physicians focus on early recognition and referral.\n\nDo not minimise chronic pain or social impact; these patients are at high risk of undertreatment.",
        section: "15.2",
      },
      {
        slug: "tufting-occlusion-mixed-patterns",
        title: "Tufting, Occlusion, and Mixed Inflammatory Patterns",
        type: "clinical-application",
        objectives: [
          "Link occlusion and follicular rupture to some neutrophilic patterns.",
          "Differentiate infectious mimics requiring culture or biopsy.",
        ],
        body: "Occlusive practices, oils, and follicular occlusion syndromes can intersect with inflammatory scalp disease. Clinical context and culture or biopsy guide therapy when standard folliculitis care fails.\n\nTufting is a red flag for destructive folliculitis family—not benign pattern loss.\n\nMixed patterns may require repeated assessment as disease evolves; static labels can mislead.",
        section: "15.3",
      },
      {
        slug: "longitudinal-neutrophilic-care",
        title: "Longitudinal Care and Multidisciplinary Coordination",
        type: "core-lesson",
        objectives: [
          "Explain why remission maintenance matters in neutrophilic scarring disease.",
          "Outline roles of surgery as adjunct in selected stable cases.",
        ],
        body: "Neutrophilic scarring diseases often relapse. Long-term plans include flare recognition, adherence support, and clear escalation pathways.\n\nSurgical reduction of sinus burden may help selected stable patients but is not first-line for active uncontrolled disease.\n\nEvidence for any one regimen varies; align teaching to specialist-led care rather than prescriptive substitution.",
        section: "15.4–15.5",
      },
    ],
  },
  {
    num: 16,
    id: "module_vol3_inflammatory_infectious_scalp",
    slugBase: "scalp-inflammation-infection",
    moduleSummaryTitle: "Inflammatory and Infectious Scalp Disorders",
    lessons: [
      {
        slug: "seborrhoeic-psoriasis-scalp",
        title: "Seborrhoeic Dermatitis and Scalp Psoriasis in Hair Practice",
        type: "core-lesson",
        objectives: [
          "Contrast scale type and distribution clues between SD and psoriasis.",
          "Integrate anti-inflammatory scalp care with hair-loss assessment.",
        ],
        body: "Seborrhoeic dermatitis favours sebum-rich areas with yellowish greasy scale; psoriasis may show thicker silvery scale and may extend beyond the scalp margin or involve typical psoriasis sites elsewhere. Overlap and concurrent disease occur.\n\nInflammation causes discomfort, scratching, and secondary breakage—patients may attribute all symptoms to alopecia. Treating the scalp surface can clarify underlying pattern loss assessment.\n\nChoose vehicles compatible with hair type; cultural and cosmetic acceptability improves adherence.",
        section: "16.1",
      },
      {
        slug: "contact-irritant-scalp",
        title: "Contact, Irritant, and Procedure-Related Scalp Disease",
        type: "clinical-application",
        objectives: [
          "Take a structured product and salon-procedure history.",
          "Implement elimination trials and patch testing referral when indicated.",
        ],
        body: "Contact dermatitis to dyes, preservatives, fragrances, and topical medicaments can produce erythema, scale, and hair shedding secondary to inflammation. Irritant reactions follow cumulative exposure or damaged barrier.\n\nProcedure-related injury includes chemical relaxer burns, improper application, and overlapping treatments. Document timing with symptom onset.\n\nPatch testing referral follows persistent or severe contact suspicion.",
        section: "16.2",
      },
      {
        slug: "tinea-capitis-scarring",
        title: "Tinea Capitis: Presentation, Diagnosis, and Scarring Risk",
        type: "clinical-application",
        objectives: [
          "Identify kerion, black-dot tinea, and adult presentations requiring fungal testing.",
          "Explain why delay risks permanent alopecia.",
        ],
        body: "Tinea capitis in children classically shows scaling, patchy loss, and sometimes inflammatory kerion. Adults are not immune—index of suspicion should remain with patchy or inflammatory scalp disease.\n\nDiagnosis may require fungal testing depending on prevalence and presentation. Oral antifungal therapy is typically required; topical therapy alone is often insufficient for endothrix infection.\n\nInflammatory tinea can scar; time to treatment matters medico-legally and clinically.",
        section: "16.3",
      },
      {
        slug: "integrating-scalp-health-hair-diagnosis",
        title: "Integrating Scalp Health with Primary Hair-Loss Diagnosis",
        type: "core-lesson",
        objectives: [
          "Reassess alopecia labels after inflammatory control.",
          "Summarise postgraduate boundaries: evidence-aware, referral-ready, no overclaim.",
        ],
        body: "Successful scalp disease control may reveal underlying pattern loss or resolve shedding previously attributed to ambiguous causes. Serial examination refines diagnosis.\n\nVolume 3 closes the doctor certificate arc on diffuse shedding, immune-mediated loss, shaft disorders, cicatricial disease, and scalp inflammation with a unifying message: hair medicine is dermatology at the follicular interface—diagnosis precedes commercial therapy narratives.\n\nEmerging systemic therapies for alopecia areata and advanced options for scarring disease belong in specialist governance; the competent postgraduate graduate recognises limits, escalates appropriately, and communicates uncertainty ethically.",
        section: "16.4–16.5",
      },
    ],
  },
];

const lessons = [];
const references = [];
const resources = [];

for (const mod of modules) {
  let ln = 1;
  for (const L of mod.lessons) {
    const id = `lesson_vol3_mod${mod.num}_${String(ln).padStart(2, "0")}`;
    const reasoningId = `reasoning_${id}`;
    lessons.push({
      id,
      moduleId: mod.id,
      lessonNumber: ln,
      slug: L.slug,
      title: L.title,
      status: "draft",
      estimatedStudyMinutes: 45,
      lessonType: L.type,
      learningObjectives: L.objectives,
      body: { format: "richText", content: L.body },
      keyTakeaways: [
        "Align clinical reasoning to Volume 3 manual themes and postgraduate evidence framing.",
        "Integrate examination and trichoscopy before committing to a single diagnostic label.",
        "Escalate when scarring, infection, or patchy immune-mediated patterns are suspected.",
      ],
      redFlags: [
        "Anchoring on telogen effluvium or pattern loss without excluding inflammatory, infectious, or scarring disease.",
        "Deferring biopsy or specialist referral while cosmeceutical trials continue in high-risk phenotypes.",
      ],
      evidenceTier: {
        overall: L.type === "clinical-application" ? "B" : "consensus",
        summaryNote: `Volume 3 Module ${mod.num}, section ${L.section}: ${L.title}.`,
      },
      clinicalReasoningBoxes: [
        {
          id: reasoningId,
          title: "Clinical reasoning",
          prompt: `For Module ${mod.num} (${L.title}), what feature in history or examination would most change your differential or urgency?`,
          teachingPoint: "Use phenotype-led branching: timeline and shed versus breakage for effluvium; patchy or exclamation hairs for AA; ostia loss and symptoms for cicatricial disease; fungal exposure for tinea.",
        },
      ],
      downloadableResourceIds: [`resource_${id}_summary`],
      quizId: null,
      casePromptIds: [],
      referenceIds: [`reference_${id}`],
      displayFlags: {
        showEvidencePanel: true,
        showRedFlagsPanel: true,
        showClinicalReasoning: true,
      },
    });

    references.push({
      id: `reference_${id}`,
      moduleId: mod.id,
      parentType: "lesson",
      parentId: id,
      citation: `Hair Longevity Institute; International Institute of Hair Restoration (IIIOHR). ${volTitle} — Module ${mod.num}, section ${L.section} (${L.title}). Postgraduate teaching manual (doctor education platform).`,
      sourceType: "consensus",
      year: 2026,
      url: "",
      notes: `Primary lesson alignment for “${L.title}”.`,
      evidenceTier: "consensus",
    });

    resources.push({
      id: `resource_${id}_summary`,
      moduleId: mod.id,
      parentType: "lesson",
      parentId: id,
      title: `Lesson Summary: ${L.title}`,
      resourceType: "pdf-summary",
      fileName: `lesson-vol3-mod${mod.num}-${String(ln).padStart(2, "0")}-summary.pdf`,
      fileUrl: "",
      version: "v1",
      access: "enrolled-only",
      description: `Lesson digest aligned to Volume 3 manual (Module ${mod.num}, section ${L.section}). PDF distributed when released.`,
    });

    ln += 1;
  }

  references.push({
    id: `reference_module_vol3_mod${mod.num}_01`,
    moduleId: mod.id,
    parentType: "module",
    parentId: mod.id,
    citation: `Hair Longevity Institute; International Institute of Hair Restoration (IIIOHR). Volume 3: ${volTitle} — Module ${mod.num}. Postgraduate teaching manual (doctor education platform).`,
    sourceType: "consensus",
    year: 2026,
    url: "",
    notes: `Primary module source for ${mod.id}.`,
    evidenceTier: "consensus",
  });

  resources.push({
    id: `resource_module_vol3_mod${mod.num}_summary`,
    moduleId: mod.id,
    parentType: "module",
    parentId: mod.id,
    title: `Module Summary: ${mod.moduleSummaryTitle}`,
    resourceType: "pdf-summary",
    fileName: `volume-3-module-${mod.num}-summary.pdf`,
    fileUrl: "",
    version: "v1",
    access: "enrolled-only",
    description: `Condensed module summary from Volume 3 manual Module ${mod.num}. PDF distributed when released.`,
  });
}

const compByMod = {
  module_vol3_telogen_effluvium_diffuse_shedding: "doctors_vol3_comp_telogen_diffuse_shedding",
  module_vol3_alopecia_areata_immune_mediated: "doctors_vol3_comp_alopecia_areata",
  module_vol3_hair_shaft_breakage_syndromes: "doctors_vol3_comp_shaft_breakage",
  module_vol3_principles_cicatricial_alopecia: "doctors_vol3_comp_cicatricial_principles",
  module_vol3_lymphocytic_cicatricial_alopecias: "doctors_vol3_comp_lymphocytic_cicatricial",
  module_vol3_neutrophilic_mixed_cicatricial: "doctors_vol3_comp_neutrophilic_cicatricial",
  module_vol3_inflammatory_infectious_scalp: "doctors_vol3_comp_scalp_inflammatory_infectious",
};

const quizzes = modules.map((mod) => ({
  id: `quiz_vol3_mod${mod.num}`,
  slug: `${mod.slugBase}-knowledge-check`,
  moduleId: mod.id,
  parentType: "module",
  parentId: mod.id,
  title: `Module Knowledge Check: ${mod.moduleSummaryTitle}`,
  status: "draft",
  passMark: 70,
  retries: 2,
  items: [
    {
      id: `quiz_vol3_mod${mod.num}_item_01`,
      type: "mcq",
      stem: `According to Volume 3 Module ${mod.num}, which theme best reflects postgraduate diagnostic discipline?`,
      options: [
        { id: "a", label: "Integrate history, pattern, symptoms, and trichoscopy before fixing a single label" },
        { id: "b", label: "Treat all diffuse shedding as self-limited telogen effluvium without re-evaluation" },
        { id: "c", label: "Defer biopsy indefinitely while trialling cosmetic scalp products in suspected scarring disease" },
      ],
      correctAnswer: { optionIds: ["a"] },
      rationale: "Volume 3 emphasises phenotype-led reasoning, overlap disorders, and timely escalation for scarring, infectious, and immune-mediated patterns.",
      evidenceTier: "consensus",
      facultyReviewRequired: false,
    },
    {
      id: `quiz_vol3_mod${mod.num}_item_02`,
      type: "short-answer",
      stem: `Outline red flags from Module ${mod.num} that would prompt earlier biopsy, fungal testing, or specialist referral rather than continued reassurance alone.`,
      options: [],
      correctAnswer: {
        freeTextSample:
          "Examples include patchy or rapidly progressive loss; pain, burning, pustules, tufting, or loss of follicular ostia; suspected tinea in child or adult; ophiasis or extensive alopecia areata needing advanced therapy; neutrophilic scarring folliculitis patterns; or any clinical picture inconsistent with the working diagnosis after reasonable observation.",
      },
      rationale: "Module-specific red flags centre on scarring, infection, immune-mediated extent, and diagnostic uncertainty—escalation protects patients from irreversible loss.",
      evidenceTier: "B",
      facultyReviewRequired: true,
    },
  ],
}));

const cases = modules.map((mod) => ({
  id: `case_vol3_mod${mod.num}_a`,
  slug: `vol3-mod${mod.num}-case`,
  moduleId: mod.id,
  parentType: "module",
  parentId: mod.id,
  title: `Case Discussion: Volume 3 Module ${mod.num}`,
  status: "draft",
  clinicalScenario: `A patient presents with a hair complaint that might align with Volume 3 Module ${mod.num} themes. History is incomplete, the patient requests immediate treatment or transplant, and prior care focused on supplements without structured examination.`,
  discussionPrompts: [
    "What history and examination steps do you prioritise before accepting the patient’s self-diagnosis?",
    "Which findings would move you to trichoscopy, biopsy, fungal testing, or urgent dermatology referral?",
    "How do you document shared decision-making if the patient declines further investigation?",
  ],
  moderatorNotes:
    "Faculty: tie discussion to the module’s learning objectives; emphasise evidence-aware counselling, referral boundaries, and medico-legal prudence.",
  linkedCompetencies: [compByMod[mod.id]],
  evidenceTier: "consensus",
  redFlags: ["Premature procedural planning", "Missing inflammatory or scarring clues", "Inadequate documentation of escalation offers"],
}));

for (const sub of ["lessons", "references", "resources", "quizzes", "case-prompts"]) {
  fs.mkdirSync(path.join(root, sub), { recursive: true });
}
fs.writeFileSync(path.join(root, "lessons", "index.json"), JSON.stringify(lessons, null, 2));
fs.writeFileSync(path.join(root, "references", "index.json"), JSON.stringify(references, null, 2));
fs.writeFileSync(path.join(root, "resources", "index.json"), JSON.stringify(resources, null, 2));
fs.writeFileSync(path.join(root, "quizzes", "index.json"), JSON.stringify(quizzes, null, 2));
fs.writeFileSync(path.join(root, "case-prompts", "index.json"), JSON.stringify(cases, null, 2));

console.log("Wrote volume-3 lessons, references, resources, quizzes, case-prompts.");
