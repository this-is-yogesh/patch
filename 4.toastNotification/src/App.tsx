import { useState, useContext, use } from "react";
import "./App.css";
import Toast from "./components/Toast";
import { ToastContext } from "./provider/ToastProvider";
import toastObj from "./services/ToastService";
type toastProps = {
  position: string;
  type: "success" | "info" | "danger";
  title: string;
  desc: string;
  id?: number;
};
function App() {
  const [showToast, setShoWToast] = useState(false);
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useContext must be used within ToastProvider");
  }
  const { addNotification } = context;

  function showToastFunction() {
    let obj: toastProps = {
      position: "top-right",
      type: "info",
      title: "message title",
      desc: "",
    };
    toastObj._startNotification(obj);
    //addNotification(obj);
  }
  return (
    <>
      <button onClick={showToastFunction}>show toast</button>
      {/* {showToast && (
        <Toast
          position={"top-right"}
          type={"danger"}
          title="message title"
          desc=""
        />
      )} */}
    </>
  );
}

export default App;
