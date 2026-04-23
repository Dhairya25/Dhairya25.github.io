// Virtual filesystem for IDE mode
// Each file has an ID, path, language (for Shiki), and raw content string.

export interface VirtualFile {
  id: string;
  name: string;
  path: string;
  language: string; // Shiki language ID
  content: string;
  isMarkdown?: boolean;
}

export interface VirtualFolder {
  name: string;
  path: string;
  children: (VirtualFile | VirtualFolder)[];
  expanded?: boolean;
}

export type TreeNode = VirtualFile | VirtualFolder;

export function isFolder(node: TreeNode): node is VirtualFolder {
  return "children" in node;
}

export function isFile(node: TreeNode): node is VirtualFile {
  return "content" in node;
}

// ─── FILE CONTENT ───────────────────────────────────────────────

const README = `# dhairya.portfolio

Senior at Wilfrid Laurier University.
Dual degree: Honors BSc Computer Science + Honors BBA.
Co-founder of Rivo Careers.

## Quick navigation

- \`about/\` - Bio and current status
- \`work/\` - Professional experience with code samples
- \`writing/\` - Essays and notes (in progress)
- \`projects/\` - Side projects and coursework
- \`stack.json\` - Current tools and technologies

Open a file from the explorer, or press Cmd+K to search.
`;

const BIO_MD = `# Dhairya Patel

I build software and model businesses. Usually for the same project.

I'm a senior at Wilfrid Laurier studying Computer Science and Business
Administration, and I co-founded Rivo Careers in late 2025, where I ship
the engineering and own the financial model.

Before that, I analyzed 200+ daily securities transactions at Co-operators
Insurance and automated clinical deployments at a regional health network.

## Education

**Wilfrid Laurier University** (Sept 2022 - April 2027)
- Honors Bachelor of Science in Computer Science (BSc)
- Honors Bachelor of Business Administration (BBA)

## Certifications

- Google Digital Marketing and E-Commerce Professional
- Meta Back-End Developer Professional Certificate

## Contact

- Email: d.patel25@icloud.com
- GitHub: github.com/Dhairya25
- LinkedIn: linkedin.com/in/dhairya-patel-b900b7267
- Phone: +1 (647) 564 1602
`;

const NOW_MD = `# Now

**Building** Rivo Careers. Season-ending Lazaridis case prep.

**Reading** Designing Data-Intensive Applications (Kleppmann).

**Listening** Recommendations welcome.

**Looking for** Fall 2026 co-op roles in software engineering
or investment analysis.
`;

const RIVO_README = `# Rivo Careers

**Role:** Co-Founder
**Period:** November 2025 - Present
**Stack:** Next.js, TypeScript, Tailwind, Supabase, Python, FastAPI, WebRTC

Career-tech platform for Canadian students and new grads.
Six product domains: AI mock interviews, ML job matching,
automated job aggregation, resume tools, application tracking,
and career resources.

## Architecture

64 API routes across 6 domains. See \`architecture.ts\` for
the route and domain structure.

## Key systems

- **ML Job Matcher** (\`ml-matcher.py\`): Two-phase matching engine
  combining NLP resume scoring with behavioral signals.
- **AI Interview System**: Lip-synced humanoid avatar with live
  speech transcription and automated evaluation.
- **Job Aggregation Pipeline**: Daily sourcing, deduplication,
  and validation of thousands of Canadian internship listings.
`;

