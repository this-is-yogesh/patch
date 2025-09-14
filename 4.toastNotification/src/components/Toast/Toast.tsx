import "../../styles/toast.css";
import alert from "../../../public/alert.png";
import info from "../../../public/info.png";
import success from "../../../public/success.png";

type NotificationKeys = "success" | "info" | "danger";
type toastProps = {
  position: string;
  type: NotificationKeys;
  title: string;
  desc: string;
};

const NotificationType: Record<NotificationKeys, string> = {
  success: success,
  info: info,
  danger: alert,
};
export default function Toast({ position, type, title, desc }: toastProps) {
  return (
    <div className="toast-body" data-position={position} data-type={type}>
      <button className="cross">&times;</button>
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
      <span className="progress-bar" />
    </div>
  );
}
