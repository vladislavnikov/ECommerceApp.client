import "./styles/main.scss";
import { Component, ErrorInfo /* , StrictMode */ } from "react";
import ReactDOM from "react-dom/client";
import apiEndpoints from "./api.endpoints";
import App from "./app";

interface Props {}
interface State {
  hasError: boolean;
}

async function testFetch(): Promise<void> {
  const data = await (await fetch(apiEndpoints.testMock)).json();
  console.warn("fetched data", data);
}

class AppContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };

    const goExclude = true;
    if (!goExclude) {
      console.warn("class-dead-code doesn't work", props);
    }
  }

  componentDidMount(): void {
    setTimeout(testFetch, 300);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("got err", { error, errorInfo });
    this.setState({ hasError: true });
  }

  render() {
    // <StrictMode>
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return <App />;
    // </StrictMode>
  }
}

ReactDOM.createRoot(document.getElementById("app")!).render(<AppContainer />);
