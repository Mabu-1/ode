import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';

const MathComponent = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [xValue, setXValue] = useState(null);
  const [NValue, setNValue] = useState(null);
  const [step, setStep] = useState(null);

  const handleInputChange = (event, inputType) => {
    const value = event.target.value;
    if (inputType === 'inputValue') {
      setInputValue(value);
    } else if (inputType === 'inputValue1') {
      setInputValue1(value);
    } else if (inputType === 'inputValue2') {
      setInputValue2(value);
    }
  };

  const handleAddData = () => {
    const newXValue = parseFloat(inputValue);
    const newNValue = parseFloat(inputValue1);
    const newStep = parseFloat(inputValue2);
    setXValue(newXValue);
    setNValue(newNValue);
    setStep(newStep);
    setInputValue('');
    setInputValue1('');
    setInputValue2('');

    if (!isNaN(newXValue) && !isNaN(newNValue) && !isNaN(newStep)) {
      const N0 = newNValue;
      const lambda = 0.05;
      let t0 = 0.0;
      const N = newStep;

      const lineData = [];
      const barData = [];

      for (let t = 1; t <= newXValue; t++) {
        const realValue = N0 * Math.exp(-lambda * t);
        const result1 = eulerMethod(t0, N0, t, N, lambda);
        const result2 = heunsMethod(t0, N0, t, N, lambda);
        const result3 = rungeKuttaMethod(t0, N0, t, N, lambda);

        if (t === newXValue) {
          const dif1 = (Math.abs(realValue - result1))/realValue;
          const dif2 = (Math.abs(realValue - result2))/realValue;
          const dif3 = (Math.abs(realValue - result3))/realValue;
          barData.push({
            method: 'Euler',
            value: dif1.toFixed(7),
          });
          barData.push({
            method: 'Heuns',
            value: dif2.toFixed(7),
          });
          barData.push({
            method: 'Runge-Kutta',
            value: dif3.toFixed(7),
          });
        }

        lineData.push({
          t: t,
          Real: realValue.toFixed(7),
          Euler: result1.toFixed(7),
          Heuns: result2.toFixed(7),
          Rk: result3.toFixed(7),
        });
      }

      setLineChartData(lineData);
      setBarChartData(barData);
    }
  };

  const eulerMethod = (t0, N0, goal_t, N, lambda) => {
    let h = (goal_t - t0) / N;
    let N_final = N0;

    for (let i = 0; i < N; i++) {
      N_final = N_final + h * (-lambda * N_final);
      t0 += h;
      
    }

    return N_final;
  };

  const rungeKuttaMethod = (t0, N0, goal_t, N, lambda) => {
    let h = (goal_t - t0) / N;
    let N_final = N0;

    for (let i = 0; i < N; i++) {
      let k1 = -lambda * N_final;
      let k2 = -lambda * (N_final + (h / 2) * k1);
      let k3 = -lambda * (N_final + (h / 2) * k2);
      let k4 = -lambda * (N_final + h * k3);

      N_final = N_final + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      t0 += h;
    }

    return N_final;
  };

  const heunsMethod = (t0, N0, goal_t, N, lambda) => {
    let h = (goal_t - t0) / N;
    let N_final = N0;

    for (let i = 0; i < N; i++) {
      let k1 = -lambda * N_final;
      let k2 = -lambda * (N_final + h * k1);
      N_final = N_final + (h / 2) * (k1 + k2);
      t0 += h;
    }

    return N_final;
  };

  return (
    <div>
      <div className='flex justify-center gap-4 py-5'>
        <input
          className='border-4 p-2 rounded-md'
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e, 'inputValue')}
          placeholder="Enter t value"
        />
        <input
          className='border-4 p-2 rounded-md'
          type="text"
          value={inputValue1}
          onChange={(e) => handleInputChange(e, 'inputValue1')}
          placeholder="Enter N value"
        />
        <input
          className='border-4 p-2 rounded-md'
          type="text"
          value={inputValue2}
          onChange={(e) => handleInputChange(e, 'inputValue2')}
          placeholder="Enter step size"
        />
        <button
          className="bg-red-600 border-4 border-blue-400 rounded-md px-4 py-2 text-white hover:bg-red-700"
          onClick={handleAddData}
        >
          Add Data
        </button>
      </div>

      <div>
        <h3 className='text-3xl font-extrabold'>Line Chart </h3>
        <LineChart width={600} height={400} data={lineChartData}>
          <XAxis dataKey="t" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Real" stroke="#8884d8" strokeWidth={3} />
          <Line type="monotone" dataKey="Euler" stroke="#82ca9d" strokeWidth={3} />
          <Line type="monotone" dataKey="Heuns" stroke="#ffc658" strokeWidth={3} />
          <Line type="monotone" dataKey="Rk" stroke="#ff7300" strokeWidth={3} />
        </LineChart>
      </div>
      <div>
        <h3 className='text-3xl font-extrabold' >Bar Chart</h3>
        <BarChart width={600} height={400} data={barChartData}>
          <XAxis dataKey="method" />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default MathComponent;
