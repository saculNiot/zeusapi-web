import { Report } from "./report_model";

export class File {
  fileId: string;
  parentFolderId: string;
  filename: string;
  createdBy: string;
  createdAt: string;
  lastModified: Date;
  isStarred: boolean;
  size: Number;
  preview?: Report;

  constructor(prop: {
    fileId: string;
    parentFolderId: string;
    filename: string;
    createdBy: string;
    createdAt: string;
    lastModified: Date;
    isStarred: boolean;
    size: Number;
  }) {
    this.fileId = prop.fileId;
    this.parentFolderId = prop.parentFolderId;
    this.filename = prop.filename;
    this.createdBy = prop.createdBy;
    this.createdAt = prop.createdAt;
    this.lastModified = prop.lastModified;
    this.isStarred = prop.isStarred;
    this.size = prop.size;
  }

  toJson(): Map<String, any> {
    return new Map<String, any>([
      ["file_id", this.fileId],
      ["parent_folder", this.parentFolderId],
      ["filename", this.filename],
      ["created_by", this.createdBy],
      ["created_at", this.createdAt],
      ["last_modified", this.lastModified],
      ["starred", this.isStarred],
      ["size", this.size],
    ]);
  }

  static fromJson(json: Map<String, any>): File {
    return new File({
      fileId: json.get("file_id"),
      parentFolderId: json.get("parent_folder"),
      filename: json.get("filename"),
      createdBy: json.get("created_by"),
      createdAt: json.get("created_at"),
      lastModified: new Date(json.get("last_modified")),
      isStarred: json.get("starred"),
      size: json.get("size"),
    });
  }
}
