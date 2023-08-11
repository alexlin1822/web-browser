# Kid Web Browser for Android Pad 😄

Platform: Android

Languages: JavaScript

Framework: Expo React Native

## Main Features:

1. Button list for web resources
2. Custom URL list for each web resource
3. Parent Control
4. No sleep screen
5. Login / register
6. Storge resources for each user
7. One resource include:

title, icon, defualt page, allow page list (inclue title or url keyword, or the whole specific url )
Kid lock, full screen

## Pages:

• SignUp page
 • Login page
 • User home page (list the preset resources, each resource show at a card view with title detail and entry button) and a custom button to add resources to this user.
Share button to share the resources to others users.
 • Web browser page (browser view and edit view)
Browser view just allow whitelist resource and show meno. If not allow page. it will go back to default page.
Edit view has url bar and whitelist edit (add, edit delete whitelist and meno)

## Procedure

![](assets/20230810_135448_KidWebBrowser.png)

## Data Structre

const userProfile = {
rid: generateId(),
nickname: text_nickname,
username: text_username,
password: text_password,
email: text_email,
};

const userSetting = {
rid: rid,
editView:true,

};

const userData = {
rid: rid,
editView:true,
title:title,
favicon:favicon,
defualt_page:url,
};
Minyi:

8/5/2023
add components : search bar
