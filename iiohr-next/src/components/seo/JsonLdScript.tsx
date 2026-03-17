/**
 * Renders JSON-LD structured data as a script tag.
 * Server-rendered; safe for layout or page.
 */

interface JsonLdScriptProps {
  /** Single schema object or array of schema objects. */
  data: object | object[];
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  const json = Array.isArray(data) ? data : [data];
  const __html = JSON.stringify(json.length === 1 ? json[0] : json);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}
