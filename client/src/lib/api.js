const API_BASE = import.meta.env.VITE_API_URL || '';

export async function submitContact(payload) {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Unexpected server response. Please try again.');
  }

  if (!response.ok) {
    const firstError = data?.errors?.[0]?.message;
    throw new Error(firstError || data?.message || 'Unable to send your message.');
  }

  return data;
}

export async function submitKyc(payload) {
  const response = await fetch(`${API_BASE}/api/kyc/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Unexpected server response. Please try again.');
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Unable to submit KYC application.');
  }

  return data;
}
