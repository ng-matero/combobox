import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect, NgSelectOptgroupTemplate } from '@ng-matero/ng-select';

@Component({
  selector: 'app-group-selectable-hidden-example',
  templateUrl: './group-selectable-hidden-example.html',
  styleUrl: './group-selectable-hidden-example.scss',
  imports: [FormsModule, NgSelect, NgSelectOptgroupTemplate, JsonPipe],
})
export class GroupSelectableHiddenExample {
  accounts = [
    {
      name: 'Jill',
      email: 'jill@email.com',
      age: 15,
      country: undefined,
      child: { state: 'Active' },
    },
    {
      name: 'Henry',
      email: 'henry@email.com',
      age: 10,
      country: undefined,
      child: { state: 'Active' },
    },
    {
      name: 'Meg',
      email: 'meg@email.com',
      age: 7,
      country: null,
      child: { state: 'Active' },
    },
    {
      name: 'Adam',
      email: 'adam@email.com',
      age: 12,
      country: 'United States',
      child: { state: 'Active' },
    },
    {
      name: 'Homer',
      email: 'homer@email.com',
      age: 47,
      country: '',
      child: { state: 'Active' },
    },
    {
      name: 'Samantha',
      email: 'samantha@email.com',
      age: 30,
      country: 'United States',
      child: { state: 'Active' },
    },
    {
      name: 'Amalie',
      email: 'amalie@email.com',
      age: 12,
      country: 'Argentina',
      child: { state: 'Active' },
    },
    {
      name: 'Estefanía',
      email: 'estefania@email.com',
      age: 21,
      country: 'Argentina',
      child: { state: 'Active' },
    },
    {
      name: 'Adrian',
      email: 'adrian@email.com',
      age: 21,
      country: 'Ecuador',
      child: { state: 'Active' },
    },
    {
      name: 'Wladimir',
      email: 'wladimir@email.com',
      age: 30,
      country: 'Ecuador',
      child: { state: 'Inactive' },
    },
    {
      name: 'Natasha',
      email: 'natasha@email.com',
      age: 54,
      country: 'Ecuador',
      child: { state: 'Inactive' },
    },
    {
      name: 'Nicole',
      email: 'nicole@email.com',
      age: 43,
      country: 'Colombia',
      child: { state: 'Inactive' },
    },
    {
      name: 'Michael',
      email: 'michael@email.com',
      age: 15,
      country: 'Colombia',
      child: { state: 'Inactive' },
    },
    {
      name: 'Nicolás',
      email: 'nicole@email.com',
      age: 43,
      country: 'Colombia',
      child: { state: 'Inactive' },
    },
  ];

  selectedAccounts = [{ country: 'Argentina' }, { name: 'Samantha' }];

  compareAccounts = (item: any, selected: any) => {
    if (selected.country && item.country) {
      return item.country === selected.country;
    }
    if (item.name && selected.name) {
      return item.name === selected.name;
    }
    return false;
  };
}
