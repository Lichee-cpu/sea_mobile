/*
 * @Author: lxiang
 * @Date: 2023-06-20 08:26:50
 * @LastEditors: lxiang
 * @LastEditTime: 2023-06-20 14:51:34
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\metting\singal.js
 */
/*
 * @Author: lxiang
 * @Date: 2023-06-20 08:26:50
 * @LastEditors: lxiang
 * @LastEditTime: 2023-06-20 08:43:47
 * @description: 信令设计
 * @FilePath: \sea_mobile\src\views\project\metting\singal.js
 */
const SIGNAL_TYPE_JOIN = "join"; // 加入房间
const SIGNAL_TYPE_RESP_JOIN = "resp_join"; // 加入房间响应
const SIGNAL_TYPE_LEAVE = "leave"; // 离开房间
const SIGNAL_TYPE_NEW_PEER = "new_peer"; // 新用户加入房间
const SIGNAL_TYPE_PEER_LEAVE = "peer_leave"; // 用户离开房间
const SIGNAL_TYPE_OFFER = "offer";
const SIGNAL_TYPE_ANSWER = "answer";
const SIGNAL_TYPE_CANDIDATE = "candidate";

//创建一个连接
var server = ws.createServer(function (conn) {
  conn.client = null;
  conn.on("text", function (str) {
    const message = JSON.parse(str);
    if (message == null) {
      console.log("message is null");
      return;
    }
    switch (message.type) {
      case SIGNAL_TYPE_JOIN:
        conn.client = handleJoin(conn, message);
        break;
      case SIGNAL_TYPE_LEAVE:
        conn.client = handleLeave(conn, message);
        break;
      case SIGNAL_TYPE_OFFER:
        conn.client = handleOffer(conn, message);
        break;
      case SIGNAL_TYPE_ANSWER:
        conn.client = handleAnswer(conn, message);
        break;
      case SIGNAL_TYPE_CANDIDATE:
        conn.client = handleCandidate(conn, message);
        break;
      default:
        console.log("message type is not support");
        break;
    }
  });
});


