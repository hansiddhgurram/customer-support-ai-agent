def parse_ticket_text(full_text: str) -> dict:
    """Parse combined ticket text into subject and description dictionary."""
    lines = [line.strip() for line in full_text.strip().split('\n') if line.strip()]
    subject = "No Subject"
    description = full_text

    if "Subject:" in full_text:
        parts = full_text.split("Description:")
        subject_part = parts[0].replace("Subject:", "").strip()
        description_part = parts[1].strip() if len(parts) > 1 else ""
        return {
            "subject": subject_part,
            "description": description_part
        }

    if lines:
        subject = lines[0]
        description = "\n".join(lines[1:]) if len(lines) > 1 else lines[0]

    return {
        "subject": subject,
        "description": description
    }
