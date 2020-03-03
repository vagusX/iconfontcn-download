declare function DownloadIconfontCN(config: DownloadIconfontCN.DownloadIconfontCNConfig): void;

const defaultExtnameList = <const>['css', 'eot', 'woff', 'woff2', 'ttf', 'svg']

declare namespace DownloadIconfontCN {
  const defaultExtnameList = <const>['css', 'eot', 'woff', 'woff2', 'ttf', 'svg']

  interface DownloadIconfontCNConfig {
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
    cssOffline?: boolean;
    /**
     * specify which file to download
     */
    extnameList?: Array<typeof defaultExtnameList>
  }
}

export = DownloadIconfontCN;
