# Word reference template (optional)

**Comms/design brief:** [`../internal/README.md`](../internal/README.md) · **Pre-export checklist:** [`../PUBLICATION_READINESS_CHECKLIST.md`](../PUBLICATION_READINESS_CHECKLIST.md)

Place your institutional **reference document** here as:

`reference.docx`

Pandoc uses it with `--reference-doc=reference.docx` to copy styles, heading definitions, and (if present) header/footer frames into generated files.

**How to create `reference.docx`**

1. Start from your organisation’s normal document template.  
2. Ensure **Heading 1**, **Heading 2**, etc. match how you want Markdown `#` / `##` to appear.  
3. Save a minimal document with those styles defined (Word keeps styles in the file even if the body is short).  
4. Save as `publication/templates/reference.docx`.

**Do not** commit placeholder branded covers here unless they are real approved assets.

If this file is **missing**, export scripts still run; Pandoc applies its default Word styling.
