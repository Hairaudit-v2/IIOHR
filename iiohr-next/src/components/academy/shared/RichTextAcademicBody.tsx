interface RichTextAcademicBodyProps {
  content: string;
}

export function RichTextAcademicBody({ content }: RichTextAcademicBodyProps) {
  return (
    <div className="prose prose-neutral max-w-none text-sm leading-relaxed text-readable-muted">
      <p>{content}</p>
    </div>
  );
}
