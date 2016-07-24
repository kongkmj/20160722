var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var querystring = require('querystring');

require('events').EventEmitter.prototype._maxListeners = 0;


//http server
var http = require('http').Server(app);
var io = require('socket.io')(http);


var data_001,data_002,data_003,data_004,data_005,data_006,data_007,data_008,data_009,data_0010;
var noti001,noti002,noti003,noti004,noti005;
var rule_001,rule_002,rule_003,rule_004,rule_005;



var alaram=""; // 알람을 담을 그릇

var intervalmessage; // 클라이언트 주기버튼 메시지를 담을 변수
var standardData;

var rangedata = new Array(5);
var ruledata = new Array(10);


var rcrule = new Array(5); // 디바이스로부터 받은 기준치
var rcinterval ; // 디바이스로 부터 받은 주기

var reccount=0;
var fuck1,fuck2,fuck3,fuck4,fuck5;
var suck1,suck2,suck3,suck4,suck5;
var duck1,duck2,duck3,duck4,duck5;

var dbprevData = new Array(20); //역순으로 데이터를 찾기에 순서를 바꿔줄 그릇



// TCP
var net = require('net');
var server = net.createServer(function (socket2) {


    //웹에서 주기버튼 눌렀을시
  io.on('connection',function (socket) {
    socket.on('intervalEV',function (message) {
      intervalmessage=message;
	//console.log("!!");
      socket2.write("a"+rangedata[0]+"x"+rangedata[1]+"x"+rangedata[2]+"x"+rangedata[3]+"x"+rangedata[4]+"x"+message+"b");
    });


  });



   io.on('connection',function (socket) {
	suck1,suck2,suck3,suck4,suck5=0;

    socket.on('standardData',function () {
	//console.log("@@");
      socket2.write("a"+rangedata[0]+"x"+rangedata[1]+"x"+rangedata[2]+"x"+rangedata[3]+"x"+rangedata[4]+"x"+intervalmessage+"b");
	socket.disconnect();
    });

    socket.on('std1',function () {
        socket2.write('std');
        fuck1=1;
	suck1=1;
	duck1=1;
	socket.disconnect();
    });
    socket.on('std2',function () {
        socket2.write('std');
        fuck2=1;
	suck2=1;
	duck2=1;
	socket.disconnect();
    });
    socket.on('std3',function () {
        socket2.write('std');
        fuck3=1;
	suck3=1;
  	duck3=1;
    });
    socket.on('std4',function () {
        socket2.write('std');
        fuck4=1;
	suck4=1;
	duck4=1;
    });
    socket.on('std5',function () {
        socket2.write('std');
        fuck5=1;
	suck5=1;
	duck5=1;
    });


  });


  //client와 접속이 끊겻을때
  socket2.on('close',function () {
    //io.close()
    console.log('client disconnected');

    //socket2.end("good bye");
  });
  socket2.on('error',function (err) {

    //console.log(err);
  });

  console.log(socket2.address().address+"connected");

  //client로 부터 오는 data 출력
  socket2.on('data',function (data) {

  //문자열로 변환
  var recieveData   = ""+data;
  var recieveArray  = recieveData.split(','); //데이터를 ','로 split


  //time
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var second = now.getSeconds();


  //beacon1
  var d001 =(recieveArray[0]); //roll1
  var d002 =(recieveArray[1]); //pitch1
  var d003 =(recieveArray[2]); //민감도1

  //beacon2
  var d004 =(recieveArray[3]); //roll2
  var d005 =(recieveArray[4]); //pitch2
  var d006 =(recieveArray[5]); //민감도2

  //beacon3
  var d007 =(recieveArray[6]); //roll3
  var d008 =(recieveArray[7]); //pitch2
  var d009 =(recieveArray[8]); //민감도3

  //beacon4
  var d010 =(recieveArray[9]); //roll4
  var d011 =(recieveArray[10]); //pitch4
  var d012 =(recieveArray[11]); //민감도4

  //beacon5
  var d013 =(recieveArray[12]); //roll5
  var d014 =(recieveArray[13]); //pitch5
  var d015 =(recieveArray[14]); //민감도5

  //주기
  var d016 =(recieveArray[15]);



// 수신 only data 배열
  var parsingdata = new Array(10);
  parsingdata[0] =  parseInt(d001);
  parsingdata[1] =  parseInt(d002);
  parsingdata[2] =  parseInt(d004);
  parsingdata[3] =  parseInt(d005);
  parsingdata[4] =  parseInt(d007);
  parsingdata[5] =  parseInt(d008);
  parsingdata[6] =  parseInt(d010);
  parsingdata[7] =  parseInt(d011);
  parsingdata[8] =  parseInt(d013);
  parsingdata[9] =  parseInt(d014);

// 최대값 설정
if(parsingdata[0]>90){
  parsingdata[0]=90;
}
if(parsingdata[1]>90){
  parsingdata[1]=90;
}
if(parsingdata[2]>90){
  parsingdata[2]=90;
}
if(parsingdata[3]>90){
  parsingdata[3]=90;
}
if(parsingdata[4]>90){
  parsingdata[4]=90;
}
if(parsingdata[5]>90){
  parsingdata[5]=90;
}
if(parsingdata[6]>90){
  parsingdata[6]=90;
}
if(parsingdata[7]>90){
  parsingdata[7]=90;
}
if(parsingdata[8]>90){
  parsingdata[8]=90;
}
if(parsingdata[9]>90){
  parsingdata[9]=90;
}




//민감도
rcrule[0] = d003;
rcrule[1] = d006;
rcrule[2] = d009;
rcrule[3] = d012;
rcrule[4] = d015;

//이상데이터
/*
console.log(d016.length);
if(d016.length!=3){
  socket2.write("tt");
}
*/

//주기
rcinterval = d016;


  data_001=parsingdata[0];
  data_002=parsingdata[1];
  data_003=parsingdata[2];
  data_004=parsingdata[3];
  data_005=parsingdata[4];
  data_006=parsingdata[5];
  data_007=parsingdata[6];
  data_008=parsingdata[7];
  data_009=parsingdata[8];
  data_010=parsingdata[9];


//수신 데이터 저장 이전그래프를 띄위기위해
 var beacon_Data = new beaconData({
  beacon001x:parsingdata[0],
  beacon001y:parsingdata[1],
  beacon002x:parsingdata[2],
  beacon002y:parsingdata[3],
  beacon003x:parsingdata[4],
  beacon003y:parsingdata[5],
  beacon004x:parsingdata[6],
  beacon004y:parsingdata[7],
  beacon005x:parsingdata[8],
  beacon005y:parsingdata[9],
  rectime:(hour+":"+min+":"+second)
    });
  beacon_Data.save(function (err,beacon_Data) {

  });


if(data){
////
  if(fuck1==1){
    chuck=1;
    var stnum1=1*rcrule[0];
    var log1 = new rule001({
      rule001x:parsingdata[0],
      rule001y:parsingdata[1],
      range001:stnum1
    });
    //console.log("1 번"+log1);
    log1.save(function (err,log1) {
    });
    io.emit('luck1');
	fuck1=0;
  }
  if(fuck2==1){
    var stnum2=1*rcrule[1];
    var log2 = new rule002({
      rule002x:parsingdata[2],
      rule002y:parsingdata[3],
      range002:stnum2
    });
    //console.log("2번"+log2);
    log2.save(function (err,log2) {
    });
    io.emit('luck2');
	fuck2=0;
  }
  if(fuck3==1){
    var stnum3=1*rcrule[2];
    var log3 = new rule003({
      rule003x:parsingdata[4],
      rule003y:parsingdata[5],
      range003:stnum3
    });
    //console.log("3번"+log3);
    log3.save(function (err,log3) {
    });
    io.emit('luck3');
	fuck3=0;
  }
  if(fuck4==1){
    var stnum4=1*rcrule[3];
    var log4 = new rule004({
      rule004x:parsingdata[6],
      rule004y:parsingdata[7],
      range004:stnum4
    });
    //console.log("4번"+log4);
    log4.save(function (err,log4) {
    });
    io.emit('luck4');
	fuck4=0;
  }
  if(fuck5==1){
    var stnum5=1*rcrule[4];
    var log5 = new rule005({
      rule005x:parsingdata[8],
      rule005y:parsingdata[9],
      range005:stnum5
    });
    //console.log("5번"+log5);
    log5.save(function (err,log5) {
    });
    io.emit('luck5');
	fuck5=0;
  }


//디바이스에서 보낸 데이터(주기,민감도)가 다를 경우
if(rcrule[0]!=rangedata[0]||rcrule[1]!=rangedata[1]||rcrule[2]!=rangedata[2]||rcrule[3]!=rangedata[3]||rcrule[4]!=rangedata[4]||rcinterval!=intervalmessage){


  socket2.write("a"+rangedata[0]+"x"+rangedata[1]+"x"+rangedata[2]+"x"+rangedata[3]+"x"+rangedata[4]+"x"+intervalmessage+"b");


  }

 //test용 디바이스에서 보낸데이터 비교
/*
if(rcrule[0]!=rangedata[0]){
  console.log("1");
}
if(rcrule[1]!=rangedata[1]){
  console.log("2");
}
if(rcrule[2]!=rangedata[2]){
  console.log("3");
}
if(rcrule[3]!=rangedata[3]){
  console.log("4");
}
if(rcrule[4]!=rangedata[4]){
  console.log("5");
}
if(rcinterval!=intervalmessage){
  console.log("6");
}
*/


}



/** 데이터 확인 로그 **/




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 기준 관련 START @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// 기준 설정

var parse1,parse2,parse3,parse4,parse5;



// (1)
if(rule_001.range001!=undefined){
  parse1=rule_001.range001;
}
// (2)
if(rule_002.range002!=undefined){
  parse2=rule_002.range002;
}
// (3)
if(rule_003.range003!=undefined){
  parse3=rule_003.range003;
}
// (4)
if(rule_004.range004!=undefined){
  parse4=rule_004.range004;
}
// (5)
if(rule_005.range005!=undefined){
  parse5=rule_005.range005;
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 기준 관련 END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 알람 관련 start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
var notidata001x = parseInt(rule_001.rule001x);
var notidata001y = parseInt(rule_001.rule001y);
var notidata002x = parseInt(rule_002.rule002x);
var notidata002y = parseInt(rule_002.rule002y);
var notidata003x = parseInt(rule_003.rule003x);
var notidata003y = parseInt(rule_003.rule003y);
var notidata004x = parseInt(rule_004.rule004x);
var notidata004y = parseInt(rule_004.rule004y);
var notidata005x = parseInt(rule_005.rule005x);
var notidata005y = parseInt(rule_005.rule005y);



// (1) 알람 연산
var plus001x = notidata001x +parseInt(parse1);
var plus001y = notidata001y +parseInt(parse1);
var minus001x = notidata001x - parseInt(parse1);
var minus001y = notidata001y - parseInt(parse1);


if((parsingdata[0]>plus001x)||(parsingdata[0]<minus001x)||(parsingdata[1]>plus001y)||(parsingdata[1]<minus001y)){
  noti001=1;
}
if((parsingdata[0]<=plus001x)&&(parsingdata[0]>=minus001x)&&(parsingdata[1]<=plus001y)&&(parsingdata[1]>=minus001y)){
  noti001=0;
}


// (2) 알람 연산
var plus002x = notidata002x +parseInt(parse2);
var plus002y = notidata002y +parseInt(parse2);
var minus002x = notidata002x - parseInt(parse2);
var minus002y = notidata002y - parseInt(parse2);

if((parsingdata[2]>plus002x)||(parsingdata[2]<minus002x)||(parsingdata[3]>plus002y)||(parsingdata[3]<minus002y)){
  noti002=1;
}
if((parsingdata[2]<=plus002x)&&(parsingdata[2]>=minus002x)&&(parsingdata[3]<=plus002y)&&(parsingdata[3]>=minus002y)){
  noti002=0;
}


// (3) 알람 연산
var plus003x = parseInt(rule_003.rule003x) +parseInt(parse3);
var plus003y = parseInt(rule_003.rule003y) +parseInt(parse3);
var minus003x = parseInt(rule_003.rule003x) - parseInt(parse3);
var minus003y = parseInt(rule_003.rule003y) - parseInt(parse3);

if((parsingdata[4]>plus003x)||(parsingdata[4]<minus003x)||(parsingdata[5]>plus003y)||(parsingdata[5]<minus003y)){
  noti003=1;
}
if((parsingdata[4]<=plus003x)&&(parsingdata[4]>=minus003x)&&(parsingdata[5]<=plus003y)&&(parsingdata[5]>=minus003y)){
  noti003=0;
}


// (4) 알람 연산
var plus004x = parseInt(rule_004.rule004x) +parseInt(parse4);
var plus004y = parseInt(rule_004.rule004y) +parseInt(parse4);
var minus004x = parseInt(rule_004.rule004x) - parseInt(parse4);
var minus004y = parseInt(rule_004.rule004y) - parseInt(parse4);

if((parsingdata[6]>plus004x)||(parsingdata[6]<minus004x)||(parsingdata[7]>plus004y)||(parsingdata[7]<minus004y)){
  noti004=1;
}
if((parsingdata[6]<=plus004x)&&(parsingdata[6]>=minus004x)&&(parsingdata[7]<=plus004y)&&(parsingdata[7]>=minus004y)){
  noti004=0;
}


// (5) 알람 연산
var plus005x = parseInt(rule_005.rule005x) +parseInt(parse5);
var plus005y = parseInt(rule_005.rule005y) +parseInt(parse5);
var minus005x = parseInt(rule_005.rule005x) - parseInt(parse5);
var minus005y = parseInt(rule_005.rule005y) - parseInt(parse5);

if((parsingdata[8]>plus005x)||(parsingdata[8]<minus005x)||(parsingdata[9]>plus005y)||(parsingdata[9]<minus005y)){
  noti005=1;
}
if((parsingdata[8]<=plus005x)&&(parsingdata[8]>=minus005x)&&(parsingdata[9]<=plus005y)&&(parsingdata[9]>=minus005y)){
  noti005=0;
}





//알람 배열
var notiarr=[noti001,noti002,noti003,noti004,noti005];

  alaram="";
  for(var i=0;i<10;i++){
    if(notiarr[i]==1){
      alaram+=1+i+"번 ";
    }
  }





//alaram DB저장
if(alaram!=""){
  var alaramsave = new alaram1({
        id:1,
        alaram:alaram
      });

    alaramsave.save(function (err,alaramsave) {

  });
}



// (1) 알림
if(noti001==1){
  var log1 = new beacon001({
      bnum:1,
      gnum:1,
      status:"경고",
      beaconx:parsingdata[0],
      beacony:parsingdata[1]
    });
    console.log("1번 비콘 경고 받음");
  log1.save(function (err,log1) {
  });
}

// (2) 알림
if(noti002==1){
  var log2 = new beacon002({
      bnum:2,
      gnum:1,
      status:"경고",
      beaconx:parsingdata[2],
      beacony:parsingdata[3]
    });
    console.log("2번 비콘 경고 받음");
  log2.save(function (err,log2) {

  });
}

// (3) 알림
if(noti003==1){
  var log3 = new beacon003({
      bnum:3,
      gnum:1,
      status:"경고",
      beaconx:parsingdata[4],
      beacony:parsingdata[5]
    });
    console.log("3번 비콘 경고 받음");
  log3.save(function (err,log3) {
  });
}

// (4) 알림
if(noti004==1){
  var log4 = new beacon004({
      bnum:4,
      gnum:1,
      status:"경고",
      beaconx:parsingdata[6],
      beacony:parsingdata[7]
    });
    console.log("4번 비콘 경고 받음");
  log4.save(function (err,log4) {
  });
}

// (5) 알림
if(noti005==1){
  var log5 = new beacon005({
      bnum:5,
      gnum:1,
      status:"경고",
      beaconx:parsingdata[8],
      beacony:parsingdata[9]
    });
    console.log("5번 비콘 경고 받음");
  log5.save(function (err,log5) {
  });
}




  // 서버 -> 클라이언트 이벤트 (수신데이터,알람데이터)

/*
io.emit('chat message',parsingdata,alaram);
  });
*/

//test
io.emit('chat message',parsingdata,alaram,recieveArray);
//console.log(recieveArray);
  });



  rule001.find({}).sort('-createdAt').exec(function (err, r001) {

      rule_001=r001[0];
      if(rule_001==undefined){
      rule_001={rule001x:"10",rule001y:"10",range001:"10"};
      }
      rule002.find({}).sort('-createdAt').exec(function (err, r002) {

          rule_002=r002[0];
          if(rule_002==undefined){
          rule_002={rule002x:"10",rule002y:"10",range002:"10"};
          }
          rule003.find({}).sort('-createdAt').exec(function (err, r003) {

              rule_003=r003[0];
              if(rule_003==undefined){
              rule_003={rule003x:"10",rule003y:"10",range003:"10"};
              }
              rule004.find({}).sort('-createdAt').exec(function (err, r004) {

                  rule_004=r004[0];
                  if(rule_004==undefined){
                  rule_004={rule004x:"10",rule004y:"10",range004:"10"};
                  }
                  rule005.find({}).sort('-createdAt').exec(function (err, r005) {

                      rule_005=r005[0];
                      if(rule_005==undefined){
                      rule_005={rule005x:"10",rule005y:"10",range005:"10"};
                      }
                });
            });
        });
    });
});





//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 알람 관련 END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

});


// 에러처리
server.on('error',function (err) {
  console.log('err'+err);
});

//port 11111로 연결 대기
server.listen(11111,function () {
  console.log('TCP listening on 11111');
});


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ DB 관련 start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//##################### DB 연결 ########################
mongoose.connect("mongodb://test:test@ds023664.mlab.com:23664/roadtest");
var db = mongoose.connection;
db.once("open",function () {
  console.log("DB connected");
});
db.on("error",function (err) {
  console.log("DB ERROR: ",err);
});


//##################### model setting ##################

//##################### recieveData ####################
var beaconDataSchema = require('./model/beacons/beaconData');
var beaconData = mongoose.model('rcdata',beaconDataSchema);


//##################### beacons ########################
var beacon001Schema =require('./model/beacons/beacon001');
var beacon001 = mongoose.model('bc001',beacon001Schema);

var beacon002Schema =require('./model/beacons/beacon002');
var beacon002 = mongoose.model('bc002',beacon002Schema);

var beacon003Schema =require('./model/beacons/beacon003');
var beacon003 = mongoose.model('bc003',beacon003Schema);

var beacon004Schema =require('./model/beacons/beacon004');
var beacon004 = mongoose.model('bc004',beacon004Schema);

var beacon005Schema =require('./model/beacons/beacon005');
var beacon005 = mongoose.model('bc005',beacon005Schema);




//###################### rules #########################
var rule001Schema = require('./model/rules/rule001');
var rule001 = mongoose.model('r001',rule001Schema);

var rule002Schema = require('./model/rules/rule002');
var rule002 = mongoose.model('r002',rule002Schema);

var rule003Schema = require('./model/rules/rule003');
var rule003 = mongoose.model('r003',rule003Schema);

var rule004Schema = require('./model/rules/rule004');
var rule004 = mongoose.model('r004',rule004Schema);

var rule005Schema = require('./model/rules/rule005');
var rule005 = mongoose.model('r005',rule005Schema);



//##################### alaram ########################
var alaramSchema = require('./model/alaram');
var alaram1 = mongoose.model('a',alaramSchema);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ DB 관련 END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs'); // view engine 설정

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));// 정적폴더 세팅




