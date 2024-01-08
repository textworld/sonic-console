class ScrapClient {
  constructor(client) {
    this.client = client
  }

  list(params) {
    return this.client.get('/api/scrap_page', Object.assign({}, params))
  }

  update(pageId, params) {
    return this.client.post(`/api/admin/scrap_page/${pageId}`, Object.assign({}, params))
  }
}

exports.ScrapClient = ScrapClient
