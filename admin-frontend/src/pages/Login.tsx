import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    if (envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
      return envUrl;
    }
    return `https://${envUrl}`;
  }
  return 'http://localhost:5000';
};

const API_URL = getApiUrl();

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetch(`${API_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            navigate('/');
          }
        })
        .catch(() => {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
        });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Access Denied: Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-4 relative overflow-hidden font-spectral noise-overlay scanlines">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="glass-panel p-10 rounded-2xl border border-green-500/30">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6 relative">
              <div className="w-16 h-16 border-2 border-green-500/50 rounded-xl flex items-center justify-center bg-green-500/10 animate-pulse transition-all duration-500">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="absolute -inset-2 border border-green-500/10 rounded-2xl -z-10 animate-glow"></div>
            </div>

            <h1 className="text-3xl font-bold tracking-[0.2em] text-white mb-2 uppercase">
              Omnix <span className="text-green-500">Core</span>
            </h1>
            <p className="text-green-500/60 mono text-xs tracking-widest uppercase">Unauthorized Access Strictly Prohibited</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs mono animate-pulse">
                [ERROR] {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest ml-1">
                Identity
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 bg-black/50 border border-green-500/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-300 mono text-sm"
                required
                placeholder="USER_ID"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest ml-1">
                Cipher
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-black/50 border border-green-500/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-300 mono text-sm"
                required
                placeholder="********"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group px-6 py-4 bg-green-500/10 border border-green-500/50 text-green-400 font-bold rounded-xl hover:bg-green-500 hover:text-black active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em]">
                {loading ? 'Decrypting...' : 'Initialize Session'}
                {!loading && (
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </span>
              <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 mono uppercase tracking-tighter">
              Secure Terminal Rev. 7.0.1-Local
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
