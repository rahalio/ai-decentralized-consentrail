import { api, type ListEnvelope } from '../lib/api';
import { useCallback, useEffect, useState } from 'react';

type Contract = { id: string; controllerId: string; processorId: string; termsHash?: string; lastEvaluation?: string };
type Alert = { id: string; contractId: string; status: string; detail?: string };

export function ObligationsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setContracts((await api<ListEnvelope<Contract>>('/v1/obligations')).data.items);
    setAlerts((await api<ListEnvelope<Alert>>('/v1/compliance-alerts')).data.items);
  }, []);
  useEffect(() => { void refresh().catch((e) => setError(String(e.message ?? e))); }, [refresh]);

  return (
    <div>
      <h1 className="page-title">Obligation contracts</h1>
      <p className="page-sub">Kimberley-style automated DPA checks (BR-7).</p>
      {alerts.some((a) => a.status === 'breach') ? (
        <div className="banner coral">Active compliance breaches require acknowledge or waive.</div>
      ) : null}
      <div className="panel">
        <button
          type="button"
          onClick={() =>
            void api('/v1/obligations', {
              method: 'POST',
              body: JSON.stringify({
                controllerId: 'mem_controller',
                processorId: 'mem_processor',
                termsHash: 'sha256:demo-terms',
              }),
            }).then(refresh).catch((e) => setError(String(e.message ?? e)))
          }
        >
          Create contract
        </button>
        {error ? <p className="error">{error}</p> : null}
      </div>
      <div className="panel">
        <h3>Contracts</h3>
        <table>
          <thead><tr><th>Id</th><th>Controller</th><th>Processor</th><th /></tr></thead>
          <tbody>
            {contracts.map((c) => (
              <tr key={c.id}>
                <td className="mono">{c.id}</td>
                <td>{c.controllerId}</td>
                <td>{c.processorId}</td>
                <td>
                  <button type="button" className="secondary" onClick={() => void api(`/v1/obligations/${c.id}/evaluate`, { method: 'POST', body: '{}' }).then(refresh)}>
                    Evaluate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <h3>Alerts</h3>
        <table>
          <thead><tr><th>Id</th><th>Contract</th><th>Status</th><th /></tr></thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id}>
                <td className="mono">{a.id}</td>
                <td className="mono">{a.contractId}</td>
                <td>{a.status}</td>
                <td className="row">
                  <button type="button" className="secondary" onClick={() => void api(`/v1/compliance-alerts/${a.id}/acknowledge`, { method: 'POST', body: '{}' }).then(refresh)}>Ack</button>
                  <button type="button" onClick={() => void api(`/v1/compliance-alerts/${a.id}/waive`, { method: 'POST', body: JSON.stringify({ note: 'counsel waiver' }) }).then(refresh)}>Waive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