//@@@@@@@@@@@@@@@@@@@@@@@@@@@ mapping 관련 START @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/*
if(suck==1){
  console.log("suckout");
  huck=1;
}
*/

//##################### 접속 첫 페이지 ########################
app.get('/',function (req,res) {
  res.render('index');

});


app.get('/input',function (req,res) {



  rule001.find({}).sort('-createdAt').exec(function (err, r001) {

      rule002.find({}).sort('-createdAt').exec(function (err, r002) {

          rule003.find({}).sort('-createdAt').exec(function (err, r003) {

              rule004.find({}).sort('-createdAt').exec(function (err, r004) {

                  rule005.find({}).sort('-createdAt').exec(function (err, r005) {


                              rule_001=r001[0];
                              rule_002=r002[0];
                              rule_003=r003[0];
                              rule_004=r004[0];
                              rule_005=r005[0];

                              if(rule_001==undefined){
                                rule_001={rule001x:"10",rule001y:"10",range001:"10"};
                              }
                              if(rule_002==undefined){
                                rule_002={rule002x:"10",rule002y:"10",range002:"10"};
                              }
                              if(rule_003==undefined){
                                rule_003={rule003x:"10",rule003y:"10",range003:"10"};
                              }
                              if(rule_004==undefined){
                                rule_004={rule004x:"10",rule004y:"10",range004:"10"};
                              }
                              if(rule_005==undefined){
                                rule_005={rule005x:"10",rule005y:"10",range005:"10"};
                              }


                              res.render("input",{data_1:rule_001,data_2:rule_002,data_3:rule_003,data_4:rule_004,data_5:rule_005});

          });
        });
      });
    });
  });
});




