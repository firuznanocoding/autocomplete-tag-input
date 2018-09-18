import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {fromEvent, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css']
})
export class TagInputComponent implements OnInit {
  @ViewChild('myInput') inputEl: ElementRef;

  form: FormGroup;
  focusStatus = false;
  tags = [];
  tagList;
  listOfTags: string[] = ['TypeScript', 'JavaScript', 'PHP', 'HTML', 'CSS', 'Python', 'Bootstrap 4'];
  sub$: Subscription;

  constructor() {
    this.form = new FormGroup({
      'tag': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.sortingTag();
  }

  sortingTag() {
    this.tagList = this.listOfTags;
    this.tagList.sort(function(a, b) {
      const tagA = a.toLowerCase();
      const tagB = b.toLowerCase();
      if (tagA < tagB) { return -1; }
      if (tagA > tagB) { return 1; }
      return 0;
    });
  }

  focusInput(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.focusStatus) {
      this.sub$ = fromEvent(document, 'click')
        .subscribe(() => {
          this.focusStatus = false;
          this.sub$.unsubscribe();
        });
    }
    this.inputEl.nativeElement.focus();
    this.focusStatus = true;
  }

  addTag(e, tagName, i) {
    e.preventDefault();
    e.stopPropagation();
    if (i || i === 0) {
      this.deleteFromList(tagName, i);
    }
    if (tagName) {
      this.form.reset();
      this.tags.push(tagName);
    }
  }

  deleteTag(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.listOfTags.push(tag);
    this.sortingTag();
  }

  deleteFromList(tagName, i) {
    if (tagName) {
      this.listOfTags.splice(i, 1);
    }
  }

  searchTag(tag) {
    const tagArr = [];
    this.listOfTags.map(item => {
      const sTag = item.toLowerCase().includes(tag.toLowerCase());
      if (sTag) {
        return tagArr.push(item);
      }
    });
    this.tagList = tagArr;
  }
}
