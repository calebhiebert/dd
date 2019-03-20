import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dd-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  @Input()
  public header: string;

  @Input()
  public text: string;

  constructor() {}

  ngOnInit() {}
}
