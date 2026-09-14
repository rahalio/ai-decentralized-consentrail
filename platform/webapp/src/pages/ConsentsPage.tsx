import { api, type DataEnvelope, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type Consent = {
  id: string;
  subjectRef: string;
  purpose: string;
  status: string;
  processingStop?: boolean;
  ownerMediated?: boolean;
};

export function ConsentsPage() {
  const [items, setItems] = useState<Consent[]>([]);
  const [subjectRef, setSubjectRef] = useState('subj_demo');
  const [purpose, setPurpose] = useState('clinical-trial-share');
  const [error, setError] = useState('');
  const [stop, setStop] = useState<Record<string, unknown> | null>(null);

  const refresh = useCallback(async () => {
    const res = await api<ListEnvelope<Consent>>('/v1/consents');
    setItems(res.data.items);
  }, []);

  useEffect(() => {
    void refresh().catch((e) => setError(String(e.message ?? e)));
  }, [refresh]);

  async function capture() {
    setError('');
    await api('/v1/consents', {
      method: 'POST',
      body: JSON.stringify({ subjectRef, purpose, explicit: true, freelyGiven: true, informed: true, unambiguous: true }),
    });
    await refresh();
  }

  async function withdraw(id: string) {
    setError('');
    await api(`/v1/consents/${id}/withdraw`, { method: 'POST', body: '{}' });
    const st = await api<DataEnvelope<Record<string, unknown>>>(`/v1/consents/${id}/processing-stop`);
    setStop(st.data);
    await refresh();
  }

  return (
    <div>
      <h1 className="page-title">Consent lawfulness</h1>
      <p className="page-sub">Capture freely given consent; withdrawal raises processing-stop flags (BR-3).</p>
      <div className="panel">
        <div className="row">
          <label>Subject ref<input value={subjectRef} onChange={(e) => setSubjectRef(e.target.value)} /></label>
          <label>Purpose<input value={purpose} onChange={(e) => setPurpose(e.target.value)} /></label>
          <button type="button" onClick={() => void capture().catch((e) => setError(String(e.message ?? e)))}>Capture</button>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </div>
      {stop ? (
        <div className="panel">
          <h3>Processing-stop monitor</h3>
          <pre className="mono">{JSON.stringify(stop, null, 2)}</pre>
        </div>
      ) : null}
      <div className="panel">
        <table>
          <thead>
            <tr><th>Id</th><th>Subject</th><th>Purpose</th><th>Status</th><th>Stop</th><th /></tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td className="mono">{c.id}</td>
                <td>{c.subjectRef}</td>
                <td>{c.purpose}</td>
                <td>{c.status}</td>
                <td>{c.processingStop ? 'yes' : 'no'}</td>
                <td>
                  {c.status === 'active' ? (
                    <button type="button" className="secondary" onClick={() => void withdraw(c.id).catch((e) => setError(String(e.message ?? e)))}>
                      Withdraw
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
