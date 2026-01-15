import { useEffect, useMemo, useState } from "react";
import { deletePdf, getPdfs, ingestPdf } from "../services/api";

export default function usePDF() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfId, setSelectedPdfId] = useState(null);
  const [loading, setLoading] = useState(false);

  const pdfList = useMemo(() => (Array.isArray(pdfs) ? pdfs : []), [pdfs]);

    const selectedPdf = useMemo(
    () => pdfList.find((p) => p.id === selectedPdfId) || null,
    [pdfList, selectedPdfId]
    );


//   const selectedPdf = useMemo(
//     () => pdfs.find((p) => p.id === selectedPdfId) || null,
//     [pdfs, selectedPdfId]
//   );

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getPdfs();
      setPdfs(data);

      // auto select first pdf if none selected
      if (!selectedPdfId && data?.length > 0) {
        setSelectedPdfId(data[0].id);
      }
    } catch (e) {
      // if backend not available, keep fallback list empty
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingestPDF = async (file) => {
    if (!file) return;

    setLoading(true);
    try {
      await ingestPdf(file);
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  const deletePDF = async (pdfId) => {
    if (!pdfId) return;

    setLoading(true);
    try {
      await deletePdf(pdfId);
      await refresh();
      if (selectedPdfId === pdfId) {
        setSelectedPdfId(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    pdfs,
    selectedPdf,
    setSelectedPdf: (pdf) => setSelectedPdfId(pdf?.id ?? pdf),
    loading,
    ingestPDF,
    deletePDF,
  };
}