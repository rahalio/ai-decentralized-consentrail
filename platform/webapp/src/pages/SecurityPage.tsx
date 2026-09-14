import { api, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type Ev = { id: string; kind: string; participantId?: string; detail?: string; acknowledged?: boolean };

export function SecurityPage() {
  const [items, setItems] = useState<Ev[]>([]);
  const [kind, setKind] = useState('access');
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setItems((await api<ListEnvelope<Ev>>('/v1/security-events')).data.items);
  }, []);
  useEffect(() => { void refresh().catch((e) => setError(String(e.message ?? e))); }, [refresh]);

  return (
    <div>
      <h1 className="page-title">Security-of-processing log</h1>
      <p className="page-sub">Access, key events, and participant verification (BR-6).</p>
      <div className="panel">
        <div className="row">
          <label>
            Kind
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="access">access</option>
              <option value="key">key</option>
              <option value="participant_verify">participant_verify</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() =>
              void api('/v1/security-events', {
                method: 'POST',
                body: JSON.stringify({ kind, participantId: 'prt_demo', detail: 'UI record' }),
              }).then(refresh).catch((e) => setError(String(e.message ?? e)))
            }
          >
            Record event
          </button>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </div>
      <div className="panel">
        <table>
          <thead><tr><th>Id</th><th>Kind</th><th>Participant</th><th>Detail</th></tr></thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id}>
                <td className="mono">{e.id}</td>
                <td>{e.kind}</td>
                <td>{e.participantId}</td>
                <td>{e.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
