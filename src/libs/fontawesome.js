import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faL, fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false; // mematikan auti ading css
library.add(fas, far, fab, faL);
