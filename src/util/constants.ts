export interface Status {
  name: string, 
  full: string,
  link: string
}

export const statuses: Array<Status> = [{
    name: 'TODO',
    full: 'გასაკეთებელი',
    link: 'task/make-todo'
  }, {
    name: 'PROGRESS',
    full: 'პროცესში',
    link: 'task/make-in-progress'
  }, {
    name: 'DONE',
    full: 'გაკეთებული',
    link: 'task/make-done'
}];