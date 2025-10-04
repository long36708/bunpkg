import defu from "defu";

const keepNumber = (x?: string) => {
  if (!x) return undefined;
  return /^\d+$/.test(x) ? Number.parseInt(x) : undefined;
};

import { BunPkgConfig as CustomConfig } from "./bunpkg.config";
import {
  DEFAULT_PORT,
  DEFAULT_HOST,
  DEFAULT_CACHE_DIR,
  DEFAULT_CACHE_MAX_SIZE,
  DEFAULT_NPM_REGISTRY,
  DEFAULT_NPM_MAX_TGZ_SIZE
} from "./common/constants";

const env = {
  server: {
    port: keepNumber(Bun.env.PORT),
    host: Bun.env.HOST,
    cros: {
      origin: Bun.env.CORS_ORIGIN,
    },
  },
  cache: {
    dir: Bun.env.CACHE_DIR,
    maxSize: keepNumber(Bun.env.CACHE_MAX_SIZE),
  },
  esm: {
    origin: Bun.env.ESM_ORIGIN,
  },
  npm: {
    registry: Bun.env.NPM_REGISTRY,
    authToken: Bun.env.NPM_AUTHTOKEN,
    maxTgzSize: keepNumber(Bun.env.NPM_MAX_TGZ_SIZE),
  },
  jwt: {
    secret: Bun.env.JWT_SECRET,
  },
};

const defaults = {
  server: {
    port: DEFAULT_PORT,
    cors: {
      origin: true,
    },
    // host: DEFAULT_HOST,
  },
  cache: {
    dir: DEFAULT_CACHE_DIR,
    maxSize: DEFAULT_CACHE_MAX_SIZE,
  },
  esm: {
    origin: "",
  },
  npm: {
    registry: DEFAULT_NPM_REGISTRY,
    maxTgzSize: DEFAULT_NPM_MAX_TGZ_SIZE,
  },
  jwt: {
    secret: "",
  },
  // TODO, reference esm.sh#config
  // allowList: []
  // banList: []
} as const;

export const EMPTY_JWT_SECRET = "EMPTY_JWT_SECRET";

const merged = defu(env, CustomConfig, defaults);

const safe = (conf: typeof merged): typeof merged => {
  conf.jwt.secret = conf.jwt.secret ? conf.jwt.secret : EMPTY_JWT_SECRET;
  conf.npm.registry = conf.npm.registry.replace(/\/$/, "");
  // fix cors plugin bug
  if (conf.server.cors.origin && conf.server.cors.origin === "*") {
    conf.server.cors.origin = true;
  }
  return conf;
};

export const BunPkgConfig = safe(merged);
