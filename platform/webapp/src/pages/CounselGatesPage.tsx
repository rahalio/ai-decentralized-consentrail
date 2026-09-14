import { api, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type Gate = { id: string; rightsCaseId: string; status: string; basis?: string };

export function CounselGatesPage() {
  const [items, setItems] = useState<Gate[]>([]);
  const [rightsCaseId, setRightsCaseId] = useState('rgt_pending');
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setItems((await api<ListEnvelope<Gate>>('/v1/counsel-gates')).data.items);
  }, []);
  useEffect(() => { void refresh().catch((e) => setError(String(e.message ?? e))); }, [refresh]);

  return (
    <div>
      <h1 className="page-title">Counsel erasure gates</h1>
      <p className="page-sub">Legal hold and orphan approval before immutable hash removal (BR-12).</p>
      {items.some((g) => g.status === 'legal_hold' || g.status === 'pending') ? (
        <div className="banner coral">Counsel inbox has open holds.</div>
      ) : null}
      <div className="panel">
        <div className="row">
          <label>Rights case id<input value={rightsCaseId} onChange={(e) => setRightsCaseId(e.target.value)} /></label>
          <button
            type="button"
            onClick={() =>
              void api('/v1/counsel-gates', {
                method: 'POST',
                body: JSON.stringify({ rightsCaseId }),
              }).then(refresh).catch((e) => setError(String(e.message ?? e)))
            }
          >
            Open gate
          </button>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </div>
      <div className="panel">
        <table>
          <thead><tr><th>Id</th><th>Case</th><th>Status</th><th /></tr></thead>
          <tbody>
            {items.map((g) => (
              <tr key={g.id}>
                <td className="mono">{g.id}</td>
                <td className="mono">{g.rightsCaseId}</td>
                <td>{g.status}</td>
                <td className="row">
                  <button type="button" onClick={() => void api(`/v1/counsel-gates/${g.id}/decide`, { method: 'POST', body: JSON.stringify({ decision: 'approve_orphan', basis: 'no legal hold' }) }).then(refresh)}>
                    Approve orphan
                  </button>
                  <button type="button" className="secondary" onClick={() => void api(`/v1/counsel-gates/${g.id}/decide`, { method: 'POST', body: JSON.stringify({ decision: 'legal_hold', basis: 'litigation' }) }).then(refresh)}>
                    Legal hold
                  </button>
                  <button type="button" className="secondary" onClick={() => void api(`/v1/counsel-gates/${g.id}/decide`, { method: 'POST', body: JSON.stringify({ decision: 'refuse', basis: 'retention duty' }) }).then(refresh)}>
                    Refuse
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
