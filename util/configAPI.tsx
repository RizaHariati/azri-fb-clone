export const configDelete = {
  method: "DELETE",
  headers: { "app-id": process.env.NEXT_PUBLIC_KEYWORD_API || "key" },
};

export const configGet = {
  method: "GET",
  headers: { "app-id": process.env.KEYWORD_API || "key" },
};

export const configGetPublic = {
  method: "GET",
  headers: { "app-id": process.env.NEXT_PUBLIC_KEYWORD_API || "key" },
};

export const header = {
  "app-id": process.env.NEXT_PUBLIC_KEYWORD_API || "key",
};

export const URL_POST = "https://dummyapi.io/data/v1/post/";
export const URL_COMMENT = "https://dummyapi.io/data/v1/comment/";
export const URL_USER = "https://dummyapi.io/data/v1/user/";
export const URL_BASE = "https://dummyapi.io/data/v1/";
