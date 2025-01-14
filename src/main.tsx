import "./styles/main.scss";
import ReactDOM from "react-dom/client";
import { Component } from "react";
import ErrorBoundary from "src/elements/errorBoundary";
import { Provider } from "react-redux";
import store from "src/redux/store/store";
import { CartProvider } from "src/elements/cartContext";
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
        <Provider store={store}>
          <CartProvider>
            <App />
          </CartProvider>
        </Provider>
      </ErrorBoundary>
      // <StrictMode />
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")!).render(<AppContainer />);
