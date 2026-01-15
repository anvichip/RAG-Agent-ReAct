const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * GET /pdfs
 */
// export async function getPdfs() {
//   const res = await fetch(`${API_BASE}/vectorstore/status`);
//   return await safeJson(res);
// }

export async function getPdfs() {
  const res = await fetch(`${API_BASE}/vector/list`);
  const data = await safeJson(res);

  return Array.isArray(data?.pdfs) ? data.pdfs : [];
}

//   const data = await safeJson(res);

//   // If backend returns { pdfs: [...] }
//   if (data?.pdfs) return data.pdfs;

//   // If backend returns direct array
//   if (Array.isArray(data)) return data;

//   return [];

/**
 * POST /pdfs/ingest
 */
export async function ingestPdf(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/vectorstore/ingest`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await safeJson(res);
    throw new Error(data?.message || "Failed to ingest PDF");
  }

  return safeJson(res);
}

/**
 * DELETE /pdfs/:id
 */
export async function deletePdf(pdfId) {
  const res = await fetch(`${API_BASE}/vectorstore/${pdfId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await safeJson(res);
    throw new Error(data?.message || "Failed to delete PDF");
  }

  return safeJson(res);
}

/**
 * POST /chat
 */
export async function sendChatMessage(message) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const data = await safeJson(res);
    throw new Error(data?.message || "Chat API failed");
  }

  return safeJson(res);
}
