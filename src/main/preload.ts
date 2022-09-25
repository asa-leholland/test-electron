import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// define two channels, ipc-example and send-name
export type IpcExampleChannel = 'ipc-example';
export type SendNameChannel = 'send-name';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: IpcExampleChannel, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: IpcExampleChannel, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: IpcExampleChannel, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
