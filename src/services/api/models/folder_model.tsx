export class Folder {
  // Required parameters
  name: string;

  // Optional parameters
  folderId?: string;
  created_by?: string;
  created_at?: Date;
  isStarred?: boolean;
  size?: Number;

  // Foreign key
  parentFolderId?: string;

  constructor(prop: {
    name: string;
    folderId?: string;
    created_by?: string;
    created_at?: Date;
    isStarred?: boolean;
    size?: Number;
    parentFolderId?: string;
  }) {
    this.name = prop.name;
    this.folderId = prop.folderId;
    this.created_by = prop.created_by;
    this.created_at = prop.created_at;
    this.parentFolderId = prop.parentFolderId;
    this.isStarred = prop.isStarred;
    this.size = prop.size;
  }

  toJson(): Map<String, any> {
    return new Map<String, any>([
      ["folder_id", this.folderId],
      ["name", this.name],
      ["created_by", this.created_by],
      ["created_at", this.created_at],
      ["starred", this.isStarred],
      ["size", this.size],
      ["parent_folder", this.parentFolderId],
    ]);
  }

  static fromJson(json: Map<String, any>): Folder {
    return new Folder({
      folderId: json.get("folder_id"),
      name: json.get("name"),
      created_by: json.get("created_by"),
      created_at: json.get("created_at"),
      isStarred: json.get("starred"),
      size: json.get("size"),
      parentFolderId: json.get("parent_folder_id"),
    });
  }
}

