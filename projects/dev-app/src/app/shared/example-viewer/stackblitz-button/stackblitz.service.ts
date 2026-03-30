import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import sdk, { Project } from '@stackblitz/sdk';

const EXAMPLE_PATH = '/ng-select/examples/';
const TEMPLATE_PATH = '/ng-select/stackblitz/';

const TEMPLATE_FILES = [
  'index.html',
  'styles.css',
  'polyfills.ts',
  'data.service.ts',
  'main.ts',
  'app.module.ts',
  'angular.json',
];

const angularVersion = '>=15.0.0';
const dependencies = {
  '@angular/animations': angularVersion,
  '@angular/common': angularVersion,
  '@angular/compiler': angularVersion,
  '@angular/core': angularVersion,
  '@angular/forms': angularVersion,
  '@angular/http': angularVersion,
  '@angular/localize': angularVersion,
  '@angular/platform-browser': angularVersion,
  '@angular/router': angularVersion,
  '@ng-matero/ng-select': '*',
  '@ng-select/ng-option-highlight': '*',
  '@ng-bootstrap/ng-bootstrap': '*',
  'rxjs': '^6.5.3 || ^7.4.0',
  'zone.js': '^0.12.0',
};

@Injectable({
  providedIn: 'root',
})
export class StackblitzService {
  private _exampleName = '';
  private _componentName = '';
  private _examplePath = '';

  private _http = inject(HttpClient);

  private get _exampleImport() {
    return `import { ${this._componentName} } from './src/${this._exampleName}'`;
  }

  private get _exampleTemplate() {
    return `<app-${this._exampleName}></app-${this._exampleName}>`;
  }

  async openNewProject(example: string) {
    this._mapExamplePath(example);

    const exampleFiles = await this.fetchExampleFiles();
    const templateFiles = await this.fetchTemplateFiles();

    const project: Project = {
      files: {
        ...templateFiles,
        ...exampleFiles,
      },
      title: 'ng-select example',
      description: 'ng-select example',
      template: 'angular-cli',
      dependencies,
    };

    sdk.openProject(project, { openFile: `src/${this._exampleName}.html` });
  }

  async fetchTemplateFiles() {
    const files: Record<string, string> = {};
    for (const file of TEMPLATE_FILES) {
      let fileResult = (await this._readFile(file, TEMPLATE_PATH)) || '';
      if (file.includes('app.module')) {
        fileResult = fileResult.replace('//example-import', this._exampleImport);
        fileResult = fileResult.replace('//example-template', this._exampleTemplate);
        fileResult = fileResult.replace('//example-cmp', this._componentName);
      }
      files[file] = fileResult;
    }
    return files;
  }

  async fetchExampleFiles() {
    const exampleFiles = ['html', 'scss', 'ts'].map(ex => `${this._exampleName}.${ex}`);
    const files: Record<string, string> = {};

    for (const file of exampleFiles) {
      const path = `src/${file}`;
      files[path] = (await this._readFile(file, this._examplePath)) || '';
    }

    return files;
  }

  async _readFile(file: string, path: string) {
    return await this._http.get(path + file, { responseType: 'text' }).toPromise();
  }

  private _mapExamplePath(example: string) {
    const toUpperCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    this._exampleName = example;
    this._examplePath = EXAMPLE_PATH + example + '/';
    this._componentName = `${this._exampleName
      .split('-')
      .map(x => toUpperCase(x))
      .join('')}`;
  }
}
