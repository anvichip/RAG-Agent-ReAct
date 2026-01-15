from flask import Flask, request, jsonify
from backend.src.application_service import ask_question, ingest_pdf, delete_pdf, change_model
import os
from services.vector_store import get_vectorstore
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/chat", methods=["POST"])
def ask():
    print("Received /chat request")
    data = request.get_json() or {}
    print("Request data:", data)
    question = data.get("message")

    if not question:
        return jsonify({"error": "Missing 'message'"}), 400

    try:
        answer = ask_question(question)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# @app.route("/pdfs/ingest", methods=["POST"])
# def ingest():
#     data = request.get_json() or {}
#     path = data.get("path")

#     if not path:
#         return jsonify({"error": "Missing 'path'"}), 400

#     try:
#         result = ingest_pdf(path)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
import traceback

@app.route("/vectorstore/ingest", methods=["POST"])
def ingest():
    try:
        if "file" not in request.files:
            return jsonify({"error": "Missing file"}), 400

        file = request.files["file"]

        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        save_dir = "uploads"
        os.makedirs(save_dir, exist_ok=True)

        file_path = os.path.join(save_dir, file.filename)
        file.save(file_path)

        print("Saved PDF at:", file_path)

        result = ingest_pdf(file_path) 
        return jsonify(result)

    except Exception as e:
        print("❌ ERROR in /pdfs/ingest:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500



@app.route("/vectorstore/delete", methods=["POST"])
def delete():
    data = request.get_json() or {}
    filename = data.get("filename")

    if not filename:
        return jsonify({"error": "Missing 'filename'"}), 400

    try:
        result = delete_pdf(filename)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/change-model", methods=["POST"])
def change_llm():
    data = request.get_json() or {}
    model_name = data.get("model_name")

    if not model_name:
        return jsonify({"error": "Missing 'model_name'"}), 400

    try:
        result = change_model(model_name)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/vectorstore/status", methods=["GET"])
def vectorstore_status():
    vectorstore = get_vectorstore()
    count = vectorstore._collection.count()  # chroma internal
    return jsonify({"documentCount": count})

from flask import jsonify

@app.route("/vector/list", methods=["GET"])
def vector_list():
    vs = get_vectorstore()

    data = vs._collection.get(include=["metadatas"])
    metadatas = data.get("metadatas", [])

    pdf_names = set()
    for md in metadatas:
        if md and "pdf" in md:
            pdf_names.add(md["pdf"])

    pdfs = [{"id": name, "filename": name} for name in sorted(pdf_names)]

    return jsonify({"pdfs": pdfs})



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
