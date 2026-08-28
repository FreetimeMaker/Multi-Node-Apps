"use client";

import React from "react";

interface Props { children: React.ReactNode; }
interface State { error: Error | null; }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[GeoWeather Error]", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: "white", fontFamily: "monospace" }}>
          <h2 style={{ color: "#ff6b6b" }}>Something went wrong</h2>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 12, background: "rgba(0,0,0,0.3)", padding: 12, borderRadius: 8 }}>
            {this.state.error.message}
          </pre>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 8, background: "rgba(0,0,0,0.3)", padding: 12, borderRadius: 8, fontSize: 12 }}>
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
