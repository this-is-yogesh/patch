import { useState, useContext, use } from "react";
import "./App.css";
import Toast from "./components/Toast";
import { ToastContext } from "./provider/ToastProvider";
import toastObj from "./services/ToastService";
import ToastProvider from "./provider/ToastProvider.tsx";
import type { toastProps } from "./types/ToastProps.ts";

function App() {
  const [showToast, setShoWToast] = useState(false);
  // const context = useContext(ToastContext);
  // if (!context) {
  //   throw new Error("useContext must be used within ToastProvider");
  // }
  // const { addNotification } = context;

  function showToastFunction() {
    let obj: toastProps = {
      position: "top-right",
      type: "success",
      title: "You have a notification",
      desc: "",
      progress: 100,
      duration: 5000,
    };
    toastObj._startNotification(obj);
    //addNotification(obj);
  }
  return (
    <>
      <ToastProvider>
        <></>
      </ToastProvider>
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