const ARCHITECTURE_TS = `// Rivo Careers - API Architecture
// 64 routes across 6 core product domains

export const DOMAINS = {
  auth: {
    prefix: "/api/auth",
    routes: [
      "POST /login",
      "POST /register",
      "POST /logout",
      "POST /refresh",
      "GET  /session",
      "POST /forgot-password",
      "POST /reset-password",
    ],
  },
  jobs: {
    prefix: "/api/jobs",
    routes: [
      "GET    /listings",
      "GET    /listings/:id",
      "GET    /listings/search",
      "GET    /listings/recommended",
      "POST   /listings/aggregate",
      "POST   /listings/validate",
      "DELETE /listings/expired",
      "GET    /categories",
      "GET    /companies",
      "GET    /locations",
    ],
  },
  matching: {
    prefix: "/api/matching",
    routes: [
      "POST /score",
      "POST /batch-score",
      "GET  /results/:userId",
      "PUT  /strictness",
      "GET  /behavioral-signals/:userId",
      "POST /feedback",
    ],
  },
  interviews: {
    prefix: "/api/interviews",
    routes: [
      "POST /sessions",
      "GET  /sessions/:id",
      "POST /sessions/:id/start",
      "POST /sessions/:id/respond",
      "POST /sessions/:id/evaluate",
      "GET  /sessions/:id/transcript",
      "GET  /sessions/:id/feedback",
      "GET  /questions/:category",
      "POST /avatar/sync",
    ],
  },
  profiles: {
    prefix: "/api/profiles",
    routes: [
      "GET    /me",
      "PUT    /me",
      "POST   /me/resume",
      "GET    /me/resume/parsed",
      "GET    /me/applications",
      "POST   /me/applications",
      "PUT    /me/applications/:id",
      "DELETE /me/applications/:id",
      "GET    /me/saved-jobs",
      "POST   /me/saved-jobs",
      "DELETE /me/saved-jobs/:id",
    ],
  },
  admin: {
    prefix: "/api/admin",
    routes: [
      "GET  /metrics",
      "GET  /users",
      "GET  /pipeline/status",
      "POST /pipeline/run",
      "GET  /pipeline/logs",
      "PUT  /features/:flag",
    ],
  },
} as const;

export type Domain = keyof typeof DOMAINS;

export interface RouteConfig {
  domain: Domain;
  method: string;
  path: string;
  auth: boolean;
  rateLimit: number; // requests per minute
}

// Total: 64 routes
const totalRoutes = Object.values(DOMAINS)
  .reduce((sum, d) => sum + d.routes.length, 0);

console.log(\`API surface: \${totalRoutes} routes across \${Object.keys(DOMAINS).length} domains\`);
`;

const ML_MATCHER_PY = `"""
Two-phase ML Job Matching Engine
Phase 1: NLP-based resume scoring (TF-IDF + cosine similarity)
Phase 2: Behavioral signal blending from user activity
"""

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from dataclasses import dataclass, field

@dataclass
class JobListing:
    id: str
    title: str
    description: str
    requirements: list[str]
    embedding: np.ndarray | None = field(default=None, repr=False)

@dataclass
class CandidateProfile:
    resume_text: str
    viewed_jobs: list[str] = field(default_factory=list)
    saved_jobs: list[str] = field(default_factory=list)
    applied_jobs: list[str] = field(default_factory=list)
    dismissed_jobs: list[str] = field(default_factory=list)


class JobMatcher:
    """
    Configurable two-phase matcher.
    strictness=1.0 -> pure NLP (ignore behavior)
    strictness=0.0 -> pure behavioral (ignore resume)
    """

    def __init__(self, strictness: float = 0.5):
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words="english",
            ngram_range=(1, 2),
        )
        self.strictness = np.clip(strictness, 0.0, 1.0)
        self._fitted = False

    def fit(self, listings: list[JobListing]) -> None:
        corpus = [self._to_text(l) for l in listings]
        tfidf_matrix = self.vectorizer.fit_transform(corpus)
        for i, listing in enumerate(listings):
            listing.embedding = tfidf_matrix[i].toarray().flatten()
        self._fitted = True

    def score(
        self,
        candidate: CandidateProfile,
        listings: list[JobListing],
        top_k: int = 10,
    ) -> list[tuple[str, float]]:
        if not self._fitted:
            raise RuntimeError("Call fit() before scoring")

        resume_vec = self.vectorizer.transform(
            [candidate.resume_text]
        ).toarray().flatten()

        nlp_scores = {}
        for listing in listings:
            sim = cosine_similarity(
                resume_vec.reshape(1, -1),
                listing.embedding.reshape(1, -1),
            )[0][0]
            nlp_scores[listing.id] = float(sim)

        behavioral = self._behavioral_scores(candidate, listings)

        blended = {}
        for lid in nlp_scores:
            a = self.strictness
            blended[lid] = a * nlp_scores[lid] + (1 - a) * behavioral.get(lid, 0.0)

        ranked = sorted(blended.items(), key=lambda x: x[1], reverse=True)
        return ranked[:top_k]

    def _behavioral_scores(
        self,
        candidate: CandidateProfile,
        listings: list[JobListing],
    ) -> dict[str, float]:
        scores = {}
        for listing in listings:
            signal = 0.0
            if listing.id in candidate.viewed_jobs:
                signal += 0.1
            if listing.id in candidate.saved_jobs:
                signal += 0.3
            if listing.id in candidate.applied_jobs:
                signal += 0.5
            if listing.id in candidate.dismissed_jobs:
                signal -= 0.4
            scores[listing.id] = float(np.clip(signal, 0.0, 1.0))
        return scores

    @staticmethod
    def _to_text(listing: JobListing) -> str:
        return f"{listing.title} {listing.description} {' '.join(listing.requirements)}"
`;

