



export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }

  import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
// import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
// import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL: any) => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();



    return uploadTask.percentageChanges();
  }

  pushFileToStorage2(fileUpload: FileUpload) {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL: any) => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })

    // uploadTask.snapshotChanges().pipe(
    //   finalize(() => {
    //     storageRef.getDownloadURL().subscribe((downloadURL: any) => {
    //       fileUpload.url = downloadURL;
    //       fileUpload.name = fileUpload.file.name;
    //       this.saveFileData(fileUpload);
    //     });
    //   })
    // ).subscribe();



    // return uploadTask.percentageChanges();
  }


  uploadImages(fileUpload: FileUpload, title: string) {
    return new Promise((resolve, reject) => {
      const urls: string[] = [];
      // for (const file of images) {
        const path = `${title}/${Date.now()}_${fileUpload.file.name}`;
        const ref = this.storage.ref(path);
        const task = this.storage.upload(path, fileUpload.file);

        task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(url => {
              urls.push(url);
              this.saveFileData(fileUpload);
              // if (images.length === urls.length) {
                resolve(urls);
              // }
            });
          })
        ).subscribe();
      // }
    });
  }


  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: any): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, (ref: { limitToLast: (arg0: any) => any; }) =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
  