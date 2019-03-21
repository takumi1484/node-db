let config = require('./config.js');
let mysql = require('mysql');

let mysqlConnection = mysql.createConnection(config.mysqlInfo);

mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

let http = require('http'); //httpモジュール呼び出し
let server = http.createServer(function (request, response) {
    // リクエストを受けると以下のレスポンスを送信する
    response.writeHead(200, {'Content-Type': 'text/plain'}); //レスポンスヘッダーに書き込み
    response.write('Hello World\n'); // レスポンスボディに「Hello World」を書き込み
    response.end(); // レスポンス送信を完了する
});
server.listen(process.env.PORT || config.localPort);  //heroku等に挙げたときはそちらのenvを参照、テスト時は8080番ポートで待ち受け