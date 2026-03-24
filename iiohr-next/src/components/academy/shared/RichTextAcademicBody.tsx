interface RichTextAcademicBodyProps {
  content: string;
}

export function RichTextAcademicBody({ content }: RichTextAcademicBodyProps) {
  const paragraphs = content
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="prose prose-neutral max-w-none space-y-4 text-sm leading-relaxed text-readable-muted">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
