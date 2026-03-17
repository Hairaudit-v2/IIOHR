/**
 * Internal test helper for POST /api/application
 *
 * Run with dev server up: npm run dev (or start)
 * Then: node scripts/test-application-api.js [baseUrl]
 *
 * Default baseUrl: http://localhost:3000
 *
 * CURL EXAMPLES (run in another terminal with dev server up):
 *
 * 1. Valid submission (expect 200 when APPLICATION_WEBHOOK_URL is unset or webhook returns 200):
 *
 *   curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/application \
 *     -H "Content-Type: application/json" \
 *     -d '{"enquiryType":"individual","fullName":"Test User","email":"test@example.com","phone":"","country":"Australia","medicalBackground":"GP","experienceLevel":"none","interestArea":"training-pathways","goals":"Training","timeframe":"planning","consent":true}'
 *
 * 2. Invalid: missing required fields (expect 400):
 *
 *   curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/application \
 *     -H "Content-Type: application/json" \
 *     -d '{"fullName":"Test","email":"test@example.com","consent":true}'
 *
 * 3. Invalid: no consent (expect 400):
 *
 *   curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/application \
 *     -H "Content-Type: application/json" \
 *     -d '{"enquiryType":"individual","fullName":"Test","email":"test@example.com","country":"AU","medicalBackground":"x","experienceLevel":"none","interestArea":"training-pathways","goals":"x","timeframe":"planning"}'
 *
 * 4. Invalid: honeypot filled (expect 400):
 *
 *   curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/application \
 *     -H "Content-Type: application/json" \
 *     -d '{"enquiryType":"individual","fullName":"Test","email":"test@example.com","country":"AU","medicalBackground":"x","experienceLevel":"none","interestArea":"training-pathways","goals":"x","timeframe":"planning","consent":true,"website":"http://spam.com"}'
 */

const BASE = process.argv[2] || "http://localhost:3000";
const API = `${BASE}/api/application`;

const validPayload = {
  enquiryType: "individual",
  fullName: "Test User (API test)",
  email: "test@example.com",
  phone: "",
  country: "Australia",
  medicalBackground: "GP, no hair restoration experience",
  experienceLevel: "none",
  interestArea: "training-pathways",
  goals: "Complete pathway and gain practical FUE exposure",
  timeframe: "planning",
  consent: true,
};

const invalidMissingFields = {
  fullName: "Test",
  email: "test@example.com",
  consent: true,
};

const invalidNoConsent = {
  ...validPayload,
  consent: false,
};

const invalidHoneypot = {
  ...validPayload,
  website: "http://spam.com",
};

async function post(payload) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  return { status: res.status, json };
}

async function run() {
  console.log("Testing", API);
  console.log("");

  let passed = 0;
  let failed = 0;

  // 1. Valid payload -> 200 (or 502 if webhook configured and failing)
  const r1 = await post(validPayload);
  if (r1.status === 200) {
    console.log("✓ Valid payload -> 200");
    passed++;
  } else if (r1.status === 502) {
    console.log("✓ Valid payload -> 502 (webhook failed; pipeline correctly rejects)");
    passed++;
  } else {
    console.log("✗ Valid payload: expected 200 or 502, got", r1.status, r1.json);
    failed++;
  }

  // 2. Missing required fields -> 400
  const r2 = await post(invalidMissingFields);
  if (r2.status === 400) {
    console.log("✓ Missing required fields -> 400");
    passed++;
  } else {
    console.log("✗ Missing required fields: expected 400, got", r2.status, r2.json);
    failed++;
  }

  // 3. No consent -> 400
  const r3 = await post(invalidNoConsent);
  if (r3.status === 400) {
    console.log("✓ No consent -> 400");
    passed++;
  } else {
    console.log("✗ No consent: expected 400, got", r3.status, r3.json);
    failed++;
  }

  // 4. Honeypot filled -> 400
  const r4 = await post(invalidHoneypot);
  if (r4.status === 400) {
    console.log("✓ Honeypot filled -> 400");
    passed++;
  } else {
    console.log("✗ Honeypot filled: expected 400, got", r4.status, r4.json);
    failed++;
  }

  // 5. Invalid email -> 400
  const r5 = await post({ ...validPayload, email: "not-an-email" });
  if (r5.status === 400) {
    console.log("✓ Invalid email -> 400");
    passed++;
  } else {
    console.log("✗ Invalid email: expected 400, got", r5.status, r5.json);
    failed++;
  }

  console.log("");
  console.log(passed + " passed, " + failed + " failed");
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error("Request failed:", err.message);
  process.exit(1);
});
