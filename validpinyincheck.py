import requests
import json

shengMuList = ['b', 'p', 'm', 'f','y','w']
yunMuList = ['a', 'o', 'e', 'i', 'u', 'v']

validPinYinList = []
for shengMu in shengMuList:
    for yunMu in yunMuList:
        for shengDiao in range(0, 5):
            pinyin = (shengMu + yunMu + str(shengDiao))
            resp = requests.get("https://ss2.bdstatic.com/9_QWbzqaKgAFnsKb8IqW0jdnxx1xbK/zhdict/mp3/%s.mp3" % pinyin)
            if resp.status_code == 200:
                validPinYinList.append(pinyin)
                print(pinyin, "valid")

with open("validPinYinList.js", "wt") as f:
    print(validPinYinList)
    str = json.dumps(validPinYinList)
    f.write("const validPinYinList = " + str)