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
      title: "Title",
      date: this.pastDate,
      body: "Text"
    }
  ];

  opened: boolean = true;
  sidebarStatus = "Hide Sidebar";
  noteSelected = false;
  index: number = 0;
  searchDisabled = false;
  searchPlaceholder = "Search here..";
  searchFlag = false;
  searchedNotes: any = [{title:"-", date: "-", body: "-"}];


searchNotes(search: any){
    this.focusIn();
    let conf = 0;
    let item: string = search.value;
    item = item.toLowerCase();
    let i = 0;
    while(i < this.notes.length-1){
      let title: string = this.notes[i].title.toLowerCase();
      let date: string = this.notes[i].date.toString();
      date = date.toLowerCase()
      let body: string = this.notes[i].body.toLowerCase();
      let s1:number = title.search(item);
      let s2:number = date.search(item);
      let s3:number = body.search(item);
      //console.log(s1,s2,s3);
      
      if(s1 > -1 || s2 > -1 || s3 > -1 ){
        this.searchedNotes = [this.notes[i], ...this.searchedNotes];
        this.searchFlag = true;
        conf++;
      }
      i++;
    }
    
    if(this.searchFlag){
      this.searchedNotes.splice((this.searchedNotes.length-1),1);
    }
    else {
      return alert("No records found !!");
    }

}

  addNotes(){
    this.searchFlag = false;
    this.searchPlaceholder = "Search here..";
    const presentDate = formatDate(new Date(), 'MMMM d, y h:mm:ss a','en-US');
    this.notes = [
      {
        title: `Title New note${this.notes.length+1}`,
        date: presentDate,
        body: `Text${this.notes.length+1}`
      }, ...this.notes
    ]
    if(this.notes.length > 0){
      this.sidebarStatus = "Show Sidebar";
      this.searchDisabled = false;

    }
  }



  deleteNotes(){
    this.searchFlag = false;
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
      this.searchDisabled = true;
      this.searchPlaceholder = "Disabled";
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
    let id = this.index;
    //console.log(this.index, note.title);
    
  }

  focusIn(){
    let c = this.searchedNotes.length-1;
    while(c>0){
      this.searchedNotes.splice(c,1);
      c--;
   }
 }

 focusOut(search: any){
   search.value = "";
 }

}
