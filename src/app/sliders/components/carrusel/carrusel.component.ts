import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderItem } from '../../../interfaces/SliderItem';
import { SliderService } from '../../../services/slider-service.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'component-carrusel',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselModule,
    ButtonModule
  ],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent {

  @ViewChild('video') videoHTML!: ElementRef;
  @ViewChild('btnPausar') btnPausar!: ElementRef;
  @ViewChild('btnPlay') btnPlay!: ElementRef;
  @ViewChild('btnNext') btnNext!: ElementRef;


  public isPaused: boolean = true
  public isLoading: boolean = true

  constructor( private slidesService: SliderService) {
    this.setFileExtension()
    setTimeout(() => {
      this.isLoading = false
    }, 5000)
  }

  ngOnInit() {

  }

  get data(): SliderItem[] {
    return this.slidesService.getDataComunicados()
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
    if(this.data[e.nextSlide].ext === 'mp4'){
   
      const element = this.videoHTML.nativeElement;
      const duration = 1000 * Math.floor(element.duration)
      const btnPausar = this.btnPausar.nativeElement;
      const btnPlay = this.btnPlay.nativeElement;
      const btnNext = this.btnNext.nativeElement;
      
      element.play()
      
      btnPausar.click()
      setTimeout(() => {
        btnNext.click()
        btnPlay.click()
      }, duration)

    }
  }

  getFileExtension(filename:string){
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  setFileExtension(){
    this.data.forEach( (file:SliderItem) => {
      if(file.ext !== "frame") {
        file.ext = this.getFileExtension(file.item)
      }
    })

  }
}
