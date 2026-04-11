import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-primary font-headline">VoltRoute</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-semibold text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="#features">Features</a>
            <a className="hover:text-primary transition-colors" href="#why-choose">Why Us</a>
          </div>
          <div className="flex gap-3">
            <Link to="/auth" className="px-5 py-2 text-primary font-semibold hover:opacity-80 transition-all">Sign In</Link>
            <Link to="/auth" className="px-5 py-2 bg-primary text-on-primary rounded-xl font-semibold shadow-md hover:opacity-90 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 min-h-screen">
        {/* Hero Section: Split Layout */}
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Brand & Illustration */}
          <div className="space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container text-xs font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>electric_car</span>
              India's Smart EV Navigator
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-on-surface leading-[1.1]">
              Volt<span className="text-primary">Route</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Plan smarter EV trips with AI, optimize costs, and reduce carbon footprint. Silent power, intelligent navigation.
            </p>
            {/* Illustration Card */}
            <div className="relative group mt-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-25 blur-xl group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-surface-container-low rounded-3xl overflow-hidden aspect-video shadow-xl">
                <img className="w-full h-full object-cover" alt="EV on a glowing digital map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7xLw2ztgF1FZA1VbBsnuzECKxadLIRZk1zTINE0xRKnRVhYwEUQD2hYdEf7Gi4AcuKuLl9X1Nkzt3XD1-KW-BenCNSSjaPtyqkeF2-JJeTKF_MywW1ceEHa9pmxWLFFWidKycqonpe5J_wL4szCcjlRAS8SVcGqTnhvGIOhseIgCEzF2rfgOGN3kjAVyNk77BTIcnJD5KAtPlsGBPm793Dp_9bhtKHm1g_KsFYle1bkok1vK1yXII7MBBLD0Vx8eVsskhZfnYdSWG" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 p-4 glass-panel rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
                      <span className="material-symbols-outlined">bolt</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface uppercase tracking-wider">Optimal Route</p>
                      <p className="text-sm font-medium text-on-surface-variant">Charging stop at 142 km</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login Card */}
          <div className="flex justify-center md:justify-end fade-in-up stagger-2">
            <div className="w-full max-w-md bg-surface-container-lowest p-10 rounded-[2rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-headline font-bold text-on-surface">Welcome Back</h2>
                <p className="text-on-surface-variant mt-2">Access your intelligent dashboard</p>
              </div>

              <button onClick={handleGoogle} disabled={loading} className="w-full py-4 px-6 bg-surface-container-low border border-outline-variant/30 rounded-xl flex items-center justify-center gap-3 font-semibold text-on-surface hover:bg-surface-container-high transition-all active:scale-[0.98] disabled:opacity-50">
                <img alt="Google Logo" className="w-5 h-5" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
                Continue with Google
              </button>

              <div className="relative my-8 flex items-center">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="px-4 text-xs font-bold text-outline uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-on-surface ml-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-5 py-4 bg-surface-container-low rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline/50"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center px-1">
                    <label className="block text-sm font-semibold text-on-surface">Password</label>
                    <Link to="/auth" className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-5 py-4 bg-surface-container-low rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {error && <p className="text-xs font-bold text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  Sign In
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-on-surface-variant text-sm font-medium">
                  Don't have an account?
                  <Link to="/auth" className="text-primary font-bold ml-1 hover:underline">Create Account</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center fade-in-up">
              <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-4">Master Every Journey</h2>
              <p className="text-on-surface-variant text-lg">Cutting-edge tools for the next generation of transport.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary-container/20 fade-in-up stagger-1">
                <div className="w-14 h-14 bg-primary-container rounded-2xl flex items-center justify-center text-on-primary-container mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">route</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-3">AI Route Optimization</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Smart paths dynamically adjusted based on live traffic, weather, and charger availability.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary-container/20 fade-in-up stagger-2">
                <div className="w-14 h-14 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">payments</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-3">Cost Estimation</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Precise billing predictions for every trip, factoring in utility rates and peak hour pricing.</p>
              </div>
              {/* Feature 3 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary-container/20 fade-in-up stagger-3">
                <div className="w-14 h-14 bg-surface-container-high rounded-2xl flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">co2</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-3">Carbon Tracker</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Visualize your impact with real-time environmental data and sustainability reporting.</p>
              </div>
              {/* Feature 4 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary-container/20 fade-in-up stagger-4">
                <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">mic</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-3">Voice Assistant</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Stay focused on the road with hands-free control. Just say 'Hey VoltRoute'.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="why-choose" className="max-w-7xl mx-auto px-6 py-24 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative fade-in-up">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
              <img className="relative rounded-[2.5rem] shadow-2xl z-10 border-8 border-surface-container" alt="Dashboard on car screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp0uZTSZwnDfEc-hJgF2TjJAh0mxQW-0kuj04WdUVgy44ZxCL8elWmgSat0Hpg0YHwhvC5RGQFOq8m-JPezDA7-o_MhkDQNX_sVOC0gQ7X-Bagp5FQhD3RLLsTQVnks6xneUx6WL1QFzf5ZDZ642C2o8upJL3Lmklw73_UWRqVHjp7XQ-5iaa-AzJ-zT4XzSBNOGUklHioXRDLFc61w3eG2wP1vCfrTgIheJzCjCSTO2oBERh7QR_Ymto9PXm-jr9HAp0z_CMbRmm-" />
            </div>
            <div className="w-full md:w-1/2 space-y-8 fade-in-up stagger-2">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
                Why choose VoltRoute?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">Save money on charging</h4>
                    <p className="text-on-surface-variant">Auto-detect off-peak hours and find the most cost-effective stations along your route.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">Eliminate range anxiety</h4>
                    <p className="text-on-surface-variant">Live battery telemetry ensures you always reach your destination with ample energy to spare.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">Seamless billing integration</h4>
                    <p className="text-on-surface-variant">Consolidated monthly statements compatible with all major corporate expense platforms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low w-full py-12 border-t border-outline-variant/30">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <span className="text-lg font-bold text-on-surface font-headline">VoltRoute</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Route API</a>
            <a className="hover:text-primary transition-colors" href="#">Support</a>
          </div>
          <div className="text-sm text-on-surface-variant text-center md:text-right">
            © 2026 VoltRoute. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
