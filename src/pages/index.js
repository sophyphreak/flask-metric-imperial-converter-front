import React, { useState } from "react"
import axios from 'axios'
import "./style.css"

const IndexPage = () => {
  const [input, setInput] = useState("")
  const [returnedText, setReturnedText] = useState("")
  const [returnedJson, setReturnedJson] = useState("")

  const handleClick = async (e) => {
    e.preventDefault()
    setInput(e.target.value)
    let result;
    try {
      const result = await axios.get(`https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=${input}`)
      console.log(result);
      if (result) {
        setReturnedJson(JSON.stringify(result.data))
        setReturnedText(result.data.string)
      }
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <div>
      <header style={{ marginLeft: "5%", marginTop: "5%" }}>
        <h1>Metric/Imp Converter</h1>
        <h3>By Andrew Horn</h3>
      </header>
      <div style={{ marginLeft: "5%", marginTop: "5%" }}>
        <h3>User Stories</h3>
        <ol>
          <li>
            I will help prevent the client from trying to guess(sniff) the MIME
            type.
          </li>
          <li>I will prevent cross-site scripting (XSS) attacks.</li>
          <li>
            I can <b>GET</b> <code>/api/convert</code> with a single parameter
            containing an accepted number and unit and have it converted.
          </li>
          <li>
            I can convert 'gal' to 'L' and vice versa.{" "}
            <b>(1 gal to 3.78541 L)</b>
          </li>
          <li>
            I can convert 'lbs' to 'kg' and vice versa.{" "}
            <b>(1 lbs to 0.453592 kg)</b>
          </li>
          <li>
            I can convert 'mi' to 'km' and vice versa.{" "}
            <b>(1 mi to 1.60934 km)</b>
          </li>
          <li>
            If my unit of measurement is invalid, returned will be 'invalid
            unit'.
          </li>
          <li>If my number is invalid, returned with will 'invalid number'.</li>
          <li>
            If both are invalid, return will be 'invalid number and unit'.
          </li>
          <li>
            I can use fractions, decimals or both in my parameter(ie. 5, 1/2,
            2.5/6), but if nothing is provided it will default to 1.
          </li>
          <li>
            My return will consist of the initNum, initUnit, returnNum,
            returnUnit, and string spelling out units in format{" "}
            <code>
              {
                "{initNum} {initial_Units} converts to {returnNum} {return_Units}"
              }
            </code>{" "}
            with the result rounded to 5 decimals.
          </li>
        </ol>
        <h3>Example usage:</h3>
        <a href="https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=4gal">
          https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=4gal
        </a>
        <br />
        <a href="https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=1/2km">
          https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=1/2km
        </a>
        <br />
        <a href="https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=5.4/3lbs">
          https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=5.4/3lbs
        </a>
        <br />
        <a href="https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=kg">
          https://flask-metric-imperial-converter.andrew-horn-portfolio.life/api/convert/?input=kg
        </a>
        <br />
        <br />
        <h3>Example return:</h3>
        <code>
          {
            "{initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', string: '3.1 miles converts to 5.00002 kilometers'}"
          }
        </code>
      </div>
      <hr style={{ margin: "50px" }} />
      <div style={{ marginLeft: "5%" }}>
        <h2 style={{ textAlign: "left" }}>Front-End:</h2>
        <form>
          <input
            type="text"
            name="input"
            placeholder="3.1mi"
            style={{ width: "200px" }}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button onClick={handleClick}>Convert!</button>
        </form>
        <p>{returnedText}</p>
        <code>{returnedJson}</code>
      </div>
      <hr style={{ margin: "50px", marginTop: "200px" }} />
    </div>
  )
}

export default IndexPage
