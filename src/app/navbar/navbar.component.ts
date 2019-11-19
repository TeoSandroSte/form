import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClickMenu() {
    console.log('passo');
    this.menuClicked.emit();
  }

}
