import * as winston from "winston";
import * as SegfaultHandler from "segfault-handler";
import * as fs from "fs";
import * as path from "path";
import { config } from "@/config/config";

export const log = new winston.Logger();
export const requestLog = new winston.Logger();

// Setting up logger
const logDir = path.join(process.env.HOME, ".backend-logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

SegfaultHandler.registerHandler(path.join(logDir, "backend-segfault.log"));

// A console transport logging debug and above.
log.add(winston.transports.Console, {
  level: config.log.level,
  colorize: true,
  timestamp: true,
});

// A file based transport logging only errors formatted as json.
log.add(winston.transports.File, {
  name: "error-file",
  level: "error",
  filename: path.join(logDir, "backend-error.log"),
  json: true,
});

log.add(winston.transports.File, {
  name: "warn-file",
  level: "warn",
  filename: path.join(logDir, "backend-warn.log"),
  json: true,
});

log.add(winston.transports.File, {
  name: "debug-file",
  level: "debug",
  filename: path.join(logDir, "backend-debug.log"),
  json: true,
});

requestLog.add(winston.transports.Console, {
  level: config.log.level,
  colorize: true,
  timestamp: true,
});

requestLog.add(winston.transports.File, {
  name: "request-file",
  level: "info",
  filename: path.join(logDir, "backend-requests.log"),
  json: true,
});

export const requestLogStream: any = {
  write: function(message) {
    requestLog.info(message.trim());
  },
};
