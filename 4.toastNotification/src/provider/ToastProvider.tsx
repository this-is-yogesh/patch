import React, { createContext, useCallback, useState } from "react";
import Toast from "../components/Toast";

type ContextProps = {
  children: React.ReactNode;
};
type NotificationKeys = "success" | "info" | "danger";
type toastProps = {
  position: string;
  type: NotificationKeys;
  title: string;
  desc: string;
  id?: number;
};
type ToastContextType = {
  addNotification: (args: toastProps) => void;
};
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

function ToastProvider({ children }: ContextProps) {
  const [toasts, setToasts] = useState<toastProps[]>([]);
  const [sample, setSample] = useState<boolean>(false);

  const addNotification = useCallback(
    (obj: toastProps) => {
      let id = new Date().getTime();
      console.log("render**");
      setToasts(prev => {
        let a = [{ ...obj, id }, ...prev];
        console.log(a, "a**");
        return a;
      });
    },
    [sample]
  );

  let component = toasts.map(t => <Toast {...t} key={t.id} />);
  return (
    <ToastContext.Provider value={{ addNotification }}>
      {children}
      <div>{component}</div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
