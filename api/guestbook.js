export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, apikey, authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabaseUrl = 'https://pwyzpsiyymhbpvaazbd.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eXpwc2lpeXltaGJwdmFhemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzYzNjksImV4cCI6MjEwOTAxMjM2OX0.7RRXB0Th0vJrV6SVPvT5c-8VNRF_EVLKnRY3GScSq24';

  const targetUrl = `${supabaseUrl}/rest/v1/guestbook`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : null
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    if (req.method === 'GET') {
      const data = await response.json();
      return res.status(200).json(data);
    } else {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
