
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Shield } from 'lucide-react';
import { useAuth } from '@/auth/AuthProvider';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleLogin = async () => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({
        title: 'Error logging in',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      // Navigation is handled by onAuthStateChange in AuthProvider
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-security-navy">
      <Card className="w-full max-w-sm bg-security-dark-navy text-white border-security-teal">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
             <Shield className="h-12 w-12 text-security-teal" />
          </div>
          <CardTitle className="text-2xl">ShieldBrain</CardTitle>
          <CardDescription className="text-gray-400">Secure Access to Your Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-security-navy border-gray-600 focus:border-security-teal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-security-navy border-gray-600 focus:border-security-teal"
              />
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handleLogin} disabled={isSubmitting || !email || !password} className="w-full bg-security-teal hover:bg-security-teal/90 text-white">
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
