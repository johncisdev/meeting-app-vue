import API from "./api";
import MeetingServices from "./meetings";

const baseUrl = `${location.protocol}//${location.hostname}:5000`;
const service = new API(baseUrl);

const meetings = new MeetingServices(service);

/**
 * Export Available Services
 */
export { meetings };
