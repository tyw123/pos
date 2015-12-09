describe('pos', function () {
    var allItems, inputs, dateDigitToString;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        dateDigitToString = function (num) {
            return num < 10 ? '0' + num : num;
        };
    });
    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var currentDate = new Date(),
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '打印时间：' + formattedDateString + '\n' +
            '----------------------\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
    it('infodeal_1', function () {
        inputs=['ITEM000003-2'];
        var input_temp=infodeal_1(inputs);
        var expectText =[{ barcode: 'ITEM000003', num: 2 }];

        expect(input_temp).toEqual(expectText);//如果是return就用toEqual
    });
    it('infodeal_2', function () {
        inputs=[ { barcode: 'ITEM000001', num: 1 }, { barcode: 'ITEM000001', num: 1 }, { barcode: 'ITEM000001', num: 1 }, { barcode: 'ITEM000001', num: 1 }, { barcode: 'ITEM000001', num: 1 }, { barcode: 'ITEM000003', num: 2 }, { barcode: 'ITEM000005', num: 1 }, { barcode: 'ITEM000005', num: 1 }, { barcode: 'ITEM000005', num: 1 } ];
        var item_temp=infodeal_2(inputs);
        var expectText = [ { barcode: 'ITEM000001', num: 5 }, { barcode: 'ITEM000003', num: 2 }, { barcode: 'ITEM000005', num: 3 } ] ;

        expect(item_temp).toEqual(expectText);//如果是return就用toEqual
    });
    it('getgoodinfo', function () {
        inputs=[ { barcode: 'ITEM000001', num: 5 }, { barcode: 'ITEM000003', num: 2 }, { barcode: 'ITEM000005', num: 3 } ];
        var item=getgoodinfo(inputs);
        var expectText =[ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5, total: 0 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2, total: 0 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3, total: 0 } ];
        expect(item).toEqual(expectText);//如果是return就用toEqual
    })
    it('getsaved', function () {
        inputs= [ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5, total: 0 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2, total: 0 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3, total: 0 } ];
        var item=getsaved(inputs);
        var expectText =[ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 1 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 0 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 1 } ] ;
        expect(item).toEqual(expectText);//如果是return就用toEqual
    });
    it('calprice', function () {
        var gift= [ { barcode: 'ITEM000001', num: 1, name: '雪碧', unit: '瓶' }, { barcode: 'ITEM000003', num: 0, name: '荔枝', unit: '斤' }, { barcode: 'ITEM000005', num: 1, name: '方便面', unit: '袋' } ] ;
        var item=[ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5, total: 0 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2, total: 0 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3, total: 0 } ];
        var Receipt=calprice(gift,item);
        var expectText = { total: '51.00', saved: '7.50', item: [ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: '3.00', num: 5, total: '12.00' }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: '15.00', num: 2, total: '30.00' }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: '4.50', num: 3, total: '9.00' } ], gift: [ { barcode: 'ITEM000001', num: 1, name: '雪碧', unit: '瓶' }, { barcode: 'ITEM000003', num: 0, name: '荔枝', unit: '斤' }, { barcode: 'ITEM000005', num: 1, name: '方便面', unit: '袋' } ] }  ;
        expect(Receipt).toEqual(expectText);//如果是return就用toEqual
    });
    it('print', function () {
        var Receipt = { total: '51.00', saved: '7.50', item: [ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: '3.00', num: 5, total: '12.00' }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: '15.00', num: 2, total: '30.00' }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: '4.50', num: 3, total: '9.00' } ], gift: [ { barcode: 'ITEM000001', num: 1, name: '雪碧', unit: '瓶' }, { barcode: 'ITEM000003', num: 0, name: '荔枝', unit: '斤' }, { barcode: 'ITEM000005', num: 1, name: '方便面', unit: '袋' } ] }  ;
        var result=print(Receipt);
        var expectText =             '***<没钱赚商店>购物清单***\n' +
                                     '打印时间：' + formattedDateString + '\n' +
                                     '----------------------\n' +
                                     '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
                                     '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
                                     '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
                                     '----------------------\n' +
                                     '挥泪赠送商品：\n' +
                                     '名称：雪碧，数量：1瓶\n' +
                                     '名称：方便面，数量：1袋\n' +
                                     '----------------------\n' +
                                     '总计：51.00(元)\n' +
                                     '节省：7.50(元)\n' +
                                     '**********************';
        expect(result).toEqual(expectText);//如果是return就用toEqual
    });
});