//################# 기준치 설정 POST START #######################

// (1)
app.post('/input1',function (req,res) {
  //console.log("this is "+duck1);
  if(duck1==1){
    ruledata[0]=data_001;
    ruledata[1]=data_002;
  }
  if(duck1!=1){
    ruledata[0]=rule_001.rule001x;
    ruledata[1]=rule_001.rule001y;
  }
  if(req.body.range1==undefined){
    rangedata[0]= rule_001.range001;
  }
  else{
    rangedata[0]=req.body.range1;
  }

  var log1 = new rule001({
    rule001x:ruledata[0],
    rule001y:ruledata[1],
    range001:rangedata[0]
  });
  log1.save(function (err,log1) {

  });

  if(rangedata[0]<10){
    rangedata[0]="00"+rangedata[0];
  }
  if(rangedata[0]>=10&&rangedata[0]<100){
    rangedata[0]="0"+rangedata[0];
  }
  if(suck1!=1){
  io.emit('email1');
	}
  duck1=0;
  res.redirect('/input');
});

// (2)
app.post('/input2',function (req,res) {
  //console.log("2 this is "+duck2);

  if(duck2==1){
    ruledata[2]=data_003;
    ruledata[3]=data_004;
  }
  if(duck2!=1){
  ruledata[2]=rule_002.rule002x;
  ruledata[3]=rule_002.rule002y;
}
  if(req.body.range2==undefined){
    rangedata[1]= rule_002.range002;
  }
  else{
    rangedata[1]=req.body.range2;
  }

  var log2 = new rule002({
    rule002x:ruledata[2],
    rule002y:ruledata[3],
    range002:rangedata[1]
  });
  log2.save(function (err,log2) {

  });

  if(rangedata[1]<10){
    rangedata[1]="00"+rangedata[1];
  }
  if(rangedata[1]>=10&&rangedata[1]<100){
    rangedata[1]="0"+rangedata[1];
  }

  if(suck2!=1){
  io.emit('email2');
	}
  duck2=0;
  res.redirect('/input');
});

// (3)
app.post('/input3',function (req,res) {
  if(duck3==1){
    ruledata[4]=data_005;
    ruledata[5]=data_006;
  }
  if(duck3!=1){
    ruledata[4]=rule_003.rule003x;
    ruledata[5]=rule_003.rule003y;
  }
  if(req.body.range3==undefined){
    rangedata[2]= rule_003.range003;
  }
  else{
    rangedata[2]=req.body.range3;
  }

  var log3 = new rule003({
    rule003x:ruledata[4],
    rule003y:ruledata[5],
    range003:rangedata[2]
  });
  log3.save(function (err,log3) {

  });

  if(rangedata[2]<10){
    rangedata[2]="00"+rangedata[2];
  }
  if(rangedata[2]>=10&&rangedata[2]<100){
    rangedata[2]="0"+rangedata[2];
  }

  if(suck3!=1){
  io.emit('email3');
  }
  duck3=0;
  res.redirect('/input');
});
// (4)
app.post('/input4',function (req,res) {
  if(duck4==1){
    ruledata[6]=data_007;
    ruledata[7]=data_008;
  }
  if(duck4!=1){
    ruledata[6]=rule_004.rule004x;
    ruledata[7]=rule_004.rule004y;
  }
  if(req.body.range4==undefined){
    rangedata[3]= rule_004.range004;
  }
  else{
    rangedata[3]=req.body.range4;
  }

  var log4 = new rule004({
    rule004x:ruledata[6],
    rule004y:ruledata[7],
    range004:rangedata[3]
  });
  log4.save(function (err,log4) {

  });

  if(rangedata[3]<10){
    rangedata[3]="00"+rangedata[3];
  }
  if(rangedata[3]>=10&&rangedata[3]<100){
    rangedata[3]="0"+rangedata[3];
  }

  if(suck4!=1){
  io.emit('email4');
	}
  duck4=0;
  res.redirect('/input');
});