const RECONCILIATION_VBA = `' Investment Reconciliation Model
' Co-operators Insurance - Investment Operations Desk
' Automates portfolio reconciliation and reporting
' Adopted as desk standard operating procedure (SOP)

Option Explicit

Public Sub RunDailyReconciliation()
    Dim wsSource As Worksheet
    Dim wsRecon As Worksheet
    Dim lastRow As Long
    Dim matchCount As Long
    Dim discrepancies As Long

    Set wsSource = ThisWorkbook.Sheets("Transactions")
    Set wsRecon = ThisWorkbook.Sheets("Reconciliation")

    lastRow = wsSource.Cells(wsSource.Rows.Count, "A").End(xlUp).Row
    matchCount = 0
    discrepancies = 0

    wsRecon.Range("A2:H" & wsRecon.Rows.Count).ClearContents

    Dim i As Long
    For i = 2 To lastRow
        Dim fundCode As String
        Dim tradeDate As Date
        Dim units As Double
        Dim navPrice As Double

        fundCode = wsSource.Cells(i, 1).Value
        tradeDate = wsSource.Cells(i, 2).Value
        units = wsSource.Cells(i, 3).Value
        navPrice = wsSource.Cells(i, 4).Value

        Dim expectedValue As Double
        expectedValue = units * navPrice

        Dim actualValue As Double
        actualValue = GetSettlementValue(fundCode, tradeDate)

        Dim variance As Double
        variance = Abs(expectedValue - actualValue)

        Dim status As String
        If variance < 0.01 Then
            status = "MATCHED"
            matchCount = matchCount + 1
        Else
            status = "DISCREPANCY"
            discrepancies = discrepancies + 1
        End If

        With wsRecon
            .Cells(i, 1).Value = fundCode
            .Cells(i, 2).Value = tradeDate
            .Cells(i, 3).Value = units
            .Cells(i, 4).Value = navPrice
            .Cells(i, 5).Value = expectedValue
            .Cells(i, 6).Value = actualValue
            .Cells(i, 7).Value = variance
            .Cells(i, 8).Value = status
        End With
    Next i

    wsRecon.Cells(1, 10).Value = "RECONCILIATION SUMMARY"
    wsRecon.Cells(2, 10).Value = "Total: " & (lastRow - 1)
    wsRecon.Cells(3, 10).Value = "Matched: " & matchCount
    wsRecon.Cells(4, 10).Value = "Discrepancies: " & discrepancies
    wsRecon.Cells(5, 10).Value = "Rate: " & Format(matchCount / (lastRow - 1), "0.0%")
    wsRecon.Cells(6, 10).Value = "Run: " & Format(Now, "yyyy-mm-dd hh:mm")
End Sub

Private Function GetSettlementValue(code As String, dt As Date) As Double
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Settlement")
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row

    Dim i As Long
    For i = 2 To lastRow
        If ws.Cells(i, 1).Value = code And ws.Cells(i, 2).Value = dt Then
            GetSettlementValue = ws.Cells(i, 3).Value
            Exit Function
        End If
    Next i
    GetSettlementValue = 0
End Function
`;

const BIOEXCEL_README = `# Bio-Excel Pharma

**Role:** Software Developer Intern
**Period:** March 2025 - November 2025
**Stack:** Python, SQL, REST APIs

Refactored the SQL schema and indexing strategy powering the CRM.
Built Python ETL pipelines to sync CRM with sales.
Integrated REST APIs across the sales and inventory stack.

See \`etl-pipeline.py\` for the data sync implementation.
`;

