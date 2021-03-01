// Login Log
export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// User Log
export const USER_FETCHING = "USER_FETCHING";
export const USER_FAILED = "USER_FAILED";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_UPDATED = "USER_UPDATED";

// Path Url
export const apiUrl = "http://191.101.38.12:8085/api/v2";
export const imageUrl = "http://191.101.38.12:8085";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOk = "nok";

export const LOGIN_STATUS = "LOGIN_STATUS";

export const server = {
  LOGIN_URL: "authen/login",
  REGISTER_URL: "authen/register",
  USERS_URL: "authen/user",
  PRODUCT_URL: "stock/product",
  TRANSACTION_URL: "transaction",
  LOGIN_PASSED: "yes",
  STOCK_URL: "stock/stocks",
  BORROW_URL: "stock/borrows",
};

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";

// Stock Page
export const STOCK_FETCHING = "STOCK_FETCHING";
export const STOCK_SUCCESS = "STOCK_SUCCESS";
export const STOCK_FAILED = "STOCK_FAILED";
export const STOCK_INITIALED = "STOCK_INITIALED";

// Transaction Edit Page
export const TRANSACTION_FETCHING = "TRANSACTION_FETCHING";
export const TRANSACTION_SUCCESS = "TRANSACTION_SUCCESS";
export const TRANSACTION_FAILED = "TRANSACTION_FAILED";

// Show Page
export const SHOP_FETCHING = "SHOP_FETCHING";
export const SHOP_SUCCESS = "SHOP_SUCCESS";
export const SHOP_FAILED = "SHOP_FAILED";
