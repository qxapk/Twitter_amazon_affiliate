"auto";
device.keepScreenOn();//保持屏幕常亮




//配置
var amid = "home1002-20";//亚马逊联盟id
var tw_id = "Twitter";//被采集的推特账号id，@名
var sql_name = "123456-64-versioncode-7890123";//安卓root后：data/data/com.twitter.android/databases/缓存文件名.db
var author_id = "123456789";//被采集的推特账号id号，使用NavicatPremium，打开db数据库文件可以找到







刷新(tw_id);
shell_copy(sql_name +".db");
shell_copy(sql_name +".db-wal");
shell_copy(sql_name +".db-shm");
sleep(3000)

let db = sqlite.open("/sdcard/"+sql_name+".db");
let cursor = db.rawQuery("SELECT `content`,`status_id` FROM `statuses` WHERE `author_id` = '"+ author_id +"'", null).all();
for (let i = 0; i < cursor.length; i++) {
    var obj = cursor[i];
    var str = bytesToBase64(obj.content);
    let pattern = /J%03B%EF%BF%BD([\s\S]*?)%09/;
    let result = pattern.exec(str);
    var djdjdj = result[1];
    var parts = djdjdj.split("http");//分割http之前的文本
    var jmm = decodeURIComponent(parts[0]);
    var ttext = jmm.trimEnd();//去掉尾部换行
    
    //下面是获取url
    let regex = /%2Fdp%2F([\s\S]*?)%3F/;
    let match = str.match(regex);
    var uurl = "https://www.amazon.com/dp/"+match[1]+"?tag="+ amid;
    
    
    
    if(files.exists("/sdcard/推特发布数据.txt") == false){
        files.createWithDirs("/sdcard/推特发布数据.txt");
    }
    var wen = files.read("/sdcard/推特发布数据.txt");
    if(寻找文本(wen,obj.status_id,0) == -1){//之前没有发过
        var durl = fa_get('https://affiliate-program.amazon.com/tools/services/getShortUrl?longUrl='+encodeURIComponent(uurl)+'&marketplaceId=1',0,1);
        log(ttext+"\n"+durl.shortUrl)
        if(idContains("composer_write").clickable(true).findOne(8888)){
             sleep(500)
             id("composer_write").findOne(8888).click();
             if(idContains("composer_write").clickable(true).findOne(8888)){
                  sleep(500)
                  id("composer_write").findOne(8888).click();
             }
         }
        //###################################################
        var 搜索框 = idContains("tweet_text").findOne(8888);//粘贴
        log("搜索框:"+ 搜索框);
        if(搜索框 != "" && 搜索框 != null && 搜索框 != "undeflned" && 搜索框 != "null" && 搜索框 != undefined){
            sleep(500)
            搜索框.setText(ttext+"\n"+durl.shortUrl);
        }
        //###################################################
        if(idContains("button_tweet").clickable(true).findOne(8888)){
            sleep(500)
            id("button_tweet").findOne(8888).click();
           files.append("/sdcard/推特发布数据.txt", obj.status_id+",");//发布成功记录消息id避免重复转发
        }
        
    }
}
db.close();


sleep(50000);










function 刷新(id){
    sleep(2500);
    app.startActivity({
        action:"android.intent.action.VIEW",
        data: "twitter://user?screen_name="+id,
        packageName: "com.twitter.android"
    })
}




