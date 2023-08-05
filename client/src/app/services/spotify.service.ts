import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //Notes: 
    //Use the injected http service to make a get request to the express endpoint and return the response.
    //The http service is similar to fetch() (may be useful to call .toPromise() on any responses).
    //Update the return to instead return a Promise with the data from the Express server.
    //toPromise() is a deprecated function that may be removed.
    //Possible to use lastValueFrom (https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated).
    return this.http.get(this.expressBaseUrl+endpoint).toPromise().then((promise) => {
      return Promise.resolve(promise);
    });
  }

  aboutMe():Promise<ProfileData> {
    //Send a request to express, which returns a promise with some data for parsing.
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //Notes:
    //Identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Encode the resource with encodeURIComponent().
    //Return an array of the type of data depending on the category (artist, track, album).
    //JS "map" function might be useful for this.
    return this.sendRequestToExpress('/search/'+category+'/'+encodeURIComponent(resource)).then((data) => {
      if (category=='artist') {
        return data['artists']['items'].map((artist) => {
          return new ArtistData(artist);
        });
      }
      else if (category=='album') {
        return data['albums']['items'].map((album) => {
          return new AlbumData(album);
        });
      }
      else if (category=='track') {
        return data['tracks']['items'].map((track) => {
          return new TrackData(track);
        });
      }
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //Use the artist endpoint to make a request to express (may need to encode the artistId).
    return this.sendRequestToExpress('/artist/'+encodeURIComponent(artistId)).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //Use the related artist endpoint to make a request to express and return an array of artist data.
   return this.sendRequestToExpress('/artist-related-artists/'+encodeURIComponent(artistId)).then((data) => {
    return data['artists'].map((artist) => {
      return new ArtistData(artist);
    });
   });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //Use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-top-tracks/'+encodeURIComponent(artistId)).then((data) => {
      return data['tracks'].map((track) => {
        return new TrackData(track);
      });
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //Use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-albums/'+encodeURIComponent(artistId)).then((data) => {
      return data['items'].map((album) => {
        return new AlbumData(album);
      });
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //Use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/'+encodeURIComponent(albumId)).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //Use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress('/album-tracks/'+encodeURIComponent(albumId)).then((data) => {
      return data['items'].map((track) => {
        return new TrackData(track);
      });
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //Use the track endpoint to make a request to express.
    return this.sendRequestToExpress('/track/'+encodeURIComponent(trackId)).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //Use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/'+encodeURIComponent(trackId)).then((data) => {
      let audioFeatures = [];
      TrackFeature.FeatureTypes.forEach(function(feature) {
        audioFeatures.push(new TrackFeature(feature, data[feature]));
      });
      return audioFeatures;
    });
  }
}
