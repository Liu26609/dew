
# TSRPC API 接口文档

## 通用说明

- 所有请求方法均为 `POST`
- 所有请求均需加入以下 Header :
    - `Content-Type: application/json`

## 目录

- active
    - [活动-签到](#/active/Sign)
- battle
    - [Battle](#/battle/Battle)
    - [离开当前的pvp战斗](#/battle/Out)
- common
    - [获取指定体系配置](#/common/GetBodySysCfg)
- debug
    - bag
        - [Skill](#/debug/bag/Skill)
    - [Battle](#/debug/Battle)
    - [Pvp](#/debug/Pvp)
    - [Save](#/debug/Save)
- player
    - info
        - [GetBase](#/player/info/GetBase)
        - [查看当前位置](#/player/info/Position)
        - [SetName](#/player/info/SetName)
    - map
        - [探索地图](#/player/map/Search)
        - [进入历练副本](#/player/map/Start)
- work
    - [Build](#/work/Build)
- [Miss](#/Miss)
- [Ping](#/Ping)

---

## active

### 活动-签到 <a id="/active/Sign"></a>

**路径**
- POST `/active/Sign`

**请求**
```ts
interface ReqSign {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResSign {
    /** 共计签到 */
    consecutive_sign_count: number,
    /** 累计签到 */
    sign_count: number,
    /** 今日排名 */
    todayRank: number,
    /** 获得奖励 */
    gitfs: any[]
}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

## battle

### Battle <a id="/battle/Battle"></a>

**路径**
- POST `/battle/Battle`

**请求**
```ts
interface ReqBattle {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResBattle {

}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

### 离开当前的pvp战斗 <a id="/battle/Out"></a>

**路径**
- POST `/battle/Out`

**请求**
```ts
interface ReqOut {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResOut {

}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

## common

### 获取指定体系配置 <a id="/common/GetBodySysCfg"></a>

**路径**
- POST `/common/GetBodySysCfg`

**请求**
```ts
interface ReqGetBodySysCfg {
    key: string,
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResGetBodySysCfg {
    cfg: any
}
```

**配置**
```ts
{
  "check_onlyid": false
}
```

---

## debug

### bag

#### Skill <a id="/debug/bag/Skill"></a>

**路径**
- POST `/debug/bag/Skill`

**请求**
```ts
interface ReqSkill {
    name: string,
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResSkill {

}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

### Battle <a id="/debug/Battle"></a>

**路径**
- POST `/debug/Battle`

**请求**
```ts
interface ReqBattle {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResBattle {
    data: {
        /** 战斗标题 */
        title: string,
        /** 战斗标题描述 */
        tips: string,
        round: number,
        skLog: any[],
        dataLog: any[],
        killLog: any[],
        gitfs: any[]
    }
}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

### Pvp <a id="/debug/Pvp"></a>

**路径**
- POST `/debug/Pvp`

**请求**
```ts
interface ReqPvp {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResPvp {

}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

### Save <a id="/debug/Save"></a>

**路径**
- POST `/debug/Save`

**请求**
```ts
interface ReqSave {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResSave {

}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

## player

### info

#### GetBase <a id="/player/info/GetBase"></a>

**路径**
- POST `/player/info/GetBase`

**请求**
```ts
interface ReqGetBase {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResGetBase {
    name: string,
    sys: string,
    className: string,
    att: any[]
}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

#### 查看当前位置 <a id="/player/info/Position"></a>

**路径**
- POST `/player/info/Position`

**请求**
```ts
interface ReqPosition {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResPosition {
    /** 副本名称 */
    name: string,
    /** 副本在线玩家数 */
    online: number
}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

#### SetName <a id="/player/info/SetName"></a>

**路径**
- POST `/player/info/SetName`

**请求**
```ts
interface ReqSetName {
    new: string,
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResSetName {

}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

### map

#### 探索地图 <a id="/player/map/Search"></a>

**路径**
- POST `/player/map/Search`

**请求**
```ts
interface ReqSearch {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResSearch {
    type: "monster" | "player" | "reward",
    data: any
}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

#### 进入历练副本 <a id="/player/map/Start"></a>

**路径**
- POST `/player/map/Start`

**请求**
```ts
interface ReqStart {
    name: string | undefined,
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResStart {

}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

## work

### Build <a id="/work/Build"></a>

**路径**
- POST `/work/Build`

**请求**
```ts
interface ReqBuild {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResBuild {

}
```

**配置**
```ts
{
  "check_onlyid": false
}
```

---

## Miss <a id="/Miss"></a>

**路径**
- POST `/Miss`

**请求**
```ts
interface ReqMiss {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResMiss {

}
```

**配置**
```ts
{
  "check_onlyid": true
}
```

---

## Ping <a id="/Ping"></a>

**路径**
- POST `/Ping`

**请求**
```ts
interface ReqPing {
    _player?: any,
    /** 用户id */
    _onlyid?: string,
    /**
    * 消息体编号
    * 溯源消息发送
    */
    _messageid?: string,
    /** *必填 来源平台 */
    _platform?: string
}
```

**响应**
```ts
interface ResPing {

}
```

**配置**
```ts
{
  "check_onlyid": false
}
```

