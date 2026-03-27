import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";
import { ComplianceStatementPanel } from "@/components/academy/shared/ComplianceStatementPanel";
import { EscalationTriggersPanel } from "@/components/academy/shared/EscalationTriggersPanel";
import { LessonChapterNav } from "@/components/academy/shared/LessonChapterNav";
import { LessonCompletionRulesPanel } from "@/components/academy/shared/LessonCompletionRulesPanel";
import { LessonEvidenceTierPanel } from "@/components/academy/shared/LessonEvidenceTierPanel";
import { LessonHeader } from "@/components/academy/shared/LessonHeader";
import { LessonOutcomesDualPanel } from "@/components/academy/shared/LessonOutcomesDualPanel";
import { LessonSection } from "@/components/academy/shared/LessonSection";
import { LinkedAssessmentsCallout } from "@/components/academy/shared/LinkedAssessmentsCallout";
import { LinkedCaseStudiesPanel } from "@/components/academy/shared/LinkedCaseStudiesPanel";
import { LinkedPracticalTasksPanel } from "@/components/academy/shared/LinkedPracticalTasksPanel";
import { PatientCommunicationExamples } from "@/components/academy/shared/PatientCommunicationExamples";
import { RedFlagsPanel } from "@/components/academy/shared/RedFlagsPanel";
import { ReferenceList } from "@/components/academy/shared/ReferenceList";
import { DownloadableResourceList } from "@/components/academy/shared/DownloadableResourceList";
import { RichTextAcademicBody } from "@/components/academy/shared/RichTextAcademicBody";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { ConsultantLessonFooterNav } from "@/components/academy/consultant/ConsultantLessonFooterNav";
import { PilotJourneyFigureStrip } from "@/components/academy/consultant/PilotJourneyFigureStrip";
import { PilotKeyConceptCard } from "@/components/academy/consultant/PilotKeyConceptCard";
import { ConsultantRoleBoundariesCallout } from "@/components/academy/consultant/ConsultantRoleBoundariesCallout";
import { ConsultantScopeStrip } from "@/components/academy/consultant/ConsultantScopeStrip";
import type { ComplianceNotice, DownloadableResource } from "@/lib/academy/content-types";
import { buildConsultantPilotLessonChapterNav } from "@/lib/academy/lesson-chapter-nav";
import type { LessonPageViewModel } from "@/lib/academy/view-models/lesson";

interface ConsultantPilotLessonLayoutProps {
  viewModel: LessonPageViewModel;
  programSlug: string;
  base: string;
  sequenceLabel: string | null;
  mergedComplianceForDetail: ComplianceNotice[];
  resourcesAvailable: DownloadableResource[];
  resourcesPending: DownloadableResource[];
}

