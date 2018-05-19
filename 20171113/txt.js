模块化
	1.系统自带模块（http,querystring,url）
	2.自定义模块
	3.包管理器
	
系统模块
*重要的
Crypto	加密
Events	事件
Net	网络操作
OS	操作系统信息
Path	处理文件路径
Stream	流操作
Timers	定时器
ZLIB	压缩

--------------------------------------------------
assert
	断言：绝对应该出现的情况
Buffer
	
Cluster
	多进程处理
Crypto
	加密
Debugger
	命令，调试程序
DNS
	域名解析
Domain
	已废弃
Errors
	异常
Events
	模拟事件
File System

HTTP

HTTPS

Modules
	实现模块化
Net
	帮助实现网络操作
OS---Option System
	操作系统信息
Path
	处理文件路径
	/user/tmp/aaa/a.txt
	可以返回目录的部分，文件的部分，扩展名部分等
Process
	进程信息，Cluster和Child Process配合使用
querystring

Readline

REPL
	命令行
Stream
	流操作---读一点文件发一点,最搞笑
readFile
	----整个读完才发出去，造成大量浪费服务器内存
Timers
	定时器
ZLIB
	压缩--本质是流