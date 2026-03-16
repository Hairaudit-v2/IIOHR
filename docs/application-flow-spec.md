# IIOHR Application & Enquiry Flow — Specification

**Goal:** Turn high-intent doctors and clinics into qualified leads without feeling cheap, pushy, or generic.

**Tone:** Premium · Medically professional · Welcoming · Selective, not desperate.

---

## 1. Two main flows

| Flow | Entry | Purpose |
|------|--------|---------|
| **Individual doctor** | "I'm applying as a doctor" | Enquiry/application from a physician or surgeon (solo or with clinic affiliation). |
| **Clinic / organisation** | "My clinic or organisation is enquiring" | Enquiry from a clinic, hospital, or training body (multiple surgeons, partnerships, standards). |

**Flow selection:** One screen with two clear options (cards or radio). No dropdown. Selecting one shows the relevant form; the other is hidden.

---

## 2. Field inventory and mapping

### Shared (both flows)
| Field | Type | Required | Notes |
|-------|------|----------|--------|
| Full name | text | Yes | Primary contact. |
| Email | email | Yes | Primary channel. |
| Phone | tel | Yes | With country code hint or separate country. |
| Country | select / text | Yes | For time zone and regional pathway relevance. |
| Desired next step | select | Yes | Qualification + routing. See options below. |
| Goals, challenges, or questions | textarea | No | Free text. High value for sales call prep. |

### Individual doctor only
| Field | Type | Required | Notes |
|-------|------|----------|--------|
| Medical background | select or text | Yes | e.g. General practice, Dermatology, Plastic surgery, Other surgery, Other. |
| Current surgical experience | select | Yes | e.g. None / Minimal / Moderate / Extensive. |
| Current hair restoration experience | select | Yes | e.g. None / Observing only / Assisting / Performing (limited) / Performing (regular). |
| Training interest area | multiselect or checkboxes | Yes | Practical FUE / Trichology & theory / Auditing & development / Full pathway. |
| Practical FUE interest | select | Yes (if FUE in interests) | Level: Exploring / Ready to train / Seeking advanced refinement. |
| Trichology / theory interest | select | Yes (if theory in interests) | Level: Foundation / Deepening understanding / Integration with practice. |
| Clinic affiliation | text | No | "Do you have a current clinic affiliation?" Free text or "None / Independent." |

### Clinic / organisation only
| Field | Type | Required | Notes |
|-------|------|----------|--------|
| Organisation name | text | Yes | |
| Your role | text / select | Yes | e.g. Owner / Medical director / Training lead / HR / Other. |
| Number of surgeons to develop (approx.) | select | No | e.g. 1–2 / 3–5 / 6+ / Exploring. |
| Primary goal | select | Yes | e.g. Train new surgeons / Upskill existing team / Audit and standards / Partnership discussion. |
| Training interest area | multiselect | Yes | Same options as doctor (pathway components). |
| Goals, challenges, or questions | textarea | No | Same as shared. |

### Desired next step (shared options)
- Request a conversation
- Receive pathway information
- Apply for the next intake
- Discuss clinic partnership

---

## 3. Gentle qualification logic

**Purpose:** Prioritise and route leads without making the form feel like a gate.

- **No hard gates.** All submissions are accepted. "Qualification" is for internal routing and follow-up priority, not for blocking.
- **Desired next step** drives follow-up type: "Request a conversation" → phone/calendar; "Receive pathway information" → email sequence; "Apply for next intake" → application review; "Clinic partnership" → dedicated contact.
- **Experience level** (doctor flow): Used for segmentation and conversation prep. e.g. "None" → new entrant; "Performing (regular)" → refinement / audit focus. Do not show different form lengths by experience.
- **Primary goal** (clinic flow): Routes to "clinic development" vs "partnership" vs "information" follow-up.
- **Optional:** One soft early question: "What best describes you?" → Doctor / Clinic or organisation. This is the flow selector; no further branching that hides fields.

---

## 4. Form structure and order

### Individual doctor form
1. **Intro** — Short paragraph (see copy below).
2. **Contact** — Full name, Email, Phone, Country.
3. **Background** — Medical background, Current surgical experience, Current hair restoration experience.
4. **Interest** — Training interest area (checkboxes), then conditional: Practical FUE interest (if FUE selected), Trichology/theory interest (if theory selected).
5. **Affiliation** — Clinic affiliation (optional).
6. **Next step** — Desired next step (select).
7. **Goals** — Goals, challenges, or questions (textarea, optional).
8. **Submit** — Single primary CTA.

### Clinic / organisation form
1. **Intro** — Short paragraph (clinic-specific).
2. **Contact** — Full name, Email, Phone, Country, Organisation name, Your role.
3. **Context** — Number of surgeons to develop (approx.), Primary goal.
4. **Interest** — Training interest area (checkboxes).
5. **Next step** — Desired next step (select).
6. **Goals** — Goals, challenges, or questions (textarea, optional).
7. **Submit** — Single primary CTA.

---

## 5. Copy

### Page headline (apply page)
**Apply or enquire**

### Page lead (apply page)
We welcome serious enquiries from doctors and clinics interested in the IIOHR pathway. The information you provide helps us respond with relevance and clarity.

