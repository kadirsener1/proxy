// api/proxy.js

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).json({ error: "Geçerli bir URL girin." });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0'
      }
    });

    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType || "text/plain");

    const body = await response.text();
    res.status(200).send(body);
  } catch (error) {
    res.status(500).json({ error: "Bağlantı hatası", detay: error.toString() });
  }
}
