import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {updateNetworkStatus} from '../../graphql.module';
import {AuthorsService} from '../authors.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
})
export class AuthorsListComponent implements OnInit {

  isConnected = false;
  authors: Observable<any[]>;
  authors2: Observable<any[]>;

  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit() {

    this.authors = this.authorsService.getAuthors();

    this.authors.subscribe(() => {
      this.authors2 = this.authorsService.getAuthors();
    });

  }

  update(id: number) {

    this.authorsService.updateAuthor(Number(id));
  }

}
