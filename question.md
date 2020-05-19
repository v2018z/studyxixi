# 查询用户信息
-
  curl 'https://pc-api.xuexi.cn/open/api/user/info' \
    -H 'Connection: keep-alive' \
    -H 'Pragma: no-cache' \
    -H 'Cache-Control: no-cache' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \
    -H 'Origin: https://pc.xuexi.cn' \
    -H 'Sec-Fetch-Site: same-site' \
    -H 'Sec-Fetch-Mode: cors' \
    -H 'Sec-Fetch-Dest: empty' \
    -H 'Referer: https://pc.xuexi.cn/points/exam-index.html' \
    -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' \
    -H 'Cookie: __UID__=751f6ff0-91c9-11ea-8ff5-b576c422c8a1; aliyungf_tc=AQAAAOVCEBf/TAIArUwW0tElLkJo5nS3; tmzw=1589857371790; zwfigprt=9159b7dae5bdab4f0bc0520cbb1afd87; exam_gray=1; webUmidToken=TBD0625FBA145C7971BD811620936440E9759A96045C518D0D1E6A0821C; token=789776f00bb4406fa5c49529066d23a1; uaToken=122#Yn2qZJVLEEaEkJpZy4pjEJponDJE7SNEEP7ZpJRBuDPpJFQLpCGwoHZDpJEL7SwBEyGZpJLlu4Ep+FQLpoGUEELon4yE7SNEEP7ZpERBuDPE+BQPpC76EJponDJLKMQEI155XDJ2tO9/a2Ie3P7Ny0VJaEBthIwFJ7HsnN83TxNccUTe1be6EEo3RF+3VEpDqMf2FzpangpjuOqEELVZ8oLUJNEEyB3tqW3bE5VXm5qjeO5EDIRr8CLU+DWEyF3mqW32E5pangp4ulqEELVZ8oL6JNEEyBfDqWfbDEpxnSp1uOsHDLVruCmUJzPEuF1SrgiMtyuJCVmBeXybyBmv6SO5ocK+gfHcmlHfPc1bDoMD9hd/oiN357f1ozCVRwLQ4ToIn9gJb64rXxNDNllnUMY5goy1ez3/j3CI9zUP1CFG2JAD93Oky1riG5ccJokey/5QsVja4IK7r7AJyYsKhQ9B0RzmQXyaddmF3YcPacXRZPC7aZF/k7p6Za4tRRfd8rbLBqE6Z67/Jj2pCgDj18z70OP+FfCDiiUEsw9AHJt0PJj/oI4u4zcXQm0bxNwA+YPG6+awh1sw0ILBt9heb8O78xD0A311ZeoUD+TehKA8itHBddUXcT3NCJ411aBPBoAtd/mQEyzMX4Ba3dYRIg62sQOL4tKOM16mKMRwHcy1GY1qi3jGFfjRUb5xIaCgd+Gatye0lRG6CMEt013mfLdOLSbpG0L9B8Bg+jHyX/nnsOwK6EtayfGaFsOtKKKFH72oeRoE7QdB02Xm1HFQGiJ=' \
    --compressed

