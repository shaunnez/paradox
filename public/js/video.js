(function() {

    var scriptAdded = false;
    var videoID = 'rrNL9RlPDk0';
    var tag = document.createElement('script');
    var firstScriptTag = document.getElementsByTagName('script')[0];
    var player;

    window.onYouTubeIframeAPIReady = function() {
        initPlayer();
    }

    if(window.innerWidth < 768) {
        $(document).ready(function() {
            $('body').addClass('loaded');    
        })
        $(window).on('resize', function() {
            if(!scriptAdded && window.innerWidth >= 768) {
                addScript();
            }
        })
        return;   
    } else {
        addScript();
    }

    function addScript() {
        if(!scriptAdded) {
            scriptAdded = true;
            tag.src = "https://www.youtube.com/iframe_api";
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }

    function initPlayer() {
        player = new YT.Player('video-container', {
            height:'100%',
            width: '100%',
            fitToBackground: true,  
            videoId: videoID,
            playerVars: { 
                'autoplay': 1, 
                'controls': 0,
                'autohide':1,
                'enablejsapi':1,
                'loop':1, 
                'disablekb':1, 
                'fs': 0, 
                'modestbranding': 0, 
                'showinfo': 0, 
                'color': 'white', 
                'theme': 'light', 
                'rel':0  ,
                'playlist': videoID
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
        player.mute();
        player.setVolume(0);
        player.setLoop(true);
        player.setPlaybackQuality('hd1080');
        $('body').addClass('loaded');    
    }
    
})();
