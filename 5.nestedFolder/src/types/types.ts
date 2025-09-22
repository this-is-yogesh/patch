export interface dataType {
  id: number;
  name: string;
  type: "folder" | "file";
  children: dataType[];
  expanded?: boolean;
  addMore?: boolean;
}
