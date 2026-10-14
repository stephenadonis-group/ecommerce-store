#!/usr/bin/env python3
import os
import sys
import requests

file_name = sys.argv[1]

SCAN_TYPES = {
    "gitleaks.json": "Gitleaks Scan",
    "njsscan.sarif": "SARIF",
    "semgrep.json": "Semgrep JSON Report",
    "retire.json": "Retire.js Scan",
    "trivy-backend.json": "Trivy Scan",
    "trivy-frontend.json": "Trivy Scan",
    "trivy.json": "Trivy Scan",
}

scan_type = SCAN_TYPES.get(file_name)
if not scan_type:
    print(f"Unknown report file: {file_name}")
    sys.exit(1)

if not os.path.isfile(file_name):
    print(f"Report not found, skipping: {file_name}")
    sys.exit(0)

token = os.environ["DEFECTDOJO_API_TOKEN"]
url = os.environ.get(
    "DEFECTDOJO_URL", "https://demo.defectdojo.org/api/v2/import-scan/"
)
engagement = os.environ["DEFECTDOJO_ENGAGEMENT_ID"]

headers = {"Authorization": f"Token {token}"}
data = {
    "scan_type": scan_type,
    "active": True,
    "verified": True,
    "minimum_severity": "Low",
    "engagement": engagement,
}

with open(file_name, "rb") as f:
    response = requests.post(
        url, headers=headers, data=data, files={"file": f}, timeout=120
    )

if response.status_code == 201:
    print(f"Imported {file_name} as {scan_type}")
else:
    print(f"Failed to import {file_name}: {response.status_code} {response.content}")
    sys.exit(1)