const ETL_PIPELINE_PY = `"""
CRM-to-Sales ETL Pipeline
Bio-Excel Pharma

Automates data synchronization between the CRM and sales system.
Eliminates redundant manual entry, enforces record integrity.
"""

import logging
from datetime import datetime
from dataclasses import dataclass

import psycopg2
from psycopg2.extras import execute_batch

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class SyncRecord:
    source_id: str
    table: str
    operation: str  # INSERT, UPDATE, DELETE
    payload: dict
    synced_at: datetime | None = None


class ETLPipeline:
    def __init__(self, crm_dsn: str, sales_dsn: str):
        self.crm_conn = psycopg2.connect(crm_dsn)
        self.sales_conn = psycopg2.connect(sales_dsn)
        self.batch_size = 500

    def run(self) -> dict:
        logger.info("Starting ETL sync")
        stats = {"inserted": 0, "updated": 0, "skipped": 0, "errors": 0}

        try:
            changes = self._extract_changes()
            transformed = self._transform(changes)
            stats = self._load(transformed)
            self._mark_synced(changes)
            self.crm_conn.commit()
            self.sales_conn.commit()
        except Exception as e:
            logger.error(f"Pipeline failed: {e}")
            self.crm_conn.rollback()
            self.sales_conn.rollback()
            raise
        finally:
            logger.info(f"Sync complete: {stats}")

        return stats

    def _extract_changes(self) -> list[SyncRecord]:
        cursor = self.crm_conn.cursor()
        cursor.execute(\"\"\"
            SELECT id, table_name, operation, payload
            FROM sync_queue
            WHERE synced_at IS NULL
            ORDER BY created_at ASC
            LIMIT %s
        \"\"\", (self.batch_size,))

        records = []
        for row in cursor.fetchall():
            records.append(SyncRecord(
                source_id=row[0],
                table=row[1],
                operation=row[2],
                payload=row[3],
            ))
        return records

    def _transform(self, records: list[SyncRecord]) -> list[SyncRecord]:
        transformed = []
        for record in records:
            payload = record.payload.copy()
            # Normalize phone numbers
            if "phone" in payload:
                payload["phone"] = self._normalize_phone(payload["phone"])
            # Validate required fields
            if record.table == "contacts" and not payload.get("email"):
                logger.warning(f"Skipping {record.source_id}: missing email")
                continue
            record.payload = payload
            transformed.append(record)
        return transformed

    def _load(self, records: list[SyncRecord]) -> dict:
        stats = {"inserted": 0, "updated": 0, "skipped": 0, "errors": 0}
        cursor = self.sales_conn.cursor()

        for record in records:
            try:
                if record.operation == "INSERT":
                    self._insert(cursor, record)
                    stats["inserted"] += 1
                elif record.operation == "UPDATE":
                    self._update(cursor, record)
                    stats["updated"] += 1
            except Exception as e:
                logger.error(f"Failed {record.source_id}: {e}")
                stats["errors"] += 1

        return stats

    @staticmethod
    def _normalize_phone(phone: str) -> str:
        digits = "".join(c for c in phone if c.isdigit())
        if len(digits) == 10:
            return f"+1{digits}"
        return f"+{digits}"
`;

const STRATOS_README = `# Stratos Solutions

**Role:** Financial Tax Advisory Intern
**Period:** May 2024 - August 2024
**Tools:** SAP, Excel

Reverse audits across Ontario, Quebec, and British Columbia.
Recovering GST/HST/QST/PST overpayments for corporate clients.
Prepared interim and final audit reports with senior advisors.
`;

const WRHN_README = `# Waterloo Regional Health Network

**Role:** Network Engineer Co-op
**Period:** September 2025 - December 2025
**Tools:** PowerShell, Bash, Active Directory, Remote Desktop

Automated system deployment and imaging for 100+ clinical endpoints.
Reduced ticket resolution time by 30% through standardized workflows.

See \`image-endpoint.ps1\` for the imaging automation script.
`;

