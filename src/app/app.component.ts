import { Component } from '@angular/core';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes-app';

  
  pastDate = formatDate(new Date(2020,2,20,22,30,20), 'MMMM d, y h:mm:ss a','en-US');
  notes: string[] = ["                       "+this.pastDate + "\n Notes1"];
  opened: boolean = true;
  sidebarStatus ="Hide Sidebar";
  noteSelected = false;
  selectedNote: any;
  index: number;
  columns: number = 20;
  
  ngOnChanges(){
    if(this.notes.length === 0){
      this.sidebarStatus = "Show Sidebar";
      this.columns = 30;
    }
    else{
      this.sidebarStatus = "Hide Sidebar";
      this.columns = 20;
    }
  }
  
  addNotes(){
    this.noteSelected = false;
    const presentDate = formatDate(new Date(), 'MMMM d, y h:mm:ss a','en-US');
    this.notes = [`                       ${presentDate}     \n\n`+
                    `New Note${this.notes.length+1}`, ...this.notes];
  }



  deleteNotes(){
    this.noteSelected = false;
    this.notes.splice(this.index,1);
  }

  sidenavToggle(){
    this.opened = !this.opened;
    if(this.opened){
      this.sidebarStatus = "Hide Sidebar";
      this.columns = 20;
    }
    else{
      this.sidebarStatus = "Show Sidebar";
      this.columns = 30;
    }
  }

  showNotes(note: any){
    this.noteSelected = true;
    this.index = this.notes.indexOf(note);
    note.value = this.notes[this.index];
    this.notes[this.index] = note;
  }

}
