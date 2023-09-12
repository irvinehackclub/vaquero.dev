import crypto from 'crypto';

export default function handler(req, res) {
  const randomBytes = crypto.randomBytes(64).toString('hex');
  const clientString = `vaq${randomBytes}`;
  const hash = crypto.createHash('sha512').update(randomBytes).digest('hex');
  const serverString = `VAQ${hash.toUpperCase()}`;

  res.status(200).json({
    clientKey: clientString,
    serverKey: serverString,
  });
}
