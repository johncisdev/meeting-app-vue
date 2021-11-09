import API from "./api";

class MeetingService extends API {
  constructor(service) {
    super(`${service.url}/meetings`);
  }
}

export default MeetingService;