# 查询专项答题列表
fetch("https://pc-proxy-api.xuexi.cn/api/exam/service/paper/pc/list?pageSize=50&pageNo=1", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "uatoken": "122#zoK3yD57EE+sYEpZy4pjEJponDJE7SNEEP7ZpJRBuDPpJFQLpCGwoHZDpJEL7SwBEyGZpJLlu4Ep+FQLpoGUEELon4yE7SNEEP7ZpERBuDPE+BQPpC76EJponDJLKMQEI155XDJ2tO9/a2Ie3P7Ny0VJaEBthIwFJ7HsnN83TxNccUTe1be6EEo3RF+3VEpDqMf2fzpangETuOqEELVZ8oLUJNEEyB3tqW3bE5VXm5qjeO5EDIRr8CLU+DWEyF3mqW32E5pangp4ulqEELVZ8oL6JNEEyBfDqWfbDEpxnSp1uOsHDLVruCmUJzPEuF1SrgiMtyuJCVmBeIlbx3hSKSFCmwK9B/w8UBo8/acG5GdmcVTUPJ7ISKvjVY5aQT5o5SUP/PCwrYr3eb8X6+GrjPLa3uz4hcSONngrm+s/UYjGRnSiApk7PRwTDwqhIyWESpvHrqKPEfPR8fTeNCFLXxrSzp+ZRjR5UIW+4viudGX/uNNVLglNE4jKmM6G1GPW8jFEORRZ34tH+Ojxxsr/PAPff4YPqV+XB+fwW4cRkTW259qeXUso0lrFtJryMRlhKHZWSoL3u/2O+UHB85Z6PZLZ+Lak0h5qve1yrPdpgherMW6ccDMYVcmHf6dkO5dxfSCH8Uh44VrO30qTaVhxZBsSapJcQKtZlTTL8qGm36TUSF4baWeUqxqCry3CWa4OMEhYUqsWDLfkSMqOEEof+rwVTdYBkjaTMD==",
    "webumidtoken": "T3A424996D68A70656C1AE7FBE6BCC565487A87627525EFEC3F5E0DE118"
  },
  "referrer": "https://pc.xuexi.cn/points/exam-paper-list.html",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});


# 专项答题题目与答案
    curl 'https://pc-proxy-api.xuexi.cn/api/exam/service/detail/queryV3?type=1&id=188&forced=true' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'uaToken: 122#AnKW245nEE+bc4pZy4pjEJponDJE7SNEEP7ZpJRBuDPpJFQLpCGwoHZDpJEL7SwBEyGZpJLlu4Ep+FQLpoGUEELon4yE7SNEEP7ZpERBuDPE+BQPpC76EJponDJLKMQEI155XDJ2tO9/a2Ie3P7Ny0VJaEBthIwFJ7HsnN83TxNccUTe1be6EEo3RF+35H3DqMf2U5pangENuOqEELVZ8oLUJNEEyB3tqW3bE5VXm5qjeO5EDIRr8CLU+DWEyF3mqW32E5pangp4ulqEELVZ8oL6JNEEyBfDqWfbDEpxnSp1uOsHDLVruCmUJzPEuF1SrgiMtyuJCVmBeIzbRtLSKSO5ocK+gfThVJgWdjkLz7akQXuQNk4ymoLTSY1k5Rro+2Lid7078mbfjDQr/Qlw0yedfzwXQr7NK7gCTxSGXiqiwoI0chuxB7wfKIB/+U3bw1kNr1ZjB7cDpYuoJEnWRnEDabBzQRMpO6fJf6BBUh6LlZBcjSXAh+sYF1UclJK737W+Fl420OgyTuHeOEEsGA93/673FQ29vxror2qnh0S9m6ERmF3UI+oDfFq+0+9GnDe7C3Otwv/mWSXaf4g9lrxU15lKn/yMmPKwzGruJNrodvqKqa9I3Mku2Z4YS1oQJoDe8u0rGL3035hk92cDaKeDK1CnE3AwXKTr1fYbSRETHHMWZu/ypIv2DYRuhFMq6BKiuaj3UJjNvy/EFWjRvWytk8nw7nSpKb0=' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \
  -H 'webUmidToken: T9D78FD1052CCEC2718730464EEA78D7FE08770C5C0DB64E9134C18FA3A' \
  -H 'Origin: https://pc.xuexi.cn' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://pc.xuexi.cn/points/exam-paper-detail.html?id=188' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' \
  -H 'Cookie: __UID__=751f6ff0-91c9-11ea-8ff5-b576c422c8a1; aliyungf_tc=AQAAAPNA4gQ1GQMArUwW0r6gPHOc+mFK; acw_tc=2760778f15898045452083091ecc963be9a63316de1c24bb7f18c6c720e4ba; exam_gray=1; token=789776f00bb4406fa5c49529066d23a1; uaToken=122#AnKW245nEE+bc4pZy4pjEJponDJE7SNEEP7ZpJRBuDPpJFQLpCGwoHZDpJEL7SwBEyGZpJLlu4Ep+FQLpoGUEELon4yE7SNEEP7ZpERBuDPE+BQPpC76EJponDJLKMQEI155XDJ2tO9/a2Ie3P7Ny0VJaEBthIwFJ7HsnN83TxNccUTe1be6EEo3RF+35H3DqMf2U5pangENuOqEELVZ8oLUJNEEyB3tqW3bE5VXm5qjeO5EDIRr8CLU+DWEyF3mqW32E5pangp4ulqEELVZ8oL6JNEEyBfDqWfbDEpxnSp1uOsHDLVruCmUJzPEuF1SrgiMtyuJCVmBeIzbRtLSKSO5ocK+gfThVJgWdjkLz7akQXuQNk4ymoLTSY1k5Rro+2Lid7078mbfjDQr/Qlw0yedfzwXQr7NK7gCTxSGXiqiwoI0chuxB7wfKIB/+U3bw1kNr1ZjB7cDpYuoJEnWRnEDabBzQRMpO6fJf6BBUh6LlZBcjSXAh+sYF1UclJK737W+Fl420OgyTuHeOEEsGA93/673FQ29vxror2qnh0S9m6ERmF3UI+oDfFq+0+9GnDe7C3Otwv/mWSXaf4g9lrxU15lKn/yMmPKwzGruJNrodvqKqa9I3Mku2Z4YS1oQJoDe8u0rGL3035hk92cDaKeDK1CnE3AwXKTr1fYbSRETHHMWZu/ypIv2DYRuhFMq6BKiuaj3UJjNvy/EFWjRvWytk8nw7nSpKb0=; webUmidToken=T9D78FD1052CCEC2718730464EEA78D7FE08770C5C0DB64E9134C18FA3A; tmzw=1589858236464; zwfigprt=5fcdd48261ab2714e18a32a4b0ccd72b' \
  --compressed

