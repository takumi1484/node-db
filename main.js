let config = require('./config.js');
let mysql = require('mysql');
let querystring = require("querystring");
let StringDecoder = require('string_decoder').StringDecoder;
let http = require('http');
let url = require('url');
let util = require('util');


let mysqlConnection = mysql.createPool(config.mysqlInfo);

mysqlConnection.getConnection((error) => {
    if (error) throw error;
    console.log('Connected clearDB!');
});


var server = http.createServer();

server.on('request',function(req,res) {
    // res.writeHead(200,{'Content-Type': 'application/json','Access-Control-Allow-Origin': 'https://takumi1484.github.io'});
    // res.write('testMessageOnNode');
    // res.end();


    let urlParts = url.parse(req.url,true);
    switch (urlParts.pathname) {
        case '/':
            console.log("Method = ", req.method);
            console.log("URL = ",    req.url);
            res.writeHead(200,{'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:4000'});
            res.write('testMessageOnNode');
            res.end();
            console.log("getEnd");
            console.log('========================');
            break;
        case '/test':
            console.log("Method = ", req.method);
            console.log("URL = ",    req.url);
            res.writeHead(200,{'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:4000'});
            res.write('requested "/test" ');
            req.on('data',function(chunk) {
                // console.log("header = ", req.headers);
                let rcv_data = querystring.parse(decoder.write(chunk));//buffer状態の文を文字列に直す
                let rcv_text = JSON.stringify(rcv_data);
                let rcv_json = JSON.parse(rcv_text);
                console.log("json = ", rcv_json);
                console.log("json = ", rcv_text);
                console.log("json = ", util.inspect(rcv_data,false,null));
                console.log("json = ", chunk.toString());
                console.log("json = ", chunk);
                console.log("json = ", JSON.parse(JSON.stringify(rcv_data)).test);//文字列をオブジェクトに
                console.log("postEnd");
                console.log('========================');
            });
            break;
    }
    // console.log(req);
});


// let server = http.createServer(function (request, response) {
//     // リクエストを受けると以下のレスポンスを送信する
//     response.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin': 'https://takumi1484.github.io'}); //レスポンスヘッダーに書き込み
//     response.write('Hello World\n'); // レスポンスボディに「Hello World」を書き込み
//     response.end(); // レスポンス送信を完了する
// });

// // http.createServerがrequestされたら、(イベントハンドラ)
// server.on('request', function (req, res) {
//
//     // res.on('error',function(err) {
//     //     console.log(err);
//     // });
//
//     // Responseオブジェクトを作成し、その中に必要な処理を書いていき、条件によって対応させる
//     let Response = {
//         "res0": function () {
//             console.log(res.statusCode);
//             console.log("================");
//             console.log(req.url);
//         },
//         "res1": function () {
//             console.log("res1/testaaaaaaa");
//         }
//     };
//     // urlのpathをuriに代入
//     let uri = url.parse(req.url).pathname;
//
//     // URIで行う処理を分岐させる
//     switch( uri ) {
//         case '/':
//             // URLが「http://localhost:8000/」の場合、"res0"の処理を行う
//             Response["res0"]();
//             break;
//         case '/test':
//             // URLが「http://localhost:8000/test」の場合、"res1"の処理を行う
//             Response["res1"]();
//
//
//             // function CBTest(callbackFunc){
//             //     res.writeHead(200,{'Content-Type': 'application/json'});//1
//             //     var ReplyData = querystring.stringify({
//             //         message : "てすとめっせーじ",
//             //     });
//             //     res.write(ReplyData);//2
//             //     setTimeout(callbackFunc,50);
//             // }
//             //
//             // CBTest(function () {
//             //     res.end();//3
//             // });
//             // req.on('data',function (c) {
//             //     res.writeHead(200,{'Content-Type': 'application/json'});//1
//             //     var ReplyData = querystring.stringify({
//             //         message : "てすとめっせーじ",
//             //     });
//             //     res.write(ReplyData);//2
//             //     res.end();//3
//             //     console.log(c);
//             // });
//
//             // res.writeHead(200,{'Content-Type': 'application/json'});//1
//             // var ReplyData = querystring.stringify({
//             //     message : "てすとめっせーじ",
//             // });
//             // res.write(ReplyData);//2
//             // res.end();//3
//
//
//             break;
//     }
// });

// let server = http.createServer(function (req,res) {
//     let urlParts = url.parse(req.url,true);
//     switch (urlParts.pathname) {
//         case '/':
//             console.log("Method = ", req.method);
//             console.log("URL = ",    req.url);
//             break;
//         case '/test':
//             console.log("Method = ", req.method);
//             console.log("URL = ",    req.url);
//             if (req.method === 'GET'){
//                 // req.on('end',()=>{
//                     res.writeHead(200,{'Content-type':'application/json','Access-Control-Allow-Origin': 'https://takumi1484.github.io'});
//                     res.write('hhjffh');
//                     res.end();
//                     console.log("Method = ", req.method);
//                     console.log("URL = ",    req.url);
//                 // });
//             }
//             break;
//     }
// });

server.listen(process.env.PORT || config.localPort);  //heroku等に挙げたときはそちらのenvを参照、テスト時は8080番ポートで待ち受け


// server.on('request',function(req,res) {
//     // リクエストの表示
//     console.log("===============");
//     console.log("Method = ", req.method);
//     console.log("URL = ",    req.url);
//     console.log("===============");
//     // POSTデータ受信処理
//     req.on('data',function(chunk) {
//         console.log("header = ", req.headers);
//         // Query String -> JSON形式へ変換
//         var rcv_data = querystring.parse(decoder.write(chunk));
//         var rcv_text = JSON.stringify(rcv_data);
//         var rcv_json = JSON.parse(rcv_text);
//         console.log("json text = ", rcv_json.message);
//         console.log("json number = ", rcv_json.sound);
//         console.log("json boolean = ", rcv_json.reply);
//         // 何かの処理
//         rcv_json.message = "こんにちは、良い天気ですね。";
//         rcv_json.reply = true;
//         // 応答送信
//         res.writeHead(200,{'Content-Type': 'application/json','Access-Control-Allow-Origin': 'https://takumi1484.github.io'});
//         var text_data = JSON.stringify(rcv_json);
//         var ReplyData = querystring.stringify(rcv_json);
//         res.write(ReplyData);
//         res.end();
//     });
//
// });