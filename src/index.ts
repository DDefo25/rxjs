import { combineLatest } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {  map } from 'rxjs/operators'

const gitHub$ = ajax.getJSON('https://api.github.com/search/repositories?q=nestjs')
const gitLab$ = ajax.getJSON('https://gitlab.com/api/v4/projects?search=nestjs')

const responses = combineLatest([gitHub$, gitLab$]).pipe(
  map(([gitHub, gitLab]) => ({response: {gitHub, gitLab}}))
);

responses.subscribe({
  next: data => console.log(data),
  error: err => console.log('error: ' + err),
  complete: () => console.log('done')
})