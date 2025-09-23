import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock auth delay
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="username">Email or Username</Label>
                <Input id="username" placeholder="you@example.com" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link to="#" className="text-primary hover:underline">Forgot Password?</Link>
                <div>
                  New here? <Link to="#" className="text-primary hover:underline">Sign Up</Link>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Login;


