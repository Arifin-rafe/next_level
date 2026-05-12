//oop abstraction

abstract class MusicPlayer {
    abstract playMusic(): void;
    abstract pauseMusic(): void;
    abstract stopMusic(): void;
}

class SpotifyPlayer extends MusicPlayer {
    playMusic(): void {
        console.log("Playing music on Spotify");
    }
    pauseMusic(): void {
        console.log("Pausing music on Spotify");
    }
    stopMusic(): void {
        console.log("Stopping music on Spotify");
    }
}

const spotifyPlayer = new SpotifyPlayer();
spotifyPlayer.playMusic();
spotifyPlayer.pauseMusic();
spotifyPlayer.stopMusic();