# 提交专项答题答案
  curl 'https://pc-proxy-api.xuexi.cn/api/exam/service/detail/submitV3' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'uaToken: 122#ghpATD5NEExHDEpZy4pjEJponDJE7SNEEP7ZpJRBuDPpJFQLpCGwoHZDpJEL7SwBEyGZpJLlu4Ep+FQLpoGUEELon4yE7SNEEP7ZpERBuDPE+BQPpC76EJponDJLKMQEI155XDJ2tO9/a2Ie3P7Ny0VJaEBthIwFJ7HsnN83TxNccUTe1be6EEo3RF+35H1DqMf2OzpangpMuOqEELVZ8oLUJNEEyB3tqW3bE5VXm5qjeO5EDIRr8CLU+DWEyF3mqW32E5pangp4ulqEELVZ8oL6JNEEyBfDqWfbDEpxnSp1uOsHDLVruCmUJzPEuF1SrgiMtyuJCVmBesDbaLzFKSO5ocK+gfHgXc6WN26UWHzHtUkpcaDpjylJDQnz1NzbMgA46bGC6Nd432i7VIjn62yW5KVRThM3f+usdMFco21CbOSxXri03AaZB1Hz1nSz4KfajoVDhDYtLBRk5nXjt1hBFvlURL36xWKzloD2jA0zaxX8bU9U3ztiAGpgzn+4zYY5AQJ/WTxwFsQ5DvVWSCrJxg+6DLmk3TaI+CJQSEO6gDZcjzCx644Qhy+IRCz0foD+EzNCc6VHpyX/VYEk9nevKPFdgYMXMfBLZ4/oGDDEJB5vv8I2TODLjee20CDDVhubEKRhHSYvBGyQpvEpGtVcWgknWpx/P8ACcyvFz/sR1cFeRwM7/RAob8mG8WtHBTWzDIYh50sY2N3vNxOKgAhHBDRtR54MfbmolVYa1PCHV7pX' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \
  -H 'webUmidToken: T609D042B37ACEC1EFA77610F925800CDF38D2F32CE94FF00596E825AC7' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -H 'Origin: https://pc.xuexi.cn' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://pc.xuexi.cn/points/exam-paper-detail.html?id=188' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' \
  -H 'Cookie: __UID__=751f6ff0-91c9-11ea-8ff5-b576c422c8a1; aliyungf_tc=AQAAAPNA4gQ1GQMArUwW0r6gPHOc+mFK; acw_tc=2760778f15898045452083091ecc963be9a63316de1c24bb7f18c6c720e4ba; token=789776f00bb4406fa5c49529066d23a1; uaToken=122#limPmE5pEEJP+EpZy4pjEJponDJE7SNEEP7ZpJRBuDPpJFQLpCGwoHZDpJEL7SwBEyGZpJLlu4Ep+FQLpoGUEELon4yE7SNEEP7ZpERBuDPE+BNPpC76EJponDJLKMQEI155XDJ2tO9/a2Ie3P7Ny0VJaEBthIwFJ7HsnN83TxNccUTe1be6EEo3RF+35BADqMf2PzpangpCuOqEELVZ8oLUJNEEyB3tqW3bE5VXm5qjeO5EDIRr8CLU+DWEyF3mqW32E5pangp4ulqEELVZ8oL6JNEEyBfDqMfbDEpxnSp1uOsHDLVruCmUJzPEuF1SrgiMtyuJCVmBeVPb+f2mKSFCmwK9B135l41pBKoytg7jD8ZUA0ySNpss6r3SJhr13PEcY72zImzYKCdYAo7Sqx48TGjFpzqYpsMs8mNo3+BbJ9+WRczqnsNVgH8EDeIprUJOBBXOpbac52udAx6DquMJkscSagOyUzUIdvyviYmbF8i7Qh0WMixP/IgXXHqRZZ8SXurj+Z3DupqPgiXjFT/zg6AyIIL1KUTiy9AfMl2uSvLTIEVMJu7kuSBjsv7IJ5iizOYn8xqASezWSsFv/I26ehN7wEwFU01t8MR9h9hzBbvuyHQbActmmrkl/sKwvh4d1X+y7peyM0OoXVCmEz7vQNn9rBDlHE4XLhviyEWLIOLCuV1MvXoAXaJk; webUmidToken=T5DC40C155CDC5043225F5E638F0630C1EAA52B7B7C1A18D6D1EC9DCF65; tmzw=1589877702620; zwfigprt=0c476d51b72b4036315172548fa63a3a' \
  --data-binary '{"id":188,"type":1,"questions":[{"questionId":5732,"answers":[{"answerId":14688,"label":"B"}]},{"questionId":5733,"answers":[{"answerId":14690,"label":"A"},{"answerId":14691,"label":"B"},{"answerId":14692,"label":"C"},{"answerId":14693,"label":"D"}]},{"questionId":5734,"answers":[{"answerId":14694,"label":"A"},{"answerId":14695,"label":"B"},{"answerId":14696,"label":"C"},{"answerId":14697,"label":"D"}]},{"questionId":5735,"answers":[{"answerId":14698,"label":"A"},{"answerId":14699,"label":"B"},{"answerId":14700,"label":"C"}]},{"questionId":5736,"answers":[{"answerId":14701,"value":"12314"}]},{"questionId":5737,"answers":[{"answerId":14702,"value":"求实"}]},{"questionId":5738,"answers":[{"answerId":14703,"label":"A"},{"answerId":14704,"label":"B"},{"answerId":14705,"label":"C"},{"answerId":14706,"label":"D"}]},{"questionId":5739,"answers":[{"answerId":14710,"label":"D"},{"answerId":14709,"label":"C"},{"answerId":14708,"label":"B"},{"answerId":14707,"label":"A"}]},{"questionId":5740,"answers":[{"answerId":14711,"value":"可持续利用"}]},{"questionId":5741,"answers":[{"answerId":14712,"value":"节水型社会"}]}],"usedTime":297,"uniqueId":"165956239225432576"}' \
  --compressed