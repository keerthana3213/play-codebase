export interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  subordinates?: Employee[];
}

export const EMPLOYEE_DATA: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    department: 'Engineering',
    position: 'Team Lead',
    salary: 85000,
    subordinates: [
      {
        id: 2,
        name: 'Jane Smith',
        department: 'Engineering',
        position: 'Senior Developer',
        salary: 72000,
        subordinates: [
          {
            id: 3,
            name: 'Alex Johnson',
            department: 'Engineering',
            position: 'Frontend Developer',
            salary: 64000,
          },
          {
            id: 4,
            name: 'Chris White',
            department: 'Engineering',
            position: 'Backend Developer',
            salary: 66000,
          },
        ],
      },
      {
        id: 5,
        name: 'Emily Brown',
        department: 'Engineering',
        position: 'QA Engineer',
        salary: 60000,
      },
    ],
  },
  {
    id: 6,
    name: 'Michael Green',
    department: 'Design',
    position: 'UI/UX Designer',
    salary: 70000,
    subordinates: [
      {
        id: 7,
        name: 'Sophia Lee',
        department: 'Design',
        position: 'Junior Designer',
        salary: 55000,
      },
    ],
  },
  {
    id: 8,
    name: 'David Black',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 78000,
  },
];
