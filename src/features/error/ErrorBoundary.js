import { Component } from "react";
import GeneralError from "./GeneralError";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // TODO: log to an error reporting service such as sentry
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <GeneralError />;
    }
    return this.props.children;
  }
}
