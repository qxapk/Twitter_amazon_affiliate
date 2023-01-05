# Twitter_amazon_affiliate发单脚本

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)      


##  技术特性

- [x] **Autojs，脚本编程软件**
- [x] **Adb命令拉取出安卓系统，推特缓存文件**
- [x] **amazon链接缩短**
- [x] **startActivity意图，直接拉取被爬取推特账号主页**

## 原理

- 基于雷电模拟器adb
- 将TwitterApp缓存数据库文件复制到sd卡
- 基于Autojs读取Twitter数据库
- 根据Twitter数据库，研发监控TwitterApp发文框架
- 基于Autojs脚本监控到新的推文，转换成自己亚马逊联盟id并转发

## 使用教程

- Autojs版本：4.0及以上pro更好
- 安装雷电模拟器，开启root，本地Adb
- 模拟器内安装：ssr、mt管理器、Twitter、Autojs
- 修改代码内配置参数：amid、tw_id、sql_name、author_id、X-CSRF-Token、Cookie
- 打开autojs设置循环执行即可！


## 联系

微信公众号：小千哥

公众号时常分享前沿黑科技代码、思路，欢迎关注！
<div 对齐=居中>
<img src="img/j.png" width="400" height="400"/>
</div>
