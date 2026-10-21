import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import Dojo from './pages/Dojo'
import Markers from './pages/Markers'
import InfoCenter from './pages/InfoCenter'
import Teacher from './pages/Teacher'
import ComingSoon from './pages/ComingSoon'
import BrandSettings from './pages/BrandSettings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/dojo" element={<Dojo />} />
        <Route path="/markers" element={<Markers />} />
        <Route path="/info" element={<InfoCenter />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/livebooks" element={<ComingSoon title="Livebooks" />} />
        <Route path="/support" element={<ComingSoon title="Support" />} />
        <Route path="/showcase" element={<ComingSoon title="Showcase" />} />
        <Route path="/attendance" element={<ComingSoon title="Attendance Hub" />} />
        <Route path="/assessments" element={<ComingSoon title="Assessment Corner" />} />
        <Route path="/internships" element={<ComingSoon title="My Internships" />} />
        <Route path="/placements" element={<ComingSoon title="Placement Drives" />} />
        <Route path="/project-assessor" element={<ComingSoon title="Project Assessor" />} />
        <Route path="/vibe-store" element={<ComingSoon title="Vibe Store" />} />
        <Route path="/admin/brand" element={<BrandSettings />} />
      </Route>
    </Routes>
  )
}