const IMAGE_ENDPOINT_PS1 = `# Endpoint Imaging Automation Script
# Waterloo Regional Health Network
# Automates OS deployment and configuration for clinical endpoints

param(
    [Parameter(Mandatory=$true)]
    [string]$EndpointName,

    [Parameter(Mandatory=$false)]
    [string]$ImagePath = "\\\\deploy-server\\images\\win11-clinical.wim",

    [Parameter(Mandatory=$false)]
    [string]$OUPath = "OU=Clinical,OU=Endpoints,DC=wrhn,DC=local"
)

$ErrorActionPreference = "Stop"
$LogFile = "C:\\Logs\\Imaging\\$EndpointName-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $entry = "[$timestamp] [$Level] $Message"
    Add-Content -Path $LogFile -Value $entry
    Write-Host $entry
}

function Test-Endpoint {
    param([string]$Name)
    $ping = Test-Connection -ComputerName $Name -Count 2 -Quiet
    if (-not $ping) {
        Write-Log "Endpoint $Name is unreachable" "ERROR"
        throw "Cannot reach $Name"
    }
    Write-Log "Endpoint $Name is online"
}

function Join-Domain {
    param([string]$Name, [string]$OU)
    Write-Log "Joining $Name to domain at $OU"
    $cred = Get-Credential -Message "Domain admin credentials"
    Add-Computer -ComputerName $Name -DomainName "wrhn.local" \\
        -OUPath $OU -Credential $cred -Restart -Force
    Write-Log "Domain join initiated for $Name"
}

function Install-ClinicalSoftware {
    param([string]$Name)
    $packages = @(
        "\\\\deploy-server\\packages\\epic-client.msi",
        "\\\\deploy-server\\packages\\citrix-workspace.msi",
        "\\\\deploy-server\\packages\\cisco-anyconnect.msi"
    )

    foreach ($pkg in $packages) {
        $pkgName = Split-Path $pkg -Leaf
        Write-Log "Installing $pkgName on $Name"
        Invoke-Command -ComputerName $Name -ScriptBlock {
            param($path)
            Start-Process msiexec.exe -ArgumentList "/i \`"$path\`" /qn" -Wait
        } -ArgumentList $pkg
        Write-Log "$pkgName installed successfully"
    }
}

# Main execution
try {
    New-Item -ItemType Directory -Path (Split-Path $LogFile) -Force | Out-Null
    Write-Log "Starting imaging process for $EndpointName"
    Write-Log "Image: $ImagePath"
    Write-Log "Target OU: $OUPath"

    Test-Endpoint -Name $EndpointName
    Join-Domain -Name $EndpointName -OU $OUPath
    Install-ClinicalSoftware -Name $EndpointName

    Write-Log "Imaging complete for $EndpointName" "SUCCESS"
}
catch {
    Write-Log "Imaging failed: $_" "ERROR"
    exit 1
}
`;

const REVERSE_AUDITS_MD = `# What a tax reverse-audit teaches you about dirty data.

*Coming Summer 2026.*
`;

const ML_MATCHER_WEEKEND_MD = `# Rebuilding our ML job-matcher in a weekend (and why the simpler one won).

*Coming Summer 2026.*
`;

