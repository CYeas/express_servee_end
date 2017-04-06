# iustu 前端组博客后台 express版
---
version: 0.0.1
## config文件
|key|value(deafult)|description|
|---|-----|-----------|
|blogPath|"../blog"|博客文件所在根目录|
|index|"/"|主页url|
|apiEdition|false|是否api模式|
## api
#### 非api模式
|method|param|return|description|
|------|-----|-----------|------|
|post|{"path": < sting >}|{"status": 0, "folder": [], "files": []}|获取< string >目录下的文件夹和markdown博客文件|
|get|host:port< path >[?render=0]|html/md_text|render可选，默认返回渲染后的html，为0时返回md文本|
#### api模式
|method|param|return|description|
|------|-----|-----------|------|
|post|{"path": < sting >}|{status: 0, "folder": [], "files": []}|获取< string >目录下的文件夹和markdown博客文件|
|get|host:port< path >[?render=0]|{"status": 0, "data": html/md_text}|render可选，默认返回渲染后的html，为0时返回md文本|
