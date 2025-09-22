type NotificationKeys = "success" | "info" | "danger";
export type toastProps = {
  position: string;
  type: NotificationKeys;
  title: string;
  desc: string;
  id?: number;
  exiting?: boolean;
  progress?: number;
  duration?: number;
  preventProgress?: boolean;
  // handleMouseOver?: (id: number) => void;
  // handleMouseOut?: (id: number) => void;
};