const PORTFOLIO_OPTIMIZER_PY = `"""
Financial Portfolio Optimization
ML-based allocation that improved Sharpe ratio by 12%
over equal-weight baseline using Yahoo Finance real-time data.
"""

import numpy as np
import pandas as pd
import yfinance as yf
from scipy.optimize import minimize


def fetch_returns(tickers: list[str], period: str = "2y") -> pd.DataFrame:
    data = yf.download(tickers, period=period, auto_adjust=True)
    prices = data["Close"]
    returns = prices.pct_change().dropna()
    return returns


def portfolio_stats(weights, returns):
    portfolio_return = np.sum(returns.mean() * weights) * 252
    portfolio_vol = np.sqrt(
        np.dot(weights.T, np.dot(returns.cov() * 252, weights))
    )
    sharpe = portfolio_return / portfolio_vol
    return portfolio_return, portfolio_vol, sharpe


def optimize_sharpe(returns: pd.DataFrame, risk_free: float = 0.04):
    n = returns.shape[1]
    constraints = {"type": "eq", "fun": lambda w: np.sum(w) - 1}
    bounds = tuple((0, 0.4) for _ in range(n))
    init = np.array([1 / n] * n)

    def neg_sharpe(weights):
        ret, vol, _ = portfolio_stats(weights, returns)
        return -(ret - risk_free) / vol

    result = minimize(
        neg_sharpe,
        init,
        method="SLSQP",
        bounds=bounds,
        constraints=constraints,
    )

    if not result.success:
        raise ValueError(f"Optimization failed: {result.message}")

    opt_ret, opt_vol, opt_sharpe = portfolio_stats(result.x, returns)
    return {
        "weights": dict(zip(returns.columns, result.x.round(4))),
        "expected_return": round(opt_ret, 4),
        "volatility": round(opt_vol, 4),
        "sharpe_ratio": round(opt_sharpe, 4),
    }


if __name__ == "__main__":
    tickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "JPM", "V", "JNJ", "PG"]
    returns = fetch_returns(tickers)

    # Equal-weight baseline
    eq_weights = np.array([1 / len(tickers)] * len(tickers))
    _, _, baseline_sharpe = portfolio_stats(eq_weights, returns)

    # Optimized
    result = optimize_sharpe(returns)

    print(f"Baseline Sharpe:  {baseline_sharpe:.4f}")
    print(f"Optimized Sharpe: {result['sharpe_ratio']}")
    print(f"Improvement:      {((result['sharpe_ratio'] / baseline_sharpe) - 1) * 100:.1f}%")
    print(f"Weights: {result['weights']}")
`;

const PAWD_TSX = `// PAW'd - Pet Health Management App
// React component for vaccination schedule tracking

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Vaccination {
  id: string;
  pet_id: string;
  vaccine_name: string;
  date_administered: string;
  next_due: string;
  veterinarian: string;
  notes?: string;
}

interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat" | "other";
  breed: string;
  date_of_birth: string;
}

export function VaccinationSchedule({ petId }: { petId: string }) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [records, setRecords] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [petRes, vacRes] = await Promise.all([
        supabase.from("pets").select("*").eq("id", petId).single(),
        supabase
          .from("vaccinations")
          .select("*")
          .eq("pet_id", petId)
          .order("next_due", { ascending: true }),
      ]);

      if (petRes.data) setPet(petRes.data);
      if (vacRes.data) setRecords(vacRes.data);
      setLoading(false);
    }
    load();
  }, [petId]);

  if (loading) return <div className="animate-pulse">Loading...</div>;
  if (!pet) return <div>Pet not found</div>;

  const overdue = records.filter(
    (r) => new Date(r.next_due) < new Date()
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold">{pet.name}</h2>
      <p className="text-sm text-gray-500">
        {pet.breed} | Born {pet.date_of_birth}
      </p>

      {overdue.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800 text-sm font-medium">
            {overdue.length} vaccination(s) overdue
          </p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {records.map((record) => {
          const isDue = new Date(record.next_due) < new Date();
          return (
            <div
              key={record.id}
              className={\`p-4 border rounded \${isDue ? "border-red-300 bg-red-50" : "border-gray-200"}\`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{record.vaccine_name}</p>
                  <p className="text-sm text-gray-500">
                    Dr. {record.veterinarian}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p>Given: {record.date_administered}</p>
                  <p className={isDue ? "text-red-600 font-medium" : ""}>
                    Next: {record.next_due}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`;

