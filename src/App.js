import Stocks from "./components/Stocks/Stocks";
import { Routes,Route } from "react-router-dom";
import { StockDetails } from "./components/StockDetail/StockDetails";

function App() {
  return (
    <main className="container">
      <Routes>
    <Route path="/" element={<Stocks/>}/>
    <Route path="/detail/:symbol" element={<StockDetails/>}/>
      </Routes>
    </main>
  );
}

export default App;
