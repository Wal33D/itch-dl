declare module 'cli-progress' {
  export interface BarOptions {
    format?: string;
    fps?: number;
    stream?: NodeJS.WriteStream;
    stopOnComplete?: boolean;
    clearOnComplete?: boolean;
    barsize?: number;
    position?: string;
    barCompleteChar?: string;
    barIncompleteChar?: string;
    hideCursor?: boolean;
    linewrap?: boolean;
    etaBuffer?: number;
    synchronousUpdate?: boolean;
    emptyOnZero?: boolean;
    forceRedraw?: boolean;
  }

  export interface MultiBarOptions extends BarOptions {
    autopadding?: boolean;
    autopaddingChar?: string;
  }

  export class Bar {
    constructor(options?: BarOptions, preset?: any);
    start(total: number, startValue?: number, payload?: any): void;
    update(current: number, payload?: any): void;
    increment(delta?: number, payload?: any): void;
    getTotal(): number;
    getProgress(): number;
    stop(): void;
  }

  export class SingleBar extends Bar {}

  export class MultiBar {
    constructor(options?: MultiBarOptions, preset?: any);
    create(total: number, startValue?: number, payload?: any): Bar;
    remove(bar: Bar): boolean;
    stop(): void;
  }

  export const Presets: {
    shades_classic: any;
    shades_grey: any;
    legacy: any;
    rect: any;
  };
}
