require("dotenv").config();

import { log } from "@/libraries/Log";
import { setupDB } from "@/db";
import { setupServer } from "@/server";
import JanitorService from "@/services/JanitorService";
import EventService from "@/services/EventService";

import { setupSockets } from "@/sockets";

process.env.TZ = "UTC"; // IMPORTANT For correct timezone management with DB, Tasks etc.

async function main(): Promise<void> {
  try {
    await setupDB();
    JanitorService.init();
    EventService.init();

    setupSockets();

    setupServer();
  } catch (err) {
    log.error(err);
  }
}

main();