export interface IImage {
  created_at: Date,
  slug: string,
  id: string,
  created_by: IUser | null,
  visits: number,
  file_id: string,
  file_extension: string,
  dimensions: {
    width: number,
    height: number,
  },
}

export interface IUser {
  created_at: Date,
  username: string,
  email: string,
  location: string,
  discord_id?: string,
  staff: boolean,
  avatar?: string,
  id: string,
  privacy: 'public' | 'intern' | 'private',
  bio?: string,
  website?: string,
  banner?: string,
  api_key?: string,
}

export interface IFile {
  file: File,
  response?: {
    message?: string,
    slug?: string,
  }
}