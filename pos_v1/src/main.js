//TODO: Please write code in this file.
function getgoodinfo(inputs){
//声明
    var item=[],item_temp=[],c=1,flag,input_temp=[],d=0;
    allItems = loadAllItems();
//提取输入商品的数量
    for(var i=0;i<inputs.length;i++){
       item_temp[i]={barcode:inputs[0],num:0};
       input_temp[i]={barcode:inputs[0],num:0};
    }
//输入数据处理
    for(var i=0;i<inputs.length;i++){
        if(inputs[i].indexOf("-")<0){
            input_temp[i].barcode=inputs[i];
            input_temp[i].num=1;
        }
        else{
            input_temp[i].barcode=inputs[i].substring(0,inputs[i].indexOf("-"))
            input_temp[i].num=Number(inputs[i].substring(inputs[i].indexOf("-")+1,inputs[i].length))
        }
   }
 //输入数据归类
   for(var i=0;i<input_temp.length;i++){
    flag=0;debugger
    for(var j=0;j<c;j++){
        if(input_temp[i].barcode==item_temp[j].barcode){
            item_temp[c-1].num+=input_temp[i].num;
            flag=1;
        }
    }
    if(flag==0){
        item_temp[c].barcode=input_temp[i].barcode;
        item_temp[c].num+=input_temp[i].num;
        c++;
    }
   }
 //根据编码，提取商品信息
    for(var i=0;i<c;i++){
                item[i]={barcode:allItems[0].barcode,//使用数据之前需要先定义，不然会报未定义
                         name:allItems[0].name,
                         unit:allItems[0].unit,
                         price:allItems[0].price,
                         num:item_temp[0].num,
                         total:0}
    }
    for(var i=0;i<c;i++){
        for(var j=0;j<allItems.length;j++){
            if(item_temp[i].barcode==allItems[j].barcode){
                item[d].barcode=allItems[j].barcode;
                item[d].name=allItems[j].name;
                item[d].unit=allItems[j].unit;
                item[d].price=allItems[j].price;
                item[d].num=item_temp[i].num;
                d++;
            }
        }
    }
    return item;
}
function getsaved(item){
    allsaved=loadPromotions();
    var gift=[];
    for(var i=0;i<item.length;i++){
        gift[i]={barcode:item[i].barcode,//需要新建一个变量来获取原来变量的值，直接等于的话，两个变量是一个指针
                 num:0,
                 name:item[i].name,
                 unit:item[i].unit};
    }
    for(var i=0;i<allsaved[0].barcodes.length;i++){
        for(var j=0;j<gift.length;j++){
            if(gift[j].barcode==allsaved[0].barcodes[i]){
                gift[j].num=parseInt(item[j].num/3);
            }
        }
    }
    return gift;
}
function calprice(gift,item){
    var total=saved=0;
    var Receipt={total,saved,item,gift};
    for(var i=0;i<item.length;i++){
        Receipt.saved+=item[i].price*gift[i].num;
        item[i].total=item[i].price*(item[i].num-gift[i].num);
        Receipt.total+=item[i].total;
    }
    //输出两位小数的浮点数
    Receipt.total=Receipt.total.toFixed(2);
    Receipt.saved=Receipt.saved.toFixed(2);
    for(var i=0;i<item.length;i++){
        item[i].total=item[i].total.toFixed(2);
        item[i].price=item[i].price.toFixed(2);
    }
    return Receipt;
}
function print(Receipt){
    var result='***<没钱赚商店>购物清单***\n';
    formattedDateString=gettime();
    result+='打印时间：' + formattedDateString + '\n';
    for(var i=0;i<item.length;i++){
        result+='名称：'+Receipt.item[i].name+'，数量：'+Receipt.item[i].num+Receipt.item[i].unit+'，单价：'+Receipt.item[i].price+'(元)，小计：'+Receipt.item[i].total+'(元)\n' ;
    }
    result+='----------------------\n' +
                        '挥泪赠送商品：\n' ;
    for(var i=0;i<gift.length;i++){
        if(gift[i].num){
           result+='名称：'+Receipt.gift[i].name+'，数量：'+Receipt.gift[i].num+Receipt.gift[i].unit+'\n';
        }
    }
    result+='总计：'+Receipt.total+'(元)\n' +
                        '节省：'+Receipt.saved+'(元)\n' +
                        '**********************';
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
    item=getgoodinfo(inputs);
    gift=getsaved(item);
    Receipt=calprice(gift,item);
    result=print(Receipt);
    console.log(result);
}