const EXCEL_GRADER_VBA = `' Excel Grading Application
' Desktop grading tool with database integration
' VBA + XML + Microsoft SQL Server

Option Explicit

Private Const DB_CONN As String = _
    "Provider=SQLOLEDB;Data Source=localhost;" & _
    "Initial Catalog=GradingDB;Integrated Security=SSPI;"

Public Sub ProcessGrades()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Grades")

    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row

    If lastRow < 2 Then
        MsgBox "No grade data found.", vbExclamation
        Exit Sub
    End If

    ' Validate input
    If Not ValidateInput(ws, lastRow) Then Exit Sub

    ' Calculate statistics
    Dim stats As GradeStats
    stats = CalculateStats(ws, lastRow)

    ' Generate chart
    CreateGradeChart ws, lastRow

    ' Export to database
    ExportToSQL ws, lastRow

    ' Generate Word report
    GenerateReport stats

    MsgBox "Processing complete." & vbCrLf & _
           "Average: " & Format(stats.Average, "0.0") & vbCrLf & _
           "Median: " & Format(stats.Median, "0.0") & vbCrLf & _
           "Std Dev: " & Format(stats.StdDev, "0.0"), vbInformation
End Sub

Private Type GradeStats
    Average As Double
    Median As Double
    StdDev As Double
    Min As Double
    Max As Double
    Count As Long
    PassRate As Double
End Type

Private Function CalculateStats(ws As Worksheet, lastRow As Long) As GradeStats
    Dim rng As Range
    Set rng = ws.Range("C2:C" & lastRow) ' Grade column

    Dim stats As GradeStats
    With stats
        .Average = Application.Average(rng)
        .Median = Application.Median(rng)
        .StdDev = Application.StDev(rng)
        .Min = Application.Min(rng)
        .Max = Application.Max(rng)
        .Count = Application.Count(rng)
        .PassRate = Application.CountIf(rng, ">=50") / .Count
    End With

    CalculateStats = stats
End Function

Private Function ValidateInput(ws As Worksheet, lastRow As Long) As Boolean
    Dim i As Long
    For i = 2 To lastRow
        If IsEmpty(ws.Cells(i, 1)) Or IsEmpty(ws.Cells(i, 2)) Then
            MsgBox "Missing data at row " & i, vbExclamation
            ValidateInput = False
            Exit Function
        End If
        If Not IsNumeric(ws.Cells(i, 3).Value) Then
            MsgBox "Invalid grade at row " & i, vbExclamation
            ValidateInput = False
            Exit Function
        End If
    Next i
    ValidateInput = True
End Function
`;

const STACK_JSON = `{
  "editor": "VS Code + Claude Code",
  "terminal": "zsh + starship",
  "languages": {
    "primary": ["Python", "TypeScript", "JavaScript", "SQL"],
    "proficient": ["Java", "C", "C++", "C#", "VBA", "Bash", "PowerShell"],
    "familiar": ["Go", "R", "Assembly"]
  },
  "frameworks": {
    "web": ["Next.js", "React", "Node.js", "Express", "Tailwind"],
    "api": ["FastAPI", "Flask", "REST"],
    "ml": ["Scikit-learn", "TensorFlow", "PyTorch", "Apache Spark"]
  },
  "infrastructure": {
    "databases": ["Supabase", "PostgreSQL", "SQL Server", "BigQuery"],
    "cloud": ["Vercel", "Azure", "GCP", "Google Cloud Run"],
    "tools": ["Git", "CI/CD", "Docker"]
  },
  "specializations": {
    "ai_ml": [
      "RAG", "Prompt Engineering", "LLM Integration",
      "NLP", "Semantic Embeddings", "Vector Search",
      "Speech-to-Text", "Text-to-Speech",
      "Computer Vision", "Real-Time Inference"
    ],
    "finance": [
      "Financial Modeling", "Portfolio Analysis",
      "Securities Trading", "KYC/AML",
      "IIROC Compliance", "Reverse Audits"
    ]
  }
}`;

const COOP_README = `# Co-operators Insurance

**Role:** Investment Analyst Co-op
**Period:** January 2025 - May 2025
**Tools:** Dataphile, OnBase, Fundserv, Excel, VBA

Analyzed 200+ daily mutual fund and securities transactions.
Weekly compliance reviews against IIROC and KYC standards.
Designed a VBA reconciliation model adopted as desk SOP,
cutting turnaround time by 50%.

See \`reconciliation.vba\` for the automation model.
`;

// ─── FILE TREE ──────────────────────────────────────────────────

