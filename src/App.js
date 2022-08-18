import React from "react";
import useSocket from "./hooks/useSocket";
import Header from "./components/Header";
import Table from "./components/views/TablePage";
import CryptoInfo from "./components/views/CryptoInfo";
import { Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [briefCase, setBriefCase] = useLocalStorage("briefcase", []);
  const [cryptoObj, setCryptoObj] = useLocalStorage("cryptoObj", {});
  const items = useSocket();

  function checkBriefcase(obj) {
    briefCase.some((item) => item.id === obj.id)
      ? setBriefCase((prev) =>
          [...prev].map((item) =>
            item.id === obj.id
              ? { ...item, value: `${Number(obj.value) + Number(item.value)}` }
              : item
          )
        )
      : setBriefCase((prev) => [...prev, obj]);
  }

  function deleteCard(obj) {
    setBriefCase((prev) => [...prev].filter((item) => item.id !== obj.id));
  }

  return (
    <div className="wrapper">
      <Header
        items={items.slice(0, 3)}
        onClickCross={deleteCard}
        briefCase={briefCase}
      />
      <Route path="/" exact>
        <Table
          items={items}
          onClickCard={(obj) => setCryptoObj(obj)}
          onClickButton={checkBriefcase}
        />
      </Route>
      <Route path="/coins/">
        <CryptoInfo item={cryptoObj} onClickButton={checkBriefcase} />
      </Route>
    </div>
  );
}

export default App;
