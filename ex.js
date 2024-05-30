var request=require('request');

var optionParams={
	q:"kakao",
	part:"snippet",
	key:"★자기key값★",
	maxResults:2
 };
//그냥 간단하게 확인하기 쉽게하려고 maxResults 2로 했음
var url="https://www.googleapis.com/youtube/v3/search?";
for(var option in optionParams){
	url+=option+"="+optionParams[option]+"&";
}

//url의마지막에 붙어있는 & 정리
url=url.substr(0, url.length-1);

request(url, function(err, res, body){
	console.log(body)
});