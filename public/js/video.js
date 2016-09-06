(function() {
    var videoID = 'rrNL9RlPDk0';
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    window.onYouTubeIframeAPIReady = function() {
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