export function ConsultantPilotLessonLayout({
  viewModel,
  programSlug,
  base,
  sequenceLabel,
  mergedComplianceForDetail,
  resourcesAvailable,
  resourcesPending,
}: ConsultantPilotLessonLayoutProps) {
  const mod = viewModel.moduleForLesson;
  const lesson = viewModel.lesson;
  const seq = viewModel.lessonSequence;

  const keyConceptLine =
    lesson.learningObjectives.length > 2 ? lesson.learningObjectives[2]! : null;

  const hasModuleContext = Boolean(mod?.moduleOverview);
  const hasClinicalApplication =
    lesson.patientCommunicationExamples.length > 0 ||
    viewModel.caseStudies.length > 0 ||
    viewModel.practicalTasks.length > 0;
  const hasTakeaways = lesson.keyTakeaways.length > 0;

  const navItems = buildConsultantPilotLessonChapterNav({
    showScopeStrip: viewModel.programComplianceNotices.length > 0,
    hasRoleBoundaries: lesson.roleBoundaryNotes.length > 0,
    showEvidence: lesson.displayFlags.showEvidencePanel,
    hasCommunicationExamples: lesson.patientCommunicationExamples.length > 0,
    hasScenarios: viewModel.caseStudies.length > 0 || viewModel.practicalTasks.length > 0,
    hasAssessments: viewModel.linkedAssessments.length > 0,
    hasReferencesOrResources: viewModel.references.length > 0 || viewModel.resources.length > 0,
    hasModuleContext,
    showLessonIntro: Boolean(lesson.overview),
    hasOutcomes:
      (mod?.learningOutcomes.length ?? 0) > 0 || lesson.learningObjectives.length > 0,
    hasClinicalApplication,
    hasTakeaways,
  });

  return (
    <>
      <SectionShell
        id="lesson-hero"
        className="scroll-mt-32 border-b border-[color-mix(in_srgb,var(--gold-primary)_16%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg-secondary)_100%,transparent)_0%,var(--bg-primary)_100%)]"
      >
        {viewModel.programComplianceNotices.length > 0 ? (
          <div id="lesson-scope" className="scroll-mt-32">
            <ConsultantScopeStrip notices={viewModel.programComplianceNotices} />
          </div>
        ) : null}
        <div className="mt-8">
          <LessonHeader
            variant="deck"
            deckAuthority
            showDeckOverview={false}
            title={lesson.title}
            overview={lesson.overview}
            studyTimeMinutes={lesson.estimatedStudyMinutes}
            sequenceLabel={sequenceLabel}
            programWorkingTitle={viewModel.program.workingTitle}
            moduleTitle={mod?.title ?? null}
          />
        </div>
      </SectionShell>

      <LessonChapterNav items={navItems} aria-label="Lesson sections" variant="benchmark" />

      {hasModuleContext ? (
        <LessonSection
          id="lesson-why"
          muted
          relaxed
          eyebrow="Teaching manual · module"
          title="Why this module matters"
          intro={mod!.moduleOverview}
        />
      ) : null}

      {lesson.overview ? (
        <LessonSection id="lesson-intro" relaxed eyebrow="This lesson" title="Focus and expectations" constrain>
          <p className="text-sm leading-[1.75] text-readable-muted">{lesson.overview}</p>
        </LessonSection>
      ) : null}

      {mod?.learningOutcomes.length ? (
        <LessonSection
          id="lesson-outcomes"
          muted
          relaxed
          eyebrow="Outcomes"
          title="What you are working toward"
          constrain={false}
        >
          <LessonOutcomesDualPanel moduleOutcomes={mod.learningOutcomes} lessonObjectives={lesson.learningObjectives} />
        </LessonSection>
      ) : (
        <LessonSection id="lesson-outcomes" muted relaxed eyebrow="Outcomes" title="Lesson objectives" constrain>
          <AcademyPanel title="Lesson objectives" quiet>
            <ol className="list-none space-y-3 text-sm leading-relaxed">
              {lesson.learningObjectives.map((line, i) => (
                <li key={line} className="flex gap-2.5">
                  <span className="w-5 shrink-0 font-semibold tabular-nums text-foreground">{i + 1}.</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </AcademyPanel>
        </LessonSection>
      )}

      {lesson.roleBoundaryNotes.length > 0 ? (
        <LessonSection id="lesson-pathway" muted relaxed eyebrow="Scope" constrain={false}>
          <ConsultantRoleBoundariesCallout notes={lesson.roleBoundaryNotes} />
        </LessonSection>
      ) : null}

      <LessonSection
        id="lesson-reading"
        muted
        relaxed
        eyebrow="Core reading"
        title="Teaching notes"
        constrain={false}
      >
        <div className="space-y-7">
          {keyConceptLine ? <PilotKeyConceptCard text={keyConceptLine} /> : null}
          <div className="rounded-xl border border-[color-mix(in_srgb,var(--gold-primary)_10%,var(--border))] bg-surface/75 p-6 shadow-[var(--glow-soft)] md:p-8">
            <RichTextAcademicBody content={lesson.body.content} pilotBand />
          </div>
          <PilotJourneyFigureStrip lessonBodyContent={lesson.body.content} />
        </div>
      </LessonSection>

      {lesson.displayFlags.showEvidencePanel ? (
        <LessonSection
          id="lesson-evidence"
          relaxed
          eyebrow="Evidence"
          title="Standards and evidence framing"
          constrain={false}
        >
          <LessonEvidenceTierPanel lesson={lesson} />
        </LessonSection>
      ) : null}

      {hasClinicalApplication ? (
        <LessonSection
          id="lesson-application"
          muted
          relaxed
          eyebrow="Application"
          title="From principles to practice"
          constrain={false}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {lesson.patientCommunicationExamples.length > 0 ? (
              <PatientCommunicationExamples
                examples={lesson.patientCommunicationExamples}
                title="Patient communication — scope-safe phrasing"
              />
            ) : null}
            {viewModel.caseStudies.length > 0 ? (
              <LinkedCaseStudiesPanel caseStudies={viewModel.caseStudies} />
            ) : null}
            {viewModel.practicalTasks.length > 0 ? (
              <LinkedPracticalTasksPanel tasks={viewModel.practicalTasks} />
            ) : null}
          </div>
        </LessonSection>
      ) : null}

      {hasTakeaways ? (
        <LessonSection id="lesson-takeaways" relaxed eyebrow="Synthesis" title="Key takeaways" constrain>
          <AcademyPanel title="Carry-forwards" quiet>
            <ul className="space-y-3 text-sm leading-relaxed">
              {lesson.keyTakeaways.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--gold-primary)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AcademyPanel>
        </LessonSection>
      ) : null}

      {viewModel.linkedAssessments.length > 0 ? (
        <LessonSection
          id="lesson-check"
          muted
          relaxed
          eyebrow="Assessment"
          title="Knowledge check"
          constrain={false}
        >
          <LinkedAssessmentsCallout
            assessments={viewModel.linkedAssessments}
            basePath={base}
            description="Complete the module assessment to demonstrate scope-safe reasoning. Pass mark and retry limits apply as shown on each assessment page."
          />
        </LessonSection>
      ) : null}

      <LessonSection id="lesson-safety" relaxed eyebrow="Safety" title="Red flags and escalation" constrain={false}>
        <div
          id="safety-escalation"
          className="rounded-xl border border-[color-mix(in_srgb,var(--gold-primary)_22%,transparent)] bg-[var(--bg-secondary)] p-5 sm:p-6"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-readable-muted">
            Read carefully before patient-facing work
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <RedFlagsPanel redFlags={lesson.redFlags} />
            <EscalationTriggersPanel triggers={lesson.escalationTriggers} />
          </div>
        </div>
      </LessonSection>

      <LessonSection id="lesson-compliance" muted relaxed eyebrow="Governance" constrain={false}>
        <ComplianceStatementPanel
          notices={mergedComplianceForDetail}
          title="Compliance, scope, and how to interpret this lesson"
          tone="safety"
        />
      </LessonSection>

      <LessonSection id="lesson-completion" relaxed eyebrow="Progress" title="Completion requirements" constrain={false}>
        <LessonCompletionRulesPanel rules={lesson.completionRules} />
      </LessonSection>

      {viewModel.references.length > 0 || viewModel.resources.length > 0 ? (
        <LessonSection
          id="lesson-references"
          muted
          relaxed
          eyebrow="Companion materials"
          title="References and downloads"
          constrain={false}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <ReferenceList references={viewModel.references} />
            <DownloadableResourceList
              resources={resourcesAvailable}
              pendingResources={resourcesPending}
              title="Resources and downloads"
            />
          </div>
        </LessonSection>
      ) : null}

      <SectionShell>
        {seq ? (
          <ConsultantLessonFooterNav
            programSlug={programSlug}
            moduleSlug={mod?.slug ?? null}
            sequence={{ position: seq.position, total: seq.total }}
            prevLesson={seq.prevLesson}
            nextLesson={seq.nextLesson}
          />
        ) : null}
      </SectionShell>
    </>
  );
}
