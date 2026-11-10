#!/usr/bin/env python3
"""Aggregate VLM extraction results for H10901 and H11005 into one JSON file."""
import json
import os

RESULTS_DIR = "/tmp/hsk_results"
OUTPUT_PATH = "/home/z/my-project/scripts/exam-content.json"

EXAMS = ["H10901", "H11005"]


def extract_content(file_path: str) -> str:
    """Pull the assistant `content` text out of a z-ai vision JSON response."""
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    try:
        return data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError):
        # Fallback: try the `text` field or stringify the whole object
        return json.dumps(data, ensure_ascii=False, indent=2)


def main() -> None:
    aggregated = {}
    for exam in EXAMS:
        prefix = exam.lower()
        exam_pages = {}
        for page_num in range(1, 11):
            file_path = os.path.join(RESULTS_DIR, f"{prefix}_page{page_num}.json")
            if not os.path.exists(file_path):
                print(f"WARNING: missing {file_path}")
                exam_pages[f"page{page_num}"] = ""
                continue
            content = extract_content(file_path)
            exam_pages[f"page{page_num}"] = content
            print(f"  {exam} page{page_num}: {len(content)} chars")
        aggregated[exam] = exam_pages

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(aggregated, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Saved aggregated JSON to: {OUTPUT_PATH}")
    print(f"   Total size: {os.path.getsize(OUTPUT_PATH)} bytes")
    # Print a quick summary
    for exam, pages in aggregated.items():
        total_chars = sum(len(v) for v in pages.values())
        print(f"   {exam}: {len(pages)} pages, {total_chars} chars total")


if __name__ == "__main__":
    main()
