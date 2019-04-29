function ajax(method,url,callback,params){ 
    //请求方式，请求地址，为了同步处理建立的函数，传的参数
            //1、创建XMLHttpRequest对象
            var xhr=new XMLHttpRequest();
	if(params&&method==="get"){//如果get有入参
	     url="?"+params;
	};
            //2、打开服务器链接       参数为 规定请求的类型  ，URL  是否异步处理请求
            xhr.open(method,url,true);
	//设置头部类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //3、监听事件（一般放这里）
            xhr.onreadystatechange=function () {
                if(xhr.readyState===4 &xhr.status===200){
                    // 通过参数返回得到的响应结果
                       callback(xhr.responseText)
                }
            };
            //4、发送请求到服务器  ()中的数据为post时向服务器发送的数据（取决于后台要的参数）
            if(method==="post"&&params){
	            xhr.send(params);
            }else{
                xhr.send();
            }
};
           