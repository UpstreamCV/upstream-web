#!/usr/bin/env python3
"""Generate public/assets/upstream_capability_statement.pdf.

Usage:
    python3 -m venv .venv && .venv/bin/pip install reportlab
    .venv/bin/python scripts/generate_capability_statement.py
"""

import os

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

# Embed real fonts so every viewer renders with the exact metrics used for
# layout (non-embedded base-14 Helvetica gets substituted inconsistently).
pdfmetrics.registerFont(TTFont("Body", "/System/Library/Fonts/Supplemental/Arial.ttf"))
pdfmetrics.registerFont(TTFont("Bold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"))
FONT = "Body"
BOLD = "Bold"

W, H = letter  # 612 x 792 pt

NAVY = HexColor("#0F2537")
BLUE = HexColor("#2A7FBF")
TEAL = HexColor("#22A7C4")
GREEN = HexColor("#1FA86B")
INK = HexColor("#16324A")
GRAY = HexColor("#4E5D6B")
FAINT = HexColor("#B9C6D2")
RULE = HexColor("#D9E2EA")
BOX_BLUE = HexColor("#EDF3F8")
BOX_GREEN = HexColor("#EAF6EF")

ML = 52
CW = W - 2 * ML

OUT = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public",
    "assets",
    "upstream_capability_statement.pdf",
)

HEADLINE = "Software, data, AI, and deployed systems for government missions"

INTRO = (
    "Upstream is a small, multidisciplinary engineering company that turns "
    "defined technical requirements into working systems. Our team spans "
    "full-stack software, data engineering, AI/ML, cloud infrastructure, "
    "systems integration, edge computing, and hardware-integrated deployment. "
    "Upstream works directly with government customers and alongside prime "
    "contractors — leading a defined requirement end to end or owning a "
    "focused technical scope within a larger team."
)

CAPABILITIES = [
    (
        "Custom software + digital products",
        "Web applications, internal tools, operational dashboards, backend "
        "services, APIs, workflow systems, reporting, and administration tools.",
        BLUE,
    ),
    (
        "Data engineering + analytics",
        "Data pipelines, ETL, SQL/Python workflows, analytics, reporting, data "
        "quality, reconciliation, observability, and cloud data platforms.",
        GREEN,
    ),
    (
        "AI/ML systems + automation",
        "Model integration, evaluation pipelines, output QA, monitoring, "
        "computer vision, human-review workflows, decision support, and "
        "practical automation.",
        GREEN,
    ),
    (
        "APIs + systems integration",
        "Backend services, third-party integrations, webhooks, events and "
        "queues, data exchange, workflow connections, and operational "
        "reliability.",
        TEAL,
    ),
    (
        "Cloud infrastructure + delivery",
        "AWS infrastructure, storage, deployment tooling, environment "
        "configuration, monitoring, production migration, and cloud-based "
        "workflows.",
        BLUE,
    ),
    (
        "Edge + hardware integration",
        "Cameras, sensors, GPU inference, edge compute, networking, device "
        "setup, prototyping, field testing, installation, and production "
        "support.",
        BLUE,
    ),
]

DELIVERY_MODES = [
    (
        "PRIME CONTRACT DELIVERY",
        "Lead a defined government requirement directly, owning delivery from "
        "scope through deployment and support.",
    ),
    (
        "TEAMING + SUBCONTRACT",
        "Own a bounded technical scope on a larger team, or add a flexible "
        "1-3 person pod for task-order or surge support.",
    ),
    (
        "PROTOTYPE TO PRODUCTION",
        "Validate quickly, integrate with real systems, and harden for "
        "operations.",
    ),
]

EXPERIENCE = [
    "CrowdCount: Built and launched a live computer vision product across 25 "
    "pilot locations, including custom models, GPU inference servers, RTSP "
    "pipelines, hardware, dashboards, deployment, and customer operations.",
    "Upstream platform: Built deployed AI infrastructure covering system "
    "health, model workflows, reliability monitoring, event systems, APIs, "
    "integrations, and operational dashboards.",
    "Federal data systems: Team experience supporting CMS-aligned analytics, "
    "reporting, data platforms, and production migration work through RELI "
    "Group.",
    "End-to-end delivery: Experience across requirements, rapid prototyping, "
    "software development, hardware assembly, field installation, monitoring, "
    "debugging, customer coordination, and ongoing support.",
]

