import { api, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type View = { id: string; regulatorId: string; scope: string[]; includesPersonalData?: boolean; status?: string };

export function RegulatorViewsPage() {
  const [items, setItems] = useState<View[]>([]);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setItems((await api<ListEnvelope<View>>('/v1/regulator-views')).data.items);
  }, []);
  useEffect(() => { void refresh().catch((e) => setError(String(e.message ?? e))); }, [refresh]);

  return (
    <div>
      <h1 className="page-title">Regulator views</h1>
      <p className="page-sub">Near-real-time proof slices — includesPersonalData must stay false (BR-8).</p>
      <div className="panel">
        <button
          type="button"
          onClick={() =>
            void api('/v1/regulator-views', {
              method: 'POST',
              body: JSON.stringify({ regulatorId: 'reg_demo', scope: ['consents', 'obligations', 'evidence'] }),
            }).then(refresh).catch((e) => setError(String(e.message ?? e)))
          }
        >
          Grant view
        </button>
        {error ? <p className="error">{error}</p> : null}
      </div>
      <div className="panel">
        <table>
          <thead><tr><th>Id</th><th>Regulator</th><th>Scope</th><th>PD?</th><th /></tr></thead>
          <tbody>
            {items.map((v) => (
              <tr key={v.id}>
                <td className="mono">{v.id}</td>
                <td>{v.regulatorId}</td>
                <td>{(v.scope ?? []).join(', ')}</td>
                <td>{v.includesPersonalData ? 'YES (invalid)' : 'false'}</td>
                <td>
                  <button type="button" className="secondary" onClick={() => void api(`/v1/regulator-views/${v.id}/revoke`, { method: 'POST', body: '{}' }).then(refresh)}>
                    Revoke
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
