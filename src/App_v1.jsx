import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const apiUrl = "https://api.frankfurter.app/latest";

// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState("");

  function handleFromRateChange(value) {
    setFrom(value);
    console.log(value);
    console.log(from);
  }

  function handleToRateChange(value) {
    setTo(value);
    console.log(value);
    console.log(to);
  }

  function handleAmountChange(value) {
    setAmount(value);
    console.log(value);
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchData() {
        try {
          const response = await fetch(
            `${apiUrl}?amount=${amount}&from=${from}&to=${to}`,
            {
              signal: controller.signal,
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log(data);

          setResult(data.rates[to]);

          if (data.Response === "False") {
            alert("Invalid Query");
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Fetch error:", error);
          }
        }
        return () => {
          controller.abort(); // クリーンアップ
        };
      }
      fetchData();
    },
    [amount, from, to]
  );

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
        />
        <select onChange={(e) => handleFromRateChange(e.target.value)}>
          <option value="JPY">JPY</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
        </select>
        <select onChange={(e) => handleToRateChange(e.target.value)}>
          <option value="JPY">JPY</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
        </select>
        <Result result={result} />
      </div>
    </>
  );
}

function Result({ result }) {
  return (
    <div>
      <p>{result}</p>
    </div>
  );
}

export default App;