COMPANY_INFO = [
    "Legal name: Upstream Vision Inc.",
    "Business type: Small Business",
    "Contract roles: Prime or subcontractor",
    "Location: Boulder, Colorado",
    "Website: upstreamcv.com/gov",
    "Point of contact: Josh D'Annunzio, Co-Founder",
    "Email: josh@upstreamcv.com",
    "Phone: 410-387-8222",
]

NAICS = [
    "541511 Custom Computer Programming",
    "541512 Computer Systems Design",
    "541519 Other Computer Related Services",
    "518210 Computing Infrastructure / Data Processing",
    "541330 Engineering Services",
]

TECHNOLOGIES = (
    "Python • TypeScript • SQL • PySpark • Databricks • AWS • React / Next.js "
    "• APIs • ETL • Docker • CI/CD • edge compute • sensors + devices"
)


def wrap(text, font, size, width):
    lines, cur = [], ""
    for word in text.split():
        trial = f"{cur} {word}".strip()
        if stringWidth(trial, font, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def par(c, x, y, text, font, size, leading, width, color):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def tracked(c, x, y, text, size, color, tracking=1.1, right_edge=None):
    if right_edge is not None:
        total = stringWidth(text, BOLD, size) + tracking * (len(text) - 1)
        x = right_edge - total
    t = c.beginText(x, y)
    t.setFont(BOLD, size)
    t.setFillColor(color)
    t.setCharSpace(tracking)
    t.textOut(text)
    # Char spacing persists in the PDF text state beyond this text object;
    # reset it so subsequent drawString calls render untracked.
    t.setCharSpace(0)
    c.drawText(t)


def build():
    c = canvas.Canvas(OUT, pagesize=letter)
    c.setTitle("Upstream Capability Statement")
    c.setAuthor("Upstream Vision Inc.")
    c.setKeywords(
        "Upstream, UpstreamCV, software engineering, data engineering, AI ML, "
        "cloud, systems integration, edge, hardware integration"
    )

    # Header band
    c.setFillColor(NAVY)
    c.rect(0, H - 112, W, 112, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont(BOLD, 29)
    c.drawString(ML, H - 56, "UPSTREAM")
    tracked(c, ML, H - 78, "SOFTWARE  •  DATA  •  AI/ML  •  CLOUD  •  EDGE + HARDWARE", 8, TEAL, 1.3)
    tracked(c, 0, H - 50, "CAPABILITY STATEMENT", 12.5, white, 1.0, right_edge=W - ML)
    c.setFont(FONT, 8.5)
    c.setFillColor(FAINT)
    c.drawRightString(W - ML, H - 68, "Boulder, Colorado  |  upstreamcv.com/gov")

    # Accent strip
    c.setFillColor(TEAL)
    c.rect(0, H - 117, W * 0.55, 5, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.rect(W * 0.55, H - 117, W * 0.45, 5, fill=1, stroke=0)

    y = H - 146

    # Headline (auto-fit to one line)
    size = 16.0
    while stringWidth(HEADLINE, BOLD, size) > CW and size > 12:
        size -= 0.25
    c.setFont(BOLD, size)
    c.setFillColor(INK)
    c.drawString(ML, y, HEADLINE)
    y -= 17

    y = par(c, ML, y, INTRO, FONT, 8.8, 12, CW, GRAY)
    y -= 2
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.line(ML, y, W - ML, y)
    y -= 17

    # Core capabilities
    tracked(c, ML, y, "CORE CAPABILITIES", 9.5, BLUE, 0.9)
    y -= 17

    col_gap = 22
    col_w = (CW - col_gap) / 2
    text_w = col_w - 14
    for row in range(3):
        pair = CAPABILITIES[row * 2 : row * 2 + 2]
        heights = []
        for _, desc, _ in pair:
            n = len(wrap(desc, FONT, 8.1, text_w))
            heights.append(13 + n * 10.6)
        row_h = max(heights)
        for i, (title, desc, bar) in enumerate(pair):
            x = ML + i * (col_w + col_gap)
            c.setFillColor(bar)
            c.rect(x, y - row_h + 12, 3, row_h - 8, fill=1, stroke=0)
            c.setFont(BOLD, 10)
            c.setFillColor(INK)
            c.drawString(x + 14, y, title)
            par(c, x + 14, y - 12.5, desc, FONT, 8.1, 10.6, text_w, GRAY)
        y -= row_h + 7

    y -= 3

    # How we deliver box
    modes_w = (CW - 24 * 2 - 18 * 2) / 3
    mode_lines = [wrap(d, FONT, 7.9, modes_w) for _, d in DELIVERY_MODES]
    box_h = 40 + max(len(l) for l in mode_lines) * 10
    c.setFillColor(BOX_BLUE)
    c.roundRect(ML, y - box_h, CW, box_h, 6, fill=1, stroke=0)
    by = y - 17
    tracked(c, ML + 24, by, "HOW WE DELIVER", 9.5, TEAL, 0.9)
    by -= 16
    for i, (title, desc) in enumerate(DELIVERY_MODES):
        x = ML + 24 + i * (modes_w + 18)
        c.setFont(BOLD, 8.2)
        c.setFillColor(INK)
        c.drawString(x, by, title)
        par(c, x, by - 11, desc, FONT, 7.9, 10, modes_w, GRAY)
    y -= box_h + 18

    # Experience (left) + company info (right)
    left_w = 302
    box_x = ML + left_w + 18
    box_w = W - ML - box_x

    tracked(c, ML, y, "SELECTED TEAM EXPERIENCE", 9.5, GREEN, 0.9)
    ey = y - 15
    for item in EXPERIENCE:
        c.setFillColor(GRAY)
        c.circle(ML + 3, ey + 2.4, 1.1, fill=1, stroke=0)
        ey = par(c, ML + 11, ey, item, FONT, 7.9, 10.2, left_w - 11, GRAY)
        ey -= 4

    info_lines = []
    for line in COMPANY_INFO:
        info_lines.extend(wrap(line, FONT, 7.9, box_w - 28))
    naics_lines = []
    for line in NAICS:
        naics_lines.extend(wrap(line, FONT, 7.3, box_w - 28))
    info_h = 34 + len(info_lines) * 10 + 14 + len(naics_lines) * 9 + 8
    c.setFillColor(BOX_GREEN)
    c.roundRect(box_x, y - info_h + 12, box_w, info_h, 6, fill=1, stroke=0)
    iy = y - 8
    tracked(c, box_x + 14, iy, "COMPANY INFORMATION", 9, GREEN, 0.7)
    iy -= 15
    c.setFont(FONT, 7.9)
    c.setFillColor(GRAY)
    for line in info_lines:
        c.drawString(box_x + 14, iy, line)
        iy -= 10
    iy -= 3
    c.setFont(BOLD, 7.7)
    c.setFillColor(INK)
    c.drawString(box_x + 14, iy, "NAICS")
    iy -= 10
    c.setFont(FONT, 7.3)
    c.setFillColor(GRAY)
    for line in naics_lines:
        c.drawString(box_x + 14, iy, line)
        iy -= 9

    y = min(ey, iy) - 8

    # Representative technologies
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.line(ML, y, W - ML, y)
    y -= 15
    tracked(c, ML, y, "REPRESENTATIVE TECHNOLOGIES", 9.5, BLUE, 0.9)
    y -= 13
    tech_size = 8.3
    while stringWidth(TECHNOLOGIES, FONT, tech_size) > CW and tech_size > 6.5:
        tech_size -= 0.1
    c.setFont(FONT, tech_size)
    c.setFillColor(GRAY)
    c.drawCentredString(W / 2, y, TECHNOLOGIES)
    if y < 72:
        raise SystemExit(f"Layout overflow: content bottom at y={y:.0f} collides with footer")

    # Footer band
    c.setFillColor(NAVY)
    c.rect(0, 0, W, 62, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont(BOLD, 12)
    c.drawString(ML, 35, "TECHNICAL DELIVERY AS PRIME OR TEAMING PARTNER")
    c.setFont(FONT, 8.3)
    c.setFillColor(FAINT)
    c.drawString(ML, 19, "Josh D'Annunzio, Co-Founder  |  josh@upstreamcv.com  |  410-387-8222")
    tracked(c, 0, 26, "UPSTREAMCV.COM/GOV", 9.5, TEAL, 1.0, right_edge=W - ML)

    c.save()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
