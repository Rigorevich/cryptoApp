import React from "react";
import useSocket from "./hooks/useSocket";
import Header from "./components/Header";
import Table from "./components/views/TablePage";
import CryptoInfo from "./components/views/CryptoInfo";
import { Routes, Route } from "react-router-dom";
import { Asset } from "./models";
import useLocalStorage from "./hooks/useLocalStorage";
import { useAppSelector } from "./store";

function App() {
  const [briefCase, setBriefCase] = useLocalStorage<Asset[]>("briefcase", []);
  const [cryptoObj, setCryptoObj] = useLocalStorage<Asset>(
    "cryptoObj",
    {} as Asset
  );
  const items = useSocket();

  function checkBriefcase(obj: Asset) {
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

  function deleteCard(obj: Asset) {
    setBriefCase((prev) => [...prev].filter((item) => item.id !== obj.id));
  }

  return (
    <div className="wrapper">
      <Header
        items={items.slice(0, 3)}
        onClickCross={deleteCard}
        briefCase={briefCase}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Table
              items={items}
              onClickCard={(obj: Asset) => setCryptoObj(obj)}
              onClickButton={checkBriefcase}
            />
          }
        />
        <Route
          path={`/coins/${cryptoObj.id}`}
          element={
            <CryptoInfo item={cryptoObj} onClickButton={checkBriefcase} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
