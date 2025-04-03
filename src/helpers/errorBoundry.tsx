import React, { ErrorInfo, ReactNode } from "react";
import Loader from "../components/Loader";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    window.location.reload();
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
        <div style={styles.container}>
          <div>
          <Loader />
            <p style={styles.message}>
              Website is updating please try again after refreshing the page.
            </p>
            <button style={styles.button} onClick={this.handleReset}>
              Refresh
            </button>
          </div>
        </div>
        </>
      );
    }

    return this.props.children;
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    height: "100vh",
  },

  message: {
    fontSize: "2em",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#0b8400",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default ErrorBoundary;
