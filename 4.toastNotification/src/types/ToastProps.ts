type NotificationKeys = "success" | "info" | "danger";
export type toastProps = {
  position: string;
  type: NotificationKeys;
  title: string;
  desc: string;
  id?: number;
  exiting?: boolean;
};
