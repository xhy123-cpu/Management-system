import moment from "moment/moment"
moment.locale('zh-cn');         // zh-cn
const timeFormat=(time)=>{
    return moment(time).format('LLL'); 
}
export default timeFormat