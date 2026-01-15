import pdfplumber
from pathlib import Path
from langchain_text_splitters import RecursiveCharacterTextSplitter

# PDF_PATH = "agreement_2.pdf"
# OUT_PATH = Path("chunks.txt")

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=80,
    separators=["\n\n", "\n", ". ", " ", ""]
)

# all_text = ""
# with pdfplumber.open(PDF_PATH) as pdf:
#     for page in pdf.pages:
#         all_text += (page.extract_text() or "") + "\n"

# chunks = text_splitter.split_text(all_text)

# with OUT_PATH.open("w", encoding="utf-8") as f:
#     for i, chunk in enumerate(chunks, start=1):
#         f.write(f"\n\n--- CHUNK {i} ---\n\n")
#         f.write(chunk)

# print(f"Extracted {len(chunks)} chunks and saved to {OUT_PATH}")

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from a PDF file."""
    all_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            all_text += (page.extract_text() or "") + "\n"
    return all_text

def split_text_into_chunks(text: str) -> list[str]:
    """Split text into chunks using the defined text splitter."""
    return text_splitter.split_text(text)

def save_chunks_to_file(chunks: list[str], out_path: Path):
    """Save text chunks to a file."""
    with out_path.open("w", encoding="utf-8") as f:
        for i, chunk in enumerate(chunks, start=1):
            f.write(f"\n\n--- CHUNK {i} ---\n\n")
            f.write(chunk)
    print(f"Saved {len(chunks)} chunks to {out_path}")

def process_pdf_to_chunks(pdf_path: str):
    """Extract text from a PDF, split into chunks, and returns them."""
    text = extract_text_from_pdf(pdf_path)
    chunks = split_text_into_chunks(text)
    #save_chunks_to_file(chunks, out_path) # Uncomment to save chunks to file for debugging
    return chunks