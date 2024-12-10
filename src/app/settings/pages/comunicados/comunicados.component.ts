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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-comunicados',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
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

  layout: string = 'list';
  items: Upload[] = []
  visible: boolean = false;
  isUpdating: boolean = false;
  formData = {
    name: ''
  }
  selectedFile: File | null = null

  constructor( 
    private uploadsService: UploadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private router: Router
   ) {}

  ngOnInit(): void {
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
    // event.preventDefault();
    if (!this.selectedFile) return;
    console.log('Submit');
    

    const formData = new FormData();
    formData.append('name', this.formData.name);
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:3000/api/uploads', formData).subscribe({
      next: (response) => {
        console.log('Formulario enviado con éxito', response)
        this.visible = false
        this.uploadsService.getAllUploads().subscribe( data => {
          this.items = data
        })
        this.formData.name = ''
        this.selectedFile = null
      },
      error: (error) => console.error('Error al enviar el formulario', error),
    });

    
  }
  redirect() {
    this.router.navigate(['/settings']);
  }

  showDialog() {
    this.visible = true;
  }

  editar(id: string ) {
    this.isUpdating = true
    this.showDialog()
    
  }

  onUpload(event: any) {
    // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    console.log(event);
    
}

  getSeverity() {
    return "success"
};

confirm2(event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Confirmas la eliminación?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Elemento eliminado', life: 3000 });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Se cancelo la acción', life: 3000 });
      }
  });
}

}
