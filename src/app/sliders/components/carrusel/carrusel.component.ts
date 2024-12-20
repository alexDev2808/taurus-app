import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ButtonModule } from 'primeng/button';
import { UploadService } from '../../../services/upload.service';
import { Upload } from '../../../interfaces/Upload';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'component-carrusel',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselModule,
    ButtonModule,
    LoaderComponent
  ],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent {

  @ViewChild('video') videoHTML!: ElementRef;
  @ViewChild('btnPausar') btnPausar!: ElementRef;
  @ViewChild('btnPlay') btnPlay!: ElementRef;
  @ViewChild('btnNext') btnNext!: ElementRef;

  public items: Upload[] = []
  public isPaused: boolean = true
  public isLoading: boolean = true
  public heigthScreen: any

  constructor( 
    private sliderService: UploadService
  ) { }

  ngOnInit() {
    this.heigthScreen = window.innerHeight * 1.1
    this.sliderService.getAllUploads().subscribe({
      next: ( res ) => {
        this.items = res
        setInterval(() => {}, 3000)
        this.isLoading = false
      }
    })
  }


  onPauseButton() {
    this.isPaused = !this.isPaused
  }

  slideConfig = {
    "vertical": false,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": false,
    "autoplaySpeed":5000,
    "dots": true,
    "pauseOnHover": false,
    "lazyLoad": 'ondemand',
    "adaptativeHeight": false
  };

  slickInit(e: any) {

  }

  breakpoint(e: any) {

  }

  beforeChange(e:any) {
    
  }

}
