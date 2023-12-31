import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [fromYear, setFromYear] = useState(new Date().getFullYear());
  const [toYear, setToYear] = useState(new Date().getFullYear());
  const [fromSemester, setFromSemester] = useState();
  const [toSemester, setToSemester] = useState();
  const [qualifies, setQualifies] = useState(true);
  const [calculating, setCalculating] = useState(false)

  useEffect(() => {
    setCalculating(true);
    setTimeout(() => {
      const yearDiff = toYear - fromYear;
      if (yearDiff < 3) {
        setQualifies(true);
      } else {
        if (yearDiff === 3) {
          setQualifies(toSemester <= fromSemester);
        } else {
          setQualifies(false);
        }
      }
      setCalculating(false);
    }, 200)
    
  }, [fromYear, fromSemester, toYear, toSemester])

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td>
              <label className="label" htmlFor="option1">Last quarter attended:</label>
            </td>
            <td>
              <select className="semester" id="option1" onChange={(e) => setFromSemester(e.target.value)}>
                <option value={1}>Winter</option>
                <option value={2}>Spring</option>
                <option value={3}>Summer</option>
                <option value={4}>Fall</option>
              </select>
            </td>
            <td>
              <input
              className="year"
              type="number"
              step={1}
              value={fromYear}
              onChange={(e) => setFromYear(e.target.value)}
            />
            </td>
          </tr>

          <tr>
            <td>
            <label className="label" htmlFor="option2">Quarter to attend:</label>
            </td>
            <td>
            <select className="semester" id="option2" onChange={(e) => setToSemester(e.target.value)}>
            <option value={1}>Winter</option>
            <option value={2}>Spring</option>
            <option value={3}>Summer</option>
            <option value={4}>Fall</option>
          </select>
            </td>
            <td>
            <input
            className="year"
            type="number"
            step={1}
            value={toYear}
            onChange={(e) => setToYear(e.target.value)}
          />
            </td>
          </tr>
        </tbody>
      </table>

      {qualifies && (
        <span className={["green", calculating === true ? "fadeOut" : "fadeIn"].join(" ")}>You don't need to reapply</span>
      )}
      {!qualifies && (
        <div className={["red", calculating === true ? "fadeOut" : "fadeIn"].join(" ")}>
          You need to reapply
          <a href="https://apply.ctc.edu/user">Click here to apply now</a>
        </div>
      )}
    </div>
  );
}

export default App;

