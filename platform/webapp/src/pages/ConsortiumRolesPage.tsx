import { api, type DataEnvelope, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type Role = { id: string; kind: string; memberId: string; attested?: boolean };

export function ConsortiumRolesPage() {
  const [items, setItems] = useState<Role[]>([]);
  const [kind, setKind] = useState('dpo');
  const [gate, setGate] = useState<{ ready?: boolean; missing?: string[] } | null>(null);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setItems((await api<ListEnvelope<Role>>('/v1/consortium-roles')).data.items);
    try {
      setGate((await api<DataEnvelope<{ ready: boolean; missing: string[] }>>('/v1/consortium-roles/go-live-gate')).data);
    } catch {
      setGate(null);
    }
  }, []);
  useEffect(() => { void refresh().catch((e) => setError(String(e.message ?? e))); }, [refresh]);

  return (
    <div>
      <h1 className="page-title">Consortium roles</h1>
      <p className="page-sub">Controller, processor, and DPO must be recorded before live PD evidence (BR-5).</p>
      {gate && !gate.ready ? (
        <div className="banner">Go-live gate locked. Missing: {(gate.missing ?? []).join(', ') || 'roles'}</div>
      ) : (
        <div className="banner" style={{ borderColor: 'var(--color-signal)' }}>Go-live gate ready for evidence acceptance.</div>
      )}
      <div className="panel">
        <div className="row">
          <label>
            Kind
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="controller">controller</option>
              <option value="processor">processor</option>
              <option value="dpo">dpo</option>
              <option value="governor">governor</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() =>
              void api('/v1/consortium-roles', {
                method: 'POST',
                body: JSON.stringify({ kind, memberId: `mem_${kind}` }),
              }).then(refresh).catch((e) => setError(String(e.message ?? e)))
            }
          >
            Assign role
          </button>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </div>
      <div className="panel">
        <table>
          <thead><tr><th>Id</th><th>Kind</th><th>Member</th><th>Attested</th><th /></tr></thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id}>
                <td className="mono">{r.id}</td>
                <td>{r.kind}</td>
                <td>{r.memberId}</td>
                <td>{r.attested ? 'yes' : 'no'}</td>
                <td>
                  <button type="button" className="secondary" onClick={() => void api(`/v1/consortium-roles/${r.id}/attest`, { method: 'POST', body: '{}' }).then(refresh)}>
                    Attest
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
