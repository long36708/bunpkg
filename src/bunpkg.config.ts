import {
  DEFAULT_PORT,
  DEFAULT_HOST,
  DEFAULT_CACHE_DIR,
  DEFAULT_CACHE_MAX_SIZE,
  DEFAULT_NPM_REGISTRY,
  DEFAULT_NPM_MAX_TGZ_SIZE
} from "./common/constants";

export const BunPkgConfig = {
  /** 服务器相关 */
  server: {
    /**
     * 端口号
     * @default process.env.PORT || DEFAULT_PORT
     */
    port: DEFAULT_PORT,
    /**
     * 主机名
     * @default process.env.HOST || DEFAULT_HOST
     */
    // host: DEFAULT_HOST,
    /**
     * 跨域配置
     * @default {origin:  process.env.CORS_ORIGIN } || Paramaters<typeof cors[0]>
     * @docuemnt see more https://elysiajs.com/plugins/cors.html#config
     */
    cors: {
      origin: "*",
    },
  },
  /** 缓存配置  */
  cache: {
    /**
     * 缓存硬盘占用空间最大值 (Gib)
     * @default process.env.CACHE_MAX_SIZE || DEFAULT_CACHE_MAX_SIZE
     */
    maxSize: DEFAULT_CACHE_MAX_SIZE,
    /**
     * 磁盘缓存目录位置
     * @default process.env.CACHE_DIR || DEFAULT_CACHE_DIR
     */
    dir: DEFAULT_CACHE_DIR,
  },
  /** NPM 配置 */
  npm: {
    /**
     * 上游 NPM 源地址
     * @default process.env.NPM_REGISTRY || DEFAULT_NPM_REGISTRY
     */
    registry: DEFAULT_NPM_REGISTRY,
    /**
     * 私有 npm 认证头
     * Authorization: Bearer ${authToken}
     */
    // authToken: "",
    /**
     * 支持最大 npm tgz 压缩包尺寸 (mib)
     * @default DEFAULT_NPM_MAX_TGZ_SIZE (Mib)
     * @default process.env.NPM_MAX_TGZ_SIZE || DEFAULT_NPM_MAX_TGZ_SIZE
     **/
    maxTgzSize: DEFAULT_NPM_MAX_TGZ_SIZE,
  },
  esm: {
    /**
     * ESM 前缀配置
     * @default process.env.ESM_ORIGIN
     */
    origin: "",
  },
  /**
   * 是否开启 JWT 认证, 只有有当前配置项并添加了 secret 的情况下才会开启
   *  seemore https://elysiajs.com/plugins/jwt.html
   */
  jwt: {
    //   /**
    //    * 认证密钥
    //    * @default process.env.JWT_SECRET
    //    **/
    //   secret: "",
  },
};
