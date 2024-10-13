// src/@types/react-to-print.d.ts
declare module "react-to-print" {
  import { ComponentType } from "react";

  export interface ReactToPrintProps {
    trigger: () => JSX.Element; // Function returning JSX to trigger print
    content: () => HTMLElement | null; // Function returning the content to print
    documentTitle?: string; // Optional title for the printed document
  }

  const ReactToPrint: ComponentType<ReactToPrintProps>;
  export default ReactToPrint;
}
