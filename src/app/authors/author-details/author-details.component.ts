import {Component, OnInit} from '@angular/core';
import {AuthorsService} from '../authors.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {

  author: Observable<any>;

  constructor(private authorService: AuthorsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const authorId = this.route.snapshot.params.id;
    this.author = this.authorService.getAuthor(authorId);
  }

  update(id: number) {
    this.authorService.updateAuthor(id);
  }

}
