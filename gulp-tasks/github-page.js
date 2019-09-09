import { paths } from "../globalConfig";
const ghpages = require("gh-pages");

const deployPage = cb => ghpages.publish(paths.join(process.cwd(), paths.views.dist), cb);

exports.deployPage = deployPage;
