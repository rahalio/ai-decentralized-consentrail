import { Link } from 'react-router-dom';
import { api, type DataEnvelope, type ListEnvelope } from '../lib/api';
import { useEffect, useState } from 'react';

type TrackStatus = 'green' | 'amber' | 'coral';

export function FiveAreaHome() {
  const [gate, setGate] = useState<{ ready?: boolean; missing?: string[] } | null>(null);
  const [alerts, setAlerts] = useState(0);
  const [holds, setHolds] = useState(0);

  useEffect(() => {
    void (async () => {
      try {
        const g = await api<DataEnvelope<{ ready: boolean; missing: string[] }>>(
          '/v1/consortium-roles/go-live-gate'
        );
        setGate(g.data);
      } catch {
        setGate({ ready: false, missing: ['controller', 'dpo'] });
      }
      try {
        const a = await api<ListEnvelope<{ status: string }>>('/v1/compliance-alerts');
        setAlerts(a.data.items.filter((x) => x.status === 'breach').length);
      } catch {
        setAlerts(0);
      }
      try {
        const c = await api<ListEnvelope<{ status: string }>>('/v1/counsel-gates');
        setHolds(c.data.items.filter((x) => x.status === 'legal_hold' || x.status === 'pending').length);
      } catch {
        setHolds(0);
      }
    })();
  }, []);

  const tracks: Array<{ name: string; to: string; status: TrackStatus; note: string }> = [
    { name: 'Rights', to: '/rights', status: holds ? 'amber' : 'green', note: holds ? `${holds} counsel hold(s)` : 'Cases current' },
    { name: 'Security of processing', to: '/security', status: 'green', note: 'Event log ready' },
    { name: 'Lawfulness / consent', to: '/consents', status: 'green', note: 'Capture & withdraw' },
    { name: 'Accountability', to: '/obligations', status: alerts ? 'coral' : 'amber', note: alerts ? `${alerts} breach alert(s)` : 'Contracts required' },
    { name: 'Privacy by design', to: '/evidence', status: 'green', note: 'Hash-only proofs' },
  ];

  return (
    <div>
      <h1 className="page-title">Five-area home</h1>
      <p className="page-sub">GDPR readiness across IBM’s five tracks — gaps, not vanity scores.</p>
      {!gate?.ready ? (
        <div className="banner">
          Go-live gate blocked until consortium roles (controller / processor / DPO) are recorded.{' '}
          <Link to="/consortium-roles">Assign roles</Link>
          {gate?.missing?.length ? (
            <span className="muted"> Missing: {gate.missing.join(', ')}</span>
          ) : null}
        </div>
      ) : null}
      {alerts > 0 ? (
        <div className="banner coral">
          {alerts} obligation breach alert(s). <Link to="/obligations">Open contracts</Link>
        </div>
      ) : null}
      <div className="tracks">
        {tracks.map((t) => (
          <Link key={t.name} to={t.to} className="track" style={{ color: 'inherit', textDecoration: 'none' }}>
            <h3>{t.name}</h3>
            <div className="status">
              <span className={`dot ${t.status}`} />
              {t.status === 'green' ? 'Evidence current' : t.status === 'amber' ? 'Gap' : 'Breach / hold'}
            </div>
            <p className="muted" style={{ marginTop: '0.75rem' }}>{t.note}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
