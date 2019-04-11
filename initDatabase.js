const mysql = require('mysql');
const config = require('./config.js');
const mysqlConnect = mysql.createConnection(config.mysqlInfo);


let reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

mysqlConnect.connect((error) => {
    if (error) throw error;
    console.log('Connected clearDB!');
});


console.log();
console.log('reset database: (y/other)');
reader.on('line', function (line) {
    if(line==='y'){

        mysqlConnect.query('drop table node_mysql_test');

        process.exit();
    }else {
        console.log('canceled');
        process.exit();
    }
});

