import { api, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type Policy = {
  id: string;
  name: string;
  enabled?: boolean;
  providerLearns?: string[];
  consumerLearns?: string[];
  operatorLearns?: string[];
};

export function TripleBlindPage() {
  const [items, setItems] = useState<Policy[]>([]);
  const [name, setName] = useState('KYC attribute verify');
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setItems((await api<ListEnvelope<Policy>>('/v1/triple-blind-policies')).data.items);
  }, []);
  useEffect(() => { void refresh().catch((e) => setError(String(e.message ?? e))); }, [refresh]);

  return (
    <div>
      <h1 className="page-title">Triple-blind exchange</h1>
      <p className="page-sub">Configure who learns which attributes (BR-11).</p>
      <div className="panel">
        <div className="row">
          <label>Name<input value={name} onChange={(e) => setName(e.target.value)} /></label>
          <button
            type="button"
            onClick={() =>
              void api('/v1/triple-blind-policies', {
                method: 'POST',
                body: JSON.stringify({
                  name,
                  providerLearns: ['request-id'],
                  consumerLearns: ['match-bool'],
                  operatorLearns: ['audit-ref'],
                }),
              }).then(refresh).catch((e) => setError(String(e.message ?? e)))
            }
          >
            Save policy
          </button>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </div>
      <div className="panel">
        <table>
          <thead><tr><th>Id</th><th>Name</th><th>Enabled</th><th>Matrix</th><th /></tr></thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td className="mono">{p.id}</td>
                <td>{p.name}</td>
                <td>{p.enabled ? 'yes' : 'no'}</td>
                <td className="mono">
                  P:{(p.providerLearns ?? []).join('|')} / C:{(p.consumerLearns ?? []).join('|')} / O:{(p.operatorLearns ?? []).join('|')}
                </td>
                <td className="row">
                  <button type="button" className="secondary" onClick={() => void api(`/v1/triple-blind-policies/${p.id}/dry-run`, { method: 'POST', body: '{}' })}>Dry-run</button>
                  <button type="button" onClick={() => void api(`/v1/triple-blind-policies/${p.id}/enable`, { method: 'POST', body: '{}' }).then(refresh)}>Enable</button>
                  <button type="button" className="secondary" onClick={() => void api(`/v1/triple-blind-policies/${p.id}/disable`, { method: 'POST', body: '{}' }).then(refresh)}>Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