export const fileTree: VirtualFolder = {
  name: "DHAIRYA.PORTFOLIO",
  path: "",
  expanded: true,
  children: [
    {
      name: "about",
      path: "about",
      expanded: false,
      children: [
        { id: "bio", name: "bio.md", path: "about/bio.md", language: "markdown", content: BIO_MD, isMarkdown: true },
        { id: "now", name: "now.md", path: "about/now.md", language: "markdown", content: NOW_MD, isMarkdown: true },
      ],
    },
    {
      name: "work",
      path: "work",
      expanded: false,
      children: [
        {
          name: "rivo-careers",
          path: "work/rivo-careers",
          expanded: false,
          children: [
            { id: "rivo-readme", name: "README.md", path: "work/rivo-careers/README.md", language: "markdown", content: RIVO_README, isMarkdown: true },
            { id: "rivo-arch", name: "architecture.ts", path: "work/rivo-careers/architecture.ts", language: "typescript", content: ARCHITECTURE_TS },
            { id: "rivo-ml", name: "ml-matcher.py", path: "work/rivo-careers/ml-matcher.py", language: "python", content: ML_MATCHER_PY },
          ],
        },
        {
          name: "co-operators",
          path: "work/co-operators",
          expanded: false,
          children: [
            { id: "coop-readme", name: "README.md", path: "work/co-operators/README.md", language: "markdown", content: COOP_README, isMarkdown: true },
            { id: "coop-vba", name: "reconciliation.vba", path: "work/co-operators/reconciliation.vba", language: "vb", content: RECONCILIATION_VBA },
          ],
        },
        {
          name: "bio-excel",
          path: "work/bio-excel",
          expanded: false,
          children: [
            { id: "bxcl-readme", name: "README.md", path: "work/bio-excel/README.md", language: "markdown", content: BIOEXCEL_README, isMarkdown: true },
            { id: "bxcl-etl", name: "etl-pipeline.py", path: "work/bio-excel/etl-pipeline.py", language: "python", content: ETL_PIPELINE_PY },
          ],
        },
        {
          name: "stratos",
          path: "work/stratos",
          expanded: false,
          children: [
            { id: "stratos-readme", name: "README.md", path: "work/stratos/README.md", language: "markdown", content: STRATOS_README, isMarkdown: true },
          ],
        },
        {
          name: "wrhn",
          path: "work/wrhn",
          expanded: false,
          children: [
            { id: "wrhn-readme", name: "README.md", path: "work/wrhn/README.md", language: "markdown", content: WRHN_README, isMarkdown: true },
            { id: "wrhn-ps1", name: "image-endpoint.ps1", path: "work/wrhn/image-endpoint.ps1", language: "powershell", content: IMAGE_ENDPOINT_PS1 },
          ],
        },
      ],
    },
    {
      name: "writing",
      path: "writing",
      expanded: false,
      children: [
        { id: "write-audits", name: "reverse-audits.md", path: "writing/reverse-audits.md", language: "markdown", content: REVERSE_AUDITS_MD, isMarkdown: true },
        { id: "write-ml", name: "ml-matcher-weekend.md", path: "writing/ml-matcher-weekend.md", language: "markdown", content: ML_MATCHER_WEEKEND_MD, isMarkdown: true },
      ],
    },
    {
      name: "projects",
      path: "projects",
      expanded: false,
      children: [
        { id: "proj-optimizer", name: "portfolio-optimizer.py", path: "projects/portfolio-optimizer.py", language: "python", content: PORTFOLIO_OPTIMIZER_PY },
        { id: "proj-pawd", name: "pawd.tsx", path: "projects/pawd.tsx", language: "tsx", content: PAWD_TSX },
        { id: "proj-grader", name: "excel-grader.vba", path: "projects/excel-grader.vba", language: "vb", content: EXCEL_GRADER_VBA },
      ],
    },
    { id: "stack-json", name: "stack.json", path: "stack.json", language: "json", content: STACK_JSON },
    { id: "root-readme", name: "README.md", path: "README.md", language: "markdown", content: README, isMarkdown: true },
  ],
};

// Flatten the tree into a map for quick lookup by ID
export function getAllFiles(node: TreeNode = fileTree): VirtualFile[] {
  if (isFile(node)) return [node];
  return node.children.flatMap(getAllFiles);
}

export function getFileById(id: string): VirtualFile | undefined {
  return getAllFiles().find((f) => f.id === id);
}

export function getFileExtension(id: string): string {
  const file = getFileById(id);
  if (!file) return "";
  const parts = file.name.split(".");
  return parts[parts.length - 1];
}
