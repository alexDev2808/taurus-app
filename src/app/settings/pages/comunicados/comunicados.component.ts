import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
import { Upload } from '../../../interfaces/Upload';

import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comunicados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DataViewModule,
    TagModule,
    RatingModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
    ConfirmPopupModule
  ],
  templateUrl: './comunicados.component.html',
  styleUrl: './comunicados.component.scss',
  providers: [
    MessageService,
    ConfirmationService
  ]
})

export class ComunicadosComponent implements OnInit {

  items: Upload[] = []
  visible: boolean = false;
  isUpdating: boolean = false;
  selectedFile: File | null = null
  formData = {
    name: ''
  }

  constructor( 
    private uploadsService: UploadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
   ) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.uploadsService.getAllUploads().subscribe( data => {
      this.items = data
    })
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(event: Event): void {
    if (!this.selectedFile) return;
    
    const formData = new FormData();
    formData.append('name', this.formData.name);
    formData.append('file', this.selectedFile);

    this.uploadsService.createUpload( formData ).subscribe( {
      next: (response) => {
        this.visible = false
        this.getData()
        this.formData.name = ''
        this.selectedFile = null
      },
      error: (error) => console.error('Error al enviar el formulario', error),
    })
    
  }

  showDialog() {
    this.visible = true;
  }

  editar(id: string ) {
    this.isUpdating = true
    this.showDialog()
    
  }


confirm2(event: Event, id: string ) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Confirmas la eliminación?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
          this.uploadsService.deleteUpload( id )?.subscribe( {
            next: ( res ) => {
              console.log(res);
              this.getData()
            },
            error: ( error ) => {
              console.log(error);
              this.getData()
            }
          })
          this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Elemento eliminado', life: 3000 });
          this.getData()
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Se cancelo la acción', life: 3000 });
      }
  });
}

}
