const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playList = $('.playlist')
const cd = $('.cd')
const songName = $('header h2')
const imgSong = $('.cd-thumb')
const audioSong = $('#audio')
const btnPlay = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')

const app = {
    isPlaying: false,
    currentIndex: 0,
    isPlayingRandom: false,
    isRepeated: false,

    songs: [
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./music/CallGirl-TrungTu-7344918.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path:
                "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
                "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
                "https://media.istockphoto.com/id/682516816/vi/vec-to/t%E1%BA%A3i-cu%E1%BB%91i-tu%E1%BA%A7n-minh-h%E1%BB%8Da-vector-n%E1%BB%81n-m%C3%A0u-v%C3%A0ng.jpg?s=2048x2048&w=is&k=20&c=_ylwoLvSOx27qd1wjoxtETI7wwFQC1643nfeuOkS8xE="
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    render: function () {
        const htmls = this.songs.map(song => {
            return `
        
        <div class="song">
          <div
            class="thumb"
            style="
              background-image: url('${song.image}');
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
    
        `
        })
        playList.innerHTML = htmls.join('')
    },
    handleEvent: function () {
        const cdWidth = cd.offsetWidth
        const self = this
        const cdThumbRotate = imgSong.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbRotate.pause()

        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWidth - scrollTop

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth > 54 ? newWidth / cdWidth : 0
        }

        btnPlay.onclick = function () {
            self.isPlaying ? audioSong.pause() : audioSong.play()
        }

        audioSong.onplay = function () {
            self.isPlaying = true
            player.classList.add('playing')
            cdThumbRotate.play()
        }

        audioSong.onpause = function () {
            self.isPlaying = false
            player.classList.remove('playing')
            cdThumbRotate.pause()
        }

        audioSong.ontimeupdate = function () {
            if (audioSong.duration) {
                const progressPercen = Math.floor(audioSong.currentTime / audioSong.duration * 100)
                progress.value = progressPercen
            }
        }

        progress.onchange = function (e) {
            const seekTime = audioSong.duration / 100 * e.target.value
            audioSong.currentTime = seekTime
        }

        nextBtn.onclick = function () {
            self.isPlayingRandom ? self.randomSongs() : self.nextSong()
            audioSong.play()
        }

        prevBtn.onclick = function () {
            self.isPlayingRandom ? self.randomSongs() : self.nextSong()
            audioSong.play()
        }

        btnRandom.onclick = function () {
            this.classList.toggle('active')
            self.isPlayingRandom = !self.isPlayingRandom
        }

        audioSong.onended = function () {
            self.isRepeated ? audioSong.play() : nextBtn.click()
        }

        btnRepeat.onclick = function () {
            self.isRepeated = !self.isRepeated
            this.classList.toggle('active')
        }
    },

    randomSongs: function () {
        let randomIndex
        // const indexs = this.songs.map((value, index) => index)
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)
            // indexs = indexs.filter(index => index != randomIndex)
        }
        while (randomIndex == this.currentIndex)
        this.currentIndex = randomIndex
        this.loadCurrentSong()
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex == this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()

    },

    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex <= 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    loadCurrentSong: function () {
        songName.textContent = this.currentSong.name
        imgSong.style.backgroundImage = `url('${this.currentSong.image}')`
        audioSong.src = this.currentSong.path
    },

    start: function () {
        this.defineProperties()
        this.render()
        this.handleEvent()
        this.loadCurrentSong()
    }
}
app.start();