### Flow selector
**Heading:** How would you like to proceed?  
**Option A (doctor):** I'm applying or enquiring as a doctor  
**Option B (clinic):** My clinic or organisation is enquiring  

### Form intro — Doctor
**Heading:** Your application or enquiry  
A few details help us understand your background and how the pathway might support your development. All fields marked with an asterisk are required.

### Form intro — Clinic
**Heading:** Your organisation's enquiry  
Tell us about your clinic or organisation and what you hope to achieve. We will respond with information relevant to structured surgeon development and partnership options.

### Section labels (for form grouping)
- Contact details
- Professional background
- Training interests
- Next step
- Anything else we should know

### CTA buttons
**Primary submit (doctor):** Submit application | Submit enquiry  
**Primary submit (clinic):** Submit enquiry  
**Secondary (optional):** Back to pathway (link only)

Use one primary label per flow. Do not use "Submit" alone; use "Submit application" or "Submit enquiry."

### Thank-you — Headline
Thank you for your application. | Thank you for your enquiry.

(Use "application" if they selected "Apply for the next intake"; otherwise "enquiry.")

### Thank-you — Body
We have received your submission and will review it with care. A member of our team will be in touch within [X business days] according to the next step you indicated. If you have any urgent questions in the meantime, you may reply to the confirmation email you will receive shortly.

### Thank-you — Secondary CTA
Return to homepage | Explore the pathway

---

## 6. Premium thank-you state

- **Same URL or dedicated:** Either show thank-you in place (form hidden, thank-you block visible) or redirect to `/apply/thank-you`. In-place feels faster and avoids back-button confusion.
- **Content:** Headline + 2–3 sentences (as above). No coupon, countdown, or "Share to unlock."
- **Confirmation email:** Mention that they will receive a confirmation email; reinforces legitimacy and sets expectation.
- **Next step:** One soft CTA (e.g. "Return to homepage" or "Explore the pathway"). No secondary sign-up or pop-up.

---

## 7. Lead segmentation recommendations

Use form data to tag or segment leads for follow-up and reporting.

| Segment | Source fields | Use |
|---------|----------------|-----|
| **New entrant** | Hair restoration experience = None / Observing only | Onboarding, pathway intro, hands-on focus. |
| **Experienced surgeon** | Hair restoration = Performing (limited/regular) | Audit, refinement, trichology, mentorship. |
| **Theory-focused** | Training interest includes Trichology & theory only or heavily | Theory-first content, course sequencing. |
| **Full pathway** | Training interest = Full pathway | Full journey; prioritise for conversation. |
| **Clinic — development** | Primary goal = Train / Upskill | Multi-surgeon pathway, group options. |
| **Clinic — partnership** | Primary goal = Partnership | Dedicated contact, commercial discussion. |
| **High-intent next step** | Desired next step = Request conversation / Apply for intake | Prioritise response time. |
| **Info-only** | Desired next step = Receive pathway information | Nurture sequence; lower immediate call priority. |
| **Region** | Country | Time zone, language, regional pathway relevance. |

---

## 8. Suggested automations and CRM tags

### Tags to apply on submission
- `source: website-apply`
- `flow: doctor` | `flow: clinic`
- `next_step: [value]` (e.g. conversation, information, intake, partnership)
- `experience: new_entrant` | `experience: experienced` (doctor)
- `interest_fue: yes` | `interest_theory: yes` | `interest_audit: yes` | `interest_full: yes`
- `clinic_goal: [value]` (clinic)
- `country: [value]` or `region: [region]`

### Suggested automations
1. **Confirmation email** — Sent immediately; includes copy of submission (or summary) and sets expectation ("we will respond within X days").
2. **Internal notification** — New lead alert to sales/ops with link to CRM record and segment tags.
3. **Routing by next step:**
   - "Request a conversation" / "Apply for next intake" → Add to "High priority" list; optional calendar link in confirmation.
   - "Receive pathway information" → Add to email nurture; send pathway overview + FI + training pathways links.
   - "Clinic partnership" → Assign to partnership lead; send clinic-specific follow-up.
4. **Segment-based nurture** — Optional: if no reply in X days, one gentle follow-up email (no pressure). Different copy for doctor vs clinic.

### Do not
- Add to a generic "newsletter" without consent.
- Send multiple promotional emails before a human response.
- Use tags that imply "cold" or "low quality" in a visible way; keep segmentation internal.

---

## 9. Definition of done checklist

- [ ] Two flows (doctor, clinic) selectable on one apply page.
- [ ] All listed fields present; required/optional as specified.
- [ ] Form intro and section labels use the copy above.
- [ ] Primary CTA: "Submit application" or "Submit enquiry."
- [ ] Thank-you state: premium, no hype; confirmation email mentioned.
- [ ] Flow feels high-end and matches institute positioning.
- [ ] Commercially useful: name, email, phone, country, background, experience, interests, next step, free text.
- [ ] Internal spec supports segmentation and CRM/automation design.

---

*Document: IIOHR Application Flow Spec. Use for implementation and CRM/automation setup.*
