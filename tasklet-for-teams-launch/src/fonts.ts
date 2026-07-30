import { loadFont as loadLocalFont } from "@remotion/fonts";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { staticFile } from "remotion";

export const { fontFamily: interFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

let seasonLoaded: Promise<void> | null = null;

export const ensureSeasonMix = () => {
  if (!seasonLoaded) {
    seasonLoaded = Promise.all([
      loadLocalFont({
        family: "Season Mix",
        url: staticFile("fonts/SeasonMixUprightsVF.woff2"),
        weight: "300 900",
      }),
      loadLocalFont({
        family: "Season Mix",
        url: staticFile("fonts/SeasonMixItalicsVF.woff2"),
        weight: "300 900",
        style: "italic",
      }),
    ]).then(() => undefined);
  }
  return seasonLoaded;
};
