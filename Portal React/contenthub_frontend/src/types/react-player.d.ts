declare module 'react-player' {
  import * as React from 'react';

  export interface ReactPlayerProps {
    url?: string | string[] | null;
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    volume?: number;
    muted?: boolean;
    playbackRate?: number;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    className?: string;
    progressInterval?: number;
    playsinline?: boolean;
    pip?: boolean;
    stopOnUnmount?: boolean;
    light?: boolean | string;
    fallback?: React.ReactNode;
    wrapper?: React.ComponentType<any>;
    playIcon?: React.ReactNode;
    previewTabIndex?: number;
    config?: {
      file?: {
        attributes?: Record<string, any>;
        tracks?: Array<{
          kind: string;
          src: string;
          srcLang?: string;
          label?: string;
          default?: boolean;
        }>;
        forceVideo?: boolean;
        forceAudio?: boolean;
        forceHLS?: boolean;
        forceDASH?: boolean;
        forceFLV?: boolean;
        hlsOptions?: object;
        hlsVersion?: string;
        dashVersion?: string;
        flvVersion?: string;
      };
      youtube?: {
        playerVars?: object;
        embedOptions?: object;
        onUnstarted?: () => void;
      };
      facebook?: {
        appId?: string;
        version?: string;
        playerId?: string;
        attributes?: object;
      };
      dailymotion?: {
        params?: object;
      };
      vimeo?: {
        playerOptions?: object;
      };
      wistia?: {
        options?: object;
      };
      mixcloud?: {
        options?: object;
      };
      soundcloud?: {
        options?: object;
      };
      twitch?: {
        options?: object;
        playerId?: string;
      };
    };
    onReady?: (player: ReactPlayer) => void;
    onStart?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onBuffer?: () => void;
    onBufferEnd?: () => void;
    onEnded?: () => void;
    onError?: (error: any, data?: any, hlsInstance?: any, hlsGlobal?: any) => void;
    onDuration?: (duration: number) => void;
    onSeek?: (seconds: number) => void;
    onProgress?: (state: {
      played: number;
      playedSeconds: number;
      loaded: number;
      loadedSeconds: number;
    }) => void;
    onClickPreview?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onEnablePIP?: () => void;
    onDisablePIP?: () => void;
  }

  class ReactPlayer extends React.Component<ReactPlayerProps> {
    static canPlay(url: string): boolean;
    static canEnablePIP(url: string): boolean;
    static addCustomPlayer(player: ReactPlayer): void;
    static removeCustomPlayers(): void;
    seekTo(amount: number, type?: 'seconds' | 'fraction'): void;
    getCurrentTime(): number;
    getDuration(): number;
    getInternalPlayer(key?: string): any;
    showPreview(): void;
  }

  export default ReactPlayer;
}

declare module 'react-player/lazy' {
  import ReactPlayer from 'react-player';
  export default ReactPlayer;
}
