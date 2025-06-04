export default async function handler(req, res) {
  const targetUrl = req.query.url;
  const referer = req.query.referer || 'https://trgoals1350.xyz';

  if (!targetUrl) {
    return res.status(400).json({ error: 'url parametresi zorunludur' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Referer': referer,
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
      },
    });

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS izni
    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: 'İstek gönderilemedi', detail: err.toString() });
  }
}
