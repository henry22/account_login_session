# Project Title

基本登入頁面並儲存「登入狀態」

## Features
- 使用者輸入帳密：email & password
- 如果找不到 username，或是 password 錯誤，介面會顯示 "Username/Password 錯誤"
- 如果 username + password 組合正確，使用者就能成功登入，並導向自己的 welcome page，在此頁面上會顯示登入使用者的 firstName
- 在30秒內使用者沒有登出，再次回到首頁不需要再重新登入

## Installation
1. 從github下載此專案至本機電腦

  `git clone https://github.com/henry22/account_login_session.git`

2. 開啟Terminal，進入此專案

  `cd account_login_session.git`

3. 使用npm安裝所有相依套件

  `npm install`

4. 執行專案

  `npm run dev`

5. 開啟網址在本機端

  `http://localhost:3000`

6. 在終端機中輸入Ctrl+C可停止伺服器運行

## Testing accounts
名稱          | 信箱  | 密碼
--------------|:-----:|------------------------
Tony    | tony@stark.com | iamironman
Steve   | captain@hotmail.com | icandothisallday
Peter   | peter@parker.com | enajyram
Natasha | natasha@gamil.com | *parol#@$!
Nick    | nick@shield.com | password

## Environment
- Express

### packages
- body-parser
- express-handlebars
- express-session

## Solutions

1. Cookie-based Authentication: cookie 是在瀏覽器端一個儲存少量資料的空間，會隨著 HTTP request / response 來回傳送，通常會搭配存在 server 端的 session 做權限驗證。在使用者登入後，我們可以把登入資料紀錄在瀏覽器的 Cookie 裡。

2. Token-based authentication: local storage 也是儲存在瀏覽器端的資料，空間比 cookie 稍大，必須由使用者主動攜帶（通常會放在 Header 當中），常見使用 JWT 的方式做權限驗證。所以我們也可以把登入資料紀錄在 local storage 裡。

## Decision

在如何儲存「登入狀態」的兩個解決方法Cookie-based Authentication和Token-based authentication中，因沒有要做到前後端分離，只有從後端著手，故選擇Cookie-based Authentication，其中有找到兩個套件：express-session、cookie-session，這兩個模組之間的主要差異是它們儲存 Cookie 階段作業資料的方式，express-session 中介軟體會將階段作業資料儲存在伺服器上； 它只將階段作業 ID（而非階段作業資料）儲存在 Cookie 本身中。相對地，cookie-session 中介軟體會實作以 Cookie 為基礎的儲存體：它會將整個階段作業序列化為 Cookie，而非只是一個階段作業金鑰。只有在階段作業資料相對較小，且易於編碼成基本值（而非物件）時，才使用此項。而要留意的是，用戶端可以看見 Cookie 資料，因此，若有任何原因需要保護該資料的安全或加以遮蔽，最好選擇 express-session。