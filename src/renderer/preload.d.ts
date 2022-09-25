import { IpcExampleChannel, SendNameChannel } from 'main/preload';

type GenericChannel = IpcExampleChannel | SendNameChannel;

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: GenericChannel, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
