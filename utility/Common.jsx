/**
 * Common functions for all pages and components
 * Global variables for all pages and components
 * Save and load data in AsyncStorage
 *
 * @module utility/Common
 * @requires react
 * @requires react-native
 * @requires @react-native-async-storage/async-storage
 * @exports GetInfo
 * @exports SetInfo
 * @exports LoadAccountData
 * @exports LoadCurrentData
 * @exports SaveAccountData
 * @exports SaveCurrentData
 *
 */
import React, { useState } from "react";
import CryptoJS from "crypto-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Global variables */
// App settings
const appName = "@KidWebBrowser";

const [showNavigationBar, set_ShowNavigationBar] = useState(true);
// let showNavigationBar = true;

// Account data
let accountNums = "0";
let accountList = "";

let currentAccountID = "";
let currentUserData = "";

/* Common functions for all pages and components*/

// export function encrypt(text) {
//   const [encrypted, setEncrypted] = useState("");

//   const handleEncrypt = () => {
//     const encrypted = CryptoJS.AES.encrypt(text, "secret key 123");
//     setEncrypted(encrypted.toString());
//   };
// }

export function createNewUserData() {
  let newUserData = [
    {
      id: "0",
      title: "Add Resource",
      url: "https://www.google.com",
      description: "Add Resource",
      icon: "https://www.google.com/favicon.ico",
      memo: "",
      status: "0",
    },
    {
      id: "1",
      title: "Copy Resource",
      url: "about:blank",
      description: "Copy Resource another family member",
      icon: "https://www.google.com/favicon.ico",
      memo: "",
      status: "0",
    },
  ];
}

/**
 * Get user id by username and password
 * @param {*} username :string
 * @param {*} password :string
 * @returns : string
 */
export function getUserID(username, password) {
  if (currentUserData === "") {
    return "";
  }

  let dictCurrentUserData = JSON.parse(currentUserData);
  let userID = "aa";
  for (let i = 0; i < dictCurrentUserData.length; i++) {
    if (
      dictCurrentUserData[i].username === username &&
      dictCurrentUserData[i].password === password
    ) {
      userID = dictCurrentUserData[i].id;
      break;
    }
  }
  return userID;
}

export function getShowNavigationBar() {
  return showNavigationBar;
}

export function setShowNavigationBar(value) {
  set_ShowNavigationBar(value);
}

/**
 * Getters for global variables
 * @param {*} keyname : String
 * @returns : String
 */
export function GetInfo(keyname) {
  console.log("GetInfo: " + keyname);
  if (keyname === "accountNums") {
    console.log("accountNums: " + accountNums);
    return accountNums;
  } else if (keyname === "accountList") {
    console.log("accountList: " + accountList);
    return accountList;
  } else if (keyname === "currentAccountID") {
    console.log("currentAccountID: " + currentAccountID);
    return currentAccountID;
  } else if (keyname === "currentUserData") {
    console.log("currentUserData: " + currentUserData);
    return currentUserData;
  } else {
    return "";
  }
}

/** Set global variables
 * @param {*} keyname : String
 * @param {*} content : String
 * @returns : Boolean
 * */
export function SetInfo(keyname, content) {
  console.log("SetInfo: " + keyname + " " + content);
  if (keyname === "accountNums") {
    accountNums = content;
  } else if (keyname === "accountList") {
    accountList = content;
  } else if (keyname === "currentAccountID") {
    currentAccountID = content;
  } else if (keyname === "currentUserData") {
    currentUserData = content;
  } else {
    return false;
  }
  SaveAccountData(keyname, content);
  return true;
}

/** Load current account data in AsyncStorage
 *  Need to be called when the app starts
 * @param {*} currentID : String
 * @returns : Boolean
 *
 */
export async function LoadAccountData() {
  // Load current account numbers and list in AsyncStorage
  try {
    console.log("LoadAccountData");

    const value = await AsyncStorage.getItem(`${appName}:accountNums`);

    if (value !== null && value !== "0") {
      accountNums = value;
      const accountValue = await AsyncStorage.getItem(`${appName}:accountList`);
    } else {
      accountNums = "0";
      accountList = "";
    }
    return true;
  } catch (error) {
    accountNums = "0";
    accountList = "";
    console.log(error);
    return false;
  }
}

/* internal functions  */

/**
 * Load current account data in AsyncStorage
 * @param {*} currentID
 * @returns : Boolean
 */
async function LoadCurrentData(currentID) {
  try {
    console.log("LoadCurrentData");

    currentAccountID = currentID;
    currentUserProfileSetting = await AsyncStorage.getItem(
      `${appName}:currentUserProfileSetting`
    );
    currentUserData = await AsyncStorage.getItem(`${appName}:currentUserData`);

    if (currentAccountID === null) {
      currentAccountID = "";
    }
    if (currentUserData === null) {
      currentUserData = "";
    }
    return true;
  } catch (error) {
    currentAccountID = "";
    currentUserProfileSetting = "";
    currentUserData = "";
    console.log(error);
    return false;
  }
}

/** Save current account data in AsyncStorage
 * @param {*} currentID : String
 * @param {*} currentData : String
 * @returns : Boolean
 */
async function SaveAccountData(currentID, currentData) {
  // Save the user data in AsyncStorage
  try {
    console.log(`Save data inside`);
    const result = await AsyncStorage.setItem(
      `${appName}:${currentID}`,
      currentData
    );
    return true;
  } catch (error) {
    // Error saving data
    console.log(error);
    return false;
  }
}

/**
 * @description This function generates a random string as user ID
 * @returns {string} random string
 */
function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

// const userProfile = {
//   rid: generateId(),
//   nickname: text_nickname,
//   username: text_username,
//   password: text_password,
//   email: text_email,
// };

// const userSetting = {
//   rid: rid,
//   editView: true,
// };

// const userData = {
//   rid: rid,
//   editView: true,
//   title: title,
//   favicon: favicon,
//   defualt_page: url,
// };
