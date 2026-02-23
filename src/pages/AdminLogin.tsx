import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/contexts/AdminContext';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); 

    try {
      if (login(password)) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid password');
        setPassword('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-navy text-primary-foreground px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">Admin Login</h1>
          <p className="text-primary-foreground/70">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border/50">
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Admin Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button variant="hero" type="submit" className="w-full" disabled={!password || loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </Button>
        </form>

        <p className="text-center text-sm text-primary-foreground/50 mt-6">
          Only authorized users can access this area
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
