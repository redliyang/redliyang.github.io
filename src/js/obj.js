function Marray(arr) {
    this.arr = arr;
}
Marray.prototype = {
    constructor: Marray,
    push: function (params) {
        this.arr[this.arr.length] = params;
        return this.arr.length;
    },
    pop: function () {
        var temp = this.arr[this.arr.length - 1];
        this.arr.length--;
        return temp;
    }
}

var songList = [
    {
        songName: "情书",
        singer: "张学友"
    },
    {
        songName: "演员",
        singer: "薛小谦"
    },
    {
        songName: "李白",
        singer: "李荣浩"
    }
];


console.log(songList);
for (const key in songList) {
    if (songList.hasOwnProperty(key)) {
        const element = songList[key];
        console.log(element);
    }
}

for

songList.push({
    songName: "sad",
    singer: "dd"
})

// songList.splice(1, 1, {
//     songName: "sad",
//     singer: "dd"
// })

