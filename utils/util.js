const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 计算输入时间与当天时间相差天数的方法
// 传入"2020-06-05T13:05:33.000+0000"格式的时间，与当天时间对比，返回差值
const calcDateDifference = e => {
  e = e.substr(0, 19);
  let date = new Date(e);
  date.setHours(date.getHours()+8);
  date = date.getTime();
  const thisDate = new Date().getTime();
  const difference = Math.floor((date-thisDate)/(1000 * 60 * 60 * 24)+1);
  return difference;
}
//将时间转成最近时间的格式，显示今天、昨天、前天，其他则显示几月几号
const getlatelyDate = e => {
  e = e.substr(0, 19);
  let date = new Date(e);
  date.setHours(date.getHours()+8);
  const monthAndDay = getMonthAndDay(e);
  const thisDate = new Date();
  const difference = Math.floor((date.getTime()-thisDate.getTime())/(1000 * 60 * 60 * 24)+1);
  switch(difference) {
    case 2: return "后天";
    case 1: return "明天";
    case 0: return "今天";
    case -1: return "昨天";
    case -2: return "前天";
    default: return monthAndDay;
  }
}
// 将"2020-06-05T13:05:33.000+0000"格式的时间改为 xx月xx日的格式
const getMonthAndDay = (e) => {
  e = e.substr(0, 19);
  let time = new Date(e);
  time.setHours(time.getHours()+8);
  return toTensDigit(time.getMonth()+1)+'月'+ (toTensDigit(time.getDate())+"日");
}
// 将"2020-06-05T13:05:33.000+0000"格式的时间改为 xx:xx 的格式
const getHoursAndMinutes = (e) => {
  e = e.substr(0, 19);
  let time = new Date(e);
  time.setHours(time.getHours()+8);
  return toTensDigit(time.getHours())+":"+toTensDigit(time.getMinutes());
}
// 将数字转换为十位数，如1转为01
const toTensDigit = (num) => {
  num *= 1;
  if( num < 10 ){
    return ("0"+num)
  }else{
    return num
  }
}
// 将活动的数据按时间分类的方法
var activityClassify = function activityClassify(activityArray) {
  if (activityArray && activityArray!=[]) {
    // 用于判断是否已有这个月份分类的对象
    var map = {};
    // 用来装结果的数组
    var dest = [];
    for (var i = 0; i < activityArray.length; i++) {
      // 将原数组中的一项取出来
      var ai = activityArray[i];
      // 记录该项的月份和年份

      let beginDate = new Date(ai.beginTime.substr(0, 19));
      beginDate.setHours(beginDate.getHours()+8);
      var beginTimeMonth = beginDate.getMonth() + 1;
      var beginTimeYear = beginDate.getFullYear();
      if (!map[beginTimeYear]) {
        // 如果未创建该年份的分类
        // 在map中加入
        map[beginTimeYear] = {[beginTimeMonth]:{}};
        // 在dest中添加数据
        dest.push({
          year: beginTimeYear,
          data: [{
            month: beginTimeMonth,
            data: [ai]
          }]
        });
      } else {
        // 如果已经创建该年份的分类
        for (var j = 0; j < dest.length; j++) {
          // 遍历dest，找到对应的年份分类
          var dj = dest[j];
          if (dj.year == beginTimeYear) {
            // 在该年份中
            if (!map[beginTimeYear][beginTimeMonth]) {
              // 如果未创建该月份的分类
              // 在map中加入
              map[beginTimeYear][beginTimeMonth] = {};
              // 在dest中添加数据
              dest[j].data.push({
                month: beginTimeMonth,
                data: [ai]
              });
            } else {
              // 如果已创建该月份的分类
              for (var k = 0; k < dest[j].data.length; k++) {
                // 遍历dest，找到该分类，在data中添加数据
                var dk = dest[j].data[k];
                if (dk.month == beginTimeMonth) {
                  dest[j].data[k].data.push(ai);
                  break;
                }
              }
            }
            break;
          }
        }
      }
    }
    return dest;
  }
};

module.exports = {
  formatTime,
  calcDateDifference,
  getMonthAndDay,
  getlatelyDate,
  getHoursAndMinutes,
  activityClassify
}
