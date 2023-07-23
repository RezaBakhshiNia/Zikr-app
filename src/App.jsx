import { useReducer, useState, useEffect } from "react";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREAMENT":
      return { count: state.count + 1, showText: state.showText };
    case "toggleShowText":
      return { count: state.count, showText: !state.showText };
    case "Decreament":
      return {
        count: state.count > 0 ? state.count - 1 : state.count,
        showText: state.showText,
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [zekr, setZekr] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 40) {
        // 40 is the key code for the arrow down key
        dispatch({ type: "Decreament" });
      } else if (event.keyCode === 38) {
        // 38 is the key code for the arrow up key
        dispatch({ type: "INCREAMENT" });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div id="Zekr">
        <div className="inser-Zekr">
          <input type="text" placeholder="ذکر خود را وارد کنید." />
          <button
            onClick={(event) => {
              setZekr(event.target.parentNode.firstChild.value);
              event.target.parentNode.firstChild.value = "";
            }}
          >
            ذخیره
          </button>
        </div>
        <h1>{zekr || "ذکری وارد کنید"}</h1>
      </div>
      <div className="counter">
        <button
          onClick={() => {
            dispatch({ type: "INCREAMENT" });
          }}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
        <h1>{state.count}</h1>
        <button
          onClick={() => {
            dispatch({ type: "Decreament" });
          }}
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
      <p>
        <em>از دو جهت بالا و پایین صفحه کلید نیز می توانید استفاده کنید.</em>
      </p>
    </>
  );
}

export default App;
