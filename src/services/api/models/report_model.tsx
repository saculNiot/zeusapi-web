export class Report {
  reportId: string;
  fileId: string;
  title: string;
  url: string;

  constructor(prop: {
    reportId: string;
    fileId: string;
    title: string;
    url: string;
  }) {
    this.reportId = prop.reportId;
    this.fileId = prop.fileId;
    this.title = prop.title;
    this.url = prop.url;
  }

  toJson(): Map<String, any> {
    return new Map<String, any>([
      ["report_id", this.reportId],
      ["file", this.fileId],
      ["title", this.title],
      ["url", this.url],
    ]);
  }

  static fromJson(json: Map<String, any>): Report {
    return new Report({
      reportId: json.get("report_id"),
      fileId: json.get("file"),
      title: json.get("title"),
      url: json.get("url"),
    });
  }
}
