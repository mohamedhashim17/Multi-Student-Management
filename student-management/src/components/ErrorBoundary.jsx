import React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("EduFlow Error Boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch {}
    window.location.href = "/";
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper p-24 flex-center" style={{ minHeight: "60vh" }}>
          <div className="analytics-card text-center max-w-xl mx-auto p-32 border-rose">
            <div className="flex-center mb-16">
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(244, 63, 94, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(244, 63, 94, 0.3)",
                }}
              >
                <AlertTriangle size={32} className="text-rose" />
              </div>
            </div>

            <span className="section-pill mb-8 inline-block">SYSTEM RECOVERY</span>
            <h2 className="text-xl font-bold mb-8">Something went wrong in this module</h2>
            <p className="text-sm text-muted mb-20 leading-relaxed">
              An unexpected render issue occurred. You can reload this view or reset the demo data
              cache to recover cleanly.
            </p>

            {this.state.error?.message && (
              <div
                className="font-mono text-xs text-rose p-12 rounded-lg mb-20 text-left"
                style={{
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(244, 63, 94, 0.2)",
                  overflowX: "auto",
                }}
              >
                {this.state.error.message}
              </div>
            )}

            <div className="flex-center gap-12 flex-wrap">
              <button className="btn-secondary" onClick={this.handleReload}>
                <RotateCcw size={15} /> Reload View
              </button>
              <button className="btn-primary-neon" onClick={this.handleReset}>
                <RotateCcw size={15} /> Reset Demo Data & Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
