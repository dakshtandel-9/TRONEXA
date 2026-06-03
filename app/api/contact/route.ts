import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdJVVlDY76ncS7tlAdsYk36A8l1qPsN6E92NUOfmNa3VjSjuQ/formResponse';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const body = new URLSearchParams({
    'entry.2005620554': `${data.firstName} ${data.lastName}`.trim(),
    'entry.1045781291': data.email ?? '',
    'entry.1065046570': data.address ?? '',
    'entry.1166974658': data.phone ?? '',
    'entry.839337160': data.company ?? '',
    'entry.34865688': data.service ?? '',
    'entry.1737670665': data.message ?? '',
  });

  const res = await fetch(GOOGLE_FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    redirect: 'follow',
  });

  console.log('[contact] Google Forms status:', res.status, res.url);

  // Google Forms redirects to a thank-you page on success (ends up as 200)
  // Also treat any non-5xx as success since we can't read the opaque response
  if (res.status < 500) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
}
