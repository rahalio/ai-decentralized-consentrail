import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { getRole, setRole, type OperatorRole } from './lib/api';
import { LoginPage } from './pages/LoginPage';
import { FiveAreaHome } from './pages/FiveAreaHome';
import { ConsentsPage } from './pages/ConsentsPage';
import { RightsPage } from './pages/RightsPage';
import { SecurityPage } from './pages/SecurityPage';
import { ObligationsPage } from './pages/ObligationsPage';
import { EvidencePage } from './pages/EvidencePage';
import { RegulatorViewsPage } from './pages/RegulatorViewsPage';
import { ConsortiumRolesPage } from './pages/ConsortiumRolesPage';
import { TripleBlindPage } from './pages/TripleBlindPage';
import { CounselGatesPage } from './pages/CounselGatesPage';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NAV = [
  { to: '/', label: 'Five-area home', end: true as const },
  { to: '/consents', label: 'Consent lawfulness' },
  { to: '/rights', label: 'Rights cases' },
  { to: '/security', label: 'Security events' },
  { to: '/obligations', label: 'Obligation contracts' },
  { to: '/evidence', label: 'Evidence and proofs' },
  { to: '/regulator-views', label: 'Regulator views' },
  { to: '/consortium-roles', label: 'Consortium roles' },
  { to: '/triple-blind', label: 'Triple-blind exchange' },
  { to: '/counsel-gates', label: 'Counsel gates' },
];

const ROLE_HOME: Record<OperatorRole, string> = {
  dpo: '/',
  consent: '/consents',
  rights: '/rights',
  security: '/security',
  compliance: '/obligations',
  regulator: '/regulator-views',
  governor: '/consortium-roles',
  counsel: '/counsel-gates',
};

function Shell({ onSignOut }: { onSignOut: () => void }) {
  const [role, setRoleState] = useState<OperatorRole>(getRole());
  const navigate = useNavigate();

  useEffect(() => {
    setRole(role);
  }, [role]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-lamp" aria-hidden />
          Consentrail
        </div>
        <label>
          Operator role
          <select
            value={role}
            onChange={(e) => {
              const next = e.target.value as OperatorRole;
              setRoleState(next);
              navigate(ROLE_HOME[next]);
            }}
          >
            <option value="dpo">DPO / privacy lead</option>
            <option value="consent">Consent operator</option>
            <option value="rights">Rights operator</option>
            <option value="security">Security officer</option>
            <option value="compliance">Compliance analyst</option>
            <option value="regulator">Regulator liaison</option>
            <option value="governor">Consortium governor</option>
            <option value="counsel">Counsel</option>
          </select>
        </label>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={Boolean(item.end)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="secondary" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<FiveAreaHome />} />
          <Route path="/consents" element={<ConsentsPage />} />
          <Route path="/rights" element={<RightsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/obligations" element={<ObligationsPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/regulator-views" element={<RegulatorViewsPage />} />
          <Route path="/consortium-roles" element={<ConsortiumRolesPage />} />
          <Route path="/triple-blind" element={<TripleBlindPage />} />
          <Route path="/counsel-gates" element={<CounselGatesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export function App() {
  const [authed, setAuthed] = useState(
    () => localStorage.getItem('consentrail_authed') === '1'
  );

  if (!authed) {
    return (
      <LoginPage
        onSuccess={() => {
          localStorage.setItem('consentrail_authed', '1');
          setAuthed(true);
        }}
      />
    );
  }

  return (
    <Shell
      onSignOut={() => {
        localStorage.removeItem('consentrail_authed');
        setAuthed(false);
      }}
    />
  );
}
