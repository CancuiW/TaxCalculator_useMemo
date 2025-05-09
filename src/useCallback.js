import React, { useState, useMemo, useCallback } from "react";

const TAX_BANDS = [
    { limit: 12570, rate: 0 },
    { limit: 50270, rate: 0.2 },
    { limit: 125140, rate: 0.4 },
    { limit: Infinity, rate: 0.45 },
];

function calculateIncomeTax(income) {
    console.log("counting.......");
    let tax = 0;
    let previousLimit = 0;

    for (const band of TAX_BANDS) {
        if (income > band.limit) {
            tax += (band.limit - previousLimit) * band.rate;
            previousLimit = band.limit;
        } else {
            tax += (income - previousLimit) * band.rate;
            break;
        }
    }
    return tax;
}

export default function Calculator() {
    const [income, setIncome] = useState("");

    // useMemo hook :caching calculation results
    const tax = useMemo(() => {
        return calculateIncomeTax(income);
    }, [income]);

    // 使用useMemo缓存净收入计算
    const netIncome = useMemo(() => {
        return income - tax;
    }, [income, tax]);

    // 使用useCallback缓存事件处理函数
    const handleIncomeChange = useCallback((e) => {
        const value = Math.max(0, Number(e.target.value) || 0);
        setIncome(value);
    }, []); // 空依赖数组表示这个函数不会依赖任何变化的值

    return (
        <div>
            <h1>UK Income Tax Calculator</h1>
            <div>
                <input
                    type="text"
                    style={{ width: "180px", padding: "8px 12px" }}
                    value={income}
                    onChange={handleIncomeChange}
                    placeholder="Enter your annual income"
                />
            </div>
            {income > 0 && (
                <div>
                    <div
                        style={{
                            textAlign: "left",
                            background: "#f5f5f5",
                            padding: "15px",
                            marginTop: "20px"
                        }}
                    ></div>
                    <h3>Results</h3>
                    <p>Taxes: £{tax.toFixed(2)}</p>
                    <p>After Tax Income: £{netIncome.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}