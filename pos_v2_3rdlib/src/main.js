//TODO: Please write code in this file.
function infodeal_1(inputs){//输入数据处理1,提取商品编码和数字
    var input_temp=[]; //var input_temp=_.fill(Array(inputs.length), {barcode:inputs[0],num:0});//只有数字是复制的，字符串本质不可更改，因此表现也可以认为没有很大差别，但对象是默认为引用
    input_temp=_.map(inputs,function(n){
        if(n.indexOf("-")>0){
            itemp=n.split('-');
            return {barcode:itemp[0],num:Number(itemp[1])};
        }else{
            return{barcode:n,num:1};
        }
    });
   return input_temp
}
function infodeal_2(input_temp){//输入数据处理2,把相同的商品归类到一起
    var item_temp=[],temp=[];
    temp=_.groupBy(input_temp,'barcode');//归类到一个总对象
    item_temp=_.map(temp,function(n){
        return{barcode:n[0].barcode,num:Number(_.sum(n,'num'))}
    });
   return item_temp
}
function getgoodinfo(item_temp){//根据编码，提取商品信息
    var item=[];
    allItems = loadAllItems();
    item=_.map(item_temp,function(n){
        num=_.findIndex(allItems,'barcode',n.barcode)
        temp=_.clone(allItems[num]);
        temp.num=n.num;
        temp.total=0;
        return temp})
    return item;
}
function getsaved(item){
    allsaved=loadPromotions();
    var gift=[];//$.extend({}, item);
//    gift=_.map(item,function(n){
//        num=_.indexOf(allsaved[0].barcodes,n.barcode)//不知道为什么这里_.findIndex用不了
//        temp=_.clone(n);
//        delete temp.total;
//        if(num>0){
//            temp.num=parseInt(n.num/3);
//        }else{
//            temp.num=0;
//        }
//        return temp;
//    })//产生了一个顺序问题
    return gift;
}
function calprice(gift,item){
    var Receipt={total:0,saved:0,item,gift};
    Receipt.item=_.map(item,function(n){

    })
    for(var i=0;i<item.length;i++){
        Receipt.saved+=item[i].price*gift[i].num;
        item[i].price=item[i].price.toFixed(2);
        item[i].total=item[i].price*(item[i].num-gift[i].num);
        Receipt.total+=item[i].total;
        item[i].total=item[i].total.toFixed(2);
    }
    //输出两位小数的浮点数
    Receipt.total=Receipt.total.toFixed(2);
    Receipt.saved=Receipt.saved.toFixed(2);
    return Receipt;
}
function print(Receipt){
    formattedDateString=gettime();
    var result='***<没钱赚商店>购物清单***\n'+'打印时间：' + formattedDateString + '\n'+'----------------------\n' ;
    for(var i=0;i<item.length;i++){
        result+='名称：'+Receipt.item[i].name+'，数量：'+Receipt.item[i].num+Receipt.item[i].unit+'，单价：'+Receipt.item[i].price+'(元)，小计：'+Receipt.item[i].total+'(元)\n' ;
    }
    result+='----------------------\n' +'挥泪赠送商品：\n' ;
    for(var i=0;i<gift.length;i++){
        if(gift[i].num){
           result+='名称：'+Receipt.gift[i].name+'，数量：'+Receipt.gift[i].num+Receipt.gift[i].unit+'\n';
        }
    }
    result+= '----------------------\n' +'总计：'+Receipt.total+'(元)\n' + '节省：'+Receipt.saved+'(元)\n' +'**********************';
    return result;
}
function dateDigitToString(num){
     return num < 10 ? '0' + num : num;
}
function gettime(){
        var currentDate = new Date(),time="",
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            time = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
            return time;
}
function printInventory(inputs){
    input_temp=infodeal_1(inputs);
    item_temp=infodeal_2(input_temp);
    item=getgoodinfo(item_temp);
    gift=getsaved(item);
    Receipt=calprice(gift,item);
    result=print(Receipt);
    console.log(result);
}