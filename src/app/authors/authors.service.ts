import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {


  getAuthorsQuery = gql`
    {
     authors {
       id
       name
       year
       }
    }`;

  // query getDog($name: String) {
  //   dog(name: $name) {
  //     id
  //     name
  //     breed
  //   }
  // }
// `;
  getAuthorQuery = gql`
    query author($id: Int!) {
     author(id: $id) {
       id
       name
       year
       }
    }`;
  updateAuthorMytation = gql`
    mutation updateAuthor($id: Int!, $name: String!) {
      updateAuthor(id: $id, name: $name) {
        id
        name
      }
    }
  `;

  constructor(private apollo: Apollo) {
  }

  getAuthors(): Observable<any> {
    return this.apollo.watchQuery({query: this.getAuthorsQuery, fetchPolicy: 'network-only'})
      .valueChanges.pipe<any>(
        map((result) => result.data)
      );
  }

  getAuthor(id: number): Observable<any> {
    return this.apollo.watchQuery({
      query: this.getAuthorQuery,
      variables: {
        id: Number(id)
      },
      fetchPolicy: 'network-only',
    }).valueChanges.pipe<any>(
        map((result) => result.data)
      );
  }

  updateAuthor(id: number) {
    const i = Math.random().toString(36).substring(2, 15);
    this.apollo.mutate<any>({
      mutation: this.updateAuthorMytation,
      variables: {id: Number(id), name: i}
    }).subscribe();
  }


}
