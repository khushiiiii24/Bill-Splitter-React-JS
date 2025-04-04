import React, { useEffect, useState } from "react";

function Bill() {
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState(""); // Allows blank input
  const [total, setTotal] = useState(""); // Allows blank input
  const [billSplit, setBillSplit] = useState("");
  const [perPersonAmount, setPerPersonAmount] = useState(0);
  const [totalTipBalance, setTotalTipBalance] = useState(0);

  useEffect(() => {
    if (billSplit > 0) {
      setPerPersonAmount(
        (Number(total) + Number(totalTipBalance)) / Number(billSplit)
      );
    } else {
      setPerPersonAmount(0);
    }
  }, [billSplit, total, totalTipBalance]);

  function handleSetTip(e) {
    const percentage = parseInt(e.target.innerText);
    setTip(percentage);
    setCustomTip(percentage);
    if (customTip === "") setCustomTip(percentage); // Only set if no custom tip
  }

  function handlePrint() {
    const calculatedTip = (Number(total) * Number(customTip)) / 100;
    setTotalTipBalance(calculatedTip);
    setPerPersonAmount((Number(total) + calculatedTip) / Number(billSplit));
  }

  function resetBtn() {
    setTip(0);
    setCustomTip("");
    setTotal("");
    setBillSplit("");
    setPerPersonAmount(0);
    setTotalTipBalance(0);
  }

  return (
    <div>
      <h1 className="billh1">Bill Splitter</h1>
      <main className="billMain">
        <div className="bill-input">
          <p className="p1">Bill</p>
          <div className="input-container">
            <span>₹</span>
            <input
              id="bill-amount"
              type="number"
              value={total}
              onChange={(e) =>
                setTotal(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          <p className="select-tip">Select Tip</p>
          <div className="tip-container">
            {[5, 10, 15, 25, 50, 75].map((value) => (
              <div key={value} className="tip" onClick={handleSetTip}>
                {value}%
              </div>
            ))}
          </div>

          <input
            className="custom-tip white-input"
            type="number"
            placeholder="Custom Tip in Percent"
            value={customTip}
            onChange={(e) =>
              setCustomTip(e.target.value === "" ? "" : Number(e.target.value))
            }
          />

          <p className="numberofpeople">Number of People</p>
          <input
            className="number-of-people white-input"
            type="number"
            placeholder="Number of people"
            value={billSplit}
            onChange={(e) =>
              setBillSplit(e.target.value === "" ? "" : Number(e.target.value))
            }
          />

          <button className="generate-btn" onClick={handlePrint}>
            Generate Bill
          </button>
        </div>

        <div className="bill-output">
          <p className="tip-amount">
            Tip Amount<span>₹{totalTipBalance.toFixed(2)}</span>
          </p>
          <p className="total-amount">
            Total<span>₹{(Number(total) + totalTipBalance).toFixed(2)}</span>
          </p>
          <p className="each-person-bill">
            Each Person Bill<span>₹{perPersonAmount.toFixed(2)}</span>
          </p>

          <button className="reset-btn" onClick={resetBtn}>
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}

export default Bill;
