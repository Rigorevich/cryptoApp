import React from "react";
import useSocket from "./hooks/useSocket";
import Header from "./components/Header";
import Table from "./views/TablePage";
import CryptoInfo from "./views/CryptoInfo";
import { Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [briefcase, setBriefCase] = useLocalStorage("briefcase", []);
  const [cryptoObj, setCryptoObj] = useLocalStorage("cryptoObj", {});
  const items = useSocket();

  return (
    <div className="wrapper">
      <Header items={items.slice(0, 3)} />
      <Route path="/" exact>
        <Table items={items} onClickCard={(obj) => setCryptoObj(obj)} />
      </Route>
      <Route path="/coins/">
        <CryptoInfo item={cryptoObj} />
      </Route>
    </div>
  );
}

export default App;
