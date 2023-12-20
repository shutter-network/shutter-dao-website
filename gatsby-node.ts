import webpack from "webpack";
import { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] =
  async ({ actions }) => {
    actions.setWebpackConfig({
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
      ],
      resolve: {
        fallback: {
          crypto: false,
        },
      },
    });
  };
