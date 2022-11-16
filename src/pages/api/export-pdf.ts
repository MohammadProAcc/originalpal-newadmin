import express from "express";
import fs from "fs";
import getConfig from "next/config";
import path from "path";

export default function handler(
  req: express.Request,
  res: express.Response,
) {
  const config = getConfig();

  const dirRelativeToPublicFolder = "templates";

  console.log(config);
  // const dir = path.join(
  //   serverRuntimeConfig.PROJECT_ROOT,
  //   "./public",
  //   dirRelativeToPublicFolder,
  // );

  // const filenames = fs.readdirSync(dir);
  // filenames.forEach(_fn => {
  //   if (_fn === "pdf-export.html") {
  //     res.json(_fn);
  //   }
  // });
}
