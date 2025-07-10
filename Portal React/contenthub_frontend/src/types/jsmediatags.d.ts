declare module 'jsmediatags' {
  interface Tags {
    title?: string;
    artist?: string;
    album?: string;
    year?: string;
    comment?: string;
    track?: string;
    genre?: string;
    picture?: {
      format: string;
      data: number[];
    };
  }

  interface TagResult {
    tags: Tags;
  }

  interface Options {
    onSuccess: (tag: TagResult) => void;
    onError: (error: Error) => void;
  }

  function read(url: string, options: Options): void;

  export { read };
  export default { read };
}
