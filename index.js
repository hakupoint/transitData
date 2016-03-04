import http from 'http';
import request from 'request';
import url from 'url';
import querystring from 'querystring';

let defined = {
  statusCode: 500,
  message: 'url is empty',
}

http.createServer(function(req,res){
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  let query = querystring.parse(url.parse(req.url).query);
  let _url = query.reg;
  if(!_url){
    res.write(JSON.stringify(defined));
    return res.end();
  }
  request({url: _url, json: true}, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.write(JSON.stringify(body));
    }else{
      defined.message = error;
      res.write(JSON.stringify(defined));
    }
    res.end();
  });
}).listen(4321);