// (5)
app.post('/input5',function (req,res) {
  if(duck5==1){
    ruledata[8]=data_009;
    ruledata[9]=data_010;
  }
  if(duck5!=1){
  ruledata[8]= rule_005.rule005x;
  ruledata[9]= rule_005.rule005x;
  }
  if(req.body.range5==undefined){
    rangedata[4]= rule_005.range005;
  }
  else{
    rangedata[4]=req.body.range5;
  }

  var log5 = new rule005({
    rule005x:ruledata[8],
    rule005y:ruledata[9],
    range005:rangedata[4]
  });
  log5.save(function (err,log5) {

  });

  if(rangedata[4]<10){
    rangedata[4]="00"+rangedata[4];
  }
  if(rangedata[4]>=10&&rangedata[4]<100){
    rangedata[4]="0"+rangedata[4];
  }

  if(suck5!=1){

  io.emit('email5');
}
  duck5=0;
  res.redirect('/input');
});


//################# 기준치 설정 POST END #########################




//######################### 알람 EVENT ##########################
io.on('connection',function (socket) {

  socket.emit('news',alaram,dbprevData);

});


//################# 그래프 page mapping START ###################

// (total)
app.get('/realtimechart-0',function (req,res) {

//################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {


    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];



  alaram1.findOne({id:1}).sort('-createdAt').exec(function (err,a) {
      rule001.find({}).sort('-createdAt').exec(function (err, r001) {
        rule002.find({}).sort('-createdAt').exec(function (err, r002) {
          rule003.find({}).sort('-createdAt').exec(function (err, r003) {
            rule004.find({}).sort('-createdAt').exec(function (err, r004) {
              rule005.find({}).sort('-createdAt').exec(function (err, r005) {
                  rule_001=r001[0];
                  rule_002=r002[0];
                  rule_003=r003[0];
                  rule_004=r004[0];
                  rule_005=r005[0];

                  res.render("realtimechart-0", {data1:rule_001,data2:rule_002,data3:rule_003,data4:rule_004,data5:rule_005,data6:a});
             });
            });
          });
        });
      });
    });
  });
});

