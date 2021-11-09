/**
 * API class - simple reusable http transporter using fetch API
 */
export default class API {
  constructor(url) {
    this.url = url;
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  get = async (id) => {
    const res = await fetch(`${this.url}${id ? `?id=${id}` : ""}`);
    return res.json();
  };

  post = async (payload) => {
    const res = await fetch(this.url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(payload),
    });

    return res.json();
  };

  patch = async (payload) => {
    const res = await fetch(`${this.url}/${payload.id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(payload),
    });

    return res.json();
  };

  delete = async (data) => {
    const res = await fetch(`${this.url}/${data}`, {
      method: "DELETE",
      headers: this.headers,
    });

    return res.json();
  };
}
