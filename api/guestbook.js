export default async function handler(req, res) {
  // Handle GET request (buat narik data)
  if (req.method === 'GET') {
    try {
      const response = await fetch('https://pwyzpsiyymhbpvaazbd.supabase.co/rest/v1/guestbook?select=*', {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eXpwc2lpeXltaGJwdmFhemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzYzNjksImV4cCI6MjEwOTAxMjM2OX0.7RRXB0Th0vJrV6SVPvT5c-8VNRF_EVLKnRY3GScSq24',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eXpwc2lpeXltaGJwdmFhemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzYzNjksImV4cCI6MjEwOTAxMjM2OX0.7RRXB0Th0vJrV6SVPvT5c-8VNRF_EVLKnRY3GScSq24'
        }
      });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Vercel Gagal: " + error.message });
    }
  }

  // Handle POST request (buat ngirim data baru)
  if (req.method === 'POST') {
    try {
      const { name, message } = req.body;
      
      const response = await fetch('https://pwyzpsiyymhbpvaazbd.supabase.co/rest/v1/guestbook', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eXpwc2lpeXltaGJwdmFhemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzYzNjksImV4cCI6MjEwOTAxMjM2OX0.7RRXB0Th0vJrV6SVPvT5c-8VNRF_EVLKnRY3GScSq24',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eXpwc2lpeXltaGJwdmFhemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzYzNjksImV4cCI6MjEwOTAxMjM2OX0.7RRXB0Th0vJrV6SVPvT5c-8VNRF_EVLKnRY3GScSq24',
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ name, message })
      });

      if (response.ok) {
        return res.status(200).json({ success: true });
      } else {
        const errText = await response.text();
        return res.status(response.status).json({ error: errText });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
