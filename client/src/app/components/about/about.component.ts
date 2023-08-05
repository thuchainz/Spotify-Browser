import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //Inject the Spotify service
  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  /*This function gets the "about me" information from Spotify when the button in the view is clicked.
  The name, profile_pic, and profile_link fields are updated. */
  getAboutMe() {
    this.spotifyService.aboutMe().then(data => {
      this.name = data.name;
      this.profile_pic = data.imageURL;
      this.profile_link = data.spotifyProfile;
    });
  }
}
