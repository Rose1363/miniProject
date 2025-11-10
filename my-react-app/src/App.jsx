import { useState } from 'react'

function App() {
  const [items, setItems] = useState(["Sauce Labs Backpack", "Bike Light", "Bolt T-Shirt"])

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🧪 Mini Cypress Demo</h1>
      <ul style={{ listStyle: "none" }}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => alert("Test Passed!")}>Click Me</button>
    </div>
  )
}

export default App
