import "./styles/main.scss";
import ReactDOM from "react-dom/client";
import { Component } from "react";
import ErrorBoundary from "src/elements/errorBoundary";
import { UserProvider } from "src/elements/userContext";
import apiEndpoints from "./api.endpoints";
import App from "./app";

async function testFetch(): Promise<void> {
  const data = await (await fetch(apiEndpoints.testMock)).json();
  console.warn("fetched data", data);
}

class AppContainer extends Component {
  componentDidMount(): void {
    setTimeout(testFetch, 300);
  }

  render() {
    return (
      // <StrictMode>
      <ErrorBoundary fallback={<h1>Something went wrong! Please try again later.</h1>}>
        <UserProvider>
          <App />
        </UserProvider>
      </ErrorBoundary>
      // <StrictMode />
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")!).render(<AppContainer />);
