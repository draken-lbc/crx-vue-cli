/// <reference types="vite/client" />
export declare global {
  interface Window {
    // ISDEV: boolean
    devtoolsSendContentScript: (data: any) => void
  }
  var ISDEV: boolean
}
