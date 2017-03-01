var temp;

//稳定  : 冒泡排序 插入排序 归并排序 计数排序 基数排序
//不稳定 ： 希尔排序 简单选择排序 双向选择排序 快速排序  堆排序
var sort = {    
    bubbleSort: function(arr) {  //，冒泡排序: 比较相邻元素，第一个比第二个大就交换  
        var len = arr && arr.length;
        if (len && len > 1) {
            for (var i = 0; i < len - 1; i++) {
                var idx = i;
                for (var j = 0; j < len - 1 - idx; j++) {
                    if (arr[j] > arr[j + 1]) {
                        temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        return arr;
    },
    insertSort: function(arr) { //插入排序：一个一个的排序，取下一个元素与已排序的元素相比较，如果该元素大于新元素，则将该元素一道下一位  
        var len = arr && arr.length;
        if (len && len > 1) {
            var i,j;
            for (i = 1; i < len; i++) {
                temp = arr[i];
                j = i - 1;
                for (; j >= 0 && arr[j] > temp; j--) {
                    arr[j + 1] = arr[j];
                }
                arr[j + 1] = temp;
            }
        }
        return arr;
    },
    shellSort: function(arr) { //希尔排序：将排序元素分为N个子序列，分别进行插入排序，然后依次缩减增量再进行排序，待整个序列元素基本有序时，再对整个元素进行一次直接插入排序；
        var len = arr && arr.length;
        if (len && len > 1) {
            var i, j, gap;
            for(gap = len >> 1; gap > 0; gap >>= 1) {
                for (i = gap; i < len; i++) {
                    temp = arr[i];
                    for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                        arr[j + gap] = arr[j];
                    }
                    arr[j + gap] = temp;
                }
            }
        }
    },
    quickSort: function(arr) { //快速排序：以第一个元素为基准，然后将数组分为两个营来进行排序
        var len = arr && arr.length;
        if (len && len > 1) {
            var left = [], right = [];
            var mid = [arr[0]];
            for (var i= 1; i < len; i++) {
                if (arr[i] < mid[0]) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
            sort.quickSort(left);
            sort.quickSort(right);
            return left.concat(mid).concat(right);
        }
    },
    simpleSelectSort: function(arr) { //简单选择排序: 依次选择数组中最小的
        var len = arr && arr.length, i, j;
        if (len && len > 1) {
            var min;
            for(i = 0; i < len - 1; i++) {
                min = i;
                for (j = i + 1; j < len; j++) {
                    if (arr[j] < arr[min]) {
                        min = j;
                    }
                }
                temp = arr[min];
                arr[min] = arr[i];
                arr[i] = temp;
            }
            return arr;
        }
    },
    twoSelectSort: function(arr) { //二元选择排序: 依次选择数组中最小最大的;
        var len = arr && arr.length, i, j;
        if (len && len > 1) {
            var min, max;
            for(i = 1; i <= len / 2; i++) {
                min = i;
                max = i
                for (j = i + 1; j <= len - i; j++) {
                    if (arr[j] > arr[max]) {
                        max = j;
                        continue;
                    }
                    if (arr[j] < arr[min]) {
                        min = j;
                    }
                }
                temp = arr[i - 1];
                arr[i - 1] = arr[min];
                arr[min] = temp;
                temp = arr[len - i];
                arr[len - i] = arr[max];
                arr[max] = temp;
            }
            return arr;
        }
    },
    heapSort: function(arr) { // 堆排序： 类似完全二叉树，子节点的键值总是＜他的父节点
        var len = arr && arr.length;
        function maxHeapify(start, end) {
            var dady = start;
            var son = dady * 2 + 1;
            if (son >= end) {
                return;
            }
            if (son + 1 < end && arr[son] < arr[son + 1]) {
                son++;
            }
            if (arr[dady] <= arr[son]) {
                temp = arr[dady];
                arr[dady] = arr[son];
                arr[son] = temp;             
                maxHeapify(son, end);
            }
        }
        if (len && len > 1) {
            for (var i = Math.floor(len / 2) - 1; i >= 0; i--) {
                maxHeapify(i, len);
            }
            for(var i = len - 1; i > 0; i--) {
                temp = arr[0];
                arr[0] = arr[i];
                arr[i] = temp;         
                maxHeapify(0, i);
            }
            return arr;
        }
    },
    mergeSort: function() { //归并排序：两两比较，然后将已经排序好的两个合并成一个序列
        var len = arr && arr.length;
        if (len && len > 1) {
            var merge = function (left, right) {
                var final = [];                
                console.log('left:' + left + ', right:' + right);
                while(left.length && right.length) {
                    final.push(left[0] <= right[0] ? left.shift() : right.shift());
                }
                return final.concat(left.concat(right));
            }
            var merge2 = function() {
                var leng = this.length;
                if (leng < 2) {return this;}
                var mid = leng / 2;
                return merge(merge2.call(this.slice(0, parseInt(mid))), merge2.call(this.slice(parseInt(mid))));
            }
            return merge2.call(arr);
        }
    },
    countSort: function(arr) { // 计数排序： 找出待排序数组的最大最小值， 统计i出现次数存入C数组的第i项，然后计数累加，反向遍历原数组
        var len = arr && arr.length;
        var counts = []; //计数数组
        var newArr = []; //排序后的数组
        if (len && len > 1) {
            var min = arr[0], max = arr[0];
            for (var key = 0; key < len; key++) {
                min = (min > arr[key] ? arr[key] : min);
                max = (max < arr[key] ? arr[key] : max);
                counts[arr[key]] = (counts[arr[key]] ? counts[arr[key]] + 1 : 1);
            }
            for(var i=min + 1; i<=max; i++) {
                counts[i] = (counts[i] ? counts[i] : 0) + (counts[i-1] ? counts[i-1] : 0);
            }
            for(var k=len-1; k >= 0; k--) {
                newArr[counts[arr[k]] - 1] = arr[k];
                counts[arr[k]]--;
            }
        }
    },
    maxbitSort: function(arr) { //基数排序： 数组中每个数的长度 不满足最长的则在前面补0
        var len = arr.length;
        if (len && len > 1) {
            var newArr = [], loop, str, i, j, k, t, max = arr[0];
            for(i=0; i<len; i++) {
                max = (max < arr[i] ? arr[i] : max);
            }
            loop = (max + '').length;
            for (i = 0; i < 10; i++) {
                newArr[i] = [];
            }
            for (i = 0; i < loop; i++) {
                for(j = 0; j < len; j++) {
                    str = arr[j] + '';
                    if (str.length >= i + 1) {
                        k = parseInt(str[str.length - i - 1]);
                        newArr[k].push(arr[j]);
                    } else {
                        newArr[0].push(arr[j]);
                    }
                }
                arr.slice(0, len);
                for(j = 0; j < 10; j++) {
                    t = newArr[j].length;
                    for(k = 0; k < t; k++) {
                        arr.push(newArr[j][k]);
                    }
                    newArr[j] = [];
                }
            }
            return arr;
        }

    }
}