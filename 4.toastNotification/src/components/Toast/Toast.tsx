import "../../styles/toast.css";
import alert from "../../../public/alert.png";
import info from "../../../public/info.png";
import success from "../../../public/success.png";
import { useContext } from "react";
import { ToastContext } from "../../provider/ToastProvider";
import type { toastProps } from "../../types/ToastProps";

type NotificationKeys = "success" | "info" | "danger";

const NotificationType: Record<NotificationKeys, string> = {
  success: success,
  info: info,
  danger: alert,
};
export default function Toast({
  position,
  type,
  title,
  desc,
  id,
  exiting,
  progress,
}: toastProps) {
  let obj = useContext(ToastContext);
  if (!obj) throw new Error("Object not found");
  const { onUpdate, onRemove, handleMouseOver, handleMouseOut } = obj;
  function updateToastCB() {
    if (id) {
      onUpdate(id);
    }
  }

  let className: string = "toast-body";
  if (exiting) {
    className += " exiting-toast";
  }
  function handleAnimationEnd() {
    if (id) {
      onRemove(id);
    }
  }

  function pauseProgress() {
    if (id && handleMouseOver) {
      handleMouseOver(id);
    }
  }
  function resumeProgress() {
    if (id && handleMouseOut) {
      handleMouseOut(id);
    }
  }
  console.log('provider*')
  return (
    <div
      className={className}
      onAnimationEnd={handleAnimationEnd}
      data-position={position}
      data-type={type}
      onMouseOver={pauseProgress}
      onMouseOut={resumeProgress}
    >
      <button className="cross" onClick={updateToastCB}>
        &times;
      </button>
      <div className="toast-left-right">
        <div className="toast-left">
          <img src={NotificationType[type]} width={"24px"} height={"24px"} />
          <div className="title-desc">
            <span>{title}</span>
            <span>{desc}</span>
          </div>
        </div>
        {/* <button className="toast-right"></button> */}
      </div>
      <span style={{ width: `${progress}%` }} className="progress-bar" />
    </div>
  );
}
