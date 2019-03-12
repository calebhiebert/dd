import { Component, OnInit, Input } from '@angular/core';
import { IConcept } from 'src/app/concept.service';

@Component({
  selector: 'dd-concept-list-item',
  templateUrl: './concept-list-item.component.html',
  styleUrls: ['./concept-list-item.component.css'],
})
export class ConceptListItemComponent implements OnInit {
  @Input()
  public concept: IConcept;

  @Input()
  public imageSize = 40;

  constructor() {}

  ngOnInit() {}

  public get imgSrc() {
    if (this.concept.imageId) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${this.concept.imageId}`;
    } else {
      return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/winged-sword`;
    }
  }
}
