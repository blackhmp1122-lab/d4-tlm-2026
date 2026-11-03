export default async function handler(req, res) {
  // Kunci ini kita tulis langsung biar nggak ribet setting Environment Variables
  const SUPABASE_URL = 'https://pwyzpsiyymhbpvaazbd.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eXpwc2lpeXltaGJwdmFhemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzYzNjksImV4cCI6MjEwOTAxMjM2OX0.7RRXB0Th0vJrV6SVPvT5c-8VNRF_EVLKnRY3GScSq24';

  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    if (req.method === "GET") {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/guestbook?select=*&order=created_at.desc`, { headers });
      const data = await r.json();
      return res.status(r.status).json(data);
    }

    if (req.method === "POST") {
      const body = req.body || {};
      const r = await fetch(`${SUPABASE_URL}/rest/v1/guestbook`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({
          name: String(body.name || "").slice(0, 50),
          message: String(body.message || "").slice(0, 500),
        }),
      });
      const data = await r.json();
      return res.status(r.status).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