// (1)
app.get('/realtimechart-1',function (req,res) {
  //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {


    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];

  alaram1.findOne({id:1}).sort('-createdAt').exec(function (err,a) {

      rule001.find({}).sort('-createdAt').exec(function (err, r001) {
          rule_001=r001[0];
          if(rule_001==undefined){
            rule_001={rule001x:"10",range001:"10"};
          }
          beacon001.find({}).sort('-createdAt').exec(function (err, bc001) {
                if (err) return res.json({success: false, message: err});
                  res.render("realtimechart-1", {data:bc001,data2:rule_001,data3:a});
              });
        });
    });
    });
});


// (2)
app.get('/realtimechart-2',function (req,res) {

  //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {


    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];

  rule002.find({}).sort('-createdAt').exec(function (err, r002) {
      rule_002=r002[0];
      if(rule_002==undefined){
        rule_002={rule002x:"10",range002:"10"};
      }
      beacon002.find({}).sort('-createdAt').exec(function (err, bc002) {
            if (err) return res.json({success: false, message: err});
              res.render("realtimechart-2", {data:bc002,data2:rule_002});
          });
      });
});
});

// (3)
app.get('/realtimechart-3',function (req,res) {

  //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {


    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];
  rule003.find({}).sort('-createdAt').exec(function (err, r003) {
      rule_003=r003[0];
      if(rule_003==undefined){
        rule_003={rule003x:"10",range003:"10"};
      }
      beacon003.find({}).sort('-createdAt').exec(function (err, bc003) {
            if (err) return res.json({success: false, message: err});
              res.render("realtimechart-3", {data:bc003,data2:rule_003});
          });
      });
});
});

// (4)
app.get('/realtimechart-4',function (req,res) {

  //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {


    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];
  rule004.find({}).sort('-createdAt').exec(function (err, r004) {
      rule_004=r004[0];
      if(rule_004==undefined){
        rule_004={rule004x:"10",range004:"10"};
      }
      beacon004.find({}).sort('-createdAt').exec(function (err, bc004) {
            if (err) return res.json({success: false, message: err});
              res.render("realtimechart-4", {data:bc004,data2:rule_004});
          });
      });
});
});

// (5)
app.get('/realtimechart-5',function (req,res) {

    //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {


    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];

  rule005.find({}).sort('-createdAt').exec(function (err, r005) {
      rule_005=r005[0];
      if(rule_005==undefined){
        rule_005={rule005x:"10",range005:"10"};
      }
      beacon005.find({}).sort('-createdAt').exec(function (err, bc005) {
            if (err) return res.json({success: false, message: err});
              res.render("realtimechart-5", {data:bc005,data2:rule_005});
          });
      });
});
});



//################# 그래프 page mapping EMD #####################


//@@@@@@@@@@@@@@@@@@@@@@@@@@@ mapping 관련 END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



http.listen(3000,function(){
    console.log('listening at 3000');

});
