import { Component, HostListener } from '@angular/core';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'notes-app';
  
  @HostListener('window:resize', ['$event']) onResize(event?) {
    this.innerWidth = window.innerWidth;
  }
  public innerWidth: any = window.innerWidth;;
  
  ngOnInit() {
      
      if(this.innerWidth <= 768){
        this.opened = false;
        this.sidebarStatus = "Show Sidebar";
        this.cols = 79;
      }
      if(this.innerWidth > 768){
        this.opened = true;
        this.sidebarStatus = "Hide Sidebar";
        this.cols = 57;
      }
   }

   ngAfterViewInit(){
     this.onResize();
   }
  

  pastDate = formatDate(new Date(2020,2,20,22,30,20), 'MMMM d, y h:mm:ss a','en-US');
  
  notes = [{title: "Title", date: this.pastDate, body: "Note"}];
  cols: number = 57;
  index: number = 0;
  opened: boolean = true;
  noteSelected: boolean = false;
  searchDisabled: boolean = false;
  searchFlag: boolean = false;
  sidebarStatus: string = "Hide Sidebar";
  searchPlaceholder: string = "Search here..";
  searchedNotes: any = [{title:"-", date: "-", body: "-"}];


searchNotes(search: any){
    this.focusIn();
    let conf = 0;
    let item: string = search.value;
    item = item.toLowerCase();
    let i = 0;
    while(i < this.notes.length){
      let title: string = this.notes[i].title.toLowerCase();
      let date: string = this.notes[i].date.toString();
      date = date.toLowerCase()
      let body: string = this.notes[i].body.toLowerCase();
      let s1:number = title.search(item);
      let s2:number = date.search(item);
      let s3:number = body.search(item);
      if(s1 > -1 || s2 > -1 || s3 > -1 ){
        this.searchedNotes = [this.notes[i], ...this.searchedNotes];
        this.searchFlag = true;
        conf++;
      }
      i++;
    }
    if(this.searchFlag){
      this.searchedNotes.splice((this.searchedNotes.length-1),1);
      this.index = 0;
    }
    else {
      this.searchFlag = false;
      return alert("No records found !!");
    }
}

  addNotes(){
    this.searchFlag = false;
    this.searchPlaceholder = "Search here..";
    const presentDate = formatDate(new Date(), 'MMMM d, y h:mm:ss a','en-US');
    this.notes = [
      {
        title: `Title${this.notes.length+1}`,
        date: presentDate,
        body: `Note${this.notes.length+1}`
      }, ...this.notes
    ]
    if(this.notes.length === 1){
      this.sidebarStatus = "Show Sidebar";
      this.searchDisabled = false;
    }
    if(this.notes.length ===1 && this.sidebarStatus === "Show Sidebar")
      this.cols = 79;
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
        this.cols = 57;
      }
      else{
        this.sidebarStatus = "Show Sidebar";
        this.cols = 79;
      }
    }
  }

  

  selectNote(note: any){
    this.noteSelected = true;
    this.index = this.notes.indexOf(note);
    let id = this.index;
  }


  focusIn(){
    this.searchFlag = false;
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
