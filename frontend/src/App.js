import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ChecksPage from './pages/ChecksPage';
import CompliancePage from './pages/CompliancePage';
import CheckDetailPage from './pages/CheckDetailPage';
import ComplianceDetailPage from './pages/ComplianceDetailPage';
import ApiDocsPage from './pages/ApiDocsPage';
import DocsPage from './pages/DocsPage';
import StudioPage from './pages/StudioPage';
import { useParams } from 'react-router-dom';
import { docsNav } from './data/docs-nav';

// Redirect /docs/:section → /docs/:section/:firstPage
function DocsSectionRedirect() {
  const { section } = useParams();
  const sectionDef = docsNav.find(s => s.id === section);
  const firstPage  = sectionDef?.pages[0]?.id || 'introduction';
  return <Navigate to={`/docs/${section}/${firstPage}`} replace />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/check" element={<ChecksPage />} />
            <Route path="/check/:checkId" element={<CheckDetailPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/compliance/:complianceId" element={<ComplianceDetailPage />} />
            <Route path="/hub-api" element={<ApiDocsPage />} />
            <Route path="/studio" element={<StudioPage />} />

            {/* Docs routes — section + page ID via URL params */}
            <Route path="/docs" element={<Navigate to="/docs/getting-started/introduction" replace />} />
            <Route path="/docs/:section" element={<DocsSectionRedirect />} />
            <Route path="/docs/:section/:pageId" element={<DocsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
