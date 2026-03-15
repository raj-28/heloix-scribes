import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ChecksPage from './pages/ChecksPage';
import CompliancePage from './pages/CompliancePage';
import CheckDetailPage from './pages/CheckDetailPage';
import ComplianceDetailPage from './pages/ComplianceDetailPage';
import ApiDocsPage from './pages/ApiDocsPage';
import DocsPage from './pages/DocsPage';
import StudioPage from './pages/StudioPage';

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
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/studio" element={<StudioPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
