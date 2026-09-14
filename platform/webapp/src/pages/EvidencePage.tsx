import { api, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type Hash = { id: string; hash: string; orphaned?: boolean; purpose?: string };
type Proof = { id: string; artefactRef: string; proof: string; issuedAt?: string };

export function EvidencePage() {
  const [hashes, setHashes] = useState<Hash[]>([]);
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setHashes((await api<ListEnvelope<Hash>>('/v1/evidence/hashes')).data.items);
    setProofs((await api<ListEnvelope<Proof>>('/v1/evidence/integrity-proofs')).data.items);
  }, []);
  useEffect(() => { void refresh().catch((e) => setError(String(e.message ?? e))); }, [refresh]);

  return (
    <div>
      <h1 className="page-title">Evidence and integrity proofs</h1>
      <p className="page-sub">Hash-only ledger artefacts — personal data stays off-chain (BR-2, BR-10).</p>
      <div className="panel">
        <div className="row">
          <button
            type="button"
            onClick={() =>
              void api('/v1/evidence/hashes', {
                method: 'POST',
                body: JSON.stringify({ hash: `sha256:${crypto.randomUUID()}`, purpose: 'consent-evidence', containsPersonalData: false }),
              }).then(refresh).catch((e) => setError(String(e.message ?? e)))
            }
          >
            Register hash
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() =>
              void api('/v1/evidence/integrity-proofs', {
                method: 'POST',
                body: JSON.stringify({ artefactRef: 'artefact_demo' }),
              }).then(refresh)
            }
          >
            Issue integrity proof
          </button>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </div>
      <div className="panel">
        <h3>Evidence hashes</h3>
        <table>
          <thead><tr><th>Id</th><th>Hash</th><th>Orphaned</th><th /></tr></thead>
          <tbody>
            {hashes.map((h) => (
              <tr key={h.id}>
                <td className="mono">{h.id}</td>
                <td className="mono">{h.hash}</td>
                <td>{h.orphaned ? 'yes' : 'no'}</td>
                <td>
                  <button type="button" className="secondary" onClick={() => void api(`/v1/evidence/hashes/${h.id}/orphan`, { method: 'POST', body: '{}' }).then(refresh)}>
                    Orphan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <h3>Integrity proofs</h3>
        <table>
          <thead><tr><th>Id</th><th>Artefact</th><th>Proof</th></tr></thead>
          <tbody>
            {proofs.map((p) => (
              <tr key={p.id}>
                <td className="mono">{p.id}</td>
                <td>{p.artefactRef}</td>
                <td className="mono">{p.proof}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
