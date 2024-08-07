import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-main-news-room',
  standalone: true,
  imports: [CommonModule,SlickCarouselModule],
  templateUrl: './main-news-room.component.html',
  styleUrl: './main-news-room.component.css'
})
export class MainNewsRoomComponent {
  Featuredslides = [
    {
      img: '../../../assets/news/Image.png',
    },
    {
      img: '../../../assets/news/Image.png',
    },
  ];
  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

}
