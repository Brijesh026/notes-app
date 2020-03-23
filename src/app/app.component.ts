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
  
  notes = [
    {
      title: "Note Title",
      date: this.pastDate,
      body: "Example Note text ..."
    }
  ];

  opened: boolean = true;
  sidebarStatus = "Hide Sidebar";
  noteSelected = false;
  index: number;

  constructor(){}


  addNotes(){
    this.noteSelected = false;
    const presentDate = formatDate(new Date(), 'MMMM d, y h:mm:ss a','en-US');
    this.notes = [
      {
        title: `Title New note${this.notes.length+1}` ,
        date: presentDate,
        body: "Your note goes here..."
      }, ...this.notes
    ]
    if(this.notes.length > 0)
      this.sidebarStatus = "Show Sidebar";
  }



  deleteNotes(){
    if(this.noteSelected){
      this.notes.splice(this.index,1);
      this.noteSelected = false;
    }
    else{
      this.notes.splice(0,1);
    }
    
    if(this.notes.length === 0){
      this.opened=false;
      this.sidebarStatus = "Sidebar Disabled";
    }
  }


  sidenavToggle(){
    if(this.notes.length > 0){
      this.opened = !this.opened;
      if(this.opened){
        this.sidebarStatus = "Hide Sidebar";
      }
      else{
        this.sidebarStatus = "Show Sidebar";
      }
    }
  }

  
  selectNote(note: any){
    this.noteSelected = true;
    this.index = this.notes.indexOf(note);
    const id = this.index;
    //console.log(this.index, note.title);
    this.notes[id].title = note.title;
    this.notes[id].date = note.date;
    this.notes[id].body = note.body;
  }

}
