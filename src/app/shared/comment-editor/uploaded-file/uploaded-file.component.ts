import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-uploaded-file',
  templateUrl: './uploaded-file.component.html',
  styleUrls: ['./uploaded-file.component.css'],
  providers: []
})
export class UploadedFileComponent implements OnInit {
  @Input() fileName: string;
  @Input() uploading = false;

  ngOnInit(): void {}
}
