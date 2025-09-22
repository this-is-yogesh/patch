import React, { createContext, useCallback, useState, useEffect } from "react";
import Toast from "../components/Toast";
import "../styles/toast.css";
import toastObj from "../services/ToastService";
import type { toastProps } from "../types/ToastProps";

type ContextProps = {
  children: React.ReactNode;
};

type ToastContextType = {
  addNotification: (args: toastProps) => void;
  onUpdate: (id: number) => void;
  onRemove: (id: number) => void;
  handleMouseOver: (id: number) => void;
  handleMouseOut: (id: number) => void;
};
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

function ToastProvider({ children }: ContextProps) {
  const [toasts, setToasts] = useState<toastProps[]>([]);

  useEffect(() => {
    toastObj._registerNotification(addNotification);
  }, []);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setToasts(prev => {
        return prev
          .map(toast => {
            let currentProgress = toast?.progress;
            let totalDuration = toast?.duration;
            let currentProgressState = toast?.preventProgress;
            if (currentProgress && totalDuration && !currentProgressState) {
              let part = totalDuration / currentProgress;
              let percentage = 100 / part;
              toast.progress = currentProgress - percentage;
            }
            return toast;
          })
          .filter(toast => toast.progress && toast.progress > 4);
      });
    }, 200);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const addNotification = useCallback((obj: toastProps) => {
    let id = new Date().getTime();
    setToasts(prev => {
      let a = [{ ...obj, id }, ...prev];
      return a;
    });
  }, []);

  let component = function toastContainer() {
    let positionData = toasts?.[0]?.position || "top-right";
    return (
      <div data-position={positionData} className="toast-container">
        {toasts.map(t => (
          <Toast {...t} key={t.id} />
        ))}
      </div>
    );
  };

  function onUpdate(id: number) {
    setToasts(prev => {
      return prev.map(toast => {
        if (toast.id === id) {
          return { ...toast, exiting: true };
        } else {
          return { ...toast, exiting: false };
        }
      });
    });
  }
  function onRemove(id: number) {
    setToasts(prev => {
      return prev.filter(toast => {
        if (toast.id === id) {
          return false;
        } else {
          return true;
        }
      });
    });
  }
  function handleMouseOver(id: number) {
    setToasts(prev => {
      return prev.map(toast => {
        if (toast.id === id) {
          toast.preventProgress = true;
        }
        console.log(toast, "toast**");
        return toast;
      });
    });
  }
  function handleMouseOut(id: number) {
    setToasts(prev => {
      return prev.map(toast => {
        if (toast.id === id) {
          toast.preventProgress = false;
        }
        return toast;
      });
    });
  }
  return (
    <ToastContext.Provider
      value={{
        addNotification,
        onUpdate,
        onRemove,
        handleMouseOut,
        handleMouseOver,
      }}
    >
      <div>{children}</div>
      <div>{component()}</div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
