import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Globe, Key, Send, Database, FileJson, Shield } from 'lucide-react';

const endpoints = [
  { method:'GET', path:'/api/v1/checks', desc:'List all detection and remediation checks', params:'provider, service, severity, page, limit' },
  { method:'GET', path:'/api/v1/checks/{check_id}', desc:'Get a specific check by ID', params:'check_id (path)' },
  { method:'GET', path:'/api/v1/compliance', desc:'List all compliance frameworks', params:'provider, page, limit' },
  { method:'GET', path:'/api/v1/compliance/{compliance_id}', desc:'Get a specific compliance framework by ID', params:'compliance_id (path)' },
  { method:'GET', path:'/api/v1/compliance/{compliance_id}/requirements', desc:'List requirements for a compliance framework', params:'compliance_id (path), page, limit' },
  { method:'GET', path:'/api/v1/providers', desc:'List all supported cloud providers', params:'none' },
  { method:'GET', path:'/api/v1/services', desc:'List all services for a provider', params:'provider' },
  { method:'GET', path:'/api/v1/search', desc:'Search across checks and compliance frameworks', params:'q, type, provider' },
  { method:'GET', path:'/api/v1/stats', desc:'Get hub statistics (total artifacts, counts)', params:'none' },
];

const methodColors = { GET:'bg-emerald-50 text-emerald-700 border-emerald-200', POST:'bg-blue-50 text-blue-700 border-blue-200', PUT:'bg-amber-50 text-amber-700 border-amber-200', DELETE:'bg-red-50 text-red-700 border-red-200' };

const ApiDocsPage = () => (
  <div className="min-h-screen">
    <div className="max-w-[1000px] mx-auto px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /> Back to Hub</Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold font-display text-foreground mb-3">Heloix Hub API</h1>
        <p className="text-muted-foreground">RESTful API to programmatically access all Heloix detection checks, remediation guides, and compliance frameworks.</p>
      </div>

      {/* Base URL */}
      <div className="rounded-xl p-5 bg-card border border-border mb-6">
        <h3 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2"><Globe size={14} /> Base URL</h3>
        <div className="code-block"><code className="text-sm">https://hub.heloix.devmonk.tech/api/v1</code></div>
      </div>

      {/* Authentication */}
      <div className="rounded-xl p-5 bg-card border border-border mb-6">
        <h3 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2"><Key size={14} /> Authentication</h3>
        <p className="text-sm text-muted-foreground mb-3">The Hub API is publicly accessible for read-only operations. No authentication is required for listing and retrieving artifacts.</p>
        <p className="text-sm text-muted-foreground">For write operations and higher rate limits, include an API key in the <code className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-xs">Authorization</code> header.</p>
        <div className="code-block mt-3"><code className="text-xs">Authorization: Bearer hlx_your_api_key_here</code></div>
      </div>

      {/* Rate Limits */}
      <div className="rounded-xl p-5 bg-card border border-border mb-8">
        <h3 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2"><Shield size={14} /> Rate Limits</h3>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="p-3 rounded-lg bg-background border border-border"><div className="text-xs text-muted-foreground">Unauthenticated</div><div className="text-lg font-bold text-foreground">100 req/min</div></div>
          <div className="p-3 rounded-lg bg-background border border-border"><div className="text-xs text-muted-foreground">Authenticated</div><div className="text-lg font-bold text-foreground">1000 req/min</div></div>
        </div>
      </div>

      {/* Endpoints */}
      <h2 className="text-xl font-bold font-display text-foreground mb-4">Endpoints</h2>
      <div className="space-y-3">
        {endpoints.map((ep, i) => (
          <div key={i} className="rounded-xl p-5 bg-card border border-border card-hover">
            <div className="flex items-start gap-3">
              <span className={`px-2.5 py-1 rounded text-[11px] font-bold border ${methodColors[ep.method]}`}>{ep.method}</span>
              <div className="flex-1">
                <code className="text-sm font-mono text-foreground">{ep.path}</code>
                <p className="text-xs text-muted-foreground mt-1">{ep.desc}</p>
                <div className="mt-2"><span className="text-[10px] text-muted-foreground">Parameters: </span><span className="text-[10px] text-foreground">{ep.params}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Example */}
      <div className="rounded-xl p-5 bg-card border border-border mt-8">
        <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2"><Code size={14} /> Example Request</h3>
        <div className="code-block"><code className="text-xs">curl -s https://hub.heloix.devmonk.tech/api/v1/checks?provider=aws&severity=critical | jq .</code></div>
        <h4 className="text-xs font-semibold mt-4 mb-2 text-muted-foreground">Example Response</h4>
        <div className="code-block"><code className="text-xs whitespace-pre">{`{
  "data": [
    {
      "id": "s3_bucket_public_access_block_enabled",
      "title": "Ensure S3 bucket has public access blocks enabled",
      "provider": "aws",
      "service": "s3",
      "severity": "critical"
    }
  ],
  "total": 142,
  "page": 1,
  "limit": 20
}`}</code></div>
      </div>
    </div>
  </div>
);

export default ApiDocsPage;
