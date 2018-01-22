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

// var songList = [
//     {
//         songName: "情书",
//         singer: "张学友"
//     },
//     {
//         songName: "演员",
//         singer: "薛小谦"
//     },
//     {
//         songName: "李白",
//         singer: "李荣浩"
//     }
// ];

// // songList.push({
// //     songName: "sad",
// //     singer: "dd"
// // })

// // songList.splice(1, 1)

// let flag = false;
// for (const key in songList) {
//     if (songList.hasOwnProperty(key)) {
//         const element = songList[key];
//         if (element.songName == '李白') {
//             flag = true;
//             console.log(element);
//         }
//         if (element.songName == '演员') {
//             element.singer = '李阳';
//             console.log(element);
//         }
//     }
// }
// if (flag == false) {
//     console.log('没有这首歌哦');
// }

function SongManager() {
    this.songList = null;
}

//在当前对象的方法中，调用当前对象的其他方法，需要使用this
//例如 在 removeSong方法中调用 selectSong  this.selectSong
SongManager.prototype = {
    init: function (songList) {
        this.songList = songList;
    },

    addSong: function (song) {
        this.songList.push(song);
    },

    removeSong: function (songName) {
        var song = this.selectSong(songName);
        if (song == null) {
            throw "您要删除的歌曲不存在！请重新尝试";
        }
        var index = this.songList.indexOf(song);
        this.songList.splice(index, 1);
    },

    updateSong: function (songName, singer) {
        var song = this.selectSong(songName);
        if (song == null) {
            throw "您要修改的歌曲不存在！请重新尝试";
        }
        song.singer = singer;
    },

    selectSong: function (songName) {
        for (var k = 0; k < this.songList.length; k++) {
            var song = this.songList[k];
            if (song.songName == songName) {
                return song;
            }
        }
        return null;
    }
};

var mySongOrder = new SongManager();

mySongOrder.init = [{
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
]