function 寻找文本(被搜寻的文本,欲寻找的文本,起始位置){
    if((起始位置 < 0) || (起始位置 > 被搜寻的文本.length) || ("".equals(被搜寻的文本)) || ("".equals(欲寻找的文本))){
        return -1;
    }
    return 被搜寻的文本.indexOf(欲寻找的文本, 起始位置);
}
function bytesToBase64(imgBytes) {//解码二进制数据
  let code = android.util.Base64.encodeToString(imgBytes, 2);
  code = $base64.decode(code);
  code = encodeURIComponent(code);
  
  return code;
}
function shell_copy(name){
    //将手机系统文件，复制到储存卡
    var a ="cp /data/data/com.twitter.android/databases/"+name+" /sdcard/";
    var result = shell(a, true);
    log(result);
}
/**
    url123 = 网址
    lgg = 1 则打印网址日志
    mods
      0=返回源码
      1=返回json
      2=返回字节
      3=返回body
    
**/
function fa_get(url123,lgg,mods){
    if(lgg == 1){
        console.log("[fa_get]",url123);
    }
    var fan = undefined;
    var codeee = undefined;
    try{
        codeee = http.get(url123,{headers: {
        "Accept": "*/*",
        "Accept-Encoding": "deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Host": "affiliate-program.amazon.com",
        "Referer": "https://affiliate-program.amazon.com/p/ideahub/home",
        "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "X-CSRF-Token": "填入亚马逊联盟参数",
        "Cookie": "填入亚马逊联盟参数"
        }});
    }catch(e){
        codeee = undefined;
        console.log("[fa_get]","get异常1："+e);
    }
    if(codeee == undefined){
        try{
            codeee = http.get(url123,{headers: {
        "Accept": "*/*",
        "Accept-Encoding": "deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Host": "affiliate-program.amazon.com",
        "Referer": "https://affiliate-program.amazon.com/p/ideahub/home",
        "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "X-CSRF-Token": "填入亚马逊联盟参数",
        "Cookie": "填入亚马逊联盟参数"
        }});
        }catch(e){
            codeee = undefined;
            console.log("[fa_get]","get异常2："+e);
        }
        if(codeee == undefined){
            try{
                sleep(5000);
                codeee = http.get(url123,{
						headers: {
							"Accept": "*/*",
							"Accept-Encoding": "deflate, br",
							"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
							"Connection": "keep-alive",
							"Content-Type": "application/json",
							"Host": "affiliate-program.amazon.com",
							"Referer": "https://affiliate-program.amazon.com/p/ideahub/home",
							"sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"Sec-Fetch-Dest": "empty",
							"Sec-Fetch-Mode": "cors",
							"Sec-Fetch-Site": "same-origin",
							"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
							"X-CSRF-Token": "填入亚马逊联盟参数",
							"Cookie": "填入亚马逊联盟参数"
							}
						});
            }catch(e){
                codeee = undefined;
                console.log("[fa_get]","get异常3："+e);
            }
        }
    }
    if(codeee != undefined && codeee.statusCode == 200){
        if(mods == 0){
            try{
                fan = codeee.body.string();
            }catch(e){
                fan = undefined;
                console.log("[fa_get]","codeee.body.string()："+e)
            }
        }else if(mods == 1){
            try{
                fan = codeee.body.json();
            }catch(e){
                fan = undefined;
                console.log("[fa_get]","codeee.body.json()："+e)
            }
        }else if(mods == 2){
            try{
                fan = codeee.body.bytes();
            }catch(e){
                fan = undefined;
                console.log("[fa_get]","codeee.body.bytes()："+e)
            }
        }else if(mods == 3){
            try{
                fan = codeee.body;
            }catch(e){
                fan = undefined;
                console.log("[fa_get]","codeee.body："+e)
            }
        }
    }
    return fan;
}
/**
    ttext = 文本
     
    kong
     0 = 点击文本                               （举例：需要点击的内容为“123”，，若出现“1234，123”  则点击123）
     1 = 点击包括文本                         （举例：需要点击的内容为“123”，，若出现“1234，123”  则点击1234）
     2 = 点击出现的最后一个文本 的控件            （举例：需要点击的内容为“123”，，若出现“123，123，123”  则点击第三个123）
     3 = 点击按钮控件文本                       （举例：一般用于点击：按钮，弹窗按钮，授权提示按钮，等....）
    
    clickmod
     0 = 控件或位置                              （举例：控件点击不了  则点位置）
     1 = 位置                                 （举例：点文本，控件）
     2 = 控件                                 （举例：点文本，位置）
**/
function text_click(ttext,kong,clickmod){//文本，，
    var texi = null;
    var 是否可点 = false;
    var 是否找到 = true;
    console.log("[text_click]","ttext="+ ttext +"&kong="+ kong +"&clickmod="+ clickmod);
    var texi = 控件判断(ttext,kong,"TextView");
    if(texi == null && texi == undefined){
        console.log("[text_click]","没有找到:TextView");
        是否找到 = false;
        texi = 控件判断(ttext,kong,"Button");
        if(texi == null && texi == undefined){
            console.log("[text_click]","没有找到：Button");
            texi = 控件是否可点(texi);
            if(texi != false){
                点击位置或控件(texi,ttext,clickmod);
            }else{
                点击位置(texi,ttext);
            }
        }
    }
    if(是否找到 == true){//是否找到
        texi = 控件是否可点(texi);
        if(texi != false){
            点击位置或控件(texi,ttext,clickmod);
        }else{
            点击位置(texi,ttext);
        }
    }
    console.log("[text_click]","完毕:"+ 是否找到);
}
function 控件判断(ttext,kong,clas){
    var texi = null;
    var 是否可点 = false;
    var 是否找到 = false;
    console.log("[控件判断]","进入类库:ttext="+ ttext +"&kong="+ kong +"&clas="+ clas);
    if(kong == 0){
        texi = className(clas).text(ttext).findOne(1000);
        if(texi)是否找到 = true;
        if(是否找到 == false){
            console.log("[控件判断]","是否找到:"+ 是否找到);
            texi = className(clas).textContains(ttext).findOne(1000);
        }else{
            console.log("[控件判断]","是否找到:"+ 是否找到);
        }
    }else if(kong == 1){
        texi = className(clas).textContains(ttext).findOne(1000);
    }else if(kong == 2){
        var fsfan = className(clas).textContains(ttext).find();
        var lengt = fsfan.length-1;
        console.log("[控件判断]","lengt="+ lengt);
        texi = fsfan[lengt];
    }else if(kong == 3){
        texi = className("Button").textContains(ttext).findOne(1000);
    }
    if(是否找到 == false){
        if(texi){
            是否找到 = true;
        }
    }
    console.log("[控件判断]","完毕:"+ 是否找到);
    return texi;
}
function 点击位置(texi,ttext){
    console.log("[点击位置]","进入:ttext:"+ ttext);
    if(texi != null && texi != undefined && texi != false){
        var aws = texi.bounds();
        var 是否成功 = false;
        if(shell("screencap /sdcard/root.png",true).code == 0){
            是否成功 = Tap(aws.centerX(),aws.centerY());//有root权限
        }else{
            是否成功 = click(aws.centerX(),aws.centerY());//无root权限
        }
    }
    console.log("[点击位置]","完毕:"+ 是否成功);
}
function 点击位置或控件(texi,ttext,clickmod){
    var clickcode = false;
    console.log("[点击位置或控件]","进入clickmod="+ clickmod +"&ttext="+ ttext);
    if(clickmod == 0){
        clickcode = texi.click();
        if(clickcode == false){
            点击位置(texi,ttext);
        }
    }else if(clickmod == 1){
        点击位置(texi,ttext);
    }else if(clickmod == 2){
        clickcode = texi.click();
    }
    console.log("[点击位置或控件]","完毕clickcode="+ clickcode +"&ttext="+ ttext);
}
function 控件是否可点(texi){
    console.log("[控件是否可点]","进入类库");
    var czz = "";
    var 是否找到 = false;
    for(var i=0;i<=10;i++){
        sleep(122);
        if(texi != null && texi != undefined){
            if(texi.clickable() == true){
                sleep(166);
                是否找到 = texi;
                console.log("[控件是否可点]","控件可点true");
                break;
            }else{
                texi = texi.parent();
            }
        }else{
            console.log("[控件是否可点]","texi::::"+ texi);
        }
    }
    if(是否找到 == false){
        console.log("[控件是否可点]","完毕:"+ 是否找到);
    }else{
        console.log("[控件是否可点]","完毕:true");
    }
    return 是否找到;
}