import { build } from "esbuild";

const isWatchMode = () => false;
const config = {};

async function bootstrap() {
  console.log(`starting`, config);

  await build({
    entryPoints: ["./src/main.ts"],
    bundle: true,
    format: "esm",
    outdir: `dist`,
    outExtension: { ".js": ".mjs" },
    sourcemap: "external",
    platform: "node",
    target: [`node14`],
    external: [],
    watch: isWatchMode()
      ? {
          onRebuild(err, result) {
            if (err) console.error("watch build failed:", err);
            else console.log("watch build succeeded");
          },
        }
      : undefined,
    // banner: {
    //   js: constructServerBannerEnvInjection(getBTEnvVarsForBannerInjection()),
    // },
  });

  console.log(`build complete`);
}

bootstrap()
  .then(() => {
    if (!isWatchMode()) {
      console.log(`build done, exiting now.`);
      process.exit(0);
    }
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
