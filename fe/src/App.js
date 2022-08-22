import { useReducer, useState } from "react";
import "./App.css";

function App() {
  const characteristics = [
    "Wasteful",
    "Plastic-Free",
    "Locally Produced",
    "Healthy",
    "Humane",
    "Unhealthy",
    "Vegan",
  ];

  // create array for checkbox state
  const [checkedState, setCheckedState] = useState(
    new Array(characteristics.length).fill(false)
  );

  // create object for state of product data
  const initialProductsState = {};
  const [products, updateProduct] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialProductsState
  );

  // function to remove product based on checkbox state
  const RemoveProduct = characteristic => useReducer(
    (state, updates) => ({...state, ...updates}),
    delete products[characteristic],
    products
  )

  // handle checkbox selection
  const handleOnChange = (characteristic, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    checkedState[position]
      ? RemoveProduct(characteristic)
      : getProducts(characteristic).then((data) => {
          const product = data.map((x) => x.name);
          updateProduct({ [characteristic]: product });
        });
  };

  const showProducts = products.length || checkedState.includes(true);

  const getProducts = async (characteristic) => {
    const result = await fetch(
      `http://localhost:8000/products/${characteristic}`
    );
    const data = result.json();
    return data;
  };

  return (
    <div className="App">
      <div className="selectBoxTitle">
        <h2>Characteristics</h2>
        <p>Choose characteristics to see matching products</p>
        <div className="selectBox">
          {characteristics.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={checkedState[index]}
                name={option}
                id={index}
                value={option}
                onChange={() => handleOnChange(option, index)}
              />
              {option}
            </div>
          ))}
        </div>
      </div>
      <div>
        {showProducts ? (
          <div className="productList">
            <h1 className="productTitle">Products</h1>
            <div className="products">
              {Object.entries(products).map(([key, value]) => (
                <div key={key}>
                  <h4>{key}</h4>
                  {products[key].map((item, index) => (
                    <ul key={index}>{item}</ul>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
