import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface p-6">
          <div className="max-w-md w-full bg-error/10 border border-error/30 rounded-3xl p-8 text-center shadow-lg">
            <span className="material-symbols-outlined text-4xl text-error mb-4" style={{fontVariationSettings:"'FILL' 1"}}>warning</span>
            <h1 className="text-xl font-bold font-headline text-error mb-2">Systems Malfunction</h1>
            <p className="text-sm text-on-surface-variant mb-6">
              A serious error occurred rendering this component. Our engineers have been notified.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-2.5 bg-error text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              Emergency Reset to Home
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 text-left p-3 bg-white/50 rounded-lg overflow-x-auto text-[10px] font-mono text-on-surface">
                {this.state.error?.toString()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
