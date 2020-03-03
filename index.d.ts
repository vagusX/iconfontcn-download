declare function IconfontCnDownload(config: IconfontCnDownload.IconfontCnDownloadConfig): void;

declare namespace IconfontCnDownload {
  const { cssUrl, targetDir, filename = 'iconfont', offline = true } = config
  interface IconfontCnDownloadConfig {
    /**
     * css url from your iconfont.cn project
     */
    cssUrl: string;
    /**
     * where to locate font assets
     * @default process.cwd()
     */
    targetDir?: string;
    /**
     * file name for font asset
     * @default 'iconfont'
     */
    filename?: string;
    /**
     * replace font asset path to local relative path
     * @default true
     */
    offline?: boolean;
  }
}

export = IconfontCnDownload;
