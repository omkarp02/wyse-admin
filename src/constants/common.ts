export const BACKEND_URL = "http://localhost:8080/api/v1";

export const enum ROLE {
  ADMIN = "admin",
  OWNER = "owner",
  USER = "user",
}

export const enum STATUS {
  ACTIVE = 'active',
  IN_ACTIVE = 'inActive', 
  ARCHIVE='archive'
}

export const API_GET_LIMIT = 10
