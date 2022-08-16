import React from "react";
import useSocket from "./hooks/useSocket";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Table from "./views/TablePage";
import CryptoInfo from "./views/CryptoInfo";
import { Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [isModal, setModal] = React.useState(false);
  const [cryptoObj, setCryptoObj] = useLocalStorage("cryptoObj", {});
  const [isModalPage, setIsModalPage] = React.useState(false);
  const [isCryptoModal, setIsCryptoModal] = React.useState(false);
  const items = useSocket();

  return (
    <div className="wrapper">
      <Drawer
        isVisible={isModal}
        title="Briefcase"
        content={<p>Your briefcase is empty</p>}
        onClose={() => setModal(false)}
      />
      <Header onClickCase={() => setModal(true)} items={items.slice(0, 3)} />
      <Route path="/" exact>
        <Drawer
          isVisible={isCryptoModal}
          title="Add the required amount to your wallet"
          content={<input type="number" placeholder="Write here..." />}
          onClose={() => setIsCryptoModal(false)}
        />
        <Table
          items={items}
          onClickButton={() => setIsCryptoModal(true)}
          onClickCard={(obj) => setCryptoObj(obj)}
        />
      </Route>
      <Route path="/coins/">
        <Drawer
          isVisible={isModalPage}
          title="Add the required amount to your wallet"
          content={<input type="number" placeholder="Write here..." />}
          onClose={() => setIsModalPage(false)}
        />
        <CryptoInfo
          item={cryptoObj}
          onClickButton={() => setIsModalPage(true)}
        />
      </Route>
    </div>
  );
}

export default App;
