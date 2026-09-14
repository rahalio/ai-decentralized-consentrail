import { api, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type RightsCase = { id: string; type: string; status: string; subjectRef: string };

export function RightsPage() {
  const [items, setItems] = useState<RightsCase[]>([]);
  const [type, setType] = useState('erasure');
  const [subjectRef, setSubjectRef] = useState('subj_demo');
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    const res = await api<ListEnvelope<RightsCase>>('/v1/rights-cases');
    setItems(res.data.items);
  }, []);

  useEffect(() => {
    void refresh().catch((e) => setError(String(e.message ?? e)));
  }, [refresh]);

  return (
    <div>
      <h1 className="page-title">Rights case desk</h1>
      <p className="page-sub">Access, rectification, erasure, portability, breach inform (BR-4).</p>
      <div className="panel">
        <div className="row">
          <label>
            Type
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="access">access</option>
              <option value="rectification">rectification</option>
              <option value="erasure">erasure</option>
              <option value="portability">portability</option>
              <option value="breach_inform">breach_inform</option>
            </select>
          </label>
          <label>Subject ref<input value={subjectRef} onChange={(e) => setSubjectRef(e.target.value)} /></label>
          <button
            type="button"
            onClick={() =>
              void api('/v1/rights-cases', {
                method: 'POST',
                body: JSON.stringify({ type, subjectRef }),
              })
                .then(refresh)
                .catch((e) => setError(String(e.message ?? e)))
            }
          >
            Open case
          </button>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </div>
      <div className="panel">
        <table>
          <thead><tr><th>Id</th><th>Type</th><th>Status</th><th>Subject</th><th /></tr></thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td className="mono">{c.id}</td>
                <td>{c.type}</td>
                <td>{c.status}</td>
                <td>{c.subjectRef}</td>
                <td className="row">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() =>
                      void api(`/v1/rights-cases/${c.id}/close`, {
                        method: 'POST',
                        body: JSON.stringify({ outcome: 'fulfilled', evidenceRefs: [] }),
                      }).then(refresh)
                    }
                  >
                    Close fulfilled
                  </button>
                  {c.type === 'erasure' ? (
                    <button
                      type="button"
                      onClick={() =>
                        void api(`/v1/rights-cases/${c.id}/hand-to-counsel`, { method: 'POST', body: '{}' }).then(refresh)
                      }
                    >
                      Hand to counsel
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
