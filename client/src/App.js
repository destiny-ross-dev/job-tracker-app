import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Spinner from "./components/spinner/spinner";
import "./App.css";

const Body = React.lazy(() => import("./components/test/test"));

function App() {
  const [testCall, setTestCall] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const testData = await axios.get("/test");

        setTestCall(testData.data.msg);
      } catch (e) {
        console.log(e);
      }
      // setTestCall(testData.data.msg);
    }
    fetchData();
    setLoading(false);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Test</h1>
      </header>
      <Suspense fallback={<Spinner />}>
        <Body data={testCall} />
      </Suspense>
    </div>
  );
}

export default App;
