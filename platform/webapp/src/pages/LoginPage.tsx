import { getApiKey, setApiKey, setRole, type OperatorRole } from '../lib/api';
import { useState } from 'react';

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [apiKey, setKey] = useState(getApiKey());
  const [role, setRoleLocal] = useState<OperatorRole>('dpo');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      setApiKey(apiKey);
      setRole(role);
      const res = await fetch('/health');
      if (!res.ok) throw new Error('API health check failed');
      const keys = await fetch('/v0/tenants/me/api-keys', {
        headers: { 'X-API-Key': apiKey },
      });
      if (!keys.ok) throw new Error('API key rejected');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={onSubmit}>
        <div className="brand">
          <span className="brand-lamp" aria-hidden />
          Consentrail
        </div>
        <h1>Five tracks. One accountability rail.</h1>
        <p className="muted">
          Sign in with your consortium API key to operate GDPR evidence across
          rights, security, lawfulness, accountability, and privacy by design.
        </p>
        <div className="row" style={{ marginTop: '1.25rem' }}>
          <label style={{ flex: 1 }}>
            API key
            <input
              value={apiKey}
              onChange={(e) => setKey(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
        <div className="row" style={{ marginTop: '0.75rem' }}>
          <label style={{ flex: 1 }}>
            Role
            <select
              value={role}
              onChange={(e) => setRoleLocal(e.target.value as OperatorRole)}
            >
              <option value="dpo">DPO / privacy lead</option>
              <option value="consent">Consent operator</option>
              <option value="rights">Rights operator</option>
              <option value="security">Security officer</option>
              <option value="compliance">Compliance analyst</option>
              <option value="regulator">Regulator liaison</option>
              <option value="governor">Consortium governor</option>
              <option value="counsel">Counsel</option>
            </select>
          </label>
        </div>
        {error ? <p className="error">{error}</p> : null}
        <button type="submit" style={{ marginTop: '1.25rem', width: '100%' }}>
          Enter Consentrail
        </button>
      </form>
    </div>
  );
}
