import { defineManifest } from "@crxjs/vite-plugin"
import { version } from "../package.json"

export default defineManifest ({
    manifest_version: 3,
    name: "Solid Structure",
    description: "DevTool for SolidJS application",
    version,
    devtools_page: "dist/devtools.html",
    permissions: ["debugger", "clipboardRead", "clipboardWrite", "idle", "tabs", "activeTab", "scripting"],
    host_permissions: ["file:///*", "http://*/*", "https://*/*"],
    background: {
      service_worker: "./background.ts",
      type: "module",
    },
    action: {
      default_icon: {
        "48": "assets/logo48-on.png",
        "128": "assets/logo128-on.png"
      },
      default_title: "Solid Structure",
    },
    icons:{
      "48": "assets/logo48-off.png",
      "128": "assets/logo128-off.png"
    },
    content_scripts: [
      {
        "matches": ["http://*/*", "https://*/*"],
        "js": ["./contentScript.js"],
        "run_at": "document_start"
      }
